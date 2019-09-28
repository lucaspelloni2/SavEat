import React, {useEffect, useState, useRef} from 'react';
import {NavigationScreenProp, withNavigation} from 'react-navigation';
import Swiper from 'react-native-swiper';
import FullscreenBackground from '../layout/FullscreenBackground';
import apiRequest from '../helpers/api-request';
import {View, ActivityIndicator,StyleSheet, Dimensions} from 'react-native';
import {RecipeEvaluation} from '../helpers/backend-types';
import Possibility from '../components/Possibility';
import RecipeDetail from '../components/RecipeDetail';
import styled from 'styled-components';
import BackButton from '../layout/BackButton';

type Props = {
  navigation: NavigationScreenProp<any, any>;
  onPressButton: () => void;
};

const CardHolder = styled(View)`
  flex: 1;
  padding-top: 80px;
  padding-left: 16px;
  padding-right: 16px;
`;

const imageWidth = Dimensions.get('window').width - 32;

export default withNavigation((props: Props) => {
  const [recipeEvaluation, setRecipeEvaluation] = useState<RecipeEvaluation>(
    null,
  );
  const x = new Value(0);
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
          <Possibility possibility={p} />
        </CardHolder>
      );
    });
    return [children, ...possibilities];
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
