import {
    useNavigate,
} from "react-router-dom";
import { useState } from "react";

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
    const [selectedGame, setSelectedGame] = useState<(typeof history)[number] | null>(null);

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
                                    <button
                                        type="button"
                                        className="history-row"
                                        key={`${game.date}-${index}`}
                                        onClick={() => setSelectedGame(game)}
                                        aria-label={`Ver notificaciones de la partida ${orderedHistory.length - index}`}
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
                                    </button>
                                )
                            )}

                        </div>
                    )}

                </section>

                {selectedGame && (
                    <div className="game-history-modal-backdrop" onClick={() => setSelectedGame(null)}>
                        <section className="game-history-modal" role="dialog" aria-modal="true" aria-labelledby="game-history-modal-title" onClick={(event) => event.stopPropagation()}>
                            <button type="button" className="game-history-modal-close" onClick={() => setSelectedGame(null)} aria-label="Cerrar">×</button>
                            <span className="history-eyebrow">DETALLE DE PARTIDA</span>
                            <h2 id="game-history-modal-title">Historial de notificaciones</h2>
                            <p className="game-history-modal-summary">{new Date(selectedGame.date).toLocaleString("es-AR")} · {selectedGame.score} puntos · {formatTime(selectedGame.time)}</p>
                            {selectedGame.notifications?.length ? (
                                <ol className="game-notification-list">
                                    {[...selectedGame.notifications].reverse().map((notification) => (
                                        <li key={notification.id}>
                                            <span className={notification.points >= 0 ? "game-notification-points positive" : "game-notification-points negative"}>{notification.points > 0 ? "+" : ""}{notification.points}</span>
                                            <span>{notification.reason}</span>
                                        </li>
                                    ))}
                                </ol>
                            ) : (
                                <p className="game-notification-empty">Esta partida no tiene notificaciones guardadas. Las partidas anteriores a esta actualización no incluyen ese historial.</p>
                            )}
                            <button type="button" className="history-primary-button" onClick={() => setSelectedGame(null)}>Cerrar</button>
                        </section>
                    </div>
                )}

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
