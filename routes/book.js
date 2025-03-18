const getBookById = (req, res, books) => {
  const bookId = req.url.split("/")[2];
  let exactBook = {};

  books.map((e, i) => {
    if (e.id === +bookId) {
      exactBook = e;
      return;
    }
  });
  res.writeHead(200, { "Content-Type": "application/json" });
  res.write(JSON.stringify(exactBook));
  res.end();
};

export default getBookById;
