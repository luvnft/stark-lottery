import { HStack, StackProps, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
interface IPageItemProps {
  link: string;
  title: string;
}
interface IProps {
  sx?: StackProps;
}
const ListPageItem = ({ sx }: IProps) => {
  const path = usePathname();
  const ListPage: IPageItemProps[] = [
    {
      link: '/',
      title: 'Home',
    },
    {
      link: '/lotteries',
      title: 'Lotteries',
    },
    {
      link: '/tickets',
      title: 'My Tickets',
    },
    {
      link: '/results',
      title: 'Results',
    },
  ];
  return (
    <HStack gap={{ lg: 8, md: 6, base: 4 }} {...sx}>
      {ListPage.map(page => {
        const pageActive = (): boolean => {
          if (page.link === '/') {
            //home
            return page.link === path;
          } else {
            if (path.includes(page.link)) {
              return path.includes(page.link);
            }
          }
          return false;
        };
        return (
          <Link href={page.link} key={page.link}>
            <Text
              px={8}
              py={2}
              borderRadius="32px"
              color={pageActive() ? '#119EF9' : 'white'}
              borderBottom={pageActive() ? '2px solid' : undefined}
              borderBottomColor="#119EF9"
            >
              {page.title}
            </Text>
          </Link>
        );
      })}
    </HStack>
  );
};

export default ListPageItem;
