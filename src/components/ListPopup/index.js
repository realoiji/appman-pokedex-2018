import React from 'react';
import styled from '@emotion/styled';
import { connect } from 'react-redux';
import _ from 'lodash';
import Fuse from 'fuse.js';

import { addCardToMyDex } from '../../actions/action';

import { Card } from '../index';
import Colors from '../../utils/colors';

class ListPopup extends React.Component {
  state = {
    searchValue: '',
  }
  handleAddCardToMyDex = (id) => {
    const { dispatch, cards } = this.props;
    const choosedCard = _.find(cards, { id: id });
    if (choosedCard) {
      dispatch(addCardToMyDex(choosedCard));
    }
  }

  handleSearch = (event) => {
    this.setState({
      searchValue: event.target.value
    });
  }

  handleClosePopup = () => {
    const { onClose } = this.props;
    onClose();
  }

  render() {
    const { cards, myDex, show } = this.props;
    const { searchValue } = this.state;
    const options = {
      shouldSort: true,
      threshold: 1,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: [
        "name",
      ]
    };
    const cardlists = _.differenceBy(cards, myDex, 'id');
    const fuse = new Fuse(cardlists, options);
    const searchResults = (searchValue) ? fuse.search(searchValue) : cardlists;

    return (
      <Container className={show ? 'show' : ''}>
        <div className="bg-popup" onClick={this.handleClosePopup}/>
        <div className="list-popup-wrapper">
          <div className="search-container">
            <input type="text" placeholder="Find pokemon" onChange={this.handleSearch}/>
            <i className="fa fa-search" aria-hidden="true"></i>
          </div>
          <div className="card-container">
            {_.map(searchResults, (card) => {
              return <Card key={card.id} {...card} full addCardToMyDex={this.handleAddCardToMyDex} />
            })}
          </div>
        </div>
      </Container>
    );
  }
}

const mapStateToProps = ({ cards, myDex }) => {
  return {
    cards,
    myDex
  };
};

export default connect(mapStateToProps)(ListPopup);

const Container = styled.div`
  label: list-popup-container;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,.6);
  opacity: 0;
  visibility: hidden;
  transition: all .4s ease-in-out;
  &.show {
    opacity: 1;
    visibility: visible;
  }
  .bg-popup {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  .list-popup-wrapper {
    background-color: ${Colors.modalCotentBackground};
    position: absolute;
    top: 40px;
    left: 40px;
    right: 40px;
    bottom: 40px;
    overflow: scroll;
  }
  .card-container {
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
}
  }
  .search-container {
    position: relative;
    input {
      width: 98%;
      font-family: Gaegu;
      outline: none;
      font-size: 24px;
      margin: 10px auto;
      display: block;
      border: 2px solid ${Colors.searchBoxBorder};
    }
    i {
      position: absolute;
      top: 50%;
      right: 10px;
      transform: translateY(-50%);
      color: ${Colors.colorAddButton}
    }
  }
`;