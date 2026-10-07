import { Link } from "react-router-dom";

function Header() {
    return (
        <header className="header">
            <Link
                to="/"
                className="logo"
            >
                🌎 World Quiz
            </Link>

            <nav className="nav">
                <Link to="/">
                    Jugar
                </Link>

                <Link to="/ranking">
                    Ranking
                </Link>

                <Link to="/historial">
                    Mi historial
                </Link>
            </nav>
        </header>
    );
}

export default Header;