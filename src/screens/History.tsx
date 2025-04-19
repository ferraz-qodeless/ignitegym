import { HistoryCard } from "@components/HistoryCard";
import { ScreenHeader } from "@components/ScreenHeader";
import { Heading, Text, VStack } from "@gluestack-ui/themed";
import { useState } from "react";
import { SectionList } from "react-native";

export function History() {
  const [exercises, setExercises] = useState(exercisesList)
  return (
    <VStack flex={1}>
      <ScreenHeader title="Histórico"/>
      <SectionList
        sections={exercises}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <HistoryCard />}
        renderSectionHeader={({ section }) => (
          <Heading
            fontFamily="$heading"
            color="$green500"
            fontSize="$md"
            mt="$10"
            mb="$0.5"
            ml={"$3"}
          >
            {section.title}
          </Heading>  
        )}
        style={{paddingHorizontal: 24 }}
        contentContainerStyle={
          exercises.length === 0 && {flex: 1, justifyContent: "center"}
        }
        ListEmptyComponent={() => (
          <Text color="$gray100" textAlign="center">
            Não há exercícios registrados ainda. {'\n'}
            Vamos fazer exercícios hoje?
          </Text>
        )}
        showsVerticalScrollIndicator={false}
        stickySectionHeadersEnabled={false}
      />
    </VStack>
  );
}

const exercisesList = [
  {
    title: "20/06/2025",
    data: ["Puxada frontal", "Remada curvada"],
  },
  {
    title: "20/06/2025",
    data: ["Remada unilateral"],
  },
];
