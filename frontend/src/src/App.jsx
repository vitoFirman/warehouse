import './assets/js/flowbite'
import 'flowbite'
import { Flowbite, useThemeMode } from 'flowbite-react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './index.css'
import Login from './Pages/Auth/Login'
import Dashboard from './Pages/Dashboard';
import AddUser from './Pages/Admin/AddUser';
import ListUser from './Pages/Admin/ListUser';
import ChangeRole from './Pages/Admin/ChangeRole';
import UpdatePassword from './Pages/Admin/UpdatePassword';
import StockIn from './Pages/Stock/StockIn';
import StockOut from './Pages/Stock/StockOut';
import ProductList from './Pages/Product/ProductList';
import SupplierList from './Pages/Supplier/SupplierList';

function App() {
  const mode = useThemeMode()
  return (
    <>
      <Flowbite>
        <div className={mode.mode === 'dark' ? 'bg-gray-900' : 'bg-gray-200'}>
          <Router>
            <Routes>
              <Route path='/' element={<Login/>}/>
              <Route path='/dashboard' element={<Dashboard/>}/>
              <Route path='/administration/add-user' element={<AddUser/>}/>
              <Route path='/administration/list-user' element={<ListUser/>}/>
              <Route path='/administration/change-role' element={<ChangeRole/>}/>
              <Route path='/administration/update-password' element={<UpdatePassword/>}/>
              <Route path='/supplier/list' element={<SupplierList/>}/>
              <Route path='/product/list' element={<ProductList/>}/>
              <Route path='/stock/in' element={<StockIn/>}/>
              <Route path='/stock/out' element={<StockOut/>}/>
            </Routes>
          </Router>
        </div>
      </Flowbite>
    </>
  )
}

export default App
