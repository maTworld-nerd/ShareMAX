import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';
import Header from './components/header';
import Footer from './components/footer';

const App = () => {
    return (
        <Router>
            {/* Header will appear on all pages */}
            <Header />
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </main>
            {/* Footer will appear on all pages */}
            <Footer />
        </Router>
    );
};

export default App;
