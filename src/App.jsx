import React, { Component } from 'react';
import './App.css';
import * as ReactRedux from 'react-redux';
import * as Redux from 'redux';
import ReactDOM from 'react-dom';
import ReduxThunk from 'redux-thunk';

// -- Component

class AppImpl extends Component {
  render() {
    console.log("props", this.props);
    return (
      <React.Fragment>
        <h1>
          {this.props.greeting}
        </h1>
        <input type="submit" onClick={this.props.onClick}/>
      </React.Fragment>
    );
  }
}

// -- Store

async function timer(delay) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(delay);
    }, delay);
  });
}

var defaultState = {
  greeting: "Hello World!"
}

function reducerFunction(state = defaultState, action) {
  console.log("reducer", state, action);
  return state;
}

var store = Redux.createStore(reducerFunction, Redux.applyMiddleware(ReduxThunk));

function onClick() {
  return async (dispatcher) => {
    dispatcher({ type: "before timer" });
    await timer(1000);
    dispatcher({ type: "after timer" });
  }
}

// -- Connections

const App = ReactRedux.connect((state) => state, { onClick })(AppImpl);

export function run() {
  ReactDOM.render(
    <ReactRedux.Provider store={store}>
      <App />
    </ReactRedux.Provider>,
    document.getElementById('root'));
}