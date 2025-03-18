const getBooks = (req, res, books) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.write(JSON.stringify(books));
  res.end();
};

export default getBooks;
