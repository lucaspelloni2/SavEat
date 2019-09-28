import React, {useState} from 'react';
import {Text, View, Image} from 'react-native';
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
import IngredientEvaluationView from './IngredientEvaluationView';
import {getAlphaColor} from '../layout/AlphaColor';
import {__COLORS} from '../layout/Colors';
import {TouchableOpacity} from 'react-native-gesture-handler';

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

const Button = styled(TouchableOpacity)`
  background-color: ${__COLORS.SECONDARY};
  margin-left: 16px;
  margin-right: 16px;
  padding-top: 18px;
  padding-bottom: 16px;
  margin-top: 18px;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
`;

const ButtonLabel = styled(Text)`
  color: white;
  font-family: ${__FONT_FAMILIES.BOLD};
`;

export default (props: {
  recipe: Recipe;
  ingredientEvaluation: IngredientEvaluation[];
  onGoToShopping: () => void;
}) => {
  const [people, setPeople] = useState<number>(2);
  return (
    <Card>
      <View style={{height: 30}} />
      <Title style={{fontFamily: __FONT_FAMILIES.EXTRA_BOLD}}>
        {props.recipe.name}
      </Title>
      <View style={{height: 10}} />
      <CoolDots />
      <View style={{height: 15}} />
      <Image source={{uri: props.recipe.image}} style={{height: 200}} />
      <Button onPress={() => props.onGoToShopping()}>
        <ButtonLabel>Show best shopping options</ButtonLabel>
      </Button>

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
          borderColor: getAlphaColor(0.1, __COLORS.TEARTIARY),
          borderWidth: 1,
        }}
      />
    </Card>
  );
};
