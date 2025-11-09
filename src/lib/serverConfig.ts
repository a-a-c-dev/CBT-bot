

export const sbApiKey = process.env.SUPABASE_API_KEY;
export const sbUrl = process.env.SUPABASE_URL_CHATBOT;     
export const mistralApiKey = process.env.MISTRAL_API_KEY;

if (!sbUrl || !sbApiKey || !mistralApiKey) {
    if (!sbUrl) console.error('-> SUPABASE_URL_CHATBOT is missing');
    if (!sbApiKey) console.error('-> SUPABASE_API_KEY is missing');
    if (!mistralApiKey) console.error('-> MISTRAL_API_KEY is missing');
    throw new Error('Missing required environment variables');
}