import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGlobalReducer } from '../store/Context';
import '../styles/EditContact.css';

const EditContact = () => {
  const { id } = useParams();
  const slug = "david_leon01";
  const navigate = useNavigate();
  const { dispatch } = useGlobalReducer();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    agenda: slug
  });

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const res = await fetch(`https://playground.4geeks.com/contact/agendas/${slug}/contacts`);
        const data = await res.json();
        const contact = data.contacts.find(c => c.id === parseInt(id));
        if (!contact) throw new Error("Contact not found");

        setForm({ ...contact, agenda: slug });
      } catch (error) {
        console.error("Failed to fetch contact:", error);
        alert("Could not load contact info.");
        navigate("/");
      }
    };

    fetchContact();
  }, [id, navigate]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`https://playground.4geeks.com/contact/agendas/${slug}/contacts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      });

      if (!res.ok) throw new Error("Failed to update contact");

      dispatch({ type: 'UPDATE_CONTACT' });
      alert("Contact updated successfully!");
      navigate("/");
    } catch (error) {
      console.error("Update error:", error);
      alert("Error updating contact.");
    }
  };

  return (
    <div>
      <div className="navbar">
        <h1><i class="fa-solid fa-user-pen"></i> Edit Contact</h1>
        <button className="btn btn-danger" onClick={() => navigate("/")}>Cancel</button>
      </div>
      <form onSubmit={handleSubmit} className = "container form-container">
        <input
          type="text"
          name="name"
          placeholder="Full name"
          value={form.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone number"
          value={form.phone}
          onChange={handleChange}
        />
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
        />
        <button type="submit" className = "btn btn-primary">Update</button>
      </form>
    </div>
  );
};

export default EditContact;