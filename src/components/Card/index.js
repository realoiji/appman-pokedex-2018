import React from 'react';
import styled from '@emotion/styled';
import _ from 'lodash';
import { PropTypes } from 'prop-types';

class Card extends React.Component {
  renderGauge = ({ key, title = '', value = 0, min = 0, max = 100 }) => {
    return (
      <div className="gauge-wrap">
        <label htmlFor="">{title}</label>
        <input type="range" name={key} min={min} max={max} value={value} />
      </div>
    );
  }

  handleAddCardToMyDex = () => {
    const { id, addCardToMyDex } = this.props;
    addCardToMyDex(id);
  }

  handleRemoveCardFromMyDex = () => {
    const { id, removeCardFromMyDex } = this.props;
    removeCardFromMyDex(id);
  }

  render() {
    const { name, imageUrl, hp = 0, attacks = [], weaknesses = [], full = false, id } = this.props;
    
    const calHpValue = _.isNaN(Number(hp)) ? 0 : _.clamp(hp, 0, 100);
    const calStrValue = (attacks.length > 0 && attacks.length <= 2) ? attacks.length * 50 : 0;
    const calWeakValue = (weaknesses.length === 1) ? 100 : 0;
    console.log('calHpValue', id, calHpValue, hp);
    console.log('calStrValue', id, calStrValue);
    console.log('calWeakValue', id, calWeakValue);
    return (
      <Container className={(full) ? 'full' : ''}>
        <div className="card-wrap-image">
          <img src={imageUrl} alt=""/>
        </div>
        <div className="card-wrap-detail">
          <div className="card-name">{name}</div>
          {this.renderGauge({ key: 'hp', title: 'HP', value: calHpValue })}
          {this.renderGauge({ key: 'str', title: 'STR', value: calStrValue })}
          {this.renderGauge({ key: 'weak', title: 'WEAK', value: calWeakValue })}
        </div>
        <div className="card-wrap-control">
          { !full && (
            <div onClick={this.handleRemoveCardFromMyDex}>
              x
            </div>
          )}
          { full && (
            <div onClick={this.handleAddCardToMyDex}>
              add
            </div>
          )
          }
        </div>
      </Container>
    );
  }
}

export default Card;

const Container = styled.div`
  label: card-item;
  display: flex;
  flex-basis: 50%;
  &.full {
    flex-basis: 100%;
  }
  .card-wrap-image {
    flex-basis: 50%;
    img {
      max-width: 100%;
    }
  }
  .card-wrap-detail {
    flex-basis: 50%;
  }
  .card-name {

  }
`;