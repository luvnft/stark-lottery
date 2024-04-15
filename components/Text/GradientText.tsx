import React from 'react';
import { Text, TextProps } from '@chakra-ui/react';
interface IProps {
  content: string;
  sx?: TextProps;
}
const GradientText = ({ content, sx }: IProps) => {
  return (
    <Text
      sx={{
        background: 'gradient.100',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        ...sx,
      }}
    >
      {content}
    </Text>
  );
};

export default GradientText;
