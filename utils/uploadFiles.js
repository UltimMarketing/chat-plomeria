import { CharacterTextSplitter } from "@langchain/textsplitters";
import { createClient } from '@supabase/supabase-js'
import { SupabaseVectorStore } from '@langchain/community/vectorstores/supabase';
import { OpenAIEmbeddings } from '@langchain/openai'
import { CSVLoader } from "@langchain/community/document_loaders/fs/csv";
import { dotenv} from "dotenv"

dotenv.config();
  
const sbApiKey = process.env.SUPABASE_KEY
const sbUrl = process.env.SUPABASE_URL
const openAIApiKey = process.env.OPENAI_API_KEY

const client = createClient(sbUrl, sbApiKey)

// Cargar datos desde un archivo CSV
const loader = new CSVLoader("../public/medellin-arriendo.csv");
const docs = await loader.load();

// Crear un text splitter para dividir el texto en chunks
const textSplitter = new CharacterTextSplitter({ separator: "\n", chunkSize: 1000, chunkOverlap: 200 });
const chunks = await textSplitter.createDocuments(docs.map(doc => doc.pageContent));

await SupabaseVectorStore.fromDocuments(
    chunks,
    new OpenAIEmbeddings({ openAIApiKey }),
    {
        client,
        tableName: 'documents',
    }
)
console.log("exito")
