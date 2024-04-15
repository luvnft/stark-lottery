import { Box, BoxProps } from '@chakra-ui/react';
import React from 'react';

interface IProps {
  style?: BoxProps;
  styleBorder?: BoxProps;
  children?: React.ReactNode;
}
const PrimaryCard = ({ style, children, styleBorder }: IProps) => {
  return (
    <Box
      _before={{
        content: '""',
        position: 'absolute',
        inset: 0,
        borderRadius: '32px',
        padding: '2px',
        background: 'gradient.100',
        ' -webkit-mask':
          ' linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
        '  -webkit-mask-composite': 'xor',
        ' mask-composite': 'exclude',
        ...styleBorder,
      }}
      position="relative"
      borderRadius="32px"
      padding={8}
      textAlign="center"
      bg="#0A1450"
      transition="all .3s"
      _hover={{
        background: '#1D2972',
      }}
      {...style}
    >
      {children}
    </Box>
  );
};

export default PrimaryCard;
