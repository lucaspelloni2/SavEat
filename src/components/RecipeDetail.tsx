import React, {useState} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import Card from './Card';
import {
  Recipe,
  RecipeIngredient,
  IngredientEvaluation,
} from '../helpers/backend-types';
import {__FONT_FAMILIES} from '../layout/Fonts';
import styled from 'styled-components';
import CoolDots from './CoolDots';

export const renderFoodName = (ingredient: RecipeIngredient): string => {
  if (ingredient.labelOverride) {
    return ingredient.labelOverride;
  }
  return ingredient.food;
};

const Title = styled(Text)`
  text-align: center;
  font-size: 24px;
`;

export default (props: {
  recipe: Recipe;
  ingredientEvaluation: IngredientEvaluation[];
}) => {
  const [people, setPeople] = useState<number>(2);
  return (
    <Card style={{paddingTop: 30}}>
      <Title style={{fontFamily: __FONT_FAMILIES.EXTRA_BOLD}}>
        {props.recipe.name}
      </Title>
      <View style={{height: 10}} />
      <CoolDots />
      <Text>
        For {people} {people === 1 ? 'person' : 'people'}
      </Text>
      <TouchableOpacity
        disabled={people === 1}
        onPress={() => {
          setPeople(p => p - 1);
        }}>
        <Text>Decrease</Text>
      </TouchableOpacity>
      <TouchableOpacity
        disabled={people === 15}
        onPress={() => {
          setPeople(p => p + 1);
        }}>
        <Text>Increase</Text>
      </TouchableOpacity>
      {props.ingredientEvaluation.map(i => {
        return (
          <View key={i.label}>
            <Text>
              {i.perPerson * people}
              {i.unit} {i.label}
            </Text>
            <Text>{i.averageCarbonEmission * i.perPerson * people}</Text>
          </View>
        );
      })}
    </Card>
  );
};
