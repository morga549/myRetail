const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017';
const dbName = 'myRetail';
const collectionName = 'Products';
const client = new MongoClient(url, { useUnifiedTopology: true});

const getProduct = async (productID) => {
    try {
        await client.connect();
        const db = client.db(dbName);
        const col = db.collection(collectionName);

        let result = await col.findOne({_id: productID});
        return result;
    } catch (e) {
        console.log(e);
        throw new Error(e.stack)
    } finally {
        client.close();
    }
}

const updateProduct = async (productID, data) => {
    try {
        await client.connect();
        const db = client.db(dbName);
        const col = db.collection(collectionName);

        let result = await col.findOneAndUpdate({_id: productID}, data);
        return result;
    } catch (e) {
        console.log(e);
        throw new Error(e.stack)
    } finally {
        client.close();
    }
}

module.exports = {
    getProduct,
};
