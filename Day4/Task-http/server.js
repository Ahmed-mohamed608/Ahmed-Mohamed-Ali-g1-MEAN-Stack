const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3000;
const filePath = path.join(__dirname, "books.json");


function readBooks() {
  try {
    const data = fs.readFileSync(filePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}


function saveBooks(books) {
  fs.writeFileSync(filePath, JSON.stringify(books, null, 2));
}

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "application/json");

  // ================= GET ALL BOOKS =================
  if (req.method === "GET" && req.url === "/books") {
    const books = readBooks();
    res.writeHead(200);
    return res.end(JSON.stringify(books));
  }

  // ================= GET BOOK BY ID (Bonus) =================
  if (req.method === "GET" && req.url.startsWith("/books/")) {
    const id = Number(req.url.split("/")[2]);

    const books = readBooks();
    const book = books.find((b) => b.id === id);

    if (!book) {
      res.writeHead(404);
      return res.end(JSON.stringify({ message: "Book not found" }));
    }

    res.writeHead(200);
    return res.end(JSON.stringify(book));
  }

  // ================= ADD BOOK =================
  if (req.method === "POST" && req.url === "/books") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      try {
        const newBook = JSON.parse(body);

        const books = readBooks();

        const id =
          books.length > 0
            ? Math.max(...books.map((b) => b.id)) + 1
            : 1;

        const book = {
          id,
          title: newBook.title,
          author: newBook.author,
          price: newBook.price,
          available: newBook.available,
        };

        books.push(book);

        saveBooks(books);

        res.writeHead(201);
        res.end(JSON.stringify(book));
      } catch {
        res.writeHead(400);
        res.end(JSON.stringify({ message: "Invalid JSON" }));
      }
    });

    return;
  }

  // ================= UPDATE BOOK (Bonus) =================
  if (req.method === "PUT" && req.url.startsWith("/books/")) {
    const id = Number(req.url.split("/")[2]);

    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      try {
        const updatedData = JSON.parse(body);

        const books = readBooks();

        const index = books.findIndex((b) => b.id === id);

        if (index === -1) {
          res.writeHead(404);
          return res.end(JSON.stringify({ message: "Book not found" }));
        }

        books[index] = {
          ...books[index],
          ...updatedData,
          id,
        };

        saveBooks(books);

        res.writeHead(200);
        res.end(JSON.stringify(books[index]));
      } catch {
        res.writeHead(400);
        res.end(JSON.stringify({ message: "Invalid JSON" }));
      }
    });

    return;
  }

  // DELETE BOOK
  if (req.method === "DELETE" && req.url.startsWith("/books/")) {
    const id = Number(req.url.split("/")[2]);

    const books = readBooks();

    const newBooks = books.filter((b) => b.id !== id);

    if (books.length === newBooks.length) {
      res.writeHead(404);
      return res.end(JSON.stringify({ message: "Book not found" }));
    }

    saveBooks(newBooks);

    res.writeHead(200);
    return res.end(
      JSON.stringify({
        message: "Book deleted successfully",
      })
    );
  }

  // INVALID ROUTE 
  res.writeHead(404);
  res.end(
    JSON.stringify({
      message: "Invalid Route",
    })
  );
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});