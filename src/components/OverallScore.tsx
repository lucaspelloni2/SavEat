import React from 'react';
import styled from 'styled-components';

import {PieChart} from 'react-native-svg-charts';
import {__COLORS} from '../layout/Colors';
import getCo2Hue from '../helpers/get-co2-hue';
import {MyView} from "../layout/Layout";

type Props = {};

const Container = styled(MyView)``;

class OverallScore extends React.Component<Props, {}> {
  render() {
    const data = [
      {
        key: 1,
        value: 190,
        svg: {fill: getCo2Hue(340)},
        arc: {outerRadius: '120%', cornerRadius: 10},
      },
      {
        key: 2,
        value: 50,
        svg: {fill: getCo2Hue(100)},
      },
      {
        key: 3,
        value: 40,
        svg: {fill: getCo2Hue(10)},
      },
      {
        key: 4,
        value: 95,
        svg: {fill: getCo2Hue(170)},
      },
      {
        key: 5,
        value: 35,
        svg: {fill: getCo2Hue(220)},
      },
    ];

    return (
        <Container>
      <PieChart
        style={{height: 200}}
        outerRadius={'70%'}
        innerRadius={10}
        data={data}
      />
    );
  }
}
export default OverallScore;
