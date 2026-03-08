import { COURSE_DATA } from "@/constants/CourseData";
import { Redirect, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import VocabIntroScreen from "@/components/lesson/VocabIntroScreeen";
export default function PractiseScreen() {
    const { lessonId } = useLocalSearchParams();
    const [isStudyingVocabulary, setIsStudyingVocabulary] = useState(true)
    const allLessons = COURSE_DATA.chapters.flatMap((chapter) => 
    chapter.review ? [...chapter.lessons, chapter.review]: chapter.lessons);
    
    const currentLesson = allLessons.find((lesson) => lesson.id === lessonId);
    const questions = currentLesson ? currentLesson.questions : [];

    if (questions.length === 0) {
        return (
            <Redirect href="/(tabs)/lessons" />
        )
    }

    if (isStudyingVocabulary) {
        return (
            <SafeAreaView style={styles.container}>
                <VocabIntroScreen questions={questions} 
                onStartLesson={() => setIsStudyingVocabulary(false)} />
            </SafeAreaView>
        )
    }
    return (
        <View>

        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});