import {
  Box,
  Collapse,
  Flex,
  HStack,
  Icon,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import ArrowIcon from '@/public/assets/icons/general/arrow.svg';
interface FAQItemProps {
  id: number;
  title: string;
  content: string[];
}
const FAQItem = ({ id, title, content }: FAQItemProps) => {
  const { isOpen, onToggle } = useDisclosure();
  return (
    <>
      <Box padding={{ lg: 8, md: 6, base: 4 }} bg="#0A1450" borderRadius="12px">
        <HStack
          onClick={onToggle}
          cursor="pointer"
          width="full"
          justifyContent="space-between"
          transition="all .3s"
          _hover={{
            bg: '#0A1450',
          }}
        >
          <Text fontSize="lg" fontWeight="bold">{`${id}.${title}`}</Text>
          <Icon
            as={ArrowIcon}
            transform={isOpen ? 'rotate(-90deg)' : 'rotate(-180deg)'}
          />
        </HStack>

        <Collapse in={isOpen} animateOpacity>
          <Flex flexDirection="column" gap={2} paddingY={4}>
            {content.map((item, index) => (
              <Text color="#7A8CFF" key={`${item}-${index}`}>
                {item}
              </Text>
            ))}
          </Flex>
        </Collapse>
      </Box>
    </>
  );
};

export default FAQItem;
