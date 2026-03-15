import { ListeningOption } from "@/constants/CourseData";
import { Colors } from "@/constants/theme";
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { ThemedText } from "../themed-text";

export default function ListeningMultipleChoiceMode({
  options,
  selectedOption,
  handleOptionPress,
  isLoading,
  showResult,
}: {
  options: ListeningOption[];
  selectedOption: number | null;
  handleOptionPress: (id: number) => void;
  isLoading: boolean;
  showResult: boolean;
}) {
    return (
        <View></View>
    )
}

const styles = StyleSheet.create({
  sectionTitle: {
    marginBottom: 20,
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
  promptContainer: {
    justifyContent: "center",
    alignItems: "center",
    minHeight: 50,
  },
  optionsScrollView: {
    flex: 1,
  },
  optionsContentContainer: {
    paddingBottom: 0,
  },
  optionButton: {
    padding: 20,
    borderRadius: 12,
    borderWidth: 2,
    overflow: "visible",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
    }),
  },
  selectedOption: {
    ...Platform.select({
      ios: {
        shadowOpacity: 0.2,
      },
      android: {
        borderWidth: 3,
      },
    }),
  },
  optionText: {
    fontSize: 16,
    fontWeight: "500",
    flex: 1,
  },
});