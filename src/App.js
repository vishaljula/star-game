import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

var possibleCombinationSum = function(arr, n) {
  if (arr.indexOf(n) >= 0) { return true; }
  if (arr[0] > n) { return false; }
  if (arr[arr.length - 1] > n) {
    arr.pop();
    return possibleCombinationSum(arr, n);
  }
  var listSize = arr.length, combinationsCount = (1 << listSize)
  for (var i = 1; i < combinationsCount ; i++ ) {
    var combinationSum = 0;
    for (var j=0 ; j < listSize ; j++) {
      if (i & (1 << j)) { combinationSum += arr[j]; }
    }
    if (n === combinationSum) { return true; }
  }
  return false;
};

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
  static initialState = () => ({
    selectedNumbers: [],
    numberOfStars: 1 + Math.floor(Math.random()*9),
    usedNumbers: [],
    answerIsCorrect: null,
    redrawsRemaining: 5,
    doneStatus: null
  });

  state = Game.initialState();

  resetGame = () => this.setState(Game.initialState());

  selectNumber = (clickedNumber) => {
    if(this.state.selectedNumbers.indexOf(clickedNumber) >=0 || this.state.usedNumbers.indexOf(clickedNumber) >=0) {return;}
    this.setState(prevState => ({
      selectedNumbers: prevState.selectedNumbers.concat(clickedNumber),
      answerIsCorrect: null
    }));
  };

  cancelSelectedNumber = (clickedNumber) => {
    this.setState(prevState => ({
      selectedNumbers: prevState.selectedNumbers.filter(number => number !== clickedNumber),
      answerIsCorrect: null
    }));
  };

  checkAnswer = () => {
    this.setState(prevState => ({
      answerIsCorrect: prevState.numberOfStars ===
        prevState.selectedNumbers.reduce((acc, n) => acc + n, 0)
    }));
  };

  accpetAnswer = () => {
    this.setState(prevState => ({
      usedNumbers: prevState.usedNumbers.concat(prevState.selectedNumbers),
      selectedNumbers: [],
      answerIsCorrect: null,
      numberOfStars: 1 + Math.floor(Math.random()*9)
    }), this.updateDoneStatus);
  };

  redraw = () => {
    if(this.state.redrawsRemaining === 0) {return;}
      this.setState(prevState => ({
        numberOfStars: 1 + Math.floor(Math.random()*9),
        answerIsCorrect: null,
        selectedNumbers: [],
        redrawsRemaining: prevState.redrawsRemaining - 1
      }), this.updateDoneStatus);
  };

  possibleSolutions = ({numberOfStars, usedNumbers}) => {
    const possibleNumbers = [1,2,3,4,5,6,7,8,9].filter(number =>
      usedNumbers.indexOf(number) === -1
    );

    return possibleCombinationSum(possibleNumbers, numberOfStars);
  }

  updateDoneStatus = () => {
    this.setState(prevState => {
      if(prevState.usedNumbers.length === 9) {
        return {doneStatus: 'Well Done!'}
      }
      if(prevState.redrawsRemaining === 0 && !this.possibleSolutions(prevState)) {
        return {doneStatus: 'Game Over!'}
      }
    })
  };

  render() {
    const { numberOfStars, selectedNumbers, answerIsCorrect, usedNumbers, redrawsRemaining, doneStatus } = this.state;
    return (
      <div className="container">
        <h1>Stars Games</h1>
          <div className="row align-to-center">
            <Stars numberOfStars={numberOfStars}/>
            <Button
              selectedNumbers={selectedNumbers}
              checkAnswer={this.checkAnswer}
              answerIsCorrect={answerIsCorrect}
              accpetAnswer={this.accpetAnswer}
              redraw={this.redraw}
              redrawsRemaining={redrawsRemaining}
            />
            <Answers
              selectedNumbers={selectedNumbers}
              cancelSelectedNumber={this.cancelSelectedNumber}
            />
          </div>
          <br />
          {doneStatus ? <DoneFrame doneStatus={doneStatus} resetGame={this.resetGame}/> :
            <Numbers
              selectedNumbers={selectedNumbers}
              selectNumber={this.selectNumber}
              usedNumbers={usedNumbers}
            />
          }
      </div>
    );
  }
}

const DoneFrame = (props) => {
  return (
    <div>
      <h2>{props.doneStatus}</h2>
      <button className="btn btn-secondary" onClick={props.resetGame}>
        Play Again!
      </button>
    </div>
  );
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
  let button;
  switch (props.answerIsCorrect) {
    case true:
      button =
        <button className="btn btn-success" onClick={props.accpetAnswer}>
          <i className="fa fa-check"></i>
        </button>
      break;
    case false:
      button =
        <button className="btn btn-danger">
          <i className="fa fa-times"></i>
        </button>
      break;
    default:
      button =
        <button
          disabled={props.selectedNumbers.length === 0}
          className="btn"
          onClick={props.checkAnswer}>
          =
        </button>
      break;

  }
  return (
    <div className="col-2 text-center">
      {button}
      <br />
      <br />
      <button
        className="btn btn-warning text-center"
        onClick={props.redraw}
        disabled={props.redrawsRemaining===0}
      >
        <i className="fa fa-refresh"></i>{props.redrawsRemaining}
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
    if(props.usedNumbers.indexOf(number) >=0) {
      return 'used';
    }

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
