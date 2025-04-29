import { HistoryCard } from "@components/HistoryCard";
import { ScreenHeader } from "@components/ScreenHeader";
import { ToastMessage } from "@components/ToastMessage";
import { HistoryByDayDTO } from "@dtos/HistoryByDayDTO";
import { Heading, Text, useToast, VStack } from "@gluestack-ui/themed";
import { useFocusEffect } from "@react-navigation/native";
import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import { useCallback, useState } from "react";
import { SectionList } from "react-native";

export function History() {
  const [isLoading, setIsLoading] = useState(true)
  const [exercises, setExercises] = useState<HistoryByDayDTO[]>([]);

  const toast = useToast()

  async function fetchHistory() {
    try {
      setIsLoading(true)
      const response = await api.get('/history')
      setExercises(response.data)
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : 'Nao foi possivel carregar o histórico.';
      toast.show({
        placement: 'top',
        render: ({id}) => (
          <ToastMessage
            title="Erro ao carregar o histórico."
            id={id}
            description={title}
            action="error"
            onClose={() => toast.close(id)}
          />
        )
      })
    } finally {
      setIsLoading(false)
    }
  }
  useFocusEffect(useCallback(() => {
    fetchHistory()
  }, []))
  return (
    <VStack flex={1}>
      <ScreenHeader title="Histórico de Exercícios"/>
      <SectionList
        sections={exercises}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <HistoryCard data={item} />}
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
