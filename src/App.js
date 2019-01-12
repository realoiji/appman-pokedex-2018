import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from '@emotion/styled';

import { initApp } from './actions/action';

import { MyDex, ListPopup } from './components';
import Colors from './utils/colors';

class App extends Component {
  state = {
    isShow: false
  }
  componentDidMount() {
    const { dispatch } = this.props;
    // initApp();
    dispatch(initApp());
  }
  handleOpenPopup = () => {
    this.setState({ isShow: true });
  }
  handleClosePopup = () => {
    this.setState({ isShow: false });
  }
  render() {
    const { isShow } = this.state;
    return (
      <AppContainer>
        <MyDex />
        <div className="footer">
          <button onClick={this.handleOpenPopup}>+</button>
        </div>
        <ListPopup show={isShow} onClose={this.handleClosePopup} />
      </AppContainer>
    )
  }
}

const mapStateToProps = ({ cards }) => {
  return {
    cards
  };
};

export default connect(mapStateToProps)(App);

const AppContainer = styled.div`
  overflow: scroll;
  width: 100%;
  height: 100%;
  .footer {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100px;
    background-color: ${Colors.bottomBarBackground};
    text-align: center;
    box-shadow: inset 0 0 1px ${Colors.bottomBarBoxShadow};
    button {
      transform: translateY(-40%);
      background-color: ${Colors.bottomBarBackground};
      color: ${Colors.bottomBarTextColor};
      border-radius: 50%;
      border: 0;
      width: 150px;
      height: 150px;
      font-size: 100px;
      font-weight: bold;
      outline: none;
      font-family: 'Atma';
    }
  }
`;
