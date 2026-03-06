import { supabase } from "@/utils/supabase";
import * as QueryParams from "expo-auth-session/build/QueryParams";
import * as Linking from "expo-linking";
import { useEffect } from "react";
import { toast } from "sonner-native";
const createSessionFromUrl = async (url: string) => {
    const {params, errorCode} = QueryParams.getQueryParams(url);
    if (errorCode) {
        console.error("Error during deep linking:", errorCode);
        throw new Error(errorCode);
    }
    const {access_token, refresh_token} = params;
    if (!access_token) {
        return;
    }

    const {data, error} = await supabase.auth.setSession({
        access_token,
        refresh_token,
    })

    if (error) {
        console.error("Error setting session from deep link:", error);
        throw error;
    }

    return data.session;
}

export const useDeepLinking = () => {
    const url = Linking.useLinkingURL();
    useEffect(() => {
        if (url) {
            createSessionFromUrl(url)
            .then((session) => {
                if (!session) {
                    console.log('Session created from deep link')
                }
            }).catch((error) => {
                console.error("Failed to create session from deep link:", error);
                toast.error("Failed to sign in with magic link. Please try again.")
            })
        }
    }, [url])
}