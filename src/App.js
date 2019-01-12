import React, { Component } from 'react';
import { connect } from 'react-redux';

import { initApp } from './actions/action';

import { MyDex, ListPopup } from './components';
import './App.css';

const COLORS = {
  Psychic: "#f8a5c2",
  Fighting: "#f0932b",
  Fairy: "#c44569",
  Normal: "#f6e58d",
  Grass: "#badc58",
  Metal: "#95afc0",
  Water: "#3dc1d3",
  Lightning: "#f9ca24",
  Darkness: "#574b90",
  Colorless: "#FFF",
  Fire: "#eb4d4b"
}

class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    // initApp();
    dispatch(initApp());
  }
  render() {
    return (
      <div className="App">
        <MyDex />
        <ListPopup />
      </div>
    )
  }
}

const mapStateToProps = ({ cards }) => {
  return {
    cards
  };
};

export default connect(mapStateToProps)(App);
