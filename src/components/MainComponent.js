import { Routes, Route } from 'react-router-dom';
import React, { Component } from 'react';
import Header from './HeaderComponent';
import Menu from './MenuComponent';
import DishDetail from './DishdetailComponent';
import Home from './HomeComponent';
import Footer from './FooterComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { addComment } from '../redux/ActionCreators';

const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders,
  };
};

const mapDispatchToProps = (dispatch) => ({
  addComment: (dishId, rating, author, comment) =>
    dispatch(addComment(dishId, rating, author, comment)),
});

class Main extends Component {
  render() {
    const HomePage = () => {
      return (
        <Home
          dish={this.props.dishes.filter((dish) => dish.featured)[0]}
          promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
          leader={this.props.leaders.filter((leader) => leader.featured)[0]}
        />
      );
    };

    const DishWithId = () => {
      let { dishId } = useParams();
      return (
        <DishDetail
          dish={
            this.props.dishes.filter((dish) => dish.id === parseInt(dishId))[0]
          }
          comments={this.props.comments.filter(
            (comment) => comment.dishId === parseInt(dishId)
          )}
          addComment={this.props.addComment}
        />
      );
    };

    return (
      <div>
        <Header />
        <Routes>
          <Route path="/contactus" element={<Contact />} />
          <Route
            path="/aboutus"
            element={<About leaders={this.props.leaders} />}
          />
          <Route path="/home" element={<HomePage />} />
          <Route path="/menu" element={<Menu dishes={this.props.dishes} />} />
          <Route path="/menu/:dishId" element={<DishWithId />} />
        </Routes>
        <Footer />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
