import './App.css'
import LoginPage from './pages/login';
import PhoneList from './pages/phonesList';
import AddPhones from './pages/addPhone';
import UpdateAndDeletePhone from './pages/updateAndDeletePhone';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/phones/:id" element={<UpdateAndDeletePhone />} />
      <Route path="/phones/add" element={<AddPhones />} />
      <Route path="/phones" element={<PhoneList />} />
    </Routes>
  )
}

export default App
