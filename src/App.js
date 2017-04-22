import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          <Game />
        </p>
      </div>
    );
  }
}

class Game extends Component {
  state = {
    selectedNumbers: []
  };
  render() {
    return (
      <div className="container">
        <h1>Stars Games</h1>
          <div className="row align-to-center">
            <Stars />
            <Button />
            <Answers />
          </div>
          <Numbers />
      </div>
    );
  }
}

const Stars = (props) => {
  const numberOfStars = 1 + Math.floor(Math.random()*9);

  let stars = [];
  for (let i = 0; i < numberOfStars; i++) {
    stars.push(<i key={i} className="fa fa-star"></i>);
  }

  return (
    <div className="col-5">
      {stars}
    </div>
  );
}

const Button = (props) => {
  return (
    <div className="col-2">
      <button>=</button>
    </div>
  );
}

const Answers = (props) => {
  return (
    <div className="Answers col-5">
      <h1>Answers</h1>
    </div>
  );
}

const Numbers = (props) => {
  return (
    <div className="card text-center">
      <div>
        {Numbers.list.map((number, i) =>
          <span key={i}>{number}</span>
        )}
      </div>
    </div>
  );
}

Numbers.list = [1,2,3,4,5,6,7,8,9];

export default App;
