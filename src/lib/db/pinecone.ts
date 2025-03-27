import { Pinecone } from "@pinecone-database/pinecone";

export const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY || "",
});

// ✅ Ensure the Pinecone index is created with 1536 dimensions
export async function initializePinecone() {
  const indexName = "wall-search";

  const existingIndexes = await pinecone.listIndexes();
  if (!(existingIndexes.indexes ?? []).some((index) => index.name === indexName)) {
    console.log(`Creating Pinecone index '${indexName}' with dimension 1536...`);
    
    await pinecone.createIndex({
      name: indexName,
      dimension: 1536, // ✅ Ensure it matches OpenAI embeddings size
      metric: "cosine", // "cosine" is better for embeddings
      spec: {
        serverless: {
          cloud: "aws",
          region: "us-west-2",
        }
      }
    });
  }
}
