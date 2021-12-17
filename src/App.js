import React from "react"
import { BrowserRouter, Link, Route, Routes, } from 'react-router-dom';
import Grid from "./components/grid/Grid"

const App = () => {
    return  (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Grid />} />
                    <Route path="yee" element={<Link to="/">yee</Link>} />
                </Routes>
            </BrowserRouter>
        </div>
    )
};

export default App;