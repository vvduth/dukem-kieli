import { COURSE_DATA } from "@/constants/CourseData";
import { Redirect, useLocalSearchParams } from "expo-router";
import { View } from "react-native";

export default function PractiseScreen() {
    const { lessonId } = useLocalSearchParams();
    const allLessons = COURSE_DATA.chapters.flatMap((chapter) => 
    chapter.review ? [...chapter.lessons, chapter.review]: chapter.lessons);
    
    const currentLesson = allLessons.find((lesson) => lesson.id === lessonId);
    const questions = currentLesson ? currentLesson.questions : [];

    if (questions.length === 0) {
        return (
            <Redirect href="/(tabs)/lessons" />
        )
    }
    return (
        <View>

        </View>
    )
}