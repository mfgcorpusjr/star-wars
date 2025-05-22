import { StyleSheet, Pressable, Text } from "react-native";
import { Link } from "expo-router";
import path from "path";

import { Film } from "@/types";

import colors from "@/constants/colors";

import { formatToHumanReadableDate } from "@/utils/date";

type FilmListItemProps = {
  film: Film;
};

export default function FilmListItem({ film }: FilmListItemProps) {
  const id = path.basename(film.url);

  return (
    <Link href={`/films/${id}`} asChild>
      <Pressable style={styles.container}>
        <Text style={styles.title}>{film.title}</Text>
        <Text style={styles.details}>Episode: {film.episode_id}</Text>
        <Text style={styles.details}>
          Released Date: {formatToHumanReadableDate(film.release_date)}
        </Text>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.black,
    borderRadius: 8,
    padding: 12,
  },
  title: {
    color: colors.tint,
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  details: {
    color: colors.white,
    marginBottom: 4,
  },
});
