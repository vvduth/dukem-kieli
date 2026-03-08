
import { getWeeklyStats } from '@/lib/speakingListeningStats';
import { useEffect, useState } from 'react';
interface WeeklyStats {
    minutesSpoken: number;
    minutesListened: number;
    weeklyChange: {
        spoken: number; // percentage change in minutes spoken compared to the previous week
        listened: number; // percentage change in minutes listened compared to the previous week
    }
}

export const useSpeakingListeningStats = () => {
    const [stats, setStats] = useState<WeeklyStats | null>(null)
    const [loading, setLoading] = useState(true)

    const refresh = async () => {
        try {
            const weeklyStats = await getWeeklyStats()
            setStats(weeklyStats)
        } catch (error) {
            console.error('Error fetching weekly stats:', error)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        refresh()
    }, [])
    return { stats, loading, refresh }
}