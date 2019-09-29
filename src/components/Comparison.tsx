import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import Card from './Card';
import {Image, StyleSheet, View} from 'react-native';
import {
  __WINDOW_HEIGHT,
  __WINDOW_WIDTH,
  MyView,
  SPACING,
} from '../layout/Layout';
import {
  Product,
  Recipe,
  RecipeEvaluationPossibility,
} from '../helpers/backend-types';
import {__COLORS, __GRAY_COLORS} from '../layout/Colors';
import Hack from './Hack';
import getCo2Hue from '../helpers/get-co2-hue';
import {getAlphaColor} from '../layout/AlphaColor';

type Props = {
  possibilities: RecipeEvaluationPossibility[];
  recipe: Recipe;
};

const MyCard = styled(MyView)<{color: string}>`
  flex: 1;

  border-radius: 10px;
  background: ${props => props.color};
`;

const Container = styled(MyView)`
  flex: 1;
`;

const Coop = styled(MyView)``;

const Migros = styled(MyView)`
  flex: 1;
  justify-content: flex-end;
  align-items: flex-end;
  width: ${__WINDOW_WIDTH}px;
  padding-bottom: 30px;
  padding-right: 20px;
`;

const Absolute = styled(MyView)`
  position: absolute;
  top: 0;
  height: 100%;
`;

const SuperHack = styled(MyView)`
  position: absolute;
  right: 10px;
  bottom: 150px;
`;

const SuperHack2 = styled(MyView)`
  position: absolute;
  left: -170px;
  top: 120px;
`;
export const Comparison = ({possibilities, recipe}: Props) => {
  const [migrosScore, setMigrosScore] = useState(0);
  const [coopScore, setCoopScore] = useState(0);

  const [migrosScores, setMigrosScores] = useState([]);
  const [coopScores, setCoopScores] = useState([]);

  const [migrosProduct, setMigrosProduct] = useState([]);
  const [coopProduct, setCoopProduct] = useState([]);
  // @ts-ignore
  const grams = recipe.ingredients.map(i => i.gram);

  useEffect(() => {
    possibilities.map(p => {
      let offsets = p.ingredients
        .filter(i => i.products.length > 0)
        .map(i => i.products[0].co2Offset);
      let totalGrams = 0;
      let totalOffset = 0;
      for (let i = 0; i < grams.length; i++) {
        if (!grams[i] || !offsets[i]) {
          continue;
        }
        const gram = grams[i];
        totalGrams += gram;
        const offset = offsets[i];
        totalOffset += offset;
      }
      const co2Score = (totalOffset / totalGrams) * 100;
      let product = p.ingredients
        .filter(i => i.products.length > 0)
        .map(i => i.products[0].product);
      if (p.store === 'COOP') {
        setCoopScore(co2Score);
        setCoopScores(offsets);
        setCoopProduct(product);
        console.log(offsets);
      } else if (p.store === 'MIGROS') {
        setMigrosScore(co2Score);
        setMigrosScores(offsets);
        setMigrosProduct(product);
      }
    });
  }, []);

  console.log('scoree', migrosScore, coopScore);

  return (
    <Card>
      <Container>
        <View style={[styles.trangleCorner]} />
        <Absolute>
          <Coop>
            <Image
              source={require('../assets/images/coop.png')}
              style={{width: 100, height: 100, marginLeft: 10}}
              resizeMode={'contain'}
            />
            <MyView style={{flexDirection: 'row', top: -74, left: 160}}>
              {coopProduct.map((p: Product) => {
                return (
                  <Image
                    key={p.image}
                    source={{uri: p.image}}
                    style={{
                      width: 35,
                      height: 35,
                      marginLeft: -15,
                      borderRadius: 25,
                      borderWidth: 0.3,
                      borderColor: __COLORS.PRIMARY,
                    }}
                  />
                );
              })}
            </MyView>
            <SuperHack2>
              <Hack
                currentIndex={0}
                currentScore={0}
                co2Score={coopScore}
                recipe={recipe}
                scores={coopScores}
              />
            </SuperHack2>
          </Coop>
        </Absolute>
        <Absolute>
          <Migros>
            <Image
              source={require('../assets/images/migros.png')}
              style={{width: 120, height: 100, marginLeft: 10}}
              resizeMode={'contain'}
            />
            <MyView style={{flexDirection: 'row', top: -68, right: 150}}>
              {migrosProduct.map((p: Product) => {
                return (
                  <Image
                    key={p.image}
                    source={{uri: p.image}}
                    style={{
                      width: 35,
                      height: 35,
                      marginRight: -15,
                      borderRadius: 25,
                      borderWidth: 0.3,
                      borderColor: __COLORS.PRIMARY,
                    }}
                  />
                );
              })}
            </MyView>
            <SuperHack>
              <Hack
                colorText={__GRAY_COLORS._BLACK}
                currentIndex={0}
                currentScore={0}
                co2Score={migrosScore}
                recipe={recipe}
                scores={migrosScores}
              />
            </SuperHack>
          </Migros>
        </Absolute>
      </Container>
    </Card>
  );
};

const styles = StyleSheet.create({
  trangleCorner: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderRightWidth: __WINDOW_WIDTH - 10,
    borderTopWidth: __WINDOW_HEIGHT - SPACING * 12,
    borderRightColor: 'transparent',
    borderTopColor: getAlphaColor(0.5, __GRAY_COLORS._200),
  },
});
