import {
    useEffect,
} from "react";

import {
    useNavigate,
} from "react-router-dom";

import { useGame } from "../context/GameContext";

import Flag from "../components/Flag";
import GuessForm from "../components/GuessForm";
import ScoreBoard from "../components/ScoreBoard";
import Timer from "../components/Timer";
import GameProgress from "../components/GameProgress";
import SkipButton from "../components/SkipButton";
import HintPanel from "../components/HintPanel";
import Notifications from "../components/Notifications";

function formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);

    const remainingSeconds =
        seconds % 60;

    return `${String(minutes).padStart(
        2,
        "0"
    )}:${String(remainingSeconds).padStart(
        2,
        "0"
    )}`;
}

function Game() {
    const {
        loading,
        currentCountry,
        gameActive,
        gameFinished,
        elapsedTime,
        skippedCountry,
    } = useGame();

    const navigate =
        useNavigate();

    useEffect(() => {
        if (gameFinished) {
            navigate("/ranking");
        }
    }, [
        gameFinished,
        navigate,
    ]);

    if (loading) {
        return (
            <main className="game">
                <div className="loading">
                    <h2>
                        Cargando países...
                    </h2>

                    <p>
                        Preparando el juego 🌎
                    </p>
                </div>
            </main>
        );
    }

    if (!currentCountry) {
        return (
            <main className="game">
                <div className="loading">
                    <h2>
                        No se pudieron cargar
                        los países.
                    </h2>
                </div>
            </main>
        );
    }

    if (!gameActive) {
        return null;
    }

    return (
        <main className="game">

            {/* NOTIFICACIONES */}
            <Notifications />

            {skippedCountry && (
    <div className="skipped-country">
        <span>🏳️</span>
        <div>
            <small>Era...</small>
            <strong>{skippedCountry}</strong>
        </div>
    </div>
)}

            {/* INFORMACIÓN DEL JUGADOR */}
            <ScoreBoard />

            <section className="game-main">

                {/* PROGRESO */}
                <GameProgress />

                {/* TIEMPO DE LA BANDERA */}
                <Timer />

                <div className="game-card">

                    <p className="game-question">
                        ¿De qué país es esta
                        bandera?
                    </p>

                    <Flag />

                    <GuessForm />

                    <SkipButton />

                    <HintPanel />

                </div>

            </section>

            {/* TIEMPO TOTAL DE LA PARTIDA */}
            <div className="total-time">
                <span>Tiempo total</span>

                <strong>
                    {formatTime(elapsedTime)}
                </strong>
            </div>

        </main>
    );
}

export default Game;