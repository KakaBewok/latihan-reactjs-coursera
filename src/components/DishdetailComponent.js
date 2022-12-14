import React from 'react';
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

function RenderComments({ comments }) {
  const commentList = comments.map((comment) => {
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
}

const DishDetail = (props) => {
  if (props.dish != null) {
    return (
      <div className="container">
        <div className="row mt-5">
          <div className="col-12 col-md-5 m-1 mx-auto">
            <RenderDish dish={props.dish} />
          </div>
          <div className="col-12 col-md-5 m-1 mx-auto">
            <RenderComments comments={props.dish.comments} />
          </div>
        </div>
      </div>
    );
  } else return <div></div>;
};

export default DishDetail;
