import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import RequirementsPage from './requirementsPage';
import StaffPage from './staffPage';

function App() {
    return (
        <Router>
            <div>
                <nav>
                    <Link to="/">Requirements</Link>
                    <Link to="/staff">Staff</Link>
                </nav>
                <Routes>
                    <Route path="/" element={<RequirementsPage />} />
                    <Route path="/staff" element={<StaffPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
