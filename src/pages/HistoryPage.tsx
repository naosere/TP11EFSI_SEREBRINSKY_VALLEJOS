import {
    useNavigate,
} from "react-router-dom";

import {
    useGame,
} from "../context/GameContext";

function formatTime(
    seconds: number
): string {
    const minutes =
        Math.floor(seconds / 60);

    const remainingSeconds =
        seconds % 60;

    return `${String(minutes).padStart(
        2,
        "0"
    )}:${String(
        remainingSeconds
    ).padStart(2, "0")}`;
}

function HistoryPage() {
    const {
        playerName,
        history,
    } = useGame();

    const navigate =
        useNavigate();

    if (!playerName) {
        return (
            <main className="history-page">
                <section className="history-empty-card">
                    <div className="history-empty-icon">
                        📊
                    </div>

                    <h1>
                        Tu historial
                    </h1>

                    <p>
                        Primero tenés que
                        ingresar tu nombre
                        para poder ver tus
                        partidas.
                    </p>

                    <button
                        className="history-primary-button"
                        onClick={() =>
                            navigate("/")
                        }
                    >
                        🌎 Ir a jugar
                    </button>
                </section>
            </main>
        );
    }

    const bestScore =
        history.length > 0
            ? Math.max(
                  ...history.map(
                      (game) =>
                          game.score
                  )
              )
            : 0;

    const bestTime =
        history.length > 0
            ? Math.min(
                  ...history.map(
                      (game) =>
                          game.time
                  )
              )
            : 0;

    const orderedHistory =
        [...history].reverse();

    return (
        <main className="history-page">
            <div className="history-container">

                <header className="history-header">
                    <div>
                        <span className="history-eyebrow">
                            PERFIL DEL JUGADOR
                        </span>

                        <h1>
                            Mi historial
                        </h1>

                        <p>
                            Todas tus partidas
                            de World Quiz.
                        </p>
                    </div>

                    <div className="history-player-badge">
                        <span>👤</span>
                        <strong>
                            {playerName}
                        </strong>
                    </div>
                </header>

                <section className="history-stats">

                    <div className="history-stat-card">
                        <div className="history-stat-icon">
                            🎮
                        </div>

                        <div>
                            <span>
                                Partidas jugadas
                            </span>

                            <strong>
                                {history.length}
                            </strong>
                        </div>
                    </div>

                    <div className="history-stat-card highlight">
                        <div className="history-stat-icon">
                            🏆
                        </div>

                        <div>
                            <span>
                                Mejor puntaje
                            </span>

                            <strong>
                                {bestScore}
                                <small>
                                    {" "}pts
                                </small>
                            </strong>
                        </div>
                    </div>

                    <div className="history-stat-card">
                        <div className="history-stat-icon">
                            ⚡
                        </div>

                        <div>
                            <span>
                                Mejor tiempo
                            </span>

                            <strong>
                                {history.length > 0
                                    ? formatTime(
                                          bestTime
                                      )
                                    : "--:--"}
                            </strong>
                        </div>
                    </div>

                </section>

                <section className="history-games">

                    <div className="history-games-header">
                        <div>
                            <span>
                                📋
                            </span>

                            <div>
                                <h2>
                                    Tus partidas
                                </h2>

                                <p>
                                    Historial de
                                    resultados
                                </p>
                            </div>
                        </div>
                    </div>

                    {history.length === 0 ? (
                        <div className="history-no-games">
                            <div>
                                🎮
                            </div>

                            <h3>
                                Todavía no jugaste
                            </h3>

                            <p>
                                Cuando termines
                                una partida,
                                aparecerá acá.
                            </p>

                            <button
                                className="history-primary-button"
                                onClick={() =>
                                    navigate("/")
                                }
                            >
                                Comenzar partida
                            </button>
                        </div>
                    ) : (
                        <div className="history-table">

                            <div className="history-table-head">
                                <span>
                                    PARTIDA
                                </span>

                                <span>
                                    FECHA
                                </span>

                                <span>
                                    PUNTAJE
                                </span>

                                <span>
                                    TIEMPO
                                </span>
                            </div>

                            {orderedHistory.map(
                                (
                                    game,
                                    index
                                ) => (
                                    <div
                                        className="history-row"
                                        key={`${game.date}-${index}`}
                                    >
                                        <div className="history-game-number">
                                            <span>
                                                #{orderedHistory.length - index}
                                            </span>

                                            <strong>
                                                Partida
                                            </strong>
                                        </div>

                                        <div className="history-date">
                                            {new Date(
                                                game.date
                                            ).toLocaleDateString(
                                                "es-AR",
                                                {
                                                    day: "2-digit",
                                                    month: "2-digit",
                                                    year: "numeric",
                                                }
                                            )}
                                        </div>

                                        <div className="history-score">
                                            <strong>
                                                {game.score}
                                            </strong>

                                            <span>
                                                pts
                                            </span>
                                        </div>

                                        <div className="history-time">
                                            <span>
                                                ⏱️
                                            </span>

                                            <strong>
                                                {formatTime(
                                                    game.time
                                                )}
                                            </strong>
                                        </div>
                                    </div>
                                )
                            )}

                        </div>
                    )}

                </section>

                <button
                    className="history-back-button"
                    onClick={() =>
                        navigate("/")
                    }
                >
                    ← Volver al inicio
                </button>

            </div>
        </main>
    );
}

export default HistoryPage;
