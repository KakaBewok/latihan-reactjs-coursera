import React from 'react';
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
} from 'reactstrap';
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

function RenderComments({ comments }) {
  const commentList = comments.map((comment) => {
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
  });

  return commentList;
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
          <RenderComments comments={props.comments} />
        </div>
      </div>
    </div>
  );
};

export default DishDetail;
