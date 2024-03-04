import './App.css'
import LoginPage from './pages/login';
import PhoneList from './pages/phonesList';
import AddPhones from './pages/addPhones';
import UpdateAndDeletePhone from './pages/updateAndDeletePhone';
import { Routes, Route } from 'react-router-dom';
import Header from './components/header';

function App() {
  return (
    <Routes>
      <Route path="/phones" element={<Header />} >
        <Route index element={ <PhoneList /> } />
        <Route path=":id" element={ <UpdateAndDeletePhone /> } />
         <Route path="add" element={ <AddPhones /> } />
      </Route>
      <Route path='/' element={ <LoginPage /> } />
    </Routes>
  )
}

export default App
