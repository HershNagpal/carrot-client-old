import React from 'react';
import { HashRouter, Route, Routes, } from 'react-router-dom';
import Game from './components/Game';
import Title from './components/title/Title';

const App = () => {
    return  (
        <div className='App'>
            <HashRouter> {/* TODO Remove for Browser router when deploying */}
                <Routes>
                    <Route path="/" element={<Title />} />
                    <Route path="/game" element={<Game />} />
                </Routes>
            </HashRouter>
        </div>
    )
};

export default App;