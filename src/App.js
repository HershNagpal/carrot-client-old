import React from "react";
import { BrowserRouter, Route, Routes, } from 'react-router-dom';
import Game from "./components/Game";

const App = () => {
    return  (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Game />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
};

export default App;