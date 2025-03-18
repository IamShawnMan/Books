const createBook = (req, res, books) => {
  let body = "";
  req.on("data", (ch) => {
    body += ch;
  });
  req.on("end", () => {
    const data = JSON.parse(body);
    const newBook = {
      id: books.length,
      ...data,
    };

    books.push(newBook);

    res.writeHead(201, { "Content-Type": "application/json" });
    res.write(JSON.stringify(newBook));
    res.end();
  });
  return;
};

export default createBook;
