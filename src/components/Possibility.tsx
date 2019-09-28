import React from 'react';
import {RecipeEvaluationPossibility} from '../helpers/backend-types';
import styled from 'styled-components';
import {View, Text, Image} from 'react-native';
import Card from './Card';

export default (props: {possibility: RecipeEvaluationPossibility}) => {
  return (
    <Card>
      <Text>{props.possibility.store}</Text>

      {props.possibility.ingredients.map(ingredient => {
        if (!ingredient.products.length) {
          // TODO: Show empty view
          return null;
        }
        return (
          <View key={ingredient.products[0].name}>
            <Image
              style={{height: 40, width: 40}}
              source={{
                uri: ingredient.products[0].image,
              }}
            />
            <Text>{ingredient.products[0].food}</Text>
            <Text>{ingredient.products[0].name}</Text>
            <Text>{ingredient.products[0].origin}</Text>
            <Text>{ingredient.products[0].price / 100} Fr</Text>
          </View>
        );
      })}
    </Card>
  );
};
