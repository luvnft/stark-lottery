import { HStack, Text } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';
interface IPageItemProps {
  link: string;
  title: string;
}
const ListPageItem = () => {
  const ListPage: IPageItemProps[] = [
    {
      link: '/',
      title: 'Home',
    },
    {
      link: '/tickets',
      title: 'My Tickets',
    },
    {
      link: '/results',
      title: 'Results',
    },
    {
      link: '/about',
      title: 'About',
    },
  ];
  return (
    <HStack
      gap={{ lg: 8, md: 6, base: 4 }}
      display={{ md: 'flex', base: 'none' }}
    >
      {ListPage.map(item => (
        <Link href={item.link} key={item.link}>
          <Text fontWeight="medium">{item.title}</Text>
        </Link>
      ))}
    </HStack>
  );
};

export default ListPageItem;
