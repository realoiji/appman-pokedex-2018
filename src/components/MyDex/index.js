import React from 'react';
import styled from '@emotion/styled';
import { connect } from 'react-redux';
import _ from 'lodash';

import { Card } from '../index';
import { removeCardFromMyDex } from '../../actions/action';

class MyDex extends React.Component {
  handleRemoveCardFromMyDex = (id) => {
    const { dispatch, myDex } = this.props;
    dispatch(removeCardFromMyDex(id));
    // const choosedRemoveCard = _.find(myDex, { id: id });
    // if (choosedRemoveCard) {
    // }
  }
  render() {
    const { myDex } = this.props;
    // console.log('cards', cards);
    // console.log('myDex', myDex);
    return (
      <Container>
        <div className="header">My PokeDex</div>
        <div className="card-container">
          {_.map(myDex, (card) => {
            return <Card key={card.id} {...card} removeCardFromMyDex={this.handleRemoveCardFromMyDex} />
          })}
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

export default connect(mapStateToProps)(MyDex);

const Container = styled.div`
  label: mydex-container;
  .header {
    font-family: Atma;
    font-weight: 700;
    font-size: 30px;
    ${'' /* position: absolute;
    top: 0;
    left: 0;
    right: 0; */}
    text-align: center;
    padding: 10px;
    background-color: white;
  }
  .card-container {
    overflow: scroll;
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    box-sizing: border-box;
    height: calc(100vh - 28px - 60px - 120px);
  }
  .card-item {

  }
`;
