import React from 'react';
import styled from '@emotion/styled';
import _ from 'lodash';
import { PropTypes } from 'prop-types';
import Colors from '../../utils/colors';

class Card extends React.Component {
  renderGauge = ({ key, title = '', value = 0, min = 0, max = 100 }) => {
    return (
      <div className="gauge-wrap">
        <label htmlFor="">{title}</label>
        <Gauge value={value}/>
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
    // console.log('weaknesses', weaknesses);
    const calDamageValue = _.reduce(attacks, (result, { damage }) => {
      // console.log('damage', damage);
      return result += damage ? parseInt(damage) : 0
    }, 0);

    const calHappinessValue = ((calHpValue / 10) + (calDamageValue /10 ) + 10 - (calWeakValue)) / 5;
    // console.log('calHpValue', id, calHpValue, hp);
    // console.log('calStrValue', id, calStrValue);
    // console.log('calWeakValue', id, calWeakValue);
    // console.log('calDamageValue', id, calDamageValue);
    // console.log('calHappinessValue', id, calHappinessValue);
    // console.log('cal level : ', id, calHpValue, calDamageValue, calWeakValue, calHappinessValue);
    // console.log('-------');
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
            <div className="btn-close" onClick={this.handleRemoveCardFromMyDex}>
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
  flex-basis: calc(50% - 10px);
  margin-right: 5px;
  margin-left: 5px;
  justify-content: space-between;
  background-color: ${Colors.cardBackground};
  margin-bottom: 15px;
  box-shadow: 2px 2px ${Colors.cardBoxShadow};
  max-height: 232px;
  &.full {
    flex-basis: 100%;
  }
  .card-wrap-image {
    flex-basis: 150px;
    img {
      max-width: 100%;
    }
  }
  .card-name {
    font-family: Gaegu;
    font-size: 30px;
  }
  .card-wrap-detail {
    flex: 1 0 50%;
    padding: 10px;

  }
  .card-wrap-control {
    padding-right: 10px;
    padding-top: 10px;
    opacity: 0;
    visibility: hidden;
    transition: all .4s ease-in-out;
    > div {
      outline: none;
      cursor: pointer;
      color: ${Colors.colorAddButton};
    }
    .btn-close {
      font-size: 24px;
    }
  }
  .gauge-wrap {
    display: flex;
    label {
      flex-basis: 80px;
    }
  }
  &:hover {
    box-shadow: 2px 2px ${Colors.cardBoxShadowHover};
    .card-wrap-control {
      opacity: 1;
      visibility: visible;
    }
  }
`;

const Gauge = styled.div`
  position: relative;
  width: 100%;
  height: 20px;
  background-color: ${Colors.levelTubeBackground};
  border-radius: 30px;
  box-shadow: inset 0 0 1px ${Colors.levelTubeBoxShadow};
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: ${({ value }) => _.clamp(value, 0, 100)}%;
    background-color: ${Colors.levelTubeValueBackground};
    border-radius: 30px;
  }
`;