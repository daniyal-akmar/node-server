const http = require("http");
const fs = require("fs");
const _ = require("lodash");

const server = http.createServer((req, res) => {
    // Set header content type
    res.setHeader("Content-Type", "text/html");

    // Set routing
    let path = "./views/";
    switch (req.url) {
        case "/":
            path += "index.html";
            res.statusCode = 200;
            break;
        case "/about":
            path += "about.html";
            res.statusCode = 200;
            break;
        case "/about-us":
            res.statusCode = 301;
            res.setHeader("location", "/about");
            res.end();
            break;
        default:
            path += "404.html";
            res.statusCode = 404;
            break;
    }

    // Send html file to client
    fs.readFile(path, (err, data) => {
        if (err) {
            console.log(err);
            res.end();
        } else {
            res.write(data);
            res.end();
        }
    });
});

server.listen(4000, "localhost", () => {
    console.log("Listening on port 4000");
});
