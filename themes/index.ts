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
  card: '#0A1450',
  note: '#7A8CFF',
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
      px: { md: 8, base: 6 },
      py: { md: 4, base: 3 },
      borderRadius: '32px',
      bg: 'primary.game.300',
      width: 'fit-content',
      overflow: 'hidden',
      position: 'relative',
      zIndex: 1,
      minW: '240px',
      minH: '60px',
      fontWeight: '700',
      // transition: 'background-color 300ms ease-in-out',
      transitionDuration: '200ms',

      _hover: {
        _before: {
          opacity: 1,
        },
      },
      _before: {
        content: "''",
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        bg: 'gradient.100',
        transition: 'opacity 0.3s linear',
        zIndex: -1,
        opacity: 0,
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
        // WebkitMaskComposite: 'xor',
        maskComposite: 'exclude',
      },
      p: {
        fontSize: 'xl',
        fontWeight: 800,
        backgroundClip: isActive ? 'text' : undefined,
        background: isActive
          ? 'linear-gradient(180deg, #0575FA 0%, #11E6F9 100%)'
          : undefined,
        WebkitBackgroundClip: isActive ? 'text' : undefined,
        WebkitTextFillColor: isActive ? 'transparent' : undefined,
        transform: 'rotate(45deg)',
        WebkitTextStroke: '1px transparent',
      },
      _hover: {},
    }),
    icon_btn: {
      bg: '#1B266B',
      _hover: {
        opacity: 0.7,
      },
      svg: {
        color: 'white',
        height: 8,
        width: 8,
      },
    },
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

export const Menu: ComponentStyleConfig = {
  variants: {
    profile: {
      list: {
        // this will style the MenuList component
        py: '4',
        borderRadius: 'xl',
        border: 'none',
        bg: '#1b266b',
      },
      item: {
        bg: 'inherit',
        color: 'gray.200',
        pl: 5,
        display: 'flex',
        gap: 4,
        _hover: {
          bg: 'teal.600',
        },
        _focus: {
          bg: 'teal.600',
        },
      },
      command: {
        opacity: '0.8',
        fontFamily: 'mono',
        fontSize: 'sm',
        letterSpacing: 'tighter',
        pl: '4',
      },
      divider: {
        // this will style the MenuDivider component
        my: '4',
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
    Menu,
  },
});

export default theme;
