import React, {Component} from 'react';

import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHamdler";
const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 0.4,
  cheese: 1.3,
  meat: 0.6
};

class BurgerBuilder extends Component {

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     ....
  //   }
  // }

  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false
  };

  componentDidMount() {
    axios.get('https://leafy-caster-169415.firebaseio.com/ingredients.json')
      .then(response => {
        this.setState({
          ingredients: response.data
        })
      })
      .catch(error => {
        this.setState({
          error: true
        })
      });
  }

  UpdatedPurchaseState = (ingredients) =>  {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      },0);
    this.setState({
      purchasable: sum > 0,
    })
  };

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
              ...this.state.ingredients
           };
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngredients
     });
    this.UpdatedPurchaseState(updatedIngredients);
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
    const priceDeduction = INGREDIENT_PRICES[type],
      oldPrice = this.state.totalPrice,
      newPrice = oldPrice - priceDeduction;
    this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngredients
    });
    this.UpdatedPurchaseState(updatedIngredients);
  };

  purchaseHandler = () => {
    this.setState({
      purchasing: true
    });
  };

  purchaseCancelHandler = () => {
    this.setState({
      purchasing: false
    });
  };

  purchaseContinueHandler = () => {
    //alert('You continue');
    this.setState({
      loading: true
    });
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: 'Kim',
        address: {
          street: 'Test street',
          zipCode: '10200',
          country: 'Ukraine'
        },
        email: 'test@test.com'
      },
      deliveryMethod: 'fastest'
    };
    
    axios.post('/orders.json',order)
      .then(response => {
        this.setState({
          loading: false,
          purchasing: false
        })
      })
      .catch(error => {
        this.setState({
          loading: false,
          purchasing: false
        })
      });
  };



  render () {

    const disableInfo = {
      ...this.state.ingredients
    };

    for ( let key in disableInfo ) {
      disableInfo[key] = disableInfo[key] <= 0
    }

    let orderSummary = null;

    let burger = this.state.error ? <p>Ingredients can`t be loaded!!!</p> : <Spinner/>;

    if(this.state.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients = {this.state.ingredients}/>
          <BuildControls
            ingredientAdded = {this.addIngredientHandler}
            ingredientRemoved = {this.removeIngredientHandler}
            disabled = {disableInfo}
            price={this.state.totalPrice}
            purchasable={this.state.purchasable}
            ordered = {this.purchaseHandler}/>
        </Aux>
      );
      orderSummary = <OrderSummary
        price={this.state.totalPrice}
        purchaseCanceled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler}
        ingredients={this.state.ingredients}/>;
    }

    if (this.state.loading) {
      orderSummary = <Spinner />
    }

    // {salad : true, meat : false ... }

    return (
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);