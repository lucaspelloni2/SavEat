import React from 'react';
import {ProductWithCarbonProjection} from './backend-types';

type Setter = (hi: ProductWithCarbonProjection[]) => void;

const context = React.createContext<ProductWithCarbonProjection[]>(null);
export const ModalSetterContext = React.createContext<Setter | null>(null);

export default context;
