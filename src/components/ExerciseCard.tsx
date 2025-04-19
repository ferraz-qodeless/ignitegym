import { Heading, HStack, Icon, Image, Text, VStack } from '@gluestack-ui/themed';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

import { ChevronRight } from 'lucide-react-native';

type ExerciseCardProps = TouchableOpacityProps & {
  name: string
}

export function ExerciseCard({ ...props }: ExerciseCardProps) {
  return (
    <TouchableOpacity {...props}>
      <HStack bg='$gray500' alignItems='center' p='$2' pr={"$4"} mb={'$3'} rounded={'md'}>
        <Image
          alt={"Imagem do exercício"}
          source={{
            uri: "https://i.pinimg.com/236x/d9/3e/ab/d93eab197856c92e3ed17dad3196ee7e.jpg"
          }}
          w={"$16"}
          h={"$16"}
          rounded={"md"}
          mr={"$4"}
          resizeMode='cover'
        />
        <VStack flex={1}>
          <Heading  fontSize="$lg" color="$white" fontFamily="$heading">
            {props.name}
          </Heading>
          <Text fontSize="$sm" color="$gray200" mt={"$1"} fontFamily="$body" numberOfLines={2}>
            3 séries x 12 repetições 
          </Text>
        </VStack>
        <Icon as={ChevronRight} color="$gray300" size={"lg"} />
      </HStack>
    </TouchableOpacity>
  )
}