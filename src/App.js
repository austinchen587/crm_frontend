import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import CustomerList from './pages/CustomerList';
import CustomerForm from './pages/CustomerForm';
import CustomerDetail from './pages/CustomerDetail';




function App() {
  return(
    <Router>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path="/customers" element={<CustomerList />} />
        <Route path="/customers/new" element={<CustomerForm />} />
        <Route path="/customers/:id" element={<CustomerDetail />} />
        <Route path="/customers/:id/edit" element={<CustomerForm />} />
      </Routes>
    </Router>
  );
}


export default App;