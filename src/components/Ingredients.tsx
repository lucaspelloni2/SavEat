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
import {View} from 'react-native';
import * as React from 'react';
import {__WINDOW_WIDTH, SPACING, TextBold} from '../layout/Layout';
import {RecipeEvaluationPossibilityIngredient} from '../helpers/backend-types';
import {Ingredient} from './Ingredient';

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
        style={{backgroundColor: 'red', width: 300, height: 200}}>
        <Ingredient ingredient={i.product} />
      </View>
    );
  }

  render() {
    return (
      <Carousel
        layout={'stack'}
        layoutCardOffset={`18`}
        ref={c => {
          this._carousel = c;
        }}
        data={this.props.ingredients}
        renderItem={this._renderItem}
        sliderWidth={__WINDOW_WIDTH}
        itemWidth={__WINDOW_WIDTH - SPACING * 10}
      />
    );
  }
}
