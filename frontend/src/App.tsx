import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

// Components
import Header from './components/Header.tsx'
import Footer from './components/Footer.tsx'

const App = () => {
    return (
        <Router>
            <Header />
            <Routes>
                <Route index path="/home" element={<Navigate to='/' />} />
                <Route index path="/" element={<div>Home</div>} />
                <Route path="/events" element={<div>Events</div>} />
                <Route path="/about" element={<div>About</div>} />
                <Route path="/contact" element={<div>Contact</div>} />
            </Routes>
            <Footer />
        </Router>
    )
}

export default App
