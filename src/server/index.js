import express from "express";
var fs = require('fs');
import React from "react";
import { renderToString } from "react-dom/server";
import App from '../shared/App';

const app = express()
app.use(express.static("public"))

app.get("*", (req, res, next) => {

    const markup = renderToString(
        <App />
    );

    fs.readFile("./public/renderHtml.html", "utf8", function (err, htmlstr) {
        if (err)
            console.log(err);
        else {
            var htmlstring = htmlstr.replace("<!--markupdata-placeholder-->", markup);
            res.send(htmlstring);
        }
    });

})

var PORT = process.env.port || 3000;

app.listen(PORT, () => {
    console.log(`Server is listening on port: 3000`)
})