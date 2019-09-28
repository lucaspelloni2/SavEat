import React, {useContext, useEffect, useRef} from 'react';
import {View, Text} from 'react-native';
import modalizeContext from '../helpers/modalize-context';
import Modalize from 'react-native-modalize';
import VariantsShower from './VariantsShower';

export default (props: {onClosed: () => void}) => {
  const context = useContext(modalizeContext);

  const modalRef = useRef<Modalize>();
  useEffect(() => {
    if (context) {
      modalRef.current.open();
    }
  }, [context]);

  if (!context) {
    return null;
  }
  return (
    <Modalize
      ref={modalRef}
      adjustToContentHeight
      onBackButtonPress={() => {
        if (modalRef.current) {
          modalRef.current.close();
        }
      }}
      onClosed={() => {
        setTimeout(() => {
          props.onClosed();
        }, 50);
      }}>
      <VariantsShower variants={context} />
    </Modalize>
  );
};
