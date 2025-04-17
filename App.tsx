import {
  Roboto_400Regular,
  Roboto_700Bold,
  useFonts
} from '@expo-google-fonts/roboto';
import { Center, GluestackUIProvider, Text } from '@gluestack-ui/themed';
import { StatusBar, View } from 'react-native';

import { config } from './config/gluestack-ui.config';

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_700Bold,
    Roboto_400Regular
  })
  return (
    <GluestackUIProvider config={config}>
      {fontsLoaded ? (
        <Center flex={1} bg='$gray500' >
          <Text fontFamily='$heading' fontSize={'$3xl'} color='$gray100'>
              Home
          </Text> 
        </Center>
      ) : ( 
        <View />
      )}
      <StatusBar 
        barStyle={'light-content'} 
        backgroundColor={'transparent'}
        translucent
      />
    </GluestackUIProvider>
  );
}



