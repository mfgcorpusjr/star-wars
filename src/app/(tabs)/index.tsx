import { useState, useCallback } from "react";
import { StyleSheet, View, FlatList, RefreshControl } from "react-native";
import { useFocusEffect } from "expo-router";

import ListEmptyComponent from "@/components/ListEmptyComponent";
import FilmListItem from "@/components/FilmListItem";

import { Film } from "@/types";

import colors from "@/constants/colors";

export default function HomeScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [films, setFilms] = useState<Film[]>();

  useFocusEffect(
    useCallback(() => {
      getFilms();
    }, [])
  );

  const getFilms = async () => {
    try {
      setIsLoading(true);

      const response = await fetch("https://www.swapi.tech/api/films/");
      const data = await response.json();

      setFilms(data.result.map((r: any) => r.properties));
    } catch (error) {
      console.log(error);
    } finally {
      setIsRefreshing(false);
      setIsLoading(false);
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    getFilms();
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={films}
        renderItem={({ item }) => <FilmListItem film={item} />}
        keyExtractor={(item) => item.episode_id.toString()}
        ListEmptyComponent={
          <ListEmptyComponent isLoading={isLoading} message="No films found" />
        }
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            tintColor={colors.tint}
          />
        }
        contentContainerStyle={styles.filmsContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  filmsContainer: {
    gap: 12,
    padding: 12,
  },
});
