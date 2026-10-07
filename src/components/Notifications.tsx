import { useGame } from "../context/GameContext";

function Notifications() {
    const { notifications } =
        useGame();

    return (
        <aside className="notifications">

            <div className="notifications-header">
                <span>⚡</span>

                <h3>
                    Actividad
                </h3>
            </div>

            <div className="notifications-list">

                {notifications.length === 0 ? (
                    <p className="no-notifications">
                        Todavía no hay actividad.
                    </p>
                ) : (
                    notifications.map(
                        (notification) => (
                            <div
                                key={
                                    notification.id
                                }
                                className={`notification ${
                                    notification.points >
                                    0
                                        ? "positive"
                                        : "negative"
                                }`}
                            >
                                <strong>
                                    {notification.points >
                                    0
                                        ? `+${notification.points}`
                                        : notification.points}
                                </strong>

                                <span>
                                    {
                                        notification.reason
                                    }
                                </span>
                            </div>
                        )
                    )
                )}

            </div>
        </aside>
    );
}

export default Notifications;