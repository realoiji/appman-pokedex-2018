import React from 'react';
import styled from '@emotion/styled';
import { connect } from 'react-redux';
import _ from 'lodash';

import { addCardToMyDex } from '../../actions/action';

import { Card } from '../index';

class ListPopup extends React.Component {
  handleAddCardToMyDex = (id) => {
    const { dispatch, cards } = this.props;
    const choosedCard = _.find(cards, { id: id });
    console.log('choosedCard', choosedCard);
    if (choosedCard) {
      dispatch(addCardToMyDex(choosedCard));
    }
  }
  render() {
    const { cards, myDex } = this.props;
    return (
      <Container onClick={() => console.log('clickkkkkk')}>
        <div className="list-popup-wrapper">
          <div>
            <input type="text" placeholder="Find pokemon" />
          </div>
          <div className="card-container">
            {_.map(cards, (card) => {
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
  .list-popup-wrapper {
    background-color: white;
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
}
  }
  .card-item {

  }
`;