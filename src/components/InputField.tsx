import React, {forwardRef, useEffect, useState} from 'react';
import styled from 'styled-components';
import {
  LayoutChangeEvent,
  StyleSheet,
  TextInput,
  TextInputProps,
  TouchableOpacity,
} from 'react-native';
import Animated, {Easing} from 'react-native-reanimated';
import {useTransition} from 'react-native-redash';
import {SPACING, TextRegular} from '../layout/Layout';
import {normalize} from '../layout/Normalization';
import {__COLORS} from '../layout/Colors';
import {__FONT_FAMILIES} from '../layout/Fonts';

const {interpolate, not} = Animated;

const PADDING = SPACING * 3 - 2;
const FONT_SIZE = normalize(14);

const styles = StyleSheet.create({
  container: {
    marginTop: SPACING,
    marginBottom: SPACING,
    borderRadius: 100,
    position: 'relative',
    backgroundColor: __COLORS.APP_BACKGROUND,
  },
  placeholder: {
    fontFamily: __FONT_FAMILIES.REGULAR,
    position: 'absolute',
    paddingLeft: PADDING,
    color: __COLORS.WHITE,
    fontSize: FONT_SIZE,
  },

  input: {
    padding: PADDING,
    color: __COLORS.WHITE,
    fontSize: FONT_SIZE,
  },
});

type Props = {
  onTextChange: (text: string) => void;
  clear: () => void;
  value: string;
  placeholder: string;
  errorLabel?: string | null;
  onChangeFocus?: () => void;
  onChangeBlur?: () => void;
} & TextInputProps;

export const InputField = ({
  onTextChange,
  value,
  placeholder,
  clear,
  errorLabel,
  style,
  onChangeFocus,
  onChangeBlur,
  ...other
}: Props) => {
  const [isOnFocus, setOnFocus] = useState<0 | 1>(0);
  let animatedValue = isOnFocus || value ? 1 : 0;

  const transition = useTransition(
    animatedValue,
    not(animatedValue),
    animatedValue,
    180,
    Easing.ease,
  );

  const inputRange = [0, 1];
  let fontSize = interpolate(transition, {
    inputRange,
    outputRange: [FONT_SIZE, FONT_SIZE - 5],
  });

  let top = interpolate(transition, {
    inputRange,
    outputRange: [24, 14],
  });

  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor: isOnFocus ? __COLORS.PRIMARY : __COLORS.SECONDARY,
        },
        style,
      ]}>
      <Animated.Text
        style={[
          styles.placeholder,
          {
            fontSize,
            top,
            fontFamily:
              animatedValue === 1
                ? __FONT_FAMILIES.BOLD
                : __FONT_FAMILIES.REGULAR,
          },
        ]}>
        {placeholder}
      </Animated.Text>

      <TextInput
        onLayout={(e: LayoutChangeEvent) => {
          const computedHeight = e.nativeEvent.layout.height;
          // TODO: place text in the middle based on computed height
        }}
        {...other}
        style={[styles.input, {top: animatedValue ? 6 : 0}]}
        value={value}
        selectionColor={__COLORS.WHITE}
        onBlur={() => {
          if (onChangeBlur) {
            onChangeBlur();
          }
          setOnFocus(0);
        }}
        onFocus={() => {
          setOnFocus(1);
          if (onChangeFocus) {
            onChangeFocus();
          }
        }}
        onChangeText={(text: string) => {
          onTextChange(text);
        }}
      />
    </Animated.View>
  );
};
