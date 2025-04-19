import { Heading, HStack, Icon, Image, Text, VStack } from '@gluestack-ui/themed'
import { useNavigation } from '@react-navigation/native'
import { AppNavigatorRoutesProps } from '@routes/app.routes'
import { ArrowLeft } from 'lucide-react-native'
import { TouchableOpacity } from 'react-native'

import BodySvg from '@assets/body.svg'

export function Exercise() {
  const navigation = useNavigation<AppNavigatorRoutesProps>()

  function handleGoBack() {
    navigation.goBack()
  }
  return (
    <VStack flex={1}>
      <VStack px="$8" bg="$gray600" pt="$12">
        <TouchableOpacity onPress={handleGoBack}>
          <Icon as={ArrowLeft} color="$green500" size="xl" />
        </TouchableOpacity>

        <HStack
          justifyContent="space-between"
          alignItems="center"
          mt="$4"
          mb="$8"
        >
          <Heading
            color="$gray100"
            fontFamily="$heading"
            fontSize="$lg"
            flexShrink={1}
          >
            Puxada frontal
          </Heading>
          <HStack alignItems="center">
            <BodySvg />

            <Text color="$gray200" ml="$1" textTransform="capitalize">
              Costas
            </Text>
          </HStack>
        </HStack>
      </VStack>

      <VStack p="$8">
        <Image
          source={{
            uri: "https://i.pinimg.com/236x/d9/3e/ab/d93eab197856c92e3ed17dad3196ee7e.jpg"
          }}
          alt="Exercício"
          resizeMode="cover"
          rounded="$lg"
          mb={"$3"}
          w="$full"
          h="$80"
        />
      </VStack>
    </VStack>
  )
}