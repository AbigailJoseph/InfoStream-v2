import Header from './components/Header';
import "/src/App.css";
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Business from './pages/business';
import HomeScreen from './pages/homescreen';
import Entertainment from './pages/entertainment';
import Technology from './pages/technology';
import Science from './pages/science';
import About from './pages/about';
import Login from './pages/logins';
import Saved from './pages/saved';
import AuthUserProvider from './auth/AuthUserProvider';

const Navigation = () => {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path='/' element={<HomeScreen />} />
                <Route path='/business' element={<Business />} />
                <Route path='/entertainment' element={<Entertainment />} />
                <Route path='/technology' element={<Technology />} />
                <Route path='/science' element={<Science />} />
                <Route path='/about' element={<About />} />
                <Route path='/login' element={<Login />} />
                <Route path='/saved' element={
                    <AuthUserProvider><Saved /></AuthUserProvider>} />
            </Routes>
        </Router>
    );
}

export default Navigation;
