import React from 'react';
import styled from 'styled-components';
import {MyView, SPACING, Wrapper} from '../layout/Layout';
import {NavigationScreenProp, withNavigation} from 'react-navigation';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Menu from '../assets/icons/menu.svg';
import {__COLORS} from '../layout/Colors';
import {getAlphaColor} from '../layout/AlphaColor';
import {InputField} from '../components/InputField';
import Animated, {Easing} from 'react-native-reanimated';
import {__FONT_FAMILIES} from '../layout/Fonts';
import {useTransition} from 'react-native-redash';
import {Recipe, RecipeType} from '../components/Recipe';
import {Filters} from '../components/Filters';
import {__SCREENS} from '../navigation/Screens';
import FullscreenBackground from '../layout/FullscreenBackground';

const Container = styled(MyView)`
  flex: 1;
  margin-top: ${SPACING * 2}px;
`;

const Recipes = styled(ScrollView)`
  margin-top: ${SPACING}px;
  margin-bottom: ${SPACING * 2}px;
`;

type Props = {
  navigation: NavigationScreenProp<any, any>;
};

type State = {
  searchValue: string;
  isOnFocus: boolean;
  recipes: RecipeType[] | null;
};

const titleStyle = StyleSheet.create({
  title: {
    fontSize: 40,
    textAlign: 'center',
    color: __COLORS.TEXT_COLOR,
    fontFamily: __FONT_FAMILIES.BOLD,
  },
  subTitle: {
    fontSize: 20,
    color: getAlphaColor(0.5, __COLORS.WHITE),
    textAlign: 'center',
    marginTop: -SPACING / 2,
    fontFamily: __FONT_FAMILIES.REGULAR,
  },
  menu: {
    position: 'absolute',
    top: SPACING * 7,
  },
});

type TitleProps = {
  isOnFocus: boolean;
};

const AnimateSalt = ({isOnFocus}: TitleProps) => {
  let {not, interpolate} = Animated;
  const animatedValue = isOnFocus ? 1 : 0;
  const transition = useTransition(
    animatedValue,
    not(animatedValue),
    animatedValue,
    240,
    Easing.ease,
  );
  const inputRange = [0, 1];
  let left = interpolate(transition, {
    inputRange,
    outputRange: [SPACING * 3.5, -SPACING],
  });
  let opacity = interpolate(transition, {
    inputRange,
    outputRange: [1, 0],
  });

  return (
    <Animated.View style={[titleStyle.menu, {left}, {opacity}]}>
      <Menu width={30} height={30} />
    </Animated.View>
  );
};

const AnimatedTitle = ({isOnFocus}: TitleProps) => {
  let {not, interpolate} = Animated;
  const animatedValue = isOnFocus ? 1 : 0;
  const transition = useTransition(
    animatedValue,
    not(animatedValue),
    animatedValue,
    250,
    Easing.ease,
  );

  const inputRange = [0, 1];
  let fontSize = interpolate(transition, {
    inputRange,
    outputRange: [40, 20],
  });
  let paddingTop = interpolate(transition, {
    inputRange,
    outputRange: [SPACING * 11, -SPACING],
  });
  let opacity = interpolate(transition, {
    inputRange,
    outputRange: [1, 0],
  });

  let marginBottom = interpolate(transition, {
    inputRange,
    outputRange: [0, -40],
  });

  let marginTop = interpolate(transition, {
    inputRange,
    outputRange: [0, 30],
  });
  return (
    <>
      <Animated.Text
        style={[
          titleStyle.title,
          {fontSize},
          {paddingTop},
          {marginBottom},
          {marginTop},
          {opacity},
        ]}>
        Makachange.
      </Animated.Text>
      <Animated.Text style={[titleStyle.subTitle, {opacity}]}>
        It's so easy.
      </Animated.Text>
    </>
  );
};
// 0 CO2 KG pro 100g Food guet
//  50 CO2 KG pro 100g Food guet
const FakeRecipes: RecipeType[] = [
  {
    id: '1',
    image: 'https://recipecontent.fooby.ch/7844_3-2_480-320.jpg',
    provenance: 'Mexico',
    co2: 20,
    name: 'Mexican Tortillas',
    time: 45,
    people: 4,
    instructions:
      'Combine the spice mix and the oil. Coat the chicken breasts with the mixture. Heat the oil in a non-stick frying pan. Reduce the heat, fry the chicken for approx. 5 mins. on each side over a medium heat. Remove, cover and keep warm. Add a little oil to the same pan if necessary.',
    ingredients: [],
    totalPrice: 9.95,
  },
  {
    id: '2',
    image: 'https://recipecontent.fooby.ch/18209_3-2_480-320.jpg',
    provenance: 'Japan',
    co2: 40,
    name: 'Futomaki Sushi',
    time: 60,
    people: 4,
    instructions:
      'Rinse the rice in a sieve under cold running water until the water runs clear, drain well. Add the water and rice to a pan and leave to absorb for approx. 30 mins.',
    ingredients: [],
    totalPrice: 40,
  },
  {
    id: '3',
    image: 'https://recipecontent.fooby.ch/17993_3-2_480-320.jpg',
    provenance: 'Greece',
    co2: 30,
    name: 'Feta Couscous With Peach',
    time: 60,
    people: 4,
    instructions:
      'Mix the couscous and salt in a bowl. Pour boiling water over the couscous, cover and leave to absorb for approx. 5 mins. Separate with a fork.',
    ingredients: [],
    totalPrice: 12.4,
  },
  {
    id: '4',
    image: 'https://recipecontent.fooby.ch/10983_3-2_480-320.jpg',
    provenance: 'Switzerland',
    co2: 10,
    name: 'Ratatouille Flan',
    time: 20,
    people: 4,
    instructions:
      'Roll out the dough and place in the tin with baking paper. Prick the base firmly with a fork, sprinkle with the cheese.',
    ingredients: [],
    totalPrice: 19.95,
  },
];

class MainScreen extends React.Component<Props, State> {
  state = {
    searchValue: '',
    isOnFocus: false,
    recipes: null,
  };
  async componentDidMount() {
    // @ts-ignore
    // await new Promise(resolve => setTimeout(resolve, 3000));
    this.setState({recipes: FakeRecipes});
  }

  render() {
    const {navigation} = this.props;
    const {searchValue, recipes} = this.state;

    // @ts-ignore
    return (
      <>
        <FullscreenBackground />
        <AnimateSalt isOnFocus={this.state.isOnFocus} />
        <Wrapper number={1}>
          <AnimatedTitle isOnFocus={this.state.isOnFocus} />
          <Container>
            <InputField
              onChangeBlur={() => {
                this.setState({isOnFocus: false});
              }}
              onChangeFocus={() => {
                this.setState({isOnFocus: true});
              }}
              onTextChange={(newSearchValue: string) => {
                this.setState({searchValue: newSearchValue});
                // TODO: perform call
              }}
              placeholder={'Search your recipe'}
              clear={() => {}}
              value={searchValue}
            />
            <Recipes>
              <Filters />
              {!recipes ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                recipes.map((r: RecipeType) => {
                  return (
                    <TouchableOpacity
                      key={r.id}
                      onPress={() => {
                        navigation.navigate(__SCREENS.BENCHMARK);
                      }}>
                      <Recipe recipe={r} />
                    </TouchableOpacity>
                  );
                })
              )}
            </Recipes>
          </Container>
        </Wrapper>
      </>
    );
  }
}
export default withNavigation(MainScreen);
