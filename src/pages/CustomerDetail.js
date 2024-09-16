import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function CustomerDetail() {
  const { id } = useParams(); //取得客户的ID
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(null);  // 初始状态为 null
  const [loading, setLoading] = useState(true);    // 用于处理加载状态
  const [error, setError] = useState(null);        // 用于处理错误状态
  const [noteHistory, setNoteHistory] = useState([]); // 保存历史记录

  //取得客户详情
  useEffect(() => {
    console.log('Fetching customer data for ID:', id);  // 添加日志检查
    axios.get(`http://127.0.0.1:8000/api/customers/${id}/`)
      .then(response => {
        setCustomer(response.data);  // 成功获取到数据后更新 customer 状态
        setLoading(false);            // 停止 loading
      })
      .catch(error => {
        setError('Error fetching customer data');
        setLoading(false);            // 停止 loading
      });

    // 取得客户的笔记历史记录
    axios.get(`http://127.0.0.1:8000/api/customers/${id}/note_history/`)
      .then(response => {
        setNoteHistory(response.data);  // 保存历史记录
      })
      .catch(error => {
        console.error('Error fetching note history:', error);
      });
  }, [id]);

  const handleDelete = () => {
    axios.delete(`http://127.0.0.1:8000/api/customers/${id}/`)
      .then(() => {
        alert('Customer deleted successfully');
        navigate('/customers'); // 删除后跳转到客户列表
      })
      .catch(error => {
        console.error('Error deleting customer:', error);
      });
  };
  
  if (loading) return <div>Loading...</div>;  // 数据加载时显示
  if (error) return <div>{error}</div>;       // 如果出错显示错误信息

  return (
    <div>
      <Navbar />
      <h1>{customer.name}'s Details</h1>
      {/* 显示客户详细信息 */}
      <p><strong>Age:</strong> {customer.age}</p>
      <p><strong>Education:</strong> {customer.education}</p>
      <p><strong>Major:</strong> {customer.major_category} - {customer.major_detail}</p>
      <p><strong>Phone:</strong> {customer.phone_number}</p>
      <p><strong>WeChat:</strong> {customer.wechat_id}</p>
      <p><strong>Current Notes:</strong> {customer.initial_notes}</p>

      {/* 显示历史笔记记录 */}
      <h2>Notes History</h2>
      <ul>
        {noteHistory.map((note, index) => (
          <li key={index}>
            <strong>{new Date(note.timestamp).toLocaleString()}:</strong> {note.note_content}
          </li>
        ))}
      </ul>

      <button onClick={() => navigate(`/customers/${id}/edit`)}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default CustomerDetail;