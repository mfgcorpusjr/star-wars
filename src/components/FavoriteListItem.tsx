import { StyleSheet, View, Text, Alert } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import { Film } from "@/types";

import colors from "@/constants/colors";

type FavoriteListItemProps = {
  film: Film;
  onDelete: () => void;
};

export default function FavoriteListItem({
  film,
  onDelete,
}: FavoriteListItemProps) {
  const handleDelete = () => {
    Alert.alert("Are you sure you want to delete this favorite?", "", [
      {
        text: "Cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: onDelete,
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{film.title}</Text>

      <Ionicons
        name="trash-outline"
        color={colors.red}
        size={24}
        onPress={handleDelete}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.black,
    borderRadius: 8,
    padding: 12,
  },
  title: {
    color: colors.tint,
    fontSize: 18,
    fontWeight: "600",
  },
});
