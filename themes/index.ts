import { ComponentStyleConfig, extendTheme } from '@chakra-ui/react';
export const backgrounds = {
  gradient: {
    100: 'linear-gradient(62deg, #1A3E92 0%, #661B88 100%)',
    200: 'linear-gradient(214deg, #B75CFF 0%, #671AE4 100%)',
    300: 'linear-gradient(62deg, #1A3E92 0%, #661B88 100%)',
  },
};
export const colors = {
  primary: {
    shader: {
      50: '#FFFBE8',
      100: '#FFF7D1',
      200: '#FFF0A3',
      300: '#FFE876',
      400: '#FFE148',
      500: '#FFD91A',
      600: '#CCAE15',
      700: '#998210',
      800: '#66570A',
      900: '#332B05',
    },
    gray: {
      50: '#FAFAFA',
      100: '#F4F4F5',
      200: '#F8F7FA',
      300: '#E4E4E7',
      400: '#A1A1AA',
      500: '#71717A',
      600: '#52525B',
      700: '#3F3F46',
      800: '#27272A',
    },
  },
  secondary: {
    success: {
      100: '#B8F5D0',
      200: '#88EEB1',
      300: '#58E791',
      400: '#29E072',
      500: '#0CC857',
    },
    danger: {
      100: '#ff6969',
      200: '#ff5050',
      300: '#ff3636',
      400: '#ff1d1d',
      500: '#eb1212',
    },
    info: {
      100: '#7CB9E8',
      200: '#6CB4EE',
      300: '#007FFF',
    },
  },
  body: '#0F1005',
  ...backgrounds,
};
const Button: ComponentStyleConfig = {
  variants: {
    gradient_1: {
      width: 'full',
      bg: 'gradient.100',
      borderRadius: 'xl',
      py:6,
      color:'white',
      transition:'all .3s',
      _hover:{
        opacity:0.7
      }
    }
  }
}
const theme = extendTheme({
  colors,
  components: {
    Button
  },
});

export default theme;