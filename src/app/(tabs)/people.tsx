import { useState, useCallback } from "react";
import { StyleSheet, View, FlatList, RefreshControl } from "react-native";
import { useFocusEffect } from "expo-router";

import ListEmptyComponent from "@/components/ListEmptyComponent";
import CharacterListItem from "@/components/CharacterListItem";

import { People, Character } from "@/types";

import colors from "@/constants/colors";

export default function PeopleScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [characters, setCharacters] = useState<Character[]>([]);

  useFocusEffect(
    useCallback(() => {
      getCharacters();
    }, [])
  );

  const getCharacters = async () => {
    try {
      setIsLoading(true);

      const response = await fetch(
        "https://www.swapi.tech/api/people?page=9&limit=82"
      );
      const data = await response.json();

      const characters = await Promise.all(
        data.results.map(async (r: People) => {
          const response = await fetch(r.url);
          const data = await response.json();

          return data.result.properties;
        })
      );

      setCharacters(characters);
    } catch (error) {
      console.log(error);
    } finally {
      setIsRefreshing(false);
      setIsLoading(false);
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    getCharacters();
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={characters}
        renderItem={({ item }) => <CharacterListItem character={item} />}
        keyExtractor={(item) => item.name}
        ListEmptyComponent={
          <ListEmptyComponent
            isLoading={isLoading}
            message="No characters found"
          />
        }
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            tintColor={colors.tint}
          />
        }
        contentContainerStyle={styles.charactersContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  charactersContainer: {
    gap: 12,
    padding: 12,
  },
});
