const express = require("express");
const router = express.Router();
const { ObjectId } = require('mongodb');

const { newArticle, getAllArticles, deleteArticle, updateArticle } = require("./db");

const root = `${__dirname}/../`;

router.get("/", (req, res) => {
    res.sendFile("/public/home/index.html", { root });
});

router.get("/article", (req, res) => {
    res.sendFile("/public/article/create.html", { root });
});

router.get("/article/all", async (req, res) => {
    try {
        const atticles = await getAllArticles();
        res.status(200).json(atticles);
    } catch (e) {
        res.status(500).send("Internal Server Error");
    }
});

router.post("/article", async (req, res) => {
    const data = req.body;

    if (!data.title || !data.content) {
        return res.status(400).send("Bad Request");
    }

    const article = {
        title: data.title,
        content: data.content,
    };

    try {
        await newArticle(article);
        res.status(200).redirect("/");
    } catch (e) {
        res.status(500).send("Internal Server Error");
    }
});

router.delete('/article/:id', async (req, res) => {
    const id = new ObjectId(req.params.id);

    try {
        await deleteArticle(id);
        res.status(200).send('OK');
    } catch (e) {
        res.status(500).send('Internal Server Error');
    }
});

router.put('/article/:id', async (req, res) => {
    const id = req.params.id;
    const body = req.body;

    if (!body.title || !body.content) {
        return res.status(400).send('Bad Request');
    }

    const article = {
        _id: new ObjectId(id),
        title: body.title,
        content: body.content,
    };

    try {
        await updateArticle(article._id, article);
        res.status(200).send('OK');
    }
    catch (e) {
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;