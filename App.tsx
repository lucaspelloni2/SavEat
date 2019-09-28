import React, {ReactNode, useState} from 'react';
import {StatusBar, YellowBox} from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import VariantsModal from './src/components/VariantsModal';
import ModalContext, {ModalSetterContext} from './src/helpers/modalize-context';
import {ProductWithCarbonProjection} from './src/helpers/backend-types';

YellowBox.ignoreWarnings([
  'Remote debugger',
  'Warning: componentWillMount is deprecated',
  'Warning: componentWillMount has been renamed',
  'Warning: componentWillReceiveProps is deprecated',
  'Warning: componentWillReceiveProps has been renamed',
  'Warning: componentWillUpdate has been renamed',
  '-[RCTRootView cancelTouches]',
  'Task orphaned',
]);

const App: () => ReactNode = () => {
  const [variantModal, setVariantModel] = useState<
    ProductWithCarbonProjection[]
  >(null);
  return (
    <>
      <ModalSetterContext.Provider
        value={(hi: ProductWithCarbonProjection[]) => {
          setVariantModel(hi);
        }}>
        <ModalContext.Provider value={variantModal}>
          <StatusBar barStyle="dark-content" />
          <AppNavigator />
          <VariantsModal
            onClosed={() => {
              setVariantModel(null);
            }}
          />
        </ModalContext.Provider>
      </ModalSetterContext.Provider>
    </>
  );
};

export default App;
