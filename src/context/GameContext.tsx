import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";

import {
    getCountries,
    getCapital,
    type Country,
} from "../services/countriesApi";

const TOTAL_ROUNDS = 15;

export interface GameResult {
    score: number;
    time: number;
    date: string;
}

export interface PlayerData {
    name: string;
    games: number;
    bestScore: number;
    bestTime: number;
}

export interface Notification {
    id: number;
    points: number;
    reason: string;
}

interface GameContextType {
    countries: Country[];
    currentCountry: Country | null;

    playerName: string;

    score: number;
    currentRound: number;

    // Tiempo total de la partida
    elapsedTime: number;

    // Tiempo de la bandera actual
    flagTime: number;

    gameActive: boolean;
    gameFinished: boolean;

    loading: boolean;

    notifications: Notification[];

    leaderboard: PlayerData[];
    history: GameResult[];

    lettersHintUsed: boolean;
    firstLetterHintUsed: boolean;
    capitalHintUsed: boolean;

    // Indica si ya se usó una ayuda en ESTA bandera
    hintUsedThisRound: boolean;

    lettersHint: string | null;
    firstLetterHint: string | null;
    capitalHint: string | null;

    skippedCountry: string | null;

    setPlayerName: (name: string) => void;

    startGame: () => void;

    guess: (answer: string) => void;

    skipCountry: () => void;

    useLettersHint: () => void;
    useFirstLetterHint: () => void;
    useCapitalHint: () => void;

    resetNotifications: () => void;
}

const GameContext =
    createContext<GameContextType | undefined>(
        undefined
    );

interface GameProviderProps {
    children: ReactNode;
}

