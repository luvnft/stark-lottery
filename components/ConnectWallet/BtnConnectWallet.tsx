import { Flex, Icon, Text } from '@chakra-ui/react';

const BtnConnectWallet = ({ onClick, icon, label }: any) => (
  <Flex
    py={3}
    alignItems="center"
    rounded="lg"
    gap={{ md: 4, base: 3 }}
    cursor="pointer"
    color="#E4E8FF"
    _hover={{
      bg: 'gradient.100',
      color: '#0E011A',
    }}
    onClick={onClick}
    px={8}
  >
    <Icon as={icon} h={6} w={6} />
    <Text fontSize="lg" fontWeight="bold">
      {label}
    </Text>
  </Flex>
);

export default BtnConnectWallet;
