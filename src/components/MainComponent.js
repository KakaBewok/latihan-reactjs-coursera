import { Routes, Route } from 'react-router-dom';
import React, { Component } from 'react';
import Header from './HeaderComponent';
import Menu from './MenuComponent';
import Home from './HomeComponent';
import Footer from './FooterComponent';
import { DISHES } from '../shared/dishes';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES,
    };
  }

  render() {
    // const HomePage = () => {
    //   return <Home />;
    // };

    return (
      <div>
        <Header />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/menu" element={<Menu dishes={this.state.dishes} />} />
        </Routes>
        <Footer />
      </div>
    );
  }
}

export default Main;
