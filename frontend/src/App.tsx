
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import './index.css';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Dashboard from './pages/Dashboard';
import Expense from './pages/Expense';
import Income from './pages/Income';
import Savings from './pages/Savings';
import Tips from './pages/Tips';

function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/signup' element={<Signup/>}></Route>
          <Route path='/signin' element={<Signin/>}></Route>
          <Route path='/dashboard' element={<Dashboard/>}></Route>
          <Route path='/expense' element={<Expense/>}></Route>
          <Route path='/income' element={<Income/>}></Route>
          <Route path='/savings' element={<Savings/>}></Route>
          <Route path='/tips' element={<Tips/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
