const updateBook = (req, res, books) => {
  const bookId = req.url.split("/")[3];
  console.log(bookId);

  let body = "";
  req.on("data", (ch) => {
    body += ch;
  });
  req.on("end", () => {
    try {
      const updatedData = JSON.parse(body);
      const bookIndex = books.findIndex((book) => book.id === +bookId);

      if (bookIndex < 0) {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Book not found" }));
        return;
      }
      books[bookIndex] = { ...books[bookIndex], ...updatedData };
      addToFile(books);
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
