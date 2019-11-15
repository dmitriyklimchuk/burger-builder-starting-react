import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from "./containers/BurdgerBuilder/BurgerBuilder";

class App extends Component {

  // state = {
  //   show: true,
  // };
  //
  // componentDidMount() {
  //   setTimeout(() => {
  //     this.setState({
  //       show: false
  //     })
  //   }, 5000)
  // }

  render() {
    return (
      <div>
        <Layout>
          <BurgerBuilder/>
          {/*{ this.state.show ? <BurgerBuilder/> : null }*/}
        </Layout>
      </div>
    );
  }
}

export default App;
