import { Dimensions } from 'react-native';
/** @package */
export const width = Dimensions.get('window').width;
export const _HEIGHT = Dimensions.get('window').height;
export const isSmallDevice = width < 375;
