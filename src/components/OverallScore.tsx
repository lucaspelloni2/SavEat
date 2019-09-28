import React from 'react';
import styled from 'styled-components';

import {PieChart} from 'react-native-svg-charts';
import {__COLORS, __GRAY_COLORS} from '../layout/Colors';
import getCo2Hue from '../helpers/get-co2-hue';
import {__WINDOW_WIDTH, MyView, TextLight, TextRegular} from '../layout/Layout';
import {StyleSheet, View} from 'react-native';
import {getAlphaColor} from '../layout/AlphaColor';

type Props = {score: number};

const Container = styled(MyView)``;

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
    const values = [40, 50, 20, 60, 70];
    const colors = [
      getAlphaColor(0.75, getCo2Hue(10)),
      getAlphaColor(0.75, getCo2Hue(30)),
      getAlphaColor(0.75, getCo2Hue(100)),
      getAlphaColor(0.75, getCo2Hue(150)),
      getAlphaColor(0.75, getCo2Hue(400)),
    ];
    const data = keys.map((key, index) => {
      return {
        key,
        value: values[index],
        svg: {fill: colors[index]},
        arc: {
          outerRadius: 70 + values[index] + '%',
          padAngle: label === key ? 0.1 : 0,
        },
        onPress: () =>
          this.setState({selectedSlice: {label: key, value: values[index]}}),
      };
    });
    const deviceWidth = __WINDOW_WIDTH;

    return (
      <View
        style={[
          {
            paddingTop: 20,
            paddingBottom: 20,
            backgroundColor: getAlphaColor(0.2, __COLORS.PRIMARY),
            width: __WINDOW_WIDTH,
          },
          Shadow.shadow,
        ]}>
        <PieChart
          style={{height: 150}}
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
              top: 75,
              color: __GRAY_COLORS._BLACK,
              position: 'absolute',
              left: deviceWidth / 2 - labelWidth / 2 + 1,
              textAlign: 'center',
            },
          ]}>
          {this.props.score}
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
          C02 KG
        </TextLight>
      </View>
    );
  }
}

export default OverallScore;
