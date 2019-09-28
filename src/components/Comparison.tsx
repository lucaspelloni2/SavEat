import React from 'react';
import styled from 'styled-components';
import Card from './Card';
import {Image} from 'react-native';
import {MyView, TextBold} from '../layout/Layout';
import {RecipeEvaluationPossibility} from '../helpers/backend-types';

type Props = {
  possibilities: RecipeEvaluationPossibility[];
};

const MyCard = styled(MyView)<{color: string}>`
  flex: 1;

  border-radius: 10px;
  background: ${props => props.color};
`;

const Container = styled(MyView)`
  flex: 1;
`;

export const Comparison = ({possibilities}: Props) => {
  return (
    <Container>
      <MyCard color={'#FF8605'}>
        <Image
          source={require('../assets/images/coop_white.png')}
          style={{width: 100}}
          resizeMode={'contain'}
        />
      </MyCard>
      <MyCard color={'#FF6600'}>
        <Image
          source={require('../assets/images/migros_white.png')}
          style={{width: 100}}
          resizeMode={'contain'}
        />
      </MyCard>
    </Container>
  );
};
