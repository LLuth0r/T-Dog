// Dependency Imports
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Page Imports
import Home from '../pages/Home/Home';
import Register from '../pages/Register/Register';
// import NotFound from '../pages/NotFound';

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/register' element={<Register />} />
                {/* <Route path='*' element={<NotFound />} /> */}
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;