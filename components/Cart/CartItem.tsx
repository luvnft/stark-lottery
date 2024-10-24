import { Text } from '@chakra-ui/react';
import React from 'react';
interface IProps {
  listNum: number[];
}
const CartItem = ({ listNum }: IProps) => {
  return (
    <>
      {listNum.map((num, index) => (
        <Text
          key={index}
          fontWeight="800"
          sx={{
            backgroundClip: 'text',
            background: 'gradient.100',
            WebkitBackgroundClip: 'text',
          }}
        >
          {num}
        </Text>
      ))}
    </>
  );
};

export default CartItem;
