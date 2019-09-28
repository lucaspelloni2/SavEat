import React, {useEffect, useState} from 'react';
import {NavigationScreenProp, withNavigation} from 'react-navigation';
import Swiper from 'react-native-swiper';
import FullscreenBackground from '../layout/FullscreenBackground';
import apiRequest from '../helpers/api-request';
import {View, ActivityIndicator} from 'react-native';
import {RecipeEvaluation} from '../helpers/backend-types';
import Possibility from '../components/Possibility';
import RecipeDetail from '../components/RecipeDetail';
import styled from 'styled-components';

type Props = {
  navigation: NavigationScreenProp<any, any>;
};

const CardHolder = styled(View)`
  flex: 1;
  padding-top: 80px;
  padding-left: 16px;
  padding-right: 16px;
`;

export default withNavigation((props: Props) => {
  const [recipeEvaluation, setRecipeEvaluation] = useState<RecipeEvaluation>(
    null,
  );
  // like componentDidMounts
  useEffect(() => {
    apiRequest(`/recipes/${props.navigation.getParam('id')}`)
      .then((response: RecipeEvaluation) => {
        setRecipeEvaluation(response);
      })
      .catch(err => {
        alert(err);
      });
  }, []);
  const renderContent = () => {
    const children = [
      <CardHolder key="recipe">
        <RecipeDetail
          ingredientEvaluation={recipeEvaluation.ingredientEvaluation}
          recipe={recipeEvaluation.recipe}
        />
      </CardHolder>,
    ];
    const possibilities = recipeEvaluation.possibilities.map(p => {
      return (
        <CardHolder key={p.store}>
          <Possibility possibility={p} />
        </CardHolder>
      );
    });
    return [children, ...possibilities];
  };
  return (
    <View style={{flex: 1}}>
      <FullscreenBackground />
      {recipeEvaluation ? (
        <Swiper loop={false}>{renderContent()}</Swiper>
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator />
        </View>
      )}
    </View>
  );
});
