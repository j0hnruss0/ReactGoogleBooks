import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import { Container, Row, Col} from "../components/Grid";
import API from "../util/API";
require("dotenv").config();

class Search extends Component {
  state = {
    titleSearch: "",
    authorSearch: "",
    booksFound: []
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.titleSearch && !this.state.authorSearch) {
      API.searchTitles(this.state.titleSearch)
        .then(res => this.setState({ booksFound: res.data.items}))
        .then(console.log(this.state.booksFound))
        .catch(err => console.log(err));
    } else if (!this.state.titleSearch && this.state.authorSearch) {
      API.searchAuthors(this.state.authorSearch)
        .then(res => this.setState({ booksFound: res.data.items}))
        .then(console.log(this.state.booksFound))
        .catch(err => console.log(err));
    } else if (this.state.titleSearch && this.state.authorSearch) {
      API.searchTotal(this.state.authorSearch, this.state.titleSearch)
        .then(function(res) {
          if (res !== undefined) {
            this.setState({ booksFound: res.data.items })
          } else if (res === undefined) {
            this.setState({ booksFound: null })
          }
        })
        .then(console.log(this.state.booksFound))
        .catch(err => console.log(err));
    }
  };

  saveBook = (info) => {
    //event.preventDefault();
    let newState = [...this.state.booksFound];
    let index = newState.indexOf(info)
    console.log(info);
    if (index > -1) {
      newState.splice(index, 1);
    }
    API.saveBook({
      title: info.volumeInfo.title,
      authors: info.volumeInfo.authors,
      description: info.volumeInfo.description,
      image: info.volumeInfo.imageLinks.smallThumbnail,
      link: info.volumeInfo.canonicalVolumeLink,
      date: info.volumeInfo.publishedDate
    })
      .then(this.setState({ booksFound: newState}))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="search-page">
        <Container>
          <Jumbotron>
            <h1>Welcome to Johnny's RSGB!</h1>
            <p>(That's short for React-Search-Google-Books)</p>
            <p>Search for books via Google's Books API, either by author or
              title, then save them to your "Saved Page"
            </p>
          </Jumbotron>
          <Row>
            <Col size="md-12 sm-12">
              <form className="form-group mb-2">
                <div className="mb-2">
                  <label htmlFor="titleSearch" className="mr-2">Title</label>
                  <input name="titleSearch" className="form-control" placeholder="Books by Title..." onChange={this.handleInputChange}/>
                </div>
                <div className="mb-2">
                  <label htmlFor="authorSearch" className="mr-2">Author</label>
                  <input name="authorSearch" className="form-control" placeholder="Books by Author..." onChange={this.handleInputChange}/>
                </div>
                <button className="btn btn-primary mb-2" disabled={!this.state.titleSearch && !this.state.authorSearch} onClick={this.handleFormSubmit}>Search</button>
              </form>
              <hr />
              {this.state.booksFound.length ? (
                <div className="search-results">
                  <ul className="pl-0 list-group mb-4">
                  {this.state.booksFound.map(bookRes=> {
                    return (
                      <li key={bookRes.id} value={bookRes.id} className="list-group-item bg-light">
                        <p className="d-inline"><strong>{bookRes.volumeInfo.title}</strong> by <strong>{bookRes.volumeInfo.authors + "  "}</strong></p>
                        <button onClick={()=> this.saveBook(bookRes)} className="btn btn-success float-right">Save This Book</button>
                      </li>
                    );
                  })}
                  </ul>
                </div>
              ) : (
                <div className="search-results">
                  <h3>No Results to Display Yet</h3>
                </div> 
              )}
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
};

export default Search;