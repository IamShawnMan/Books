const deleteBook = (req, res, books) => {
  const bookId = req.url.split("/")[3];
  console.log(bookId);

  try {
    const bookIndex = books.findIndex((book) => book.id === +bookId);
    console.log(bookIndex);
    books.splice(bookIndex, 1);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Book successfully deleted" }));
  } catch (error) {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Book not found" }));
  }
};

export default deleteBook;
