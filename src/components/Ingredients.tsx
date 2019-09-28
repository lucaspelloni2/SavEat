/*import React, {useRef} from 'react';
import {MyView, TextBold} from '../layout/Layout';
import {View} from 'react-native';
import {Ingredient} from './Ingredient';
import {RecipeEvaluationPossibilityIngredient} from '../helpers/backend-types';
import SmoothPicker from 'react-native-smooth-picker';
import Swiper from 'react-native-swiper';
import RecipeDetail from './RecipeDetail';
import Possibility from './Possibility';

type Props = {
  ingredients: RecipeEvaluationPossibilityIngredient[];
};

const renderContent = (
  ingredients: RecipeEvaluationPossibilityIngredient[],
) => {
  const ing = ingredients.map(i => {
    if (!i.products.length) {
      return <TextBold>No ingredients</TextBold>;
    }
    return <Ingredient ingredient={i.products[0].product} />;
  });
  return [ing];
};
export const Ingredients = ({ingredients}: Props) => {
  const swiperRef = useRef<Swiper>();
  return (
    <Swiper ref={swiperRef} loop={true} showsButtons={true}>
      {renderContent(ingredients)}
    </Swiper>
  );
  /!*return ingredients.map(ingredient => {
    if (!ingredient.products.length) {
      return <TextBold>No ingredients</TextBold>;
    }
    return (
      <View key={ingredient.products[0].product.name}>
        <Ingredient ingredient={ingredient.products[0].product} />
      </View>
    );
  });*!/
};*/

import Carousel from 'react-native-snap-carousel';
import {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import * as React from 'react';
import {__WINDOW_WIDTH, SPACING, TextBold} from '../layout/Layout';
import {RecipeEvaluationPossibilityIngredient} from '../helpers/backend-types';
import {Ingredient} from './Ingredient';
import {__GRAY_COLORS} from '../layout/Colors';

type Props = {
  ingredients: RecipeEvaluationPossibilityIngredient[];
};

export class Ingredients extends Component<Props, {}> {
  state = {
    entries: [{title: '1ajsfjoajsf'}, {title: '2ajosfjoajof'}],
  };
  private _carousel: any;

  constructor(props) {
    super(props);
    this._carousel = React.createRef();
  }

  _renderItem({item, index}) {
    const i = item.products[0];
    if (!item.products.length) {
      return <TextBold>No ingredients</TextBold>;
    }
    return (
      <View
        key={index}
        style={[
          {
            width: 160,
            marginTop: 10,
            height: 200,
            backgroundColor: 'transparent',

            borderRadius: 10,
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 10,
          },
        ]}>
        <Ingredient ingredient={i} />
      </View>
    );
  }

  render() {
    return (
      <Carousel
        layout={'default'}
        ref={c => {
          this._carousel = c;
        }}
        data={this.props.ingredients}
        renderItem={this._renderItem}
        sliderWidth={__WINDOW_WIDTH}
        itemWidth={160}
      />
    );
  }
}
