import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import Menu from './components/MenuComponent';
import { DISHES } from './shared/dishes';

// function greetings() {
//   return (
//     <div>
//       <Navbar className="my-3" color="primary" dark>
//         <div className="container">
//           <NavbarBrand href="/">Noprizal</NavbarBrand>
//         </div>
//       </Navbar>
//       <Menu dishes={this.state.dishes} />
//     </div>
//   );
// }

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES,
    };
  }
  render() {
    return (
      <div>
        <Navbar className="my-3" color="primary" dark>
          <div className="container">
            <NavbarBrand href="/">Noprizal</NavbarBrand>
          </div>
        </Navbar>
        <Menu dishes={this.state.dishes} />
      </div>
    );
  }
}

export default App;
