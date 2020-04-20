const MongoClient = require('mongodb').MongoClient;

const url = process.env.DATABASE_URL;
const dbName = process.env.DATABASE_NAME;
const collectionName = process.env.MONGO_COLLECTION_NAME;

const getProduct = async (productID) => {
    const client = new MongoClient(url, { useUnifiedTopology: true});
    try {
        await client.connect();
        const db = client.db(dbName);
        const col = db.collection(collectionName);

        let result = await col.findOne({_id: productID});
        let all = await col.find().toArray();
        return result;
    } catch (error) {
        throw new Error(error)
    } finally {
        client.close();
    }
}

const updateProduct = async (productID, reqData) => {
    const client = new MongoClient(url, { useUnifiedTopology: true});
    try {
        await client.connect();
        const db = client.db(dbName);
        const col = db.collection(collectionName);

        let data = {...reqData};
        let result = await
            col.findOneAndUpdate(
                {_id: productID},
                {$set: {...reqData}},
                {returnOriginal: false, upsert: false}
                );
        return result.value;
    } catch (error) {
        console.log(error);
        throw new Error(error)
    } finally {
        client.close();
    }
}

module.exports = {
    getProduct,
    updateProduct
};
