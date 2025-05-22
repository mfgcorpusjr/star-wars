import { StyleSheet, View, Text, ActivityIndicator } from "react-native";

import colors from "@/constants/colors";

type ListEmptyComponentProps = {
  isLoading?: boolean;
  message?: string;
};

export default function ListEmptyComponent({
  isLoading,
  message = "No items found",
}: ListEmptyComponentProps) {
  if (isLoading) {
    return <ActivityIndicator color={colors.tint} />;
  } else {
    return <Text style={styles.message}>{message}</Text>;
  }
}

const styles = StyleSheet.create({
  message: {
    color: colors.white,
    fontSize: 16,
    textAlign: "center",
  },
});
