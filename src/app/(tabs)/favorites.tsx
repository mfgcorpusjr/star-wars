import { useState, useCallback } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { useFocusEffect } from "expo-router";

import ListEmptyComponent from "@/components/ListEmptyComponent";
import FavoriteListItem from "@/components/FavoriteListItem";

import { Film } from "@/types";

import { getFavorites, deleteFavorite } from "@/utils/favorites";

export default function FavoritesScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [favorites, setFavorites] = useState<Film[]>([]);

  useFocusEffect(
    useCallback(() => {
      fetchFavorites();
    }, [])
  );

  const fetchFavorites = async () => {
    try {
      setIsLoading(true);
      setFavorites(await getFavorites());
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (film: Film) => {
    try {
      await deleteFavorite(film);
      await fetchFavorites();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        renderItem={({ item }) => (
          <FavoriteListItem film={item} onDelete={() => handleDelete(item)} />
        )}
        keyExtractor={(item) => item.episode_id.toString()}
        ListEmptyComponent={
          <ListEmptyComponent
            isLoading={isLoading}
            message="No favorites found"
          />
        }
        contentContainerStyle={styles.favoritesContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  favoritesContainer: {
    gap: 12,
    padding: 12,
  },
});
