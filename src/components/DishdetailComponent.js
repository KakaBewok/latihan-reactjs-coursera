import React, { Component } from 'react';
import {
  Card,
  CardHeader,
  ListGroup,
  ListGroupItem,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
} from 'reactstrap';

class DishDetail extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }

  renderDetails(dish) {
    if (dish != null) {
      return (
        <Card>
          <CardImg top src={dish.image} alt={dish.name} />
          <CardBody>
            <CardTitle>{dish.name}</CardTitle>
            <CardText>{dish.description}</CardText>
          </CardBody>
        </Card>
      );
    } else return <div></div>;
  }

  renderComments(dish) {
    if (dish != null) {
      const commentList = dish.comments.map((comment) => {
        return (
          <Card
            style={{
              width: '100%',
            }}
            className="mb-3"
          >
            <CardHeader>Comment - 0{comment.id + 1}</CardHeader>
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
      });

      return commentList;
    } else return <div></div>;
  }

  render() {
    return (
      <div className="container">
        <div className="row mt-5">
          <div className="col-12 col-md-5 m-1 mx-auto">
            {this.renderDetails(this.props.dish)}
          </div>
          <div className="col-12 col-md-5 m-1 mx-auto">
            {this.renderComments(this.props.dish)}
          </div>
        </div>
      </div>
    );
  }
}

export default DishDetail;
