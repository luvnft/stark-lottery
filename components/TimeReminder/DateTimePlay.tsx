import React from 'react';
import GradientText from '../Text/GradientText';
import { HStack } from '@chakra-ui/react';
interface IProps {
  value: number;
  type: string;
  isDanger: boolean;
}
const DateTimeDisplay = ({ value, type, isDanger }: IProps) => {
  return (
    <HStack>
      <GradientText
        content={value.toString()}
        sx={{
          fontSize: '2xl',
          fontWeight: '800',
          color: isDanger ? 'red.500' : 'black',
        }}
      />
      <GradientText
        content={type}
        sx={{
          fontSize: 'md',
          fontWeight: '800',
          color: isDanger ? 'red.500' : 'black',
        }}
      />
    </HStack>
  );
};

export default DateTimeDisplay;
