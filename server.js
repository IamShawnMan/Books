import http, { createServer } from "node:http";
import url from "node:url";
import getBooks from "./routes/books.js";
import createBook from "./routes/create.js";
import updateBook from "./routes/updateBook.js";
import getBookById from "./routes/book.js";

const books = [];
const PORT = 8080;

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
  }
});

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}...`);
});

export default books;
