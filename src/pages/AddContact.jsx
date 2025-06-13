import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useGlobalReducer } from '../store/Context';
import '../styles/AddContact.css';

const AddContact = () => {
  const { dispatch } = useGlobalReducer();
  const navigate = useNavigate();
  const slug = "david_leon01";

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`https://playground.4geeks.com/contact/agendas/${slug}/contacts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      });

      if (!res.ok) throw new Error("Failed to create contact");

      const newContact = await res.json();
      dispatch({ type: 'ADD_CONTACT', payload: newContact });

      alert("Contact added successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error:", error);
      alert("Error creating contact.");
    }
  };



  return (
    <div>
        <div className="navbar">
            <h1>Add New Contact</h1>
            <button className='btn btn-danger' onClick={() => navigate("/")}>Cancel</button>
        </div>
        <form onSubmit={handleSubmit} className = "container form-container">
            <input 
            type="text"
            name='name'
            placeholder='Full name'
            value={form.name}
            onChange={handleChange}
            
            />

            <input 
            type="text"
            name='phone'
            placeholder='Phone number'
            value={form.phone}
            onChange={handleChange}
            
            />

            <input 
            type="text"
            name='email'
            placeholder='Email'
            value={form.email}
            onChange={handleChange}
            
            />

            <input 
            type="text"
            name='address'
            placeholder='Address'
            value={form.address}
            onChange={handleChange}
            
            />
            <button type='submit'className = "btn btn-primary" >Add</button>
        </form>

    </div>
  )
};

export default AddContact;