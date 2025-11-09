import {RecursiveCharacterTextSplitter} from 'langchain/text_splitter'
import {createClient} from '@supabase/supabase-js';
import {  MistralAIEmbeddings } from "@langchain/mistralai";
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { sbApiKey, sbUrl, mistralApiKey } from '@/lib/serverConfig';
import { readFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';




const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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
            throw new Error(`Error seeding data: ${err}`)
      }  
}
seedData();