import { useState, useCallback } from "react";
import { StyleSheet, ScrollView, Text, ActivityIndicator } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  useLocalSearchParams,
  useFocusEffect,
  Stack,
  Redirect,
} from "expo-router";

import { Film } from "@/types";

import colors from "@/constants/colors";

import { formatToHumanReadableDate } from "@/utils/date";
import { isFavorite, toggleFavorite } from "@/utils/favorites";

export default function FilmDetailsScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [film, setFilm] = useState<Film>();
  const [favorite, setFavorite] = useState(false);

  const { id } = useLocalSearchParams();

  useFocusEffect(
    useCallback(() => {
      const getFilm = async () => {
        try {
          const response = await fetch(
            `https://www.swapi.tech/api/films/${id}`
          );
          const data = await response.json();

          const filmData = data.result.properties;
          setFilm(filmData);
          setFavorite(await isFavorite(filmData));
        } catch (error) {
          console.log(error);
        } finally {
          setIsLoading(false);
        }
      };

      getFilm();
    }, [])
  );

  const handleToggleFavorite = async () => {
    try {
      setFavorite((v) => !v);
      await toggleFavorite(film!);
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return <ActivityIndicator color={colors.tint} style={{ padding: 12 }} />;
  }

  if (!film) {
    return <Redirect href="/films" />;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Stack.Screen
        options={{
          headerRight: () => (
            <Ionicons
              name={favorite ? "star" : "star-outline"}
              color={colors.tint}
              size={24}
              onPress={handleToggleFavorite}
            />
          ),
        }}
      />

      <Text style={styles.title}>{film.title}</Text>

      <Text style={styles.details}>
        <Text style={styles.detailsLabel}>Episode:</Text> {film.episode_id}
      </Text>
      <Text style={styles.details}>
        <Text style={styles.detailsLabel}>Director:</Text> {film.director}
      </Text>
      <Text style={styles.details}>
        <Text style={styles.detailsLabel}>Producer:</Text> {film.producer}
      </Text>
      <Text style={styles.details}>
        <Text style={styles.detailsLabel}>Released Date:</Text>{" "}
        {formatToHumanReadableDate(film.release_date)}
      </Text>

      <Text style={styles.openingCrawl}>{film.opening_crawl}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
  title: {
    color: colors.tint,
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 16,
  },
  details: {
    color: colors.white,
    fontSize: 16,
    marginBottom: 8,
  },
  detailsLabel: {
    color: colors.grey,
  },
  openingCrawl: {
    color: colors.white,
    fontSize: 16,
    fontStyle: "italic",
    marginTop: 8,
  },
});
