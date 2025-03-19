import fs from "node:fs";

const deleteBook = (req, res, books) => {
  const bookId = req.url.split("/")[3];

  try {
    const bookIndex = books.findIndex((book) => book.id === bookId);
    console.log(bookIndex);
    books.splice(bookIndex, 1);

    const deleteFromFile = () => {
      fs.writeFile(
        "books.json",
        JSON.stringify(books, null, 2),
        { encoding: "utf8" },
        (err) => {
          if (err) {
            console.error("Error writing files to books.json", err);
          }
        }
      );
    };

    deleteFromFile();

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Book successfully deleted" }));
  } catch (error) {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Book not found" }));
  }
};

export default deleteBook;
