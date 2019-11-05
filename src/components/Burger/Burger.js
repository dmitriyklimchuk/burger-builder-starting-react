import React from 'react';

import classes from './Burger.css'
import BurgerIngredient from "./BurgerIngredien/BurgerIngredient";

const burger = (props) => {
  const transformedIngredients = Object.keys(props.ingredients).map(function(igKey) {
      return [...Array(props.ingredients[igKey])].map(function( _, i) {
        return <BurgerIngredient key={igKey + i} type={igKey}/>;
      });
    });
  return (
    <div className={classes.Burger}>
      <BurgerIngredient type='bread-top'/>
      { transformedIngredients }
      <BurgerIngredient type='bread-bottom'/>
    </div>
  );
};

export default burger;