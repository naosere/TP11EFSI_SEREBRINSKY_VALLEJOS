import { useGame } from "../context/GameContext";

function HintPanel() {
    const {
        lettersHintUsed,
        firstLetterHintUsed,
        capitalHintUsed,

        hintUsedThisRound,

        lettersHint,
        firstLetterHint,
        capitalHint,

        useLettersHint,
        useFirstLetterHint,
        useCapitalHint,
    } = useGame();

    return (
        <section className="hints">

            <div className="hints-header">
                <div>
                    <span className="hints-icon">
                        💡
                    </span>

                    <div>
                        <h3>
                            Ayudas
                        </h3>

                        <p>
                            Una ayuda por bandera
                        </p>
                    </div>
                </div>
            </div>

            <div className="hints-buttons">

                {/* CANTIDAD DE LETRAS */}
                <button
                    type="button"
                    onClick={
                        useLettersHint
                    }
                    disabled={
                        lettersHintUsed ||
                        hintUsedThisRound
                    }
                >
                    🔤

                    <span>
                        Cantidad de letras
                    </span>
                </button>

                {/* PRIMERA LETRA */}
                <button
                    type="button"
                    onClick={
                        useFirstLetterHint
                    }
                    disabled={
                        firstLetterHintUsed ||
                        hintUsedThisRound
                    }
                >
                    🔎

                    <span>
                        Primera letra
                    </span>
                </button>

                {/* CAPITAL */}
                <button
                    type="button"
                    onClick={
                        useCapitalHint
                    }
                    disabled={
                        capitalHintUsed ||
                        hintUsedThisRound
                    }
                >
                    🏛️

                    <span>
                        Capital
                    </span>
                </button>

            </div>

            {/* MENSAJE CUANDO YA USÓ UNA */}
            {hintUsedThisRound && (
                <p className="hint-warning">
                    Ya utilizaste una ayuda
                    en esta bandera.
                </p>
            )}

            {/* RESULTADOS DE LAS AYUDAS */}

            {lettersHint && (
                <div className="hint-result">
                    🔤 {lettersHint}
                </div>
            )}

            {firstLetterHint && (
                <div className="hint-result">
                    🔎 {firstLetterHint}
                </div>
            )}

            {capitalHint && (
                <div className="hint-result">
                    🏛️ {capitalHint}
                </div>
            )}

        </section>
    );
}

export default HintPanel;