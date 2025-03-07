const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
    let userhassamename = users.filter((user) => {
      return user.username === username
    });
    if (userhassamename.length > 0) {
      return true;
    } else {
      return false;
    }
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
    let validusers = users.filter((user) => {
      return (user.username === username && user.password === password)
    });
    if (validusers.length > 0) {
      return true;
    } else {
      return false;
    }
}

// TASK 7 - only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    return res.status(404).json({ message: "Error logging in, please try again." });
  }

  if(authenticatedUser(username, password)) {
    let accessToken = jwt.sign({
      data: password
    }, 'access', {expiresIn: 60 * 60});
    req.session.authorization = {
      accessToken, username
    }
     return res.status(200).send("Login is SUCCESSFUL!");
  } else {
    return res.status(208).json({message: "Invalid login, check username and password and try again."});
  } 
});

// TASK 8 Add or modify a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
    const isbn = req.params.isbn;
    //console.log(isbn);
    const username = req.session.authorization.username;
    //console.log(username);
    const review = req.body.review;

    if (books[isbn]){
        books[isbn].reviews[username] = review;
         res.send(books[isbn].reviews);
        //console.log(books[isbn].reviews);
    } else {
        res.send(`No book with ISBN ${isbn} was found.`);
    }
  
});

// TASK 9: Delete a book review
regd_users.delete("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const username = req.session.authorization.username;
  
  if (books[isbn].reviews[username]){
      delete books[isbn].reviews[username];
      res.send(`Book review with ISBN ${isbn} from user ${username} has been deleted.`);
  } else {
      res.send(`No reviews with ISBN ${isbn} from user ${username} were found in the database.`);
  }
});


module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
