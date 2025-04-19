import { Heading, HStack, Text, VStack } from "@gluestack-ui/themed";
import { useState } from 'react';
import { FlatList } from 'react-native';

import { ExeciseCard } from "@components/ExerciseCard";
import { Group } from '@components/Group';
import { HomeHeader } from "@components/HomeHeader";

export function Home() {
  const [groups, setGroups] = useState<string[]>(["Bíceps", "Tríceps", "Costa", "Ombro"]);
  const [groupSelected, setGroupSelected] = useState<string>("costa");
  return (
    <VStack flex={1}>
      <HomeHeader />
      <FlatList
        data={groups}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Group
            name={item}
            isActive={groupSelected === item}
            onPress={() => setGroupSelected(item)}
          /> 
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 32 }}
        style={{ marginVertical: 40, maxHeight: 44, minWidth: 44 }}
      />
      <VStack px={"$8"}>
        <HStack justifyContent="space-between" mb={"$5"} alignItems="center">
          <Heading color="$gray200" fontSize="$md" fontFamily="$heading">
            Exercícios
          </Heading>
          <Text color="$gray200" fontSize="$sm" fontFamily="$body">
            {groups.length}
          </Text>
        </HStack>
        <ExeciseCard name="Puxada frontal"/>
      </VStack>
    </VStack>
  );
}
