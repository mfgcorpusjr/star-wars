import { StyleSheet, View, Text } from "react-native";

import { Film } from "@/types";

import colors from "@/constants/colors";

import { formatToHumanReadableDate } from "@/utils/date";

type FilmListItemProps = {
  film: Film;
};

export default function FilmListItem({ film }: FilmListItemProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{film.title}</Text>
      <Text style={styles.details}>Episode: {film.episode_id}</Text>
      <Text style={styles.details}>
        Released: {formatToHumanReadableDate(film.release_date)}
      </Text>
    </View>
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
  },
});
