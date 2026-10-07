import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

import {
    GameProvider,
} from "./context/GameContext";

import Header from "./components/Header";

import Home from "./pages/Home";
import Game from "./pages/Game";
import LeaderboardPage from "./pages/LeaderboardPage";
import HistoryPage from "./pages/HistoryPage";

function App() {
    return (
        <BrowserRouter>
            <GameProvider>
                <Header />

                <Routes>
                    <Route
                        path="/"
                        element={
                            <Home />
                        }
                    />

                    <Route
                        path="/game"
                        element={
                            <Game />
                        }
                    />

                    <Route
                        path="/ranking"
                        element={
                            <LeaderboardPage />
                        }
                    />

                    <Route
                        path="/historial"
                        element={
                            <HistoryPage />
                        }
                    />
                </Routes>
            </GameProvider>
        </BrowserRouter>
    );
}

export default App;