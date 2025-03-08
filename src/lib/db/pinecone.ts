import { Pinecone } from "@pinecone-database/pinecone";

const apiKey = process.env.PINECONE_API_KEY;
const environment = process.env.PINECONE_ENVIRONMENT;
const indexName = process.env.PINECONE_INDEX_NAME;

if (!apiKey) {
  throw new Error("PINECONE_API_KEY is not set");
}

if (!environment) {
  throw new Error("PINECONE_ENVIRONMENT is not set");
}

if (!indexName) {
  throw new Error("PINECONE_INDEX_NAME is not set");
}
const pinecone = new Pinecone({
    apiKey,
});

export const index = pinecone.Index(indexName);
