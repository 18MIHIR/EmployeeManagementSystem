import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import AddEmployee from './components/AddEmployee';
import UpdateEmployee from './components/UpdateEmployee';
import EmployeeList from './components/EmployeeList';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';

// Protected route component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  return (
    <>
    <BrowserRouter>
    <Navbar/>

    <Routes>
       <Route path="/login" element={ <Login/> } />
       <Route path="/register" element={ <Register/> } />
       
       <Route path="/" element={ <ProtectedRoute><EmployeeList/></ProtectedRoute> } />
       <Route path="/addEmployee" element={ <ProtectedRoute><AddEmployee/></ProtectedRoute> } />
       <Route path="/editEmployee/:id" element={ <ProtectedRoute><UpdateEmployee/></ProtectedRoute> } />
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;

