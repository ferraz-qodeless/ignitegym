import { Center, Heading, Image, ScrollView, Text, useToast, VStack } from "@gluestack-ui/themed";

import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";

import BackgroundImg from '@assets/background.png';
import Logo from '@assets/logo.svg';

import { Button } from "@components/Button";
import { Input } from "@components/Input";

import { ToastMessage } from "@components/ToastMessage";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "@hooks/useAuth";
import { AppError } from "@utils/AppError";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from 'yup';

type FormDataProps = {
  email: string
  password: string
}

const signInSchema = yup.object({
  email: yup
    .string()
    .required('Informe o e-mail'),
  password: yup
    .string()
    .required('Informe a senha')
})

export function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuth();
  const toast = useToast()

  const { navigate } = useNavigation<AuthNavigatorRoutesProps>();

  const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
    resolver: yupResolver(signInSchema)
  })  
  
  function handleNewAccount() {
    navigate('signUp')
  }

  async function handleSignIn({ email, password }: FormDataProps) {
    try {
      setIsLoading(true);
      await signIn(email, password);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : 'Nao foi possivel entrar. Tente novamente mais tarde';
      setIsLoading(false);
      toast.show({
        placement: 'top',
        render: ({id}) => (
          <ToastMessage 
            id={id}
            title="Erro ao entrar."
            description={title}
            action="error" 
            onClose={() => toast.close(id)}
          />
        )
      })
    }
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
          <Center gap="$2" mt={"$8"}>
            <Heading color="$gray100" textAlign="center">
              Acesse sua conta
            </Heading>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="E-mail"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onChangeText={onChange}
                  value={value}
                  onSubmitEditing={handleSubmit(handleNewAccount)}
                  errorMessage={errors.email?.message}
                /> 
              )}
            />
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="Senha"
                  secureTextEntry
                  onChangeText={onChange}
                  value={value}
                  onSubmitEditing={handleSubmit(handleNewAccount)}
                  errorMessage={errors.password?.message}
                /> 
              )}
            />
            <Button
              title="Acessar"
              onPress={handleSubmit(handleSignIn)}
              isLoading={isLoading}
            />
          </Center>
          <Center flex={1} justifyContent="flex-end">
            <Text color="$gray100" fontSize="$sm" mb="$2" fontFamily="$body">
              Ainda não tem acesso?
            </Text>
            <Button title="Criar conta" variant="outline" onPress={handleNewAccount}/>
          </Center>
        </VStack>
      </VStack>
    </ScrollView>
  );
}
