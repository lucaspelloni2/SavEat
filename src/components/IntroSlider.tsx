import React, {useState} from 'react';
import styled from 'styled-components';
import AppNavigator from '../navigation/AppNavigator';
import AppIntroSlider from 'react-native-app-intro-slider';

const slides = [
  {
    key: '1',
    title: 'Title 1',
    text: 'Description.\nSay something cool',
    image: require('./assets/1.jpg'),
    backgroundColor: '#59b2ab',
  },
  {
    key: '2',
    title: 'Title 2',
    text: 'Other cool stuff',
    image: require('./assets/2.jpg'),
    backgroundColor: '#febe29',
  },
  {
    key: '3',
    title: 'Rocket guy',
    text: "I'm already out of descriptions\n\nLorem ipsum bla bla bla",
    image: require('./assets/3.jpg'),
    backgroundColor: '#22bcb5',
  },
];

const Slider = () => {};

export const IntroSlider = () => {
  const [isDone, setIsDone] = useState(false);
  if (isDone) {
    return <AppNavigator />;
  } else {
    return (
      <AppIntroSlider
        renderItem={this._renderItem}
        slides={slides}
        onDone={() => {
          setIsDone(true);
        }}
      />
    );
  }
};
