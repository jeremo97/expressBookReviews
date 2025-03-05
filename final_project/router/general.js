const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// TASK 1 Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
    // Send a JSON response containing the users array, formatted with an indentation of 4 spaces for readability
    res.send(JSON.stringify({books}, null, 4));
 // return res.status(300).json({message: "Yet to be implemented"});
});

// TASK 2 Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  // Filter the books array to find users whose isbn matches the extracted isbn paramter
   // let filtered_users = users.filter((user) => user.isbn === isbn);
 // Send the filtered_users array as the response to the client
  res.send(books[isbn]);
 });
  
// TASK 3 Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const author = req.params.author;
  let book = [];

  Object.keys(books).forEach(a => {
    if(books[a].author.toLowerCase() == author.toLowerCase()){
      book.push(books[a])
    }
  });
  res.send(book);
});

// TASK 4 Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const title = req.params.title;
  let book = [];

  Object.keys(books).forEach(t => {
    if(books[t].title.toLowerCase() == title.toLowerCase()){
      book.push(books[t])
    }
  });
  res.send(book);
 // return res.status(300).json({message: "Yet to be implemented"});
});

//  TASK 5 Get book review by ISBN
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  res.send(books[isbn].reviews);
  //return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
