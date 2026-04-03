// Dependency Imports
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Page Imports
import Home from '../pages/Home/Home';
import Register from '../pages/Register/Register';
import Payment from '../pages/Payment/Payment';
// import NotFound from '../pages/NotFound';

// Auth & Context
import { RegistrationProvider } from '../context/RegistrationContext';
import ProtectedRoute from '../components/ProtectedRoute';

const AppRoutes = () => {
    return (
        <RegistrationProvider>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/register' element={<Register />} />
                    <Route
                        path='/payment'
                        element={
                            <ProtectedRoute>
                                <Payment />
                            </ProtectedRoute>
                        }
                    />
                    {/* <Route path='*' element={<NotFound />} /> */}
                </Routes>
            </BrowserRouter>
        </RegistrationProvider>
    )
}

export default AppRoutes;