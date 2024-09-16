import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

function CustomerForm() {
  const { id } = useParams(); // 获取id，用于判断是新增还是编辑
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    education: '',
    major_category: 'IT',
    major_detail: '',
    phone_number: '',
    wechat_id: '',
    initial_notes: '',
    edit_count: 0, // 编辑次数
    last_edited: null // 最近编辑时间
  });

  // 如果是编辑客户，从后端获取客户信息
  useEffect(() => {
    if (id) {
      axios.get(`http://127.0.0.1:8000/api/customers/${id}/`)
        .then(response => {
          setFormData(response.data); // 将获取的数据填充到表单
        })
        .catch(error => {
          console.error('Error fetching customer:', error);
        });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const currentTime = new Date().toISOString(); // 获取当前时间
    const updatedData = {
      ...formData,
      last_edited: currentTime, // 设置最近修改时间
      edit_count: formData.edit_count + 1 // 增加编辑次数
    };

    // 判断是新增还是编辑
    if (id) {
      // 更新客户信息
      axios.put(`http://127.0.0.1:8000/api/customers/${id}/`, updatedData)
        .then(() => {
          alert('Customer updated successfully');
          navigate('/customers');  // 成功后跳转到客户列表
        })
        .catch(error => {
          console.error('Error updating customer:', error);
        });
    } else {
      // 新增客户信息
      axios.post('http://127.0.0.1:8000/api/customers/', formData)
        .then(() => {
          alert('Customer added successfully');
          navigate('/customers');  // 成功后跳转到客户列表
        })
        .catch(error => {
          console.error('Error adding customer:', error);
        });
    }
  };

  return (
    <div>
      <Navbar />
      <h1>{id ? 'Edit Customer' : 'Add New Customer'}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Age</label>
          <input type="number" name="age" value={formData.age} onChange={handleChange} required />
        </div>
        <div>
          <label>Education</label>
          <select name="education" value={formData.education} onChange={handleChange}>
            <option value="初中及以下">初中及以下</option>
            <option value="大专">大专</option>
            <option value="本科">本科</option>
            <option value="研究生及以上">研究生及以上</option>
          </select>
        </div>
        <div>
          <label>Major Category</label>
          <select name="major_category" value={formData.major_category} onChange={handleChange}>
            <option value="IT">IT类</option>
            <option value="非IT">非IT类</option>
          </select>
        </div>
        <div>
          <label>Major Detail</label>
          <input
            type="text"
            name="major_detail"
            placeholder={`请输入${formData.major_category === 'IT' ? 'IT类' : '非IT类'}的具体专业`}
            value={formData.major_detail}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Phone Number</label>
          <input type="text" name="phone_number" value={formData.phone_number} onChange={handleChange} required />
        </div>
        <div>
          <label>WeChat ID</label>
          <input type="text" name="wechat_id" value={formData.wechat_id} onChange={handleChange} />
        </div>
        <div>
          <label>Notes</label>
          <textarea name="initial_notes" value={formData.initial_notes} onChange={handleChange} />
        </div>
        <button type="submit">{id ? 'Update Customer' : 'Add Customer'}</button>
      </form>
    </div>
  );
}

export default CustomerForm;