import React from 'react';
import DateTimeDisplay from './DateTimePlay';
import { HStack } from '@chakra-ui/react';
interface IProps {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}
const ShowCounter = ({ days, hours, minutes, seconds }: IProps) => {
  return (
    <HStack
      my={{ md: 6, base: 4 }}
      flexWrap={{ md: 'nowrap', base: 'wrap' }}
      justifyContent="center"
    >
      <DateTimeDisplay value={days} type={'Days'} isDanger={days <= 3} />
      <p>:</p>
      <DateTimeDisplay value={hours} type={'Hours'} isDanger={false} />
      <p>:</p>
      <DateTimeDisplay value={minutes} type={'Mins'} isDanger={false} />
      <p>:</p>
      <DateTimeDisplay value={seconds} type={'Seconds'} isDanger={false} />
    </HStack>
  );
};

export default ShowCounter;
