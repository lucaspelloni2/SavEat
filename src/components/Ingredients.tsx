import React from 'react';
import {MyView, TextBold} from '../layout/Layout';
import {View} from 'react-native';
import {Ingredient} from './Ingredient';
import {RecipeEvaluationPossibilityIngredient} from '../helpers/backend-types';
import SmoothPicker from 'react-native-smooth-picker';

type Props = {
  ingredients: RecipeEvaluationPossibilityIngredient[];
};

export const Ingredients = ({ingredients}: Props) => {
  return ingredients.map(ingredient => {
    if (!ingredient.products.length) {
      return <TextBold>No ingredients</TextBold>;
    }
    return (
      <View key={ingredient.products[0].product.name}>
        <Ingredient ingredient={ingredient.products[0].product} />
      </View>
    );
  });
};
