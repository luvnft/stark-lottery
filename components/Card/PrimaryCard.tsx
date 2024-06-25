import { convertHex } from '@/utils/convertHex';
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
        bg: 'gradient.100',
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
      bg={convertHex('#FFD76133', 0.2)}
      transition="all .3s"
      _hover={{
        backgroundColor: convertHex('#FFD76133', 0.4),
      }}
      {...style}
    >
      {children}
    </Box>
  );
};

export default PrimaryCard;
