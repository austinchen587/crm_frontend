import React, {useState, useEffect} from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { Link } from 'react-router-dom'

function CustomerList() {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/customers/`)
          .then(response => {
            setCustomers(response.data);
          })
          .catch(error => {
            console.error('There was an error fetching the customers!', error);
          });

},[]);

return ( 
  <div>
    <Navbar />
    <h1>Customers List</h1>
    <ul>
        {customers.map(customer => (
          <li key={customer.id}>
            <Link to={`/customers/${customer.id}`}>{customer.name}</Link> - {customer.phone_number}
          </li>
        ))}
      </ul>
  </div>
);
}

export default CustomerList;