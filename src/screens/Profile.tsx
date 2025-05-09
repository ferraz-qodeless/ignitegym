import defaultUserPhotoImg from '@assets/userPhotoDefault.png'
import { Button } from '@components/Button'
import { Input } from '@components/Input'
import { ScreenHeader } from '@components/ScreenHeader'
import { ToastMessage } from '@components/ToastMessage'
import { UserPhoto } from '@components/UserPhoto'
import { Center, Heading, Text, useToast, VStack } from '@gluestack-ui/themed'
import { yupResolver } from '@hookform/resolvers/yup'
import { useAuth } from '@hooks/useAuth'
import { api } from '@services/api'
import { AppError } from '@utils/AppError'
import * as FileSystem from 'expo-file-system'
import * as ImagePicker from 'expo-image-picker'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { ScrollView, TouchableOpacity } from 'react-native'
import * as yup from 'yup'


type FormDataProps = {
  name: string;
  email: string;
  password: string;
  old_password: string;
  confirm_password: string;
}

const profileSchema = yup.object({
  name: yup
    .string()
    .required('Informe o nome'),
  password: yup
    .string()
    .min(6, 'A senha deve ter pelo menos 6 dígitos.')
    .nullable()
    .transform((value) => !!value ? value : null),
  confirm_password: yup
    .string()
    .nullable()
    .transform((value) => !!value ? value : null)
    .oneOf([yup.ref('password'), null], 'A confirmação de senha não confere.')
    .when('password', {
      is: (Field: any) => Field, 
      then: yup
        .string()
        .nullable()
        .required('Informe a confirmação da senha.')
        .transform((value) => !!value ? value : null)
    }),
})

export function Profile() {
  const [isLoading, setIsLoading] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)

  const toast = useToast()
  const { user, updateUserProfile } = useAuth()
  const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({ 
    defaultValues: { 
      name: user.name,
      email: user.email
    },
    resolver: yupResolver(profileSchema) 
  });

  async function handleUserPhotoSelect() {
    setIsLoading(true)
    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
      })
      if (photoSelected.canceled) {
        return
      }
      const photoUri = photoSelected.assets[0].uri
  
      if (photoUri) {
        const photoInfo = await FileSystem.getInfoAsync(photoUri) as {
          size: number
        }
        if (photoInfo.size && photoInfo.size / 1024 / 1024 > 5) {
          return toast.show({
            placement: 'top',
            render: ({id}) => (
              <ToastMessage 
                id={id}
                title="Imagem muito grande"
                description="Escolha uma imagem com no máximo 5MB"
                action="error" 
                onClose={() => toast.close(id)}
              />
            )
          })
        }
        const fileExtension = photoUri.split('.').pop()
        const photoFile = {
          name: `${user.name}.${fileExtension}`.replace(' ', '').toLowerCase(),
          uri: photoUri,
          type: `${photoSelected.assets[0].type}/${fileExtension}`
        } as any
        const userPhotoUploadForm = new FormData()
        userPhotoUploadForm.append('avatar', photoFile)

        const avatarUpdatedResponse = await api.patch('/users/avatar', userPhotoUploadForm, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        const userUpdated = user
        userUpdated.avatar = avatarUpdatedResponse.data.avatar
        await updateUserProfile(userUpdated)

        toast.show({
          placement: 'top',
          render: ({id}) => (
            <ToastMessage
              id={id}
              title="Foto atualizada"
              description="Sua foto foi atualizada com sucesso"
              action="success"
              onClose={() => toast.close(id)}
            />
          )
        })
        console.log(avatarUpdatedResponse.data)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  async function handleProfileUpdate(data: FormDataProps) {
    try {
      setIsUpdating(true)
      const userUpdated = user
      userUpdated.name = data.name
      const userUpdatedResponse = await api.put('/users', data)
      await updateUserProfile(userUpdated)
      toast.show({
        placement: 'top',
        render: ({id}) => (
          <ToastMessage
            id={id}
            title="Perfil atualizado"
            description="Perfil atualizado com sucesso"
            action="success"
            onClose={() => toast.close(id)}
          />
        )
      })
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : 'Nao foi possivel atualizar o perfil. Tente novamente mais tarde.';
      toast.show({
        placement: 'top',
        render: ({id}) => (
          <ToastMessage
            id={id}
            title={title}
            description="Nao foi possivel atualizar o perfil. Tente novamente mais tarde."
            action="error"
            onClose={() => toast.close(id)}
          />
        )
      })
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <VStack flex={1}>
      <ScreenHeader title="Perfil" />
      <ScrollView contentContainerStyle={{ paddingBottom: 36 }}>
        <Center mt="$6" px="$10">
          <UserPhoto
            source={
              user.avatar 
              ? { uri: `${api.defaults.baseURL}/avatar/${user.avatar}` } 
              : defaultUserPhotoImg
            }
            size="xl"
            alt="Imagem do usuário"
          />

          <TouchableOpacity onPress={handleUserPhotoSelect}>
            <Text
              color="$green500"
              fontFamily="$heading"
              fontSize="$md"
              mt="$2"
              mb="$8"
            >
              Alterar Foto
            </Text>
          </TouchableOpacity>

          <Center w="$full" gap="$4">
            <Controller
              control={control}
              name='name'
              render={({ field: { value, onChange } }) => (
                <Input
                  placeholder="Nome"
                  bg="$gray600"
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.name?.message}
                />
              )}
            />
            <Controller
              control={control}
              name='email'
              render={({ field: { value, onChange } }) => (
                <Input
                  placeholder="E-mail"
                  bg="$gray600"
                  onChangeText={onChange}
                  value={value}
                  isReadOnly
                />
              )}
            />
          </Center>

          <Heading
            alignSelf='flex-start'
            fontFamily="$heading"
            color="$gray200"
            fontSize="$md"
            mt="$12"
            mb="$2"
          >
            Alterar senha
          </Heading>

          <Center w="$full" gap="$4">
            <Controller
                control={control}
                name='old_password'
                render={({ field: { onChange } }) => (
                <Input
                  placeholder="Senha antiga"
                  bg="$gray600"
                  onChangeText={onChange}
                  errorMessage={errors.old_password?.message}
                  secureTextEntry
                />
                )}
              />
            <Controller
              control={control}
              name='password'
              render={({ field: { onChange } }) => (
                <Input
                  placeholder="Nova senha"
                  bg="$gray600"
                  onChangeText={onChange}
                  errorMessage={errors.password?.message}
                  secureTextEntry
                />
              )}
            />
            <Controller
              control={control}
              name='confirm_password'
              render={({ field: { onChange } }) => (
                <Input
                  placeholder="Confirme a nova senha"
                  bg="$gray600"
                  onChangeText={onChange}
                  errorMessage={errors.confirm_password?.message}
                  secureTextEntry
                />
              )}
            />
            <Button 
              title="Atualizar" 
              mt={4} 
              onPress={handleSubmit(handleProfileUpdate)}
              isLoading={isUpdating}
            />
          </Center>
        </Center>
      </ScrollView>
    </VStack>
  )
}