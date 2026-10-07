interface RulesModalProps {
    onStart: () => void;
}

function RulesModal({
    onStart,
}: RulesModalProps) {
    return (
        <div className="modal-overlay">
            <div className="rules-modal">
                <h2>
                    🌎 Reglas del juego
                </h2>

                <p>
                    Tenés que adivinar
                    15 banderas.
                </p>

                <div className="rules-list">
                    <p>
                        ✅ Acierto:
                        <strong> +10 puntos</strong>
                    </p>

                    <p>
                        ❌ Incorrecto:
                        <strong> -1 punto</strong>
                    </p>

                    <p>
                        ⏭️ Saltear:
                        <strong> -3 puntos</strong>
                    </p>

                    <p>
                        ⏱️ Después de 20 segundos,
                        cada 2 segundos:
                        <strong> -1 punto</strong>
                    </p>

                    <p>
                        🔤 Cada pista se puede
                        usar una sola vez por partida.
                    </p>

                    <p>
                        🚫 No podés usar dos pistas
                        sobre la misma bandera.
                    </p>

                    <p>
                        🏆 Al terminar las 15
                        banderas se guarda tu resultado.
                    </p>
                </div>

                <button
                    onClick={onStart}
                    className="primary-button"
                >
                    ¡Entendido, jugar!
                </button>
            </div>
        </div>
    );
}

export default RulesModal;