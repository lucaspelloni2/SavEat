import React from 'react';
import styled from 'styled-components';
import {SPACING} from '../layout/Layout';
import {NavigationScreenProp, withNavigation} from 'react-navigation';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Menu from '../assets/icons/menu.svg';
import {__COLORS} from '../layout/Colors';
import {getAlphaColor} from '../layout/AlphaColor';
import {InputField} from '../components/InputField';
import Animated, {Easing} from 'react-native-reanimated';
import {__FONT_FAMILIES} from '../layout/Fonts';
import {useTransition} from 'react-native-redash';
import {RecipePreview} from '../components/Recipe';
import {Filters} from '../components/Filters';
import {__SCREENS} from '../navigation/Screens';
import FullscreenBackground from '../layout/FullscreenBackground';
import apiRequest from '../helpers/api-request';
import {Recipe} from '../helpers/backend-types';

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
  recipes: Recipe[] | null;
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
        Saveat.
      </Animated.Text>
      <Animated.Text style={[titleStyle.subTitle, {opacity}]}>
        Make a change. It's easy.
      </Animated.Text>
    </>
  );
};

class MainScreen extends React.Component<Props, State> {
  state = {
    searchValue: '',
    isOnFocus: false,
    recipes: null,
  };
  componentDidMount() {
    console.log('rendering...');
    apiRequest('/recipes')
      .then(recipes => {
        console.log(recipes);
        this.setState({recipes});
      })
      .catch(e => {
        Alert.alert(String(e));
      });
  }

  render() {
    const {navigation} = this.props;
    const {searchValue, recipes} = this.state;

    // @ts-ignore
    return (
      <>
        <FullscreenBackground />
        <AnimateSalt isOnFocus={this.state.isOnFocus} />
        <View style={{flex: 1}}>
          <View style={{paddingLeft: 16, paddingRight: 16}}>
            <AnimatedTitle isOnFocus={this.state.isOnFocus} />
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
          </View>

          <Recipes contentContainerStyle={{paddingLeft: 16, paddingRight: 16}}>
            <Filters />
            {!recipes ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              recipes.map((r: Recipe) => {
                return (
                  <TouchableOpacity
                    key={r.slug}
                    onPress={() => {
                      navigation.navigate(__SCREENS.BENCHMARK, {
                        id: r.slug,
                      });
                    }}>
                    <RecipePreview recipe={r} />
                  </TouchableOpacity>
                );
              })
            )}
          </Recipes>
        </View>
      </>
    );
  }
}
export default withNavigation(MainScreen);
