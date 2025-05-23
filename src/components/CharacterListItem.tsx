import { StyleSheet, View, Text } from "react-native";

import { Character } from "@/types";

import colors from "@/constants/colors";

type CharacterListItemProps = {
  character: Character;
};

export default function CharacterListItem({
  character,
}: CharacterListItemProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{character.name}</Text>
      <Text style={styles.details}>Birth Year: {character.birth_year}</Text>
      <Text style={styles.details}>Gender: {character.gender}</Text>
      <Text style={styles.details}>Height: {character.height} cm</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.black,
    borderRadius: 8,
    padding: 12,
  },
  name: {
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
