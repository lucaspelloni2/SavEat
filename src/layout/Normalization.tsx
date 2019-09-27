import {Dimensions, Platform, PixelRatio} from 'react-native';
import {__WINDOW_WIDTH} from './Layout';

export const normalize = (size: number) => {
    // based on iphone 5s's scale
    const scale = __WINDOW_WIDTH / 320;
    const newSize = size * scale;
    if (Platform.OS === 'ios') {
        return Math.round(PixelRatio.roundToNearestPixel(newSize));
    } else {
        return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
    }
};
