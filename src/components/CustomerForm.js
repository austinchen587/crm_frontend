import React, { useState } from "react";

function CustomerForm({onSubmit}) {
    const [name, setName] = useState('');
    const [age, setAGE] = useState('');
    const [education, setEducation] = useState('');
    const [major, setMajor] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [wechatId, setWeChatId] = useState('');
    const [initialNotes, setInitialNotes] = useState('');

    const handleSubmit = (e) => {
        e.preventDdfault();
        const customerData = {name, age, education, major, phone_number:phoneNumber, wechat_id:wechatId, initial_notes:initialNotes };
        onSubmit(customerData);

    };

    return(
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div>
                <label>Age</label>
                <input type="number" value={age} onChange={(e) => setAGE(e.target.value)} required/>
            </div>
            <div>
                <label>Education</label>
                <input type="text" value={education} onChange={(e) => setEducation(e.target.value)} required/>
            </div>
            <div>
                <label>Major</label>
                <input type="text" value={major} onChange={(e) => setMajor(e.target.value)} required/>
            </div>
            <div>
                <label>Phone Number</label>
                <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required/>
            </div>
            <div>
                <label>WeChat ID</label>
                <input type="text" value={wechatId} onChange={(e) => setWeChatId(e.target.value)} />
            </div>
            <div>
                <label>Notes</label>
                <textarea value={initialNotes} onChange={(e) => setInitialNotes(e.target.value)} />
            </div>
            <button type="submit">Submit</button>
        </form>
    );

}

export default CustomerForm;