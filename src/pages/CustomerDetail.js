import React, {useState, useEffect} from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function CustomerDetail() {
    const { id } = useParams();
    const navigte = useNavigate();
    const [customer, setCustomer] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error,setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false); //Add edit state
    const [updatedData, setUpdatedData] = useState({
        name:'',
        age:'',
        education:'',
        major:'',
        phone_number:'',
        wechat_id:'',
        initial_notes:'',
        last_edited:'',
        edit_count:0

    });

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/customers/${id}/`)
          .then(response => {
            setCustomer(response.data);  // Initialize form data
            setUpdatedData({
              ...response.data,
              last_edited:response.data.last_edited || '',
              edit_count:response.data.edit_count || 0
            });
            setLoading(false);
          })
          .catch(error => {
            setError(error.message);
            setLoading(false);
          });
    }, [id]);

    const handleDelete = () => {
        axios.delete(`https://127.0.0.1:8000/api/customers/${id}/`)
          .then(() => {
            navigte.push('/customers'); // Redirect to customer list after deletion
          })
          .catch(error => console.error('There was an error deleting the customer!', error));
    };

    const handleUpdate = (e) => {
        e.preventDefault();

        const currentTime = new Date().toISOString(); //获取当前时间
        const updatedCustomerData = {
          ...updatedData,
          last_edited:currentTime, //更新上次编辑时间
          edit_count: updatedData.edit_count + 1 //增加编辑次数
        };
        axios.put(`https://127.0.0.1:8000/api/customers/${id}/`,updatedData)
          .then(() => {
            setIsEditing(false); // Exit edit mode after successful update
            alert('Customer updated successfully');
            setCustomer(updatedCustomerData); //更新后保存到customer
          })
          .catch(error => console.error('Error updating customer!',error));
    };

     // Handle input change
     const handleInputChange = (e) => {
       const {name,value} = e.target;
       setUpdatedData({...updatedData,[name]:value});
     };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
      <div>
        <Navbar />
        <h1>Customer Details</h1>
        {isEditing ? (
          <form onSubmit={handleUpdate}>
            <label>Name</label>
            <input
              type="text"
              value={updatedData.name}
              onChange={(e) => setUpdatedData({ ...updatedData, name: e.target.value })}
            />
            
            <label>Age</label>
            <input
              type="number"
              value={updatedData.age}
              onChange={(e) => setUpdatedData({ ...updatedData, age: e.target.value })}
            />
            
            <label>Education</label>
            <input
              type="text"
              value={updatedData.education}
              onChange={(e) => setUpdatedData({ ...updatedData, education: e.target.value })}
            />
            
            <label>Major</label>
            <input
              type="text"
              value={updatedData.major}
              onChange={(e) => setUpdatedData({ ...updatedData, major: e.target.value })}
            />
            
            <label>Phone Number</label>
            <input
              type="text"
              value={updatedData.phone_number}
              onChange={(e) => setUpdatedData({ ...updatedData, phone_number: e.target.value })}
            />
            
            <label>WeChat ID</label>
            <input
              type="text"
              value={updatedData.wechat_id}
              onChange={(e) => setUpdatedData({ ...updatedData, wechat_id: e.target.value })}
            />
            
            <label>Initial Notes</label>
            <textarea
              value={updatedData.initial_notes}
              onChange={(e) => setUpdatedData({ ...updatedData, initial_notes: e.target.value })}
            />
            
            <button type="submit">Save</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </form>
        ) : (
          <div>
            <p><strong>Name:</strong> {customer.name}</p>
            <p><strong>Age:</strong> {customer.age}</p>
            <p><strong>Education:</strong> {customer.education}</p>
            <p><strong>Major:</strong> {customer.major}</p>
            <p><strong>Phone Number:</strong> {customer.phone_number}</p>
            <p><strong>WeChat ID:</strong> {customer.wechat_id}</p>
            <p><strong>Initial Notes:</strong> {customer.initial_notes}</p>
            <p><strong>Last Edited:</strong> {customer.last_edited || 'Never'}</p>
            <p><strong>Edit Count:</strong> {customer.edit_count}</p>
            
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
          </div>
        )}
      </div>
    );
  }
  
export default CustomerDetail;