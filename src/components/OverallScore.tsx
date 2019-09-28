import React from 'react';
import styled from 'styled-components';

import {PieChart} from 'react-native-svg-charts';
import {__COLORS, __GRAY_COLORS} from '../layout/Colors';
import getCo2Hue from '../helpers/get-co2-hue';
import {__WINDOW_WIDTH, MyView, TextLight, TextRegular} from '../layout/Layout';
import {StyleSheet, View, Image} from 'react-native';
import {getAlphaColor} from '../layout/AlphaColor';
import {Recipe} from '../helpers/backend-types';

type Props = {overallScore: number; recipe: Recipe; scores: number[]};

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
    const keys = ['google', 'facebook', 'linkedin', 'youtube', 'Twitter'];

    const scores = [...new Set(this.props.scores)];
    const colors = scores.map(s => {
      return getAlphaColor(0.75, getCo2Hue(s));
    });

    const data = keys.map((key, index) => {
      return {
        key,
        value: scores[index],
        svg: {fill: colors[index]},
        arc: {
          outerRadius: 70 + scores[index]/5 + '%',
          padAngle: label === key ? 0.1 : 0,
        },
        onPress: () =>
          this.setState({selectedSlice: {label: key, value: values[index]}}),
      };
    });
    const deviceWidth = __WINDOW_WIDTH;
    console.log(this.props.recipe.image);
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
              top: 73,
              color: __GRAY_COLORS._BLACK,
              position: 'absolute',
              right: 82,
              textAlign: 'center',
            },
          ]}>
          {Math.round(this.props.overallScore).toFixed(0)}
        </TextRegular>
        <TextLight
          fontSize={11}
          style={{
            top: 105,
            color: __GRAY_COLORS._700,
            position: 'absolute',
            left: deviceWidth / 2 - labelWidth / 2 - 4,
            textAlign: 'center',
          }}>
          CO2 KG
        </TextLight>
      </View>
    );
  }
}

export default OverallScore;
