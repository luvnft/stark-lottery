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
      const temp: any = dataLottery;

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

  return (
    <>
      <Button variant="primary" onClick={onOpen}>
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
                <HStack gap={2}>
                  <Text>Draw Numbers:</Text>
                  <HStack gap={8}>
                    {currentData.drawnNumbers.map((num: number) => (
                      <Button variant="lotteryNumber" isActive={true}>
                        <Text>{num}</Text>
                      </Button>
                    ))}
                  </HStack>
                </HStack>
              )}

              <HStack my={8} gap={4}>
                <Text>Your Numbers:</Text>
                <HStack gap={8}>
                  {pickedNumber.map((num: number) => (
                    <Button variant="lotteryNumber" isActive={false}>
                      <Text>{num}</Text>
                    </Button>
                  ))}
                </HStack>
              </HStack>

              {currentData && currentData.drawnNumbers.length ? (
                <>
                  {[...currentData.drawnNumbers].filter(x =>
                    pickedNumber.includes(x)
                  ).length > 2 ? (
                    <>
                      <HStack my={6}>
                        <Text>Win: </Text>
                        <HStack>
                          {currentData &&
                            [...currentData.drawnNumbers]
                              .filter(x => pickedNumber.includes(x))
                              .map(data => <Text color="red">{data}</Text>)}
                        </HStack>
                      </HStack>

                      <Button onClick={async () => writeClaim()}>
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
