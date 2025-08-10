
import dotenv from 'dotenv';
import {RecursiveCharacterTextSplitter} from 'langchain/text_splitter'
import {createClient} from '@supabase/supabase-js';
import {  MistralAIEmbeddings, ChatMistralAI } from "@langchain/mistralai";
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { readFile } from 'fs/promises';
import path ,{ join, dirname } from 'path';
import { ChatPromptTemplate  } from "@langchain/core/prompts";
import { fileURLToPath } from 'url';
import { StringOutputParser } from '@langchain/core/output_parsers'; 
import { RunnableSequence, RunnablePassthrough } from "@langchain/core/runnables";
import { NextApiRequest, NextApiResponse } from 'next';



const result = dotenv.config({ path: path.join(process.cwd(), '.env') });

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const sbApiKey = process.env.SUPABASE_API_KEY;
const sbUrl = process.env.SUPABASE_URL_CHATBOT;
const mistralApiKey = process.env.MISTRAL_API_KEY;

if (!sbUrl || !sbApiKey || !mistralApiKey) {
    throw new Error('Missing required environment variables');
}

const client = createClient(sbUrl, sbApiKey)

const embeddings = new MistralAIEmbeddings({ apiKey: mistralApiKey });

const vectorStore = new SupabaseVectorStore(embeddings, {
    client, 
    tableName:'documents',
    queryName:'match_documents'
})
const retriever =  vectorStore.asRetriever()
async function  seedData(){
    try {
        const text = await readFile(join(__dirname, '..', 'data', 'cbt-info.txt'), 'utf-8');
        const splitter = new RecursiveCharacterTextSplitter({
          chunkSize:500,
          separators:['\n\n', '\n',' ','' ],
          chunkOverlap:50
        });
        
        const output = await splitter.createDocuments([text]);
    
    
        const client  = createClient(sbUrl!, sbApiKey!);
    
        await SupabaseVectorStore.fromDocuments(
          output,
          new MistralAIEmbeddings({ apiKey: mistralApiKey }),
          {
            client,
            tableName:'documents',
    
          }
    
    
        )
    
    
      } catch (err) {
        console.log(err)
      }  
}


seedData();