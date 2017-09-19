import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';

import Todo from './Todo';


class App extends Component {
  render() {
    return (
      <div className="app">
        <Layout>
          <Todo />
        </Layout>
      </div>
    );
  }
}

function Layout(props){
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">

          <div className="jumbotron">
            <h1>Awesome Todos</h1>
          </div>

          {props.children}

        </div>
      </div>
    </div>
  )
}

export default App;
