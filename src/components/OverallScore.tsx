import React from 'react';
import styled from 'styled-components';

import {PieChart} from 'react-native-svg-charts';
import {__COLORS, __GRAY_COLORS} from '../layout/Colors';
import getCo2Hue from '../helpers/get-co2-hue';
import {__WINDOW_WIDTH, MyView, TextLight, TextRegular} from '../layout/Layout';
import {StyleSheet, View, Image, Text} from 'react-native';
import {getAlphaColor} from '../layout/AlphaColor';
import {Recipe} from '../helpers/backend-types';

type Props = {
  recipe: Recipe;
  scores: number[];
  co2Score: number;
  currentScore: number;
  currentIndex: number;
};

const Overlay = styled(MyView)``;

const Container = styled(MyView)`
  position: absolute;
  width: ${__WINDOW_WIDTH / 2}px;
  height: 170px;
`;

const Shadow = StyleSheet.create({
  shadow: {
    shadowColor: 'rgba(0,0,0, .2)',
    shadowOffset: {height: 0, width: 0},
    shadowOpacity: 10,
    shadowRadius: 5,
  },
});

class OverallScore extends React.PureComponent<Props, {}> {
  constructor(props) {
    super(props);
    this.state = {
      selectedSlice: {
        label: '',
        value: 0,
      },
      labelWidth: 0,
    };
  }

  render() {
    // @ts-ignore
    const {labelWidth, selectedSlice} = this.state;
    const {label, value} = selectedSlice;

    // @ts-ignore
    let scores = [...new Set(this.props.scores)];

    console.log('All scores, ', scores);
    console.log('current score', this.props.currentScore);

    if (scores.length === 0) {
      scores.push(50);
      scores.push(100);
    }
    console.log('current index ', this.props.currentIndex);
    const colors = scores.map(s => {
      if (s === this.props.currentScore || this.props.currentIndex === 0) {
        return getAlphaColor(0.85, getCo2Hue(s));
      } else {
        return getAlphaColor(0.5, getCo2Hue(s));
      }
    });

    let avarage = 0;
    scores.map(s => {
      avarage += s;
    });
    let overallScore = this.props.scores;

    let ratio =
      scores.filter(x => x > 200).length === 0
        ? 4
        : scores.filter(x => x > 500).length === 0
        ? 7
        : 10;

    const data = scores.map((key, index) => {
      return {
        key,
        value: scores[index],
        svg: {fill: colors[index]},
        arc: {
          outerRadius: 70 + scores[index] / ratio + '%',
          padAngle: 0.01,
        },
        onPress: () =>
          this.setState({selectedSlice: {label: key, value: scores[index]}}),
      };
    });
    let ingriedients = this.props.recipe.ingredients;
    ingriedients.map(i => {
      let food = i.food;
    });

    // wenn 2 in co2offset -> 200g CO2 pro 100g Food
    // food: in gram
    return (
      <View
        style={[
          {
            paddingTop: 20,
            backgroundColor: getAlphaColor(0.2, __COLORS.PRIMARY),
            width: __WINDOW_WIDTH,
            flex: 1,
          },
          Shadow.shadow,
        ]}>
        <Container>
          <Image
            source={{uri: this.props.recipe.image}}
            style={{
              width: '100%',
              height: '100%',
            }}
          />
          <Overlay
            style={{
              width: '100%',
              height: '100%',
              position: 'absolute',
              backgroundColor: getAlphaColor(0.2, __GRAY_COLORS._BLACK),
            }}
          />
        </Container>

        <PieChart
          style={{height: 150, marginLeft: 175, paddingBottom: 15}}
          outerRadius={'70%'}
          innerRadius={'50%'}
          data={data}
        />

        <TextRegular
          fontSize={20}
          onLayout={({
            nativeEvent: {
              layout: {width},
            },
          }) => {
            this.setState({labelWidth: width});
          }}
          style={[
            {
              top: 68,
              color: __GRAY_COLORS._BLACK,
              position: 'absolute',
              right: 82,
              textAlign: 'center',
            },
          ]}>
          {Math.round(this.props.co2Score).toFixed(0)}
        </TextRegular>
        <Text style={{fontSize: 10, position: 'absolute', right: 72, top: 95}}>
          g CO₂/100g
        </Text>
      </View>
    );
  }
}

export default OverallScore;
