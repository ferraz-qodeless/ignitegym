import {
  Roboto_400Regular,
  Roboto_700Bold,
  useFonts
} from '@expo-google-fonts/roboto';
import { Center, GluestackUIProvider, Text } from '@gluestack-ui/themed';
import { StatusBar } from 'react-native';

import { Loading } from '@components/Loading';
import { config } from './config/gluestack-ui.config';

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_700Bold,
    Roboto_400Regular
  })
  return (
    <GluestackUIProvider config={config}>
      <StatusBar 
        barStyle={'light-content'} 
        backgroundColor={'transparent'}
        translucent
      />
      
      {fontsLoaded ? (
        <Center flex={1} bg='$gray700' >
          <Text fontFamily='$heading' fontSize={'$3xl'} color='$gray100'>
              Home
          </Text> 
        </Center>
      ) : ( 
        <Loading />
      )}

    </GluestackUIProvider>
  );
}



