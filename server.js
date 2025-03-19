import http, { createServer } from "node:http";
import url from "node:url";
import fs from "node:fs";
import getBooks from "./routes/books.js";
import createBook from "./routes/create.js";
import updateBook from "./routes/update.js";
import getBookById from "./routes/book.js";
import deleteBook from "./routes/delete.js";
let books = [];
const PORT = 8080;

const loadBooks = () => {
  try {
    const fileData = fs.readFileSync("books.json", { encoding: "utf8" });
    books = fileData ? JSON.parse(fileData) : [];
  } catch (error) {
    if (error.code !== "ENOENT") {
      console.error("Error reading file books.json", error);
    }
    books = [];
  }
};

loadBooks();

const server = createServer((req, res) => {
  const { method } = req;
  const parsedUrl = url.parse(req.url, true);
  if (method === "GET" && parsedUrl.pathname === "/books") {
    getBooks(req, res, books);
  } else if (method === "GET" && parsedUrl.pathname.startsWith("/books/")) {
    getBookById(req, res, books);
  } else if (method === "POST" && parsedUrl.pathname === "/books/create") {
    createBook(req, res, books);
  } else if (
    method === "PUT" &&
    parsedUrl.pathname.startsWith("/books/update")
  ) {
    updateBook(req, res, books);
  } else if (
    method === "DELETE" &&
    parsedUrl.pathname.startsWith("/books/delete")
  ) {
    deleteBook(req, res, books);
  }
});

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}...`);
});
