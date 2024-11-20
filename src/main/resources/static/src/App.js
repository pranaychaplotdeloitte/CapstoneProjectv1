import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RegisterPage from './Pages/RegisterPage';
import LoginPage from './Pages/LoginPage';
import HomePage from './Pages/HomePage';
import ProfilePage from './Pages/ProfilePage';
import AccountPage from './Pages/AccountPage';
import DepositPage from './Pages/DepositPage';
import WithdrawPage from './Pages/WithdrawPage';
import ProtectedRoute from './ProtectedRoute'; // Import ProtectedRoute

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path='/' element={<RegisterPage />} />
        <Route path='/Login' element={<LoginPage />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path='/Home' element={<HomePage />} />
          <Route path='/Profile' element={<ProfilePage />} />
          <Route path='/Account' element={<AccountPage />}/>
          <Route path='/Deposit' element={<DepositPage />}/>
          <Route path='/Withdraw' element={<WithdrawPage />}/>

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
