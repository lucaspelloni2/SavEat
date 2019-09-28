import React, {useEffect, useState} from 'react';
import {NavigationScreenProp, withNavigation} from 'react-navigation';
import Swiper from 'react-native-swiper';
import FullscreenBackground from '../layout/FullscreenBackground';
import apiRequest from '../helpers/api-request';
import {View, ActivityIndicator} from 'react-native';
import {RecipeEvaluation} from '../helpers/backend-types';
import {Text} from 'react-native-svg';

type Props = {
  navigation: NavigationScreenProp<any, any>;
};

export default withNavigation(() => {
  const [recipeEvaluation, setRecipeEvaluation] = useState<RecipeEvaluation>(
    null,
  );
  // like componentDidMounts
  useEffect(() => {
    apiRequest('/')
      .then((response: RecipeEvaluation) => {
        setRecipeEvaluation(response);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);
  return (
    <View style={{flex: 1}}>
      <FullscreenBackground />
      {recipeEvaluation ? (
        <Swiper>
          {recipeEvaluation.possibilities.map(p => {
            return (
              <View style={{flex: 1}} key={p.store}>
                <Text>{p.store}</Text>
              </View>
            );
          })}
        </Swiper>
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator />
        </View>
      )}
    </View>
  );
});
