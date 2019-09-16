import axios from "axios";
require("dotenv").config();

export default {
  // Gets all books
  getBooks: function() {
    return axios.get("/api/saved");
  },
  // Gets the book with the given id
  getBook: function(id) {
    return axios.get("/api/saved/" + id);
  },
  // Deletes the book with the given id
  deleteBook: function(id) {
    return axios.delete("/api/saved/" + id);
  },
  // Saves a book to the database
  saveBook: function(bookData) {
    return axios.post("/api/saved", bookData);
  },
  searchTitles: function(query) {
    return axios.get("https://www.googleapis.com/books/v1/volumes?q=intitle:" + query + "&maxResults=20&key=" + process.env.REACT_APP_GOOGLE_KEY);
  },
  searchAuthor: function(query) {
    return axios.get("https://www.googleapis.com/books/v1/volumes?q=inauthor:" + query + "&maxResults=20&key=" + process.env.REACT_APP_GOOGLE_KEY);
  },
  searchTotal: function(author, title) {
    return axios.get("https://www.googleapis.com/books/v1/volumes?q=inauthor:" + author + "+intitle:" + title + "&maxResults=20&key=" + process.env.REACT_APP_GOOGLE_KEY);
  }
};
