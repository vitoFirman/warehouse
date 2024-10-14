import './assets/js/flowbite'
import 'flowbite'
import { Flowbite, useThemeMode } from 'flowbite-react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './index.css'
import Login from './Pages/Auth/Login'
import Dashboard from './Pages/Home';
import AddUser from './Pages/Admin/AddUser';
import ListUser from './Pages/Admin/ListUser';
import ChangeRole from './Pages/Admin/ChangeRole';
import StockIn from './Pages/Stock/StockIn';
import StockOut from './Pages/Stock/StockOut';
import ProductList from './Pages/Product/ProductList';
import SupplierList from './Pages/Supplier/SupplierList';
import UpdatePassword from './Pages/Setting/UpdatePassword'
import SupplierAdd from './Pages/Supplier/SupplierAdd';
import Administration from './Pages/Admin/Administration';
import NoAccess from './Pages/NoAccess/NoAccess';
import StockReports from './Pages/Reports/StockReports';

function App() {
  const mode = useThemeMode()
  return (
    <>
      <Flowbite>
        <div className={mode.mode === 'dark' ? 'bg-gray-900' : 'bg-gray-200'}>
          <Router>
            <Routes>
              <Route path='/' element={<Login/>}/>
              <Route path='/no-access' element={<NoAccess/>}/>
              <Route path='/dashboard' element={<Dashboard/>}/>
              <Route path="/administration" element={<Administration />}>
                    <Route path="list-user" element={<ListUser />} />
                    <Route path="add-user" element={<AddUser />} />
                    <Route path="change-role" element={<ChangeRole />} />
              </Route>
              <Route path='/update-password' element={<UpdatePassword/>}/>
              <Route path='/supplier/list' element={<SupplierList/>}/>
              <Route path='/supplier/add' element={<SupplierAdd/>}/>
              <Route path='/product/list' element={<ProductList/>}/>
              <Route path='/stock/in' element={<StockIn/>}/>
              <Route path='/stock/out' element={<StockOut/>}/>
              <Route path='/reports/stock' element={<StockReports/>}/>
            </Routes>
          </Router>
        </div>
      </Flowbite>
    </>
  )
}

export default App
