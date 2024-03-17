import { ComponentStyleConfig, extendTheme } from '@chakra-ui/react';
export const backgrounds = {
  gradient: {
    100: 'linear-gradient(90deg, #0165FB 0%, #1DC9F8 100%)',
  },
};

export const colors = {
  primary: {
    game: {
      100: '#040A2F',
      200: '#081041',
      300: '#1b266b',
    },
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

const styles = {
  // eslint-disable-next-line no-unused-vars
  global: () => ({
    body: {
      bg: 'primary.game.100',
      color: '#E4E8FF',
    },
  }),
};
const Text: ComponentStyleConfig = {
  variants: {
    title: {
      fontSize: '32px',
      fontWeight: 800,
      color: 'white',
      textAlign: 'center',
    },
  },
};
const Button: ComponentStyleConfig = {
  variants: {
    buy_ticket: {
      width: 'fit-content',
      bg: '#151933',
      borderRadius: '3xl',
      minW: '242px',
      py: 6,
      transition: 'all .3s',
      _hover: {
        opacity: 0.7,
      },
    },
    primary: {
      px: 8,
      py: 4,
      borderRadius: '32px',
      bg: 'primary.game.300',
      width: 'fit-content',
      transition: 'all .3s',
      minW: '240px',
      minH: '60px',
      fontWeight: '700',
      _hover: {
        bg: 'gradient.100',
      },
    },
    lotteryNumber: ({ isActive }) => ({
      height: 12,
      width: 12,
      position: 'relative',
      transform: 'rotate(-45deg)',
      background: '#192678',
      _before: {
        content: '""',
        display: isActive ? 'block' : 'none',
        position: 'absolute',
        inset: 0,
        borderRadius: '8px',
        padding: '4px',
        background: 'gradient.100',
       WebkitMask:
          ' linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
       WebkitMaskComposite: 'xor',
        maskComposite: 'exclude',
      },
      p: {
        fontSize: 'xl',
        fontWeight: 800,
        backgroundClip: isActive ? 'text' : undefined,
        background: isActive
          ? 'linear-gradient(180deg, #0575FA 0%, #11E6F9 100%)'
          : undefined,
        ' -webkit-background-clip': isActive ? 'text' : undefined,
        '-webkit-text-fill-color': isActive ? 'transparent' : undefined,
        transform: 'rotate(45deg)',
      '  -webkit-text-stroke': '1px transparent'
        // outline: '1px solid',

        // outline:
        //   ' linear-gradient(180deg, #0575FA 0%, #11E6F9 100%)',
      },
      _hover: {},
    }),
  },
};

export const Progress: ComponentStyleConfig = {
  variants: {
    pick_progress: {
      filledTrack: {
        bg: 'linear-gradient(180deg, #0575FA 0%, #11E6F9 100%)',
      },
    },
  },
};
const theme = extendTheme({
  colors,
  styles,
  components: {
    Button,
    Text,
    Progress,
  },
});

export default theme;
