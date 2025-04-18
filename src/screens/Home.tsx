import { Center, Text } from "@gluestack-ui/themed";

export function Home() {
  return (
    <Center flex={1} px="$4" py="$6">
      <Text fontSize="$xl" fontWeight="$semibold" textAlign="center">
        Home
      </Text>
    </Center>
  );
}
