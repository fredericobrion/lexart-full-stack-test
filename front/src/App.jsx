import './App.css'
import LoginPage from './pages/login';
import PhoneList from './pages/phonesList';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/phones" element={<PhoneList />} />
    </Routes>
  )
}

export default App
