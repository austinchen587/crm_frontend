import React, {useState, useEffect} from "react";
import axios from "axios";
import CustomerListItem from "../components/CustomerListItem";
import Navbar from "../components/Navbar";

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
         <CustomerListItem key={customer.id} customer={customer} />
        ))}
    </ul>
  </div>
);
}

export default CustomerList;