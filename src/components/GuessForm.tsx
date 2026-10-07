import {
    useState,
    type FormEvent,
} from "react";

import { useGame } from "../context/GameContext";

function GuessForm() {
    const {
        guess,
        gameActive,
    } = useGame();

    const [answer, setAnswer] =
        useState<string>("");

    function handleSubmit(
        event: FormEvent<HTMLFormElement>
    ): void {
        event.preventDefault();

        if (
            !answer.trim() ||
            !gameActive
        ) {
            return;
        }

        guess(answer);

        setAnswer("");
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="guess-form"
        >
            <input
                type="text"
                placeholder="¿Qué país es?"
                value={answer}
                onChange={(event) =>
                    setAnswer(
                        event.target.value
                    )
                }
                autoComplete="off"
                disabled={!gameActive}
            />

            <button
                type="submit"
                disabled={!gameActive}
            >
                Comprobar
            </button>
        </form>
    );
}

export default GuessForm;