export function GameProvider({
    children,
}: GameProviderProps) {
    const [countries, setCountries] =
        useState<Country[]>([]);

    const [currentCountry, setCurrentCountry] =
        useState<Country | null>(null);

    const [playerName, setPlayerName] =
        useState<string>(
            localStorage.getItem(
                "currentPlayer"
            ) || ""
        );

    const [score, setScore] =
        useState<number>(0);

    const [currentRound, setCurrentRound] =
        useState<number>(0);

    // Tiempo total de toda la partida
    const [elapsedTime, setElapsedTime] =
        useState<number>(0);

    // Tiempo de la bandera actual
    const [flagTime, setFlagTime] =
        useState<number>(0);

    const [gameActive, setGameActive] =
        useState<boolean>(false);

    const [gameFinished, setGameFinished] =
        useState<boolean>(false);

    const [loading, setLoading] =
        useState<boolean>(true);

    const [pendingStart, setPendingStart] =
        useState<boolean>(false);

    const [notifications, setNotifications] =
        useState<Notification[]>([]);

    const [leaderboard, setLeaderboard] =
        useState<PlayerData[]>([]);

    const [history, setHistory] =
        useState<GameResult[]>([]);

    const [skippedCountry, setSkippedCountry] =
    useState<string | null>(null);

    // ----------------------------------------
    // AYUDAS
    // ----------------------------------------

    const [lettersHintUsed, setLettersHintUsed] =
        useState<boolean>(false);

    const [
        firstLetterHintUsed,
        setFirstLetterHintUsed,
    ] = useState<boolean>(false);

    const [
        capitalHintUsed,
        setCapitalHintUsed,
    ] = useState<boolean>(false);

    // Esta variable controla que solo haya
    // UNA ayuda por bandera.
    const [
        hintUsedThisRound,
        setHintUsedThisRound,
    ] = useState<boolean>(false);

    const [lettersHint, setLettersHint] =
        useState<string | null>(null);

    const [
        firstLetterHint,
        setFirstLetterHint,
    ] = useState<string | null>(null);

    const [capitalHint, setCapitalHint] =
        useState<string | null>(null);

    // ----------------------------------------
    // CARGAR PAÍSES
    // ----------------------------------------

    useEffect(() => {
        async function loadCountries() {
            try {
                const data =
                    await getCountries();

                setCountries(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        loadCountries();
    }, []);

    // ----------------------------------------
    // INICIAR PARTIDA CUANDO YA
    // ESTÁN LOS PAÍSES
    // ----------------------------------------

    useEffect(() => {
        if (
            pendingStart &&
            countries.length > 0
        ) {
            setPendingStart(false);

            setScore(0);
            setCurrentRound(1);
            setElapsedTime(0);
            setFlagTime(0);

            setGameFinished(false);
            setGameActive(true);

            setLettersHintUsed(false);
            setFirstLetterHintUsed(false);
            setCapitalHintUsed(false);

            setHintUsedThisRound(false);

            setLettersHint(null);
            setFirstLetterHint(null);
            setCapitalHint(null);

            resetNotifications();

            chooseRandomCountry();
        }
    }, [pendingStart, countries]);

    // ----------------------------------------
    // LEADERBOARD
    // ----------------------------------------

    useEffect(() => {
        const savedLeaderboard =
            localStorage.getItem(
                "leaderboard"
            );

        if (savedLeaderboard) {
            setLeaderboard(
                JSON.parse(savedLeaderboard)
            );
        }
    }, []);

    // ----------------------------------------
    // HISTORIAL
    // ----------------------------------------

    useEffect(() => {
        if (!playerName) {
            setHistory([]);
            return;
        }

        const allHistory =
            JSON.parse(
                localStorage.getItem(
                    "gameHistory"
                ) || "{}"
            );

        setHistory(
            allHistory[playerName] || []
        );
    }, [playerName]);

    // ----------------------------------------
    // TIEMPO TOTAL
    // ----------------------------------------

    useEffect(() => {
        if (!gameActive) return;

        const interval =
            setInterval(() => {
                setElapsedTime(
                    (previousTime) =>
                        previousTime + 1
                );
            }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [gameActive]);

    // ----------------------------------------
    // TIEMPO DE LA BANDERA
    // ----------------------------------------

    useEffect(() => {
        if (!gameActive) return;

        const interval =
            setInterval(() => {
                setFlagTime(
                    (previousTime) =>
                        previousTime + 1
                );
            }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [
        gameActive,
        currentCountry,
    ]);

    // ----------------------------------------
    // PENALIZACIÓN POR TIEMPO
    //
    // 0 - 20 segundos → nada
    // 22 segundos → -1
    // 24 segundos → -1
    // 26 segundos → -1
    // etc.
    //
    // SE REINICIA EN CADA BANDERA
    // ----------------------------------------

    useEffect(() => {
        if (!gameActive) return;

        if (
            flagTime > 20 &&
            flagTime % 2 === 0
        ) {
            setScore((previousScore) =>
                Math.max(
                    0,
                    previousScore - 1
                )
            );

            addNotification(
                -1,
                "Penalización por tiempo"
            );
        }
    }, [flagTime, gameActive]);

    // ----------------------------------------
    // NOTIFICACIONES
    // ----------------------------------------

    function addNotification(
        points: number,
        reason: string
    ): void {
        const notification: Notification = {
            id:
                Date.now() +
                Math.random(),

            points,
            reason,
        };

        setNotifications(
            (previous) => [
                ...previous,
                notification,
            ]
        );

        // IMPORTANTE:
        // Ya NO se eliminan automáticamente.
    }

    function resetNotifications(): void {
        setNotifications([]);
    }

    // ----------------------------------------
    // ELEGIR PAÍS
    // ----------------------------------------

    function chooseRandomCountry(
        previousCountry?: Country | null
    ): void {
        if (countries.length === 0) {
            return;
        }

        let randomCountry: Country;

        do {
            randomCountry =
                countries[
                    Math.floor(
                        Math.random() *
                            countries.length
                    )
                ];
        } while (
            countries.length > 1 &&
            randomCountry.name ===
                previousCountry?.name
        );

        setCurrentCountry(
            randomCountry
        );
    }

    // ----------------------------------------
    // COMENZAR PARTIDA
    // ----------------------------------------

    function startGame(): void {
        if (countries.length === 0) {
            setPendingStart(true);
            return;
        }

        setPendingStart(false);

        setScore(0);

        setCurrentRound(1);

        setElapsedTime(0);

        setFlagTime(0);

        setGameFinished(false);

        setGameActive(true);

        setLettersHintUsed(false);

        setFirstLetterHintUsed(false);

        setCapitalHintUsed(false);

        setHintUsedThisRound(false);

        setLettersHint(null);

        setFirstLetterHint(null);

        setCapitalHint(null);

        resetNotifications();

        chooseRandomCountry();
    }

    // ----------------------------------------
    // SIGUIENTE PAÍS
    // ----------------------------------------

    function nextCountry(): void {
        chooseRandomCountry(
            currentCountry
        );

        // Reiniciamos el tiempo
        // de la bandera.
        setFlagTime(0);

        // Reiniciamos las ayudas
        // de la bandera actual.
        setLettersHint(null);

        setFirstLetterHint(null);

        setCapitalHint(null);

        // IMPORTANTE:
        // Las ayudas que ya fueron usadas
        // en la partida siguen marcadas como usadas.

        setHintUsedThisRound(false);

        setCurrentRound(
            (previousRound) =>
                previousRound + 1
        );
    }

    // ----------------------------------------
    // FINALIZAR PARTIDA
    // ----------------------------------------

    function finishGame(
        finalScore: number
    ): void {
        setGameActive(false);

        setGameFinished(true);

        const result: GameResult = {
            score: finalScore,

            time: elapsedTime,

            date: new Date().toISOString(),
        };

        // ------------------------------------
        // HISTORIAL
        // ------------------------------------

        const allHistory =
            JSON.parse(
                localStorage.getItem(
                    "gameHistory"
                ) || "{}"
            );

        const playerHistory =
            allHistory[playerName] || [];

        const updatedHistory = [
            ...playerHistory,
            result,
        ];

        allHistory[playerName] =
            updatedHistory;

        localStorage.setItem(
            "gameHistory",
            JSON.stringify(
                allHistory
            )
        );

        setHistory(
            updatedHistory
        );

        // ------------------------------------
        // LEADERBOARD
        // ------------------------------------

        const savedLeaderboard =
            JSON.parse(
                localStorage.getItem(
                    "leaderboard"
                ) || "[]"
            ) as PlayerData[];

        const existingPlayer =
            savedLeaderboard.find(
                (player) =>
                    player.name
                        .toLowerCase() ===
                    playerName
                        .toLowerCase()
            );

        let updatedLeaderboard:
            PlayerData[];

        if (existingPlayer) {
            const newBest =
                finalScore >
                existingPlayer.bestScore;

            const sameScoreBetterTime =
                finalScore ===
                    existingPlayer.bestScore &&
                elapsedTime <
                    existingPlayer.bestTime;

            updatedLeaderboard =
                savedLeaderboard.map(
                    (player) => {
                        if (
                            player.name
                                .toLowerCase() !==
                            playerName
                                .toLowerCase()
                        ) {
                            return player;
                        }

                        return {
                            ...player,

                            games:
                                player.games +
                                1,

                            bestScore:
                                newBest ||
                                sameScoreBetterTime
                                    ? finalScore
                                    : player.bestScore,

                            bestTime:
                                newBest ||
                                sameScoreBetterTime
                                    ? elapsedTime
                                    : player.bestTime,
                        };
                    }
                );
        } else {
            updatedLeaderboard = [
                ...savedLeaderboard,

                {
                    name: playerName,

                    games: 1,

                    bestScore: finalScore,

                    bestTime: elapsedTime,
                },
            ];
        }

        // Orden:
        // 1. mayor puntaje
        // 2. menor tiempo

        updatedLeaderboard.sort(
            (a, b) => {
                if (
                    b.bestScore !==
                    a.bestScore
                ) {
                    return (
                        b.bestScore -
                        a.bestScore
                    );
                }

                return (
                    a.bestTime -
                    b.bestTime
                );
            }
        );

        setLeaderboard(
            updatedLeaderboard
        );

        localStorage.setItem(
            "leaderboard",
            JSON.stringify(
                updatedLeaderboard
            )
        );
    }

    // ----------------------------------------
    // RESPONDER
    // ----------------------------------------

    function guess(
        answer: string
    ): void {
        if (
            !currentCountry ||
            !gameActive
        ) {
            return;
        }

        const normalizedAnswer =
            answer
                .trim()
                .toLowerCase();

        const correctAnswer =
            currentCountry.name
                .trim()
                .toLowerCase();

        if (
            normalizedAnswer ===
            correctAnswer
        ) {
            const newScore =
                score + 10;

            setScore(newScore);

            addNotification(
                10,
                "País correcto"
            );

            if (
                currentRound ===
                TOTAL_ROUNDS
            ) {
                finishGame(
                    newScore
                );
            } else {
                nextCountry();
            }
        } else {
            setScore(
                (previousScore) =>
                    Math.max(
                        0,
                        previousScore - 1
                    )
            );

            addNotification(
                -1,
                "Respuesta incorrecta"
            );
        }
    }

    // ----------------------------------------
    // SALTEAR
    // ----------------------------------------

function skipCountry(): void {
    if (!currentCountry || !gameActive) return;

    const countryName = currentCountry.name;
    const newScore = Math.max(0, score - 3);

    setSkippedCountry(countryName);

    addNotification(
        -3,
        `Saltaste: ${countryName}`
    );

    setScore(newScore);

    setTimeout(() => {
        setSkippedCountry(null);
    }, 1000);

    if (currentRound >= TOTAL_ROUNDS) {
        finishGame(newScore);
        return;
    }

    nextCountry();
}
    // ----------------------------------------
    // PISTA: CANTIDAD DE LETRAS
    // ----------------------------------------

    function useLettersHint(): void {
        if (
            lettersHintUsed ||
            hintUsedThisRound ||
            !currentCountry
        ) {
            return;
        }

        setLettersHintUsed(true);

        setHintUsedThisRound(
            true
        );

        setLettersHint(
            `El país tiene ${currentCountry.name.length} letras.`
        );
    }

    // ----------------------------------------
    // PISTA: PRIMERA LETRA
    // ----------------------------------------

    function useFirstLetterHint(): void {
        if (
            firstLetterHintUsed ||
            hintUsedThisRound ||
            !currentCountry
        ) {
            return;
        }

        setFirstLetterHintUsed(
            true
        );

        setHintUsedThisRound(
            true
        );

        setFirstLetterHint(
            `El país empieza con "${currentCountry.name.charAt(0).toUpperCase()}".`
        );
    }

    // ----------------------------------------
    // PISTA: CAPITAL
    // ----------------------------------------

    async function useCapitalHint(): Promise<void> {
        if (
            capitalHintUsed ||
            hintUsedThisRound ||
            !currentCountry
        ) {
            return;
        }

        setCapitalHintUsed(true);

        setHintUsedThisRound(
            true
        );

        try {
            const capital =
                await getCapital(
                    currentCountry.name
                );

            setCapitalHint(
                `La capital es ${capital}.`
            );
        } catch (error) {
            console.error(
                error
            );

            setCapitalHint(
                "No se pudo obtener la capital."
            );
        }
    }

    // ----------------------------------------
    // GUARDAR NOMBRE
    // ----------------------------------------

    function savePlayerName(
        name: string
    ): void {
        setPlayerName(name);

        localStorage.setItem(
            "currentPlayer",
            name
        );
    }

    // ----------------------------------------
    // VALOR DEL CONTEXT
    // ----------------------------------------

    const value: GameContextType = {
        countries,

        currentCountry,

        playerName,

        score,

        currentRound,

        elapsedTime,

        flagTime,

        gameActive,

        gameFinished,

        loading,

        notifications,

        leaderboard,

        history,

        lettersHintUsed,

        firstLetterHintUsed,

        capitalHintUsed,

        hintUsedThisRound,

        lettersHint,

        firstLetterHint,

        capitalHint,

        skippedCountry,

        setPlayerName:
            savePlayerName,

        startGame,

        guess,

        skipCountry,

        useLettersHint,

        useFirstLetterHint,

        useCapitalHint,

        resetNotifications,
    };

    return (
        <GameContext.Provider
            value={value}
        >
            {children}
        </GameContext.Provider>
    );
}

export function useGame(): GameContextType {
    const context =
        useContext(GameContext);

    if (!context) {
        throw new Error(
            "useGame debe utilizarse dentro de GameProvider"
        );
    }

    return context;
}
