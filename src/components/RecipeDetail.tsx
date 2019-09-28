import React, {useState} from 'react';
import {Text, View} from 'react-native';
import Card from './Card';
import {
  Recipe,
  RecipeIngredient,
  IngredientEvaluation,
} from '../helpers/backend-types';
import {__FONT_FAMILIES} from '../layout/Fonts';
import styled from 'styled-components';
import CoolDots from './CoolDots';
import NumberOfPeoplePicker from './NumberOfPeoplePicker';
import formatCo2 from '../layout/formatCo2';
import getCo2Hue from '../helpers/get-co2-hue';
import IngredientEvaluationView from './IngredientEvaluationView';
import {getAlphaColor} from '../layout/AlphaColor';
import {__COLORS} from '../layout/Colors';

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
      <NumberOfPeoplePicker people={people} setPeople={setPeople} />

      {props.ingredientEvaluation.map((i, idx) => {
        return (
          <IngredientEvaluationView
            grayed={idx % 2 === 0}
            key={i.label}
            people={people}
            ingredient={i}
          />
        );
      })}
      <View
        style={{
          borderColor: getAlphaColor(0.3, __COLORS.TEARTIARY),
          borderWidth: 1,
        }}
      />
    </Card>
  );
};
