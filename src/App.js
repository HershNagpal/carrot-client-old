import React from "react";
import { BrowserRouter, Link, Route, Routes, } from 'react-router-dom';
import GameGrid from "./components/gameGrid/GameGrid";

const App = () => {
    return  (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<GameGrid />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
};

export default App;