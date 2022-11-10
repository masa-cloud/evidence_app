import { Dimensions } from 'react-native';
/** @package */
export const width = Dimensions.get('window').width;
export const height = Dimensions.get('window').height;
export const isSmallDevice = width < 375;
