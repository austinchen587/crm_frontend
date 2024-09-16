import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddCustomer() {
  const navigate = useNavigate();
  const [customerData, setCustomerData] = useState({
    name: '',
    age: '',
    education: '',
    major: '',
    phone_number: '',
    wechat_id: '',
    initial_notes: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerData({ ...customerData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://127.0.0.1:8000/api/customers/', customerData)
      .then(response => {
        alert('Customer added successfully');
        navigate('/customers'); // 跳转到客户列表页面
      })
      .catch(error => {
        console.error('Error adding customer:', error);
        alert('There was an error adding the customer');
      });
  };

  return (
    <div>
      <h2>Add New Customer</h2>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={customerData.name}
          onChange={handleInputChange}
        />

        <label>Age</label>
        <input
          type="number"
          name="age"
          value={customerData.age}
          onChange={handleInputChange}
        />

        <label>Education</label>
        <input
          type="text"
          name="education"
          value={customerData.education}
          onChange={handleInputChange}
        />

        <label>Major</label>
        <input
          type="text"
          name="major"
          value={customerData.major}
          onChange={handleInputChange}
        />

        <label>Phone Number</label>
        <input
          type="text"
          name="phone_number"
          value={customerData.phone_number}
          onChange={handleInputChange}
        />

        <label>WeChat ID</label>
        <input
          type="text"
          name="wechat_id"
          value={customerData.wechat_id}
          onChange={handleInputChange}
        />

        <label>Initial Notes</label>
        <textarea
          name="initial_notes"
          value={customerData.initial_notes}
          onChange={handleInputChange}
        />

        <button type="submit">Add Customer</button>
      </form>
    </div>
  );
}

export default AddCustomer;