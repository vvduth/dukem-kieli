import { Session, User } from "@supabase/supabase-js"
import React from "react"

type AuthContextType = {
    session : Session | null,
    user: User | null,
    profile: any | null,
    loading: boolean,
    isAdmin: boolean,
    isPremium: boolean,
    premiumExpiresAt: string | null,
    refreshProfile: () => Promise<void>,
}

export const AuthContext = React.createContext<AuthContextType>({
    session: null,
    user: null,
    profile: null,
    loading: true, 
    isAdmin: false,
    isPremium: false,
    premiumExpiresAt: null,
    refreshProfile: async () => {},
})

export const useAuth = () => React.useContext(AuthContext)