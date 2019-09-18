import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import { Link } from "react-router-dom";
import { Container, Row, Col} from "../components/Grid";
import API from "../util/API";

class OneBook extends Component {

  state = {
    book: {}
  };

  componentDidMount() {
    this.getOneBook();
  };

  getOneBook = () => {
    API.getBook(this.props.match.params.id)
    .then(res => this.setState({ book: res.data }))
    .catch(err => console.log(err));
  }
  
  render() {
    return (
      <Container fluid>
        <Jumbotron>
            <h1>{this.state.book.title}</h1>
            <p>by {this.state.book.authors}</p>
          </Jumbotron>
        <Row>
          <Col size="md-12 sm-12">
            <img className="float-left img-thumbnail mr-3" src={this.state.book.image} alt={this.state.book.title} />
            <h1>Synopsis</h1>
            <p>{this.state.book.description}</p>
          </Col>
        </Row>
        <Row>
          <Col size="md-12 sm-12">
            <hr />
          <p className="text-center">Click <Link to="/saved">here</Link> to return to your saved books</p>
          </Col>
        </Row>
      </Container>
    );
  };
}

export default OneBook;