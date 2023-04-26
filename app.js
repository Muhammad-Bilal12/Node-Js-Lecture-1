const http = require("http");
const fs = require("fs");
const path = require("path");

const filePath = path.join(process.cwd(), "data.txt");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.write("Hello World!");
    res.end();
  } else if (req.url === "/form") {
    res.setHeader("Content-Type", "text/html");
    res.write(
      "<h1>Hello Form</h1><form action='/submit' method='POST' ><input name='name' type='text'/><button>Submit</button></form>"
    );
    res.end();
  } else if (req.url === "/submit") {
    let data = "";
    req.on("data", (chunk) => (data += chunk));
    req.on("end", () => {
      fs.readFile(filePath, "utf8", (err, fileData) => {
        let newData = fileData + "\n" + data;

        fs.writeFile(filePath, newData, (err) => {
          res.write("Data Recieved");
          res.end();
        });
      });
    });
  } else {
    res.write("404 - Page Not Found");
    res.end();
  }
});

server.listen(3000);
