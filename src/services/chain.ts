import 'dotenv/config';
import {createClient} from '@supabase/supabase-js';
import {  MistralAIEmbeddings, ChatMistralAI } from "@langchain/mistralai";
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { StringOutputParser } from '@langchain/core/output_parsers'; 
import { RunnableSequence, RunnablePassthrough } from "@langchain/core/runnables";
import { NextApiRequest, NextApiResponse } from 'next';
import { sbApiKey, sbUrl, mistralApiKey } from '@/lib/serverConfig';
import { ChatPromptTemplate  } from "@langchain/core/prompts";

import {standaloneQuestionTemplate, answerTemplate, correctorTemplate } from '@/lib/prompts';



const client = createClient(sbUrl!, sbApiKey!)

const embeddings = new MistralAIEmbeddings({ apiKey: mistralApiKey });

const vectorStore = new SupabaseVectorStore(embeddings, {
    client, 
    tableName:'documents',
    queryName:'match_documents'
})
const retriever =  vectorStore.asRetriever(); 

const llm = new ChatMistralAI({
    apiKey: mistralApiKey, 
    topP: 0.5,                
});


// Convert your template to ChatPromptTemplate format
// Keep the same variable name for consistency
const standaloneQuestionPrompt = standaloneQuestionTemplate;
const answerPrompt = ChatPromptTemplate.fromTemplate(answerTemplate)
const correctorPrompt = ChatPromptTemplate.fromTemplate(correctorTemplate);


// combining them together
const combineDocuments =  (docs:{pageContent:string}[]) => docs.map(doc=>doc.pageContent).join('\n\n')


// pipe the LLM to the standalone question and using StringOutputParser to make the output a string
const standaloneQuestionChain = standaloneQuestionPrompt.pipe(llm).pipe(new StringOutputParser())


// pipe the LLM to the CBT answer and using StringOutputParser to make the output a string
const answerChain = answerPrompt.pipe(llm).pipe(new StringOutputParser())



// pipe the LLM to the translation answer  and using StringOutputParser to make the output a string
const correctorChain = correctorPrompt.pipe(llm).pipe(new StringOutputParser());


// connect each output to another, allowing each phase to have the relevent input 
const retrieverChain =  RunnableSequence.from([
  prevResult => prevResult.standalone_question,
  retriever,
  combineDocuments

])

// creating the chain which is the flow that the LLM needs to work on and passing arguments to each phase   
const chain = RunnableSequence.from([
  {
    standalone_question:standaloneQuestionChain,
    original_input: new RunnablePassthrough()
  },
  {
    context:retrieverChain,
    question:({original_input})=>original_input.question,
    con_history:({original_input})=>original_input.con_history,
    language:({original_input})=>original_input.language
  },
  {
    draft_response: answerChain,
    con_history:(prevResult) => prevResult.con_history,
    language:(prevResult) => prevResult.language
  },
  correctorChain

])


// checks if the input is reasonable
const isSpammy = (s: string): boolean => {
  const repeatedChars = /(.)\1{10,}/.test(s); // Same char 10+ times
  const tooManyEmojis = (s.match(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}]/gu) || []).length > 5;
  return repeatedChars || tooManyEmojis;
};

// checks if the input contains possible harmful chars 
const containsHtmlTags = (s: string): boolean => /<[^>]*>/g.test(s);


// validation process 
const validate = (s: string): string | null => {  
  const HEBREW_ONLY_REGEX = /^[\u0590-\u05FF\s\.\!\?\,\:\;\-\(\)\[\]\{\}\"\'\d\n]*$/;
  if (!HEBREW_ONLY_REGEX.test(s)) return "Only Hebrew characters are allowed.";
  if (!s.trim()) return "Message can’t be empty.";
  if (s.length >= 2500) return `The Message should be less than ${s.length, 1000} chars.`;
  if (isSpammy(s)) return "Message appears to be spam.";
  if (containsHtmlTags(s)) return "HTML tags are not allowed.";

  return null;
};




export async function handleChat(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(400).end(`Method ${req.method} Not Allowed`);
    }
    try{
        const { safeMessage ,messages } = req.body;
        const error = validate(safeMessage);
        if(error)return res.status(400).json({error:error})
        // invoking the chain with the necessary arguments  to the chain
        const response = await chain.invoke({
          question: safeMessage,
          con_history: messages,
          language:'Hebrew'
        });
        res.json({ response });
    }catch(error){
        console.error('API Error:', error);
        res.status(500).json({ error: `Server Error, ${error}`});
    }

 
}

