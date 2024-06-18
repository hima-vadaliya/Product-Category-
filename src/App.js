import logo from './logo.svg';
import './App.css';
import Login from './components/login/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProtectedRoutes, { PrivateRoutes } from './components/login/ProtectedRoute';
import Dashboard from './components/dashboard';
import CategoryIndex from './components/indexes/CategoryIndex';
import ProductIndex from './components/indexes/ProductIndex';
import PageNotFound from './components/PageNotFound';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {


  return (
    <div className="App">
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<PrivateRoutes>
            <Login />
          </PrivateRoutes>} />
          <Route path='login' element={<PrivateRoutes>
            <Login />
          </PrivateRoutes>} />
          <Route path='dashboard' element={<ProtectedRoutes><Dashboard /></ProtectedRoutes>} />
          <Route path='categoryindex' element={<ProtectedRoutes><CategoryIndex /></ProtectedRoutes>} />
          <Route path='productindex' element={<ProtectedRoutes><ProductIndex /></ProtectedRoutes>}></Route>
          <Route path="*"
            element={<PageNotFound />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
