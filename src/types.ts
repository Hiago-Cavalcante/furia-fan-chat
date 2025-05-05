export interface User {
    id: string;
    name: string;
    avatar?: string;
}

export interface Message {
    id: string;
    text: string;
    user: User;
    timestamp: number;
    likes?: number;
}

export enum GameStatus {
    UPCOMING = 'upcoming',
    LIVE = 'live',
    FINISHED = 'finished',
}

export interface Game {
    id: string;
    opponent: string;
    tournament: string;
    date: string;
    time: string;
    status: GameStatus;
    map?: string;
    score?: {
        furia: number;
        opponent: number;
    };
}

export interface LiveStats {
    gameId: string;
    currentMap: string;
    currentRound: number;
    playersAlive: {
        furia: number;
        opponent: number;
    };
    score: {
        furia: number;
        opponent: number;
    };
    timeLeft?: string;
}