import React, {Component} from 'react';

import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICE = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.6
};

class BurgerBuilder extends Component {

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     ....
  //   }
  // }

  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4
  };

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type],
          updatedCount = oldCount + 1;
    const updatedIngredients = {
              ...this.state.ingredients
           };
    updatedIngredients[type] = updatedCount;
    const priceAdditional = INGREDIENT_PRICE[type],
          oldPrice = this.state.totalPrice,
          newPrice = oldPrice + priceAdditional[type];
    this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngredients
    });


  };

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceDeduction = INGREDIENT_PRICE[type],
      oldPrice = this.state.totalPrice,
      newPrice = oldPrice - priceDeduction[type];
    this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngredients
    });
  };

  render () {

    const disableInfo = {
      ...this.state.ingredients
    };

    for ( let key in disableInfo ) {
      disableInfo[key] = disableInfo[key] <= 0
    }

    // {salad : true, meat : false ... }

    return (
      <Aux>
        <Burger ingredients = {this.state.ingredients}/>
        <BuildControls
        ingredientAdded = {this.addIngredientHandler}
        ingredientRemoved = {this.removeIngredientHandler}
        disabled = {disableInfo}

        />
      </Aux>
    );
  }
}

export default BurgerBuilder