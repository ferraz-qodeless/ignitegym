import { Center, Heading, Image, Text, VStack } from "@gluestack-ui/themed";

import BackgroundImg from '@assets/background.png';
import Logo from '@assets/logo.svg';
import { Button } from "@components/Button";
import { Input } from "@components/Input";

export function SignIn() {
  return (
    <VStack flex={1} bg="$gray700">

      <Image
        source={BackgroundImg}
        defaultSource={BackgroundImg}
        alt="Pessoas treinando"
        position="absolute"
        w="$full"
        h={624}
      />

      <VStack flex={1} px="$10" pb="$16">
        <Center my="$24">
          <Logo />
          <Text color="$gray100" fontSize="$sm">
            Treine sua mente e o seu corpo
          </Text>
        </Center>

        <Center gap="$2">
          <Heading color="$gray100" textAlign="center">
            Acesse sua conta
          </Heading>
          <Input placeholder="E-mail" keyboardType="email-address" autoCapitalize="none"/>
          <Input placeholder="Senha" secureTextEntry/>
          <Button title="Acessar"/>
        </Center>
      </VStack>

    </VStack>
  );
}
