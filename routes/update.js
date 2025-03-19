import fs from "node:fs";

const updateBook = (req, res, books) => {
  const bookId = req.url.split("/")[3];

  let body = "";
  req.on("data", (ch) => {
    body += ch;
  });
  req.on("end", () => {
    try {
      const updatedData = JSON.parse(body);
      const bookIndex = books.findIndex((book) => book.id === bookId);

      if (bookIndex < 0) {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Book not found" }));
        return;
      }
      books[bookIndex] = { ...books[bookIndex], ...updatedData };

      fs.writeFile(
        "book.json",
        JSON.stringify(books, null, 2),
        { encoding: "utf8" },
        (err) => {
          if (err) {
            console.error("Error writing files to books.json", err);
          }
        }
      );

      res.writeHead(200, { "Content-Type": "application/json" });
      res.write(
        JSON.stringify({
          message: "Book updated successfully",
          book: books[bookIndex],
        })
      );
      res.end();
    } catch (error) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Invalid JSON" }));
    }
  });
};

export default updateBook;
