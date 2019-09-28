import React from 'react';
import styled from 'styled-components';
import {
  MyView,
  SPACING,
  TextExtraBold,
  TextRegular,
  Wrapper,
} from '../layout/Layout';
import {NavigationScreenProp} from 'react-navigation';
import {Image, StyleSheet} from 'react-native';
import Menu from '../assets/icons/menu.svg';
import {__COLORS} from '../layout/Colors';
import {getAlphaColor} from '../layout/AlphaColor';
import {InputField} from '../components/InputField';
import Animated, {Easing} from 'react-native-reanimated';
import {__FONT_FAMILIES} from '../layout/Fonts';
import {useTransition} from 'react-native-redash';

const Container = styled(MyView)`
  flex: 1;
  margin-top: ${SPACING * 4}px;
`;

const Hack = styled(MyView)`
  position: absolute;
  top: ${SPACING * 7}px;
  left: ${SPACING * 3.5}px;
`;


type Props = {
  navigation: NavigationScreenProp<any, any>;
};

type State = {
  searchValue: string;
  isOnFocus: boolean;
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
});

type TitleProps = {
  isOnFocus: boolean;
};

const AnimateSalt = ({isOnFocus}: TitleProps) => {
  return (
    <Hack>
      <Menu width={30} height={30} />
    </Hack>
  );
};

const AnimatedTitle = ({isOnFocus}: TitleProps) => {
  let {not, interpolate} = Animated;
  const animatedValue = isOnFocus ? 1 : 0;
  const transition = useTransition(
    animatedValue,
    not(animatedValue),
    animatedValue,
    400,
    Easing.ease,
  );

  const inputRange = [0, 1];
  let fontSize = interpolate(transition, {
    inputRange,
    outputRange: [40, 20],
  });
  let paddingTop = interpolate(transition, {
    inputRange,
    outputRange: [SPACING * 15, 0],
  });
  let opacity = interpolate(transition, {
    inputRange,
    outputRange: [1, 0],
  });
  return (
    <>
      <Animated.Text
        style={[titleStyle.title, {fontSize}, {paddingTop}, {opacity}]}>
        This guil Recipe
      </Animated.Text>
      <Animated.Text style={[titleStyle.subTitle, {opacity}]}>
        This guil Recipe
      </Animated.Text>
    </>
  );
};
class MainScreen extends React.Component<Props, State> {
  state = {
    searchValue: '',
    isOnFocus: false,
  };
  componentDidMount(): void {}

  render() {
    const {navigation} = this.props;
    const {searchValue} = this.state;
    console.log(this.state.isOnFocus);
    return (
      <>
        <Image
          style={{position: 'absolute'}}
          source={require('../assets/images/background.png')}
        />
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
              onTextChange={(searchValue: string) => {
                this.setState({searchValue});
              }}
              placeholder={'Search your recipe'}
              clear={() => {}}
              value={searchValue}
            />
          </Container>
        </Wrapper>
      </>
    );
  }
}
export default MainScreen;
