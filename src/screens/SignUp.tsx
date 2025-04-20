import { Center, Heading, Image, ScrollView, Text, VStack } from "@gluestack-ui/themed";

import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";

import BackgroundImg from '@assets/background.png';
import Logo from '@assets/logo.svg';

import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { Controller, useForm } from "react-hook-form";

type FormDataProps = {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export function SignUp() {

  const { control, handleSubmit, formState: {errors}} = useForm<FormDataProps>();

  const { navigate } = useNavigation<AuthNavigatorRoutesProps>();
  
  function handleNavigateToSignIn() {
    navigate('signIn')
  }

  function handleSignUp({ name, email, password, passwordConfirm }: FormDataProps ) {
    console.log({name, email, password, passwordConfirm})
  }

  return (
    <ScrollView 
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1}>
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
          <Center gap="$2" flex={1}>
            <Heading color="$gray100" textAlign="center">
              Crie sua conta
            </Heading>

            <Controller
              control={control}
              name="name"
              rules={{ 
                required: 'Informe seu nome' 
              }}
              render={({ field: { onChange, value } }) => (
                <Input 
                  placeholder="Nome"
                  autoCapitalize="none"
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
            {errors.name?.message && (<Text color="$gray100">{errors.name.message}</Text>)}

            <Controller
              control={control}
              name="email"
              rules={{
                required: 'Informe o email.',
                pattern: {
                  value:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'E-mail inválido'
                }
              }}
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="E-mail"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
             {errors.email?.message && (<Text color="white">{errors.email?.message}</Text>)}

            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="Senha"
                  secureTextEntry
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />

            <Controller
              control={control}
              name="passwordConfirm"
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="Confirmar senha"
                  secureTextEntry
                  onChangeText={onChange}
                  value={value}
                  onSubmitEditing={handleSubmit(handleSignUp)}
                  returnKeyType="send"
                />
              )}
            />
            
            <Button title="Criar e acessar" onPress={handleSubmit(handleSignUp)}/>
          </Center>
          <Button title="Voltar para login" variant="outline" mt={"$12"} onPress={handleNavigateToSignIn}/>
        </VStack>
      </VStack>
    </ScrollView>
  );
}
