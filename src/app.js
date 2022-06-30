const express = require("express");
const app = express();
require("./db/conn");
const Link = require("./models/links")
const { urlencoded } = require("express");

require('dotenv').config();

app.set("view engine", "hbs");
// app.use(express.json()); //without json is also this web works
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    res.render("index");
})

function between(min, max) {
    return Math.floor(
        Math.random() * (max - min + 1) + min
    )
}


app.post("/", async (req, res) => {

    const ccode = between(10000, 99999);
    try {
        const create = new Link(
            {
                url: req.body.url,
                code: ccode
            }
        );
        const us = await create.save();

        res.status(200).render("index", {
            val: true,
            ccode: ccode
        });

    } catch (error) {
        res.status(400).send(error);
    }
})

app.get("/:id", async (req, res) => {

    try {

        const c = req.params.id;
        const userdetail = await Link.findOne({
            code : c
        })

        console.log(userdetail.url);
        res.redirect(userdetail.url);

        } catch (error) {
            res.status(401).send(error);
        }
    })



app.listen(8000, () => {
    console.log(`htpps://localhost:8000`);
}

)