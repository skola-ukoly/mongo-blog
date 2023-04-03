const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri);

async function newArticle(article) {
    try {
        await client.connect();
        const db = client.db("app");
        const col = db.collection("articles");

        const result = await col.insertOne(article);
        return result;
    } catch (e) {
        return e;
    } finally {
        await client.close();
    }
}

async function getAllArticles() {
    try {
        await client.connect();
        const db = client.db("app");
        const col = db.collection("articles");

        const result = await col.find().toArray();
        return result;
    } catch (e) {
        return e;
    } finally {
        await client.close();
    }
}

async function deleteArticle(id) {
    try {
        await client.connect();
        const db = client.db("app");
        const col = db.collection("articles");

        return await col.deleteOne({ _id: id });
    } catch (e) {
        return e;
    } finally {
        await client.close();
    }
}

async function updateArticle(id, article) {
    try {
        await client.connect();
        const db = client.db("app");
        const col = db.collection("articles");

        return await col.updateOne({ _id: id }, { $set: article })
    } catch (e) {
        return e;
    } finally {
        await client.close();
    }
}

module.exports = {
    getAllArticles,
    newArticle,
    deleteArticle,
    updateArticle,
};
