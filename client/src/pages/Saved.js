import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import { Link } from "react-router-dom";
import { Container, Row, Col} from "../components/Grid";
import API from "../util/API";

class Saved extends Component {

  state = {
    booksSaved: []
  };

  componentDidMount() {
    this.findSavedBooks();
  };

  findSavedBooks = () => {
    API.getBooks()
      .then(res=> this.setState({booksSaved: res.data}))
      .catch(err => console.log(err));
  };

  deleteBook = (id) => {
    API.deleteBook(id)
    .then(res => this.findSavedBooks())
    .catch(err => console.log(err));
  };


  render() {
    return (
      <div className="saved-page">
        <Container>
          <Jumbotron>
            <h1>Johnny's RSGB's Saved Books</h1>
            <p>Click on "View" to see more details for each saved book
              or click "Delete" to erase the book from the database
            </p>
          </Jumbotron>
          <Row>
            <Col size="md-12 sm-12">
              <h4>Saved Books</h4>
            </Col>
            <hr />
            <Col size="md-12 sm-12">
            {this.state.booksSaved.length ? (
              <div className="search-results">
                <ul className="pl-0 list-group mb-4">
                {this.state.booksSaved.map(bookRes=> {
                  return (
                    <li key={bookRes._id} value={bookRes.id} className="list-group-item bg-light mb-2">  
                      <img className="float-left img-thumbnail mr-3" src={bookRes.image} alt={bookRes.title} />
                      <p className="d-inline"><strong>{bookRes.title}</strong> by <strong>{bookRes.authors + "  "}</strong></p>
                      <p>Published(This Edition): {bookRes.date}</p>
                      <p>Click <a href={bookRes.link} target="_blank" rel="noopener noreferrer">here</a> to buy this book</p>
                      <button onClick={()=> this.deleteBook(bookRes._id)} className="btn btn-danger float-right">Delete</button>
                      <Link to={"/saved/" + bookRes._id}><button  className="btn btn-success float-right">View</button></Link>
                    </li>
                  );
                })}
                </ul>
              </div>
            ) : (
              <h4>Nothing saved yet</h4>
            )}
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default Saved;