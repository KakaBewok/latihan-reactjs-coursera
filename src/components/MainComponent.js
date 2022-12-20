import { Routes, Route } from 'react-router-dom';
import React, { Component } from 'react';
import Header from './HeaderComponent';
import Menu from './MenuComponent';
import DishDetail from './DishdetailComponent';
import Home from './HomeComponent';
import Footer from './FooterComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';
import { PROMOTIONS } from '../shared/promotions';
import { LEADERS } from '../shared/leaders';
import { useParams } from 'react-router-dom';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES,
      comments: COMMENTS,
      promotions: PROMOTIONS,
      leaders: LEADERS,
    };
  }

  render() {
    const HomePage = () => {
      return (
        <Home
          dish={this.state.dishes.filter((dish) => dish.featured)[0]}
          promotion={this.state.promotions.filter((promo) => promo.featured)[0]}
          leader={this.state.leaders.filter((leader) => leader.featured)[0]}
        />
      );
    };

    const DishWithId = () => {
      let { dishId } = useParams();
      return (
        <DishDetail
          dish={
            this.state.dishes.filter((dish) => dish.id === parseInt(dishId))[0]
          }
          comments={this.state.comments.filter(
            (comment) => comment.dishId === parseInt(dishId)
          )}
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
            element={<About leaders={this.state.leaders} />}
          />
          <Route path="/home" element={<HomePage />} />
          <Route path="/menu" element={<Menu dishes={this.state.dishes} />} />
          <Route path="/menu/:dishId" element={<DishWithId />} />
        </Routes>
        <Footer />
      </div>
    );
  }
}

export default Main;
