import './App.css'
import LoginPage from './pages/login';
import PhoneList from './pages/phonesList';
import AddPhones from './pages/addPhone';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/phones" element={<PhoneList />} />
      <Route path="/add" element={<AddPhones />} />
    </Routes>
  )
}

export default App
