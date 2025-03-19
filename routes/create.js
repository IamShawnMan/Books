import { v4 } from "uuid";
import fs from "node:fs";

const createBook = (req, res, books) => {
  const addToFile = (data) => {
    books.push(data);
    fs.writeFile(
      "books.json",
      JSON.stringify(books, null, 2),
      {
        encoding: "utf8",
      },
      (err) => {
        if (err) {
          console.error("Error writing files to books.json", err);
        }
      }
    );
  };

  let body = "";
  req.on("data", (ch) => {
    body += ch;
  });
  req.on("end", () => {
    const data = JSON.parse(body);
    const newBook = {
      id: v4(),
      ...data,
    };

    addToFile(newBook);

    res.writeHead(201, { "Content-Type": "application/json" });
    res.write(JSON.stringify(newBook));
    res.end();
  });
  return;
};

export default createBook;
