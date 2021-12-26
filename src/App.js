import React from 'react';
import { BrowserRouter, Route, Routes, } from 'react-router-dom';
import Game from './components/Game';
import Title from './components/title/Title';

const App = () => {
    return  (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Title />} />
                    <Route path="/game" element={<Game />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
};

export default App;