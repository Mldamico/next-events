export async function connectDatabase() {
  const client = await MongoClient.connect(
    'mongodb+srv://arecyus:papafrita@cluster0.nyzqi.mongodb.net/events?retryWrites=true&w=majority'
  );
  return client;
}
export async function insertDocument(client, collection, document) {
  const db = client.db();
  return await db.collection().insertOne(document);
}

export async function getAllDocument(client, collection, srot) {
  const db = client.db();
  const documents = await db.collection(collection).find().sort(sort).toArray();

  return documents;
}
