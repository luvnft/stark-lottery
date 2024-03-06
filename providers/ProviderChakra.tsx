import { persistor, store } from '@/redux/store';
import theme from '@/themes';
import { ChakraProvider } from '@chakra-ui/react';
import React, { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

const ProviderChakra = ({ children }: PropsWithChildren) => {
  return (
    <>
      <ChakraProvider theme={theme}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            {children}
          </PersistGate>
        </Provider>
      </ChakraProvider>
    </>
  );
};

export default ProviderChakra;
