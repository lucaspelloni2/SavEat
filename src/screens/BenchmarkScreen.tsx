import React, {useEffect, useState, useRef} from 'react';
import {NavigationScreenProp, withNavigation} from 'react-navigation';
import Swiper from 'react-native-swiper';
import FullscreenBackground from '../layout/FullscreenBackground';
import apiRequest from '../helpers/api-request';
import {View, ActivityIndicator, Dimensions} from 'react-native';
import {RecipeEvaluation} from '../helpers/backend-types';
import Possibility from '../components/Possibility';
import RecipeDetail from '../components/RecipeDetail';
import styled from 'styled-components';
import BackButton from '../layout/BackButton';
import {TextBold} from '../layout/Layout';
import {Comparison} from '../components/Comparison';

type Props = {
  navigation: NavigationScreenProp<any, any>;
  onPressButton: () => void;
};

const CardHolder = styled(View)`
  flex: 1;
  padding-top: 100px;
`;

const imageWidth = Dimensions.get('window').width - 32;

export default withNavigation((props: Props) => {
  const [recipeEvaluation, setRecipeEvaluation] = useState<RecipeEvaluation>(
    null,
  );
  const swiperRef = useRef<Swiper>();
  // like componentDidMounts
  useEffect(() => {
    apiRequest(
      `/recipes/${props.navigation.getParam('id')}?width=${imageWidth}`,
    )
      .then((response: RecipeEvaluation) => {
        setRecipeEvaluation(response);
      })
      .catch(err => {
        alert(err);
      });
  }, []); // eslint-disable-line
  const renderContent = () => {
    const children = [
      <CardHolder key="recipe">
        <RecipeDetail
          onGoToShopping={() => {
            // @ts-ignore
            swiperRef.current.scrollBy(1);
          }}
          ingredientEvaluation={recipeEvaluation.ingredientEvaluation}
          recipe={recipeEvaluation.recipe}
        />
      </CardHolder>,
    ];
    const possibilities = recipeEvaluation.possibilities.map(p => {
      return (
        <CardHolder key={p.store}>
          <Possibility possibility={p} recipe={recipeEvaluation.recipe} />
        </CardHolder>
      );
    });
    const comparison = [
      <CardHolder key={'comparison'}>
        <Comparison recipe={recipeEvaluation.recipe} possibilities={recipeEvaluation.possibilities} />
      </CardHolder>,
    ];
    return [children, ...possibilities, ...comparison];
  };
  return (
    <View style={{flex: 1}}>
      <FullscreenBackground />
      <BackButton />
      {recipeEvaluation ? (
        <Swiper ref={swiperRef} loop={false}>
          {renderContent()}
        </Swiper>
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator />
        </View>
      )}
    </View>
  );
});
