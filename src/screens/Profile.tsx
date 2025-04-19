import { ScreenHeader } from "@components/ScreenHeader";
import { UserPhoto } from "@components/UserPhoto";
import { Center, VStack } from "@gluestack-ui/themed";
import { ScrollView } from "react-native";

export function Profile() {
  return (
    <VStack flex={1}>
      <ScreenHeader title="Perfil"/>
      <ScrollView 
        contentContainerStyle={{ paddingBottom: 36 }}
      >
        <Center flex={1} px="$10" mt="$6">
          <UserPhoto source={{ uri: 'https://gitlab.com/uploads/-/system/user/avatar/26843990/avatar.png' }} alt="Foto do usuário" />
        </Center>
      </ScrollView>
    </VStack>
  );
}