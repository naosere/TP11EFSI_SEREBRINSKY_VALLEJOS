import {
    useState,
    type FormEvent,
} from "react";

import { useNavigate } from "react-router-dom";

import { useGame } from "../context/GameContext";

import RulesModal from "../components/RulesModal";

function Home() {
const {
    playerName,
    setPlayerName,
    startGame,
    loading,
    countries,
} = useGame();

    const [name, setName] =
        useState<string>(
            playerName
        );

    const [showRules, setShowRules] =
        useState<boolean>(false);

    const [pendingName, setPendingName] =
        useState<string>("");

    const navigate = useNavigate();

  function handleSubmit(
    event: FormEvent<HTMLFormElement>
): void {
    event.preventDefault();

    if (!name.trim()) return;

    const cleanName = name.trim();

    const rulesAlreadyShown =
        localStorage.getItem("rulesShown");

    if (!rulesAlreadyShown) {
        setPendingName(cleanName);
        setShowRules(true);
        return;
    }

    setPlayerName(cleanName);

    if (!loading && countries.length > 0) {
        startGame();
        navigate("/game");
    }
}
    function handleStartAfterRules(): void {
    setPlayerName(pendingName);

    localStorage.setItem(
        "rulesShown",
        "true"
    );

    setShowRules(false);

    if (!loading && countries.length > 0) {
        startGame();
        navigate("/game");
    }
}

    return (
        <main className="home">
            <section className="home-card">
                <div className="home-icon">
                    🌎
                </div>

                <h1>
                    World Quiz
                </h1>

                <p>
                    ¿Cuánto sabés sobre los
                    países del mundo?
                </p>

                <form
                    onSubmit={handleSubmit}
                    className="name-form"
                >
                    <input
                        type="text"
                        placeholder="Ingresá tu nombre"
                        value={name}
                        onChange={(event) =>
                            setName(
                                event.target.value
                            )
                        }
                        maxLength={20}
                    />

                    <button
    type="submit"
    disabled={loading || countries.length === 0}
>
    {loading ? "Cargando países..." : "Comenzar"}
</button>
                </form>
            </section>

            {showRules && (
                <RulesModal
                    onStart={
                        handleStartAfterRules
                    }
                />
            )}
        </main>
    );
}

export default Home;