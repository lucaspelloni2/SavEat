import React, {ReactNode} from 'react';
import {Dimensions, Platform, Text, View, ViewStyle} from 'react-native';
import styled from 'styled-components';
import {__FONT_FAMILIES} from './Fonts';
import {__COLORS} from './Colors';
import {normalize} from './Normalization';
/**
 * Types
 */
type FlexProps = {
  number: number;
  children?: ReactNode;
  direction?: 'row' | 'column';
  style?: ViewStyle;
} & typeof defaultFlexProps;

const defaultFlexProps = {
  direction: 'column',
};

/**
 * General Design Elements
 */
export const __WINDOW_WIDTH = Dimensions.get('window').width;
export const __WINDOW_HEIGHT = Dimensions.get('window').height;
export const __SCREEN_HEIGHT = Dimensions.get('screen').height;
export const __SCREEN_WIDTH = Dimensions.get('screen').width;

export const MyView = styled(View)``;
export const MyText = styled(Text)``;

const FlexView = styled(MyView)<{number: number; dir: string}>`
  flex: ${props => props.number};
  flex-direction: ${props => props.dir};
`;

export const Middle = styled(MyView)`
  flex: 1;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const Flex = ({number, children, direction, style}: FlexProps) => {
  return (
    <FlexView number={number} dir={direction} style={style}>
      {children}
    </FlexView>
  );
};
Flex.defaultProps = defaultFlexProps;

export const CardPadding = styled(Flex)`
  padding: 12px ${__WINDOW_WIDTH / 10}px;
  width: 100%;
`;

export const SPACING = 8;
const textColor: __COLORS = __COLORS.TEXT_COLOR;

export const Wrapper = styled(Flex)`
  padding: ${SPACING * 2}px ${SPACING * 3}px;
`;

export const TextLight = styled(MyText)<{fontSize?: number}>`
  font-family: ${__FONT_FAMILIES.LIGHT};
  color: ${textColor};
  font-size: ${props =>
    props.fontSize ? normalize(props.fontSize) : normalize(12)}px;
`;

export const TextRegular = styled(MyText)<{fontSize?: number}>`
  font-family: ${__FONT_FAMILIES.REGULAR};
  color: ${textColor};
  font-size: ${props =>
    props.fontSize ? normalize(props.fontSize) : normalize(12)}px;
  margin-top: ${Platform.OS === 'ios' ? normalize(4) : 0}px;
`;

export const TextSemiBold = styled(MyText)<{fontSize?: number}>`
  font-family: ${__FONT_FAMILIES.SEMI_BOLD};
  color: ${textColor};
  font-size: ${props =>
    props.fontSize ? normalize(props.fontSize) : normalize(12)}px;
  margin-top: ${Platform.OS === 'ios' ? normalize(4) : 0}px;
`;

export const TextBold = styled(MyText)<{fontSize?: number}>`
  font-family: ${__FONT_FAMILIES.BOLD};
  color: ${textColor};
  font-size: ${props =>
    props.fontSize ? normalize(props.fontSize) : normalize(12)}px;
  margin-top: ${Platform.OS === 'ios' ? normalize(4) : 0}px;
`;

export const TextExtraBold = styled(MyText)<{fontSize?: number}>`
  font-family: ${__FONT_FAMILIES.EXTRA_BOLD};
  color: ${textColor};
  font-size: ${props =>
    props.fontSize ? normalize(props.fontSize) : normalize(12)}px;
  margin-top: ${Platform.OS === 'ios' ? normalize(4) : 0}px;
`;
