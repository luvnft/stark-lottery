import React from 'react';

import DiscordIcon from '@/public/assets/icons/social/discord.svg';
import TwitterIcon from '@/public/assets/icons/social/twitter.svg';
import GithubIcon from '@/public/assets/icons/social/github.svg';
import { HStack, Icon, IconButton } from '@chakra-ui/react';
import Link from 'next/link';
interface ISocialLinkProps {
  id: 'twitter' | 'discord' | 'github';
  link: string;
  icon: any;
}
const ListSocial = () => {
  const ListMediaSocial: ISocialLinkProps[] = [
    {
      id: 'twitter',
      icon: TwitterIcon,
      link: 'https://twitter.com/FaceToSee_',
    },
    {
      icon: DiscordIcon,
      id: 'discord',
      link: 'https://discord.com/invite/djU2mEJcSq',
    },
    {
      id: 'github',
      icon: GithubIcon,
      link: 'https://github.com/decolgen-labs',
    },
  ];
  return (
    <HStack>
      {ListMediaSocial.map(item => (
        <Link href={item.link} key={item.id}>
          <IconButton
            icon={<Icon as={item.icon} h={5} w={5} />}
            aria-label={''}
          />
        </Link>
      ))}
    </HStack>
  );
};

export default ListSocial;
