/* eslint-disable react/jsx-pascal-case */
/* eslint-disable no-useless-constructor */
import React, { Component } from 'react';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  ListGroup,
  CardHeader,
  ListGroupItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  Row,
  Col,
} from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';

function RenderDish({ dish }) {
  return (
    <Card>
      <CardImg top src={dish.image} alt={dish.name} />
      <CardBody>
        <CardTitle>{dish.name}</CardTitle>
        <CardText>{dish.description}</CardText>
      </CardBody>
    </Card>
  );
}

function RenderComments({ comments, addComment, dishId }) {
  if (comments !== null) {
    return (
      <div>
        <div>
          {comments.map((comment) => {
            return (
              <Card
                style={{
                  width: '100%',
                }}
                className="mb-3"
              >
                <CardHeader>Comment</CardHeader>
                <ListGroup flush>
                  <ListGroupItem>{comment.comment}</ListGroupItem>
                  <ListGroupItem>
                    --{comment.author}--
                    {new Intl.DateTimeFormat('id', {
                      year: 'numeric',
                      month: 'short',
                      day: '2-digit',
                    }).format(new Date(Date.parse(comment.date)))}
                  </ListGroupItem>
                </ListGroup>
              </Card>
            );
          })}
        </div>
        <div>
          <CommentForm dishId={dishId} addComment={addComment} />
          <br />
        </div>
      </div>
    );
  } else {
    <div>Comments is empty.</div>;
  }
}

const DishDetail = (props) => {
  return (
    <div className="container">
      <div className="row">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/menu">Menu</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
        </Breadcrumb>
        <div className="col-12">
          <h3>{props.dish.name}</h3>
          <hr />
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-md-5 m-1 mx-auto">
          <RenderDish dish={props.dish} />
        </div>
        <div className="col-12 col-md-5 m-1 mx-auto">
          <RenderComments
            comments={props.comments}
            addComment={props.addComment}
            dishId={props.dish.id}
          />
          {/* <br />
          <CommentForm />
          <br /> */}
        </div>
      </div>
    </div>
  );
};

class CommentForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false,
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }

  handleSubmit(values) {
    this.toggleModal();
    alert(`${values.name} said: ${values.comment}`);
    this.props.addComment(
      this.props.dishId,
      values.rating,
      values.name,
      values.comment
    );
  }

  render() {
    const required = (val) => val && val.length;
    const maxLength = (len) => (val) => !val || val.length <= len;
    const minLength = (len) => (val) => val && val.length >= len;

    return (
      <div>
        <div>
          <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
            <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
            <ModalBody>
              <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                <Row className="form-group">
                  <Label htmlFor="rating" md={2}>
                    Rating
                  </Label>
                  <Col md={10}>
                    <Control.select
                      model=".rating"
                      name="rating"
                      id="rating"
                      className="form-control"
                    >
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                    </Control.select>
                  </Col>
                </Row>
                <Row className="form-group">
                  <Label htmlFor="name" md={2}>
                    Your Name
                  </Label>
                  <Col md={10}>
                    <Control.text
                      model=".name"
                      id="name"
                      name="name"
                      placeholder="Your Name"
                      className="form-control"
                      validators={{
                        required,
                        minLength: minLength(3),
                        maxLength: maxLength(15),
                      }}
                    />
                    <Errors
                      className="text-danger"
                      model=".name"
                      show="touched"
                      messages={{
                        required: 'Required ',
                        minLength: 'Must be greater than 2 characters',
                        maxLength: 'Must be 15 characters or less',
                      }}
                    />
                  </Col>
                </Row>
                <Row className="form-group mb-3">
                  <Label htmlFor="comment" md={2}>
                    Comment
                  </Label>
                  <Col md={10}>
                    <Control.textarea
                      model=".comment"
                      id="comment"
                      name="comment"
                      rows="6"
                      className="form-control"
                    />
                  </Col>
                </Row>
                <Row className="form-group">
                  <Col md={{ size: 10, offset: 2 }}>
                    <Button type="submit" color="primary">
                      Submit
                    </Button>
                  </Col>
                </Row>
              </LocalForm>
            </ModalBody>
          </Modal>
        </div>
        <Button outline onClick={this.toggleModal}>
          <span className="fa fa-edit fa-lg"></span> Submit Comment
        </Button>
      </div>
    );
  }
}

export default DishDetail;
