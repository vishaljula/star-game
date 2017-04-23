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
    selectedNumbers: [],
    numberOfStars: 1 + Math.floor(Math.random()*9)
  };

  selectNumber = (clickedNumber) => {
    if(this.state.selectedNumbers.indexOf(clickedNumber) >=0) {return;}
    this.setState(prevState => ({
      selectedNumbers: prevState.selectedNumbers.concat(clickedNumber)
    }));
  }

  cancelSelectedNumber = (clickedNumber) => {
    this.setState(prevState => ({
      selectedNumbers: prevState.selectedNumbers.filter(number => number !== clickedNumber)
    }));
  }
  render() {
    const { numberOfStars, selectedNumbers } = this.state;
    return (
      <div className="container">
        <h1>Stars Games</h1>
          <div className="row align-to-center">
            <Stars numberOfStars={numberOfStars}/>
            <Button
              selectedNumbers={selectedNumbers}
            />
            <Answers
              selectedNumbers={selectedNumbers}
              cancelSelectedNumber={this.cancelSelectedNumber}
            />
          </div>
          <Numbers
            selectedNumbers={selectedNumbers}
            selectNumber={this.selectNumber}
          />
      </div>
    );
  }
}

const Stars = (props) => {
  let stars = [];
  for (let i = 0; i < props.numberOfStars; i++) {
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
      <button
        disabled={props.selectedNumbers.length === 0}
        className="btn"
      >
        =
      </button>
    </div>
  );
}

const Answers = (props) => {
  return (
    <div className="Answers col-5">
      {props.selectedNumbers.map((number, i) =>
          <span
            key={i}
            onClick={() => props.cancelSelectedNumber(number)}
          >
            {number}
          </span>
      )}
    </div>
  );
}

const Numbers = (props) => {
  const numberClassName = (number) => {
    if(props.selectedNumbers.indexOf(number) >=0) {
      return 'selected';
    }
  }
  return (
    <div className="card text-center">
      <div>
        {Numbers.list.map((number, i) =>
          <span
            key={i}
            className={numberClassName(number)}
            onClick={() => props.selectNumber(number)}
          >
            {number}
          </span>
        )}
      </div>
    </div>
  );
}

Numbers.list = [1,2,3,4,5,6,7,8,9];

export default App;
