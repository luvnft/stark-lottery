import {
  Button,
  HStack,
  Modal,
  ModalContent,
  ModalOverlay,
  useDisclosure,
  Text,
  Spinner,
  ModalCloseButton,
  useToast,
} from '@chakra-ui/react';
import React, { useEffect, useMemo, useState } from 'react';
import ABILottery from '@/abi/lotteries645.json';
import {
  useContract,
  useContractRead,
  useContractWrite,
} from '@starknet-react/core';
import { CONTRACT_ADDRESS } from '@/config/contractAddress';
import {
  convertBigIntsToNumbers,
  convertTimestampToFormattedDate,
} from '@/utils';

interface IProps {
  lotteryId: number;
  ticketId: number;
  pickedNumber: number[];
}
const ClaimResult = ({ lotteryId, pickedNumber, ticketId }: IProps) => {
  const [currentData, setCurrentData] = useState<any>();
  const { data: dataLottery, isLoading: isLoadingLottery } = useContractRead({
    functionName: 'getLotteryById',
    abi: ABILottery,
    args: [lotteryId],
    address: CONTRACT_ADDRESS.lottery,
    watch: true,
  });
  const { contract: contractLottery } = useContract({
    abi: ABILottery,
    address: CONTRACT_ADDRESS.lottery,
  });
  const callClaim = useMemo(() => {
    if (!contractLottery || !dataLottery) return [];
    return contractLottery?.populateTransaction['claimRewards']!(ticketId);
  }, [isLoadingLottery, contractLottery?.populateTransaction]);
  useEffect(() => {
    if (!isLoadingLottery && dataLottery) {
      const temp = dataLottery;
      // const temp = {
      //   id: 1,
      //   drawnNumbers: [23, 30, 22, 18, 28, 13],
      //   drawTime: 1712793600,
      //   state: 1,

      // };
      if (temp) {
        convertBigIntsToNumbers(temp);
        setCurrentData(() => temp);
      }
    }
  }, [isLoadingLottery]);
  const {
    writeAsync: writeClaim,
    data: dataClaim,
    isPending: isPendingClaim,
  } = useContractWrite({
    calls: callClaim,
  });
  const { isOpen, onClose, onOpen } = useDisclosure();
  const toast = useToast({
    position: 'top-right',
    duration: 6000,
  });
  return (
    <>
      <Button
        variant="primary"
        onClick={onOpen}
        width={{ md: 'inherit', base: 'full' }}
      >
        View Result
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered size="2xl">
        <ModalOverlay />
        <ModalContent padding={10} bg="primary.game.200">
          <ModalCloseButton />
          {isLoadingLottery ? (
            <Spinner size="lg" />
          ) : (
            <>
              {currentData && currentData.drawnNumbers.length != 0 && (
                <HStack
                  gap={2}
                  flexWrap={{ md: 'nowrap', base: 'wrap' }}
                  rowGap={4}
                >
                  <Text fontSize="lg" fontWeight="bold">
                    Draw Numbers:
                  </Text>
                  <HStack gap={8} flexWrap={{ md: 'nowrap', base: 'wrap' }}>
                    {currentData.drawnNumbers.map((num: number) => (
                      <Button
                        variant="lotteryNumber"
                        isActive={true}
                        key={`num-lotteries-${num}`}
                      >
                        <Text>{num}</Text>
                      </Button>
                    ))}
                  </HStack>
                </HStack>
              )}

              <HStack
                my={8}
                gap={4}
                flexWrap={{ md: 'nowrap', base: 'wrap' }}
                rowGap={4}
              >
                <Text fontSize="lg" fontWeight="bold">
                  Your Numbers:
                </Text>
                <HStack gap={8} flexWrap={{ md: 'nowrap', base: 'wrap' }}>
                  {currentData &&
                    currentData.drawTime &&
                    pickedNumber.map((num: number) => {
                      const isActive = currentData.drawnNumbers.includes(num);

                      return (
                        <Button
                          variant="lotteryNumber"
                          isActive={isActive}
                          key={`guess-${num}`}
                        >
                          <Text>{num}</Text>
                        </Button>
                      );
                    })}
                </HStack>
              </HStack>

              {currentData && currentData.drawnNumbers.length ? (
                <>
                  {[...currentData.drawnNumbers].filter(x =>
                    pickedNumber.includes(x)
                  ).length > 2 ? (
                    <>
                      <Button
                        w="full"
                        variant="primary"
                        onClick={async () => {
                          try {
                            await writeClaim();
                            toast({
                              title: 'Claim Success',
                              status: 'success',
                            });
                          } catch (error: any) {
                            toast({
                              title: 'Claim Error',
                              status: 'error',
                              description: 'Your Ticket claimed',
                            });
                          }
                        }}
                      >
                        Claim Your Reward
                      </Button>
                    </>
                  ) : (
                    <>
                      <Text
                        fontWeight="bold"
                        textAlign="center"
                        color="#7A8CFF"
                      >
                        Better luck next time!
                      </Text>
                    </>
                  )}
                </>
              ) : (
                <HStack justifyContent="center">
                  <Text>Wating To DrawTime</Text>
                  <Text color="#7A8CFF" fontWeight="medium">
                    {currentData &&
                      convertTimestampToFormattedDate(
                        currentData.drawTime as any
                      )}
                  </Text>
                </HStack>
              )}
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ClaimResult;
