import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalReducer } from '../store/Context';
import '../styles/ContactList.css';

const ContactList = () => {
    
    const navigate = useNavigate();
    const { store, dispatch } = useGlobalReducer();
    const slug = "david_leon01"

   const ensureAgendaExists = async () => {
        try {
            const check = await fetch(`https://playground.4geeks.com/contact/agendas/${slug}`);
            if (check.ok) {
            console.log("Agenda already exists");
            return;
            }

        
            const res = await fetch(`https://playground.4geeks.com/contact/agendas/${slug}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({}) 
            });

            if (!res.ok) throw new Error("Failed to create agenda");

            const data = await res.json();
            console.log("Agenda created:", data);
        } catch (error) {
            console.error("Error ensuring agenda exists:", error);
        }
    };

        const loadContacts = async () => {
            try {
                const res = await fetch(`https://playground.4geeks.com/contact/agendas/${slug}/contacts`);
                if (!res.ok) throw new Error("Failed to load contacts");

                const data = await res.json();
                console.log("✅ Contacts from API:", data);
                dispatch ({type: 'SET_CONTACTS', payload: Array.isArray(data.contacts) ? data.contacts: [] });
            } catch (error) {
                console.error(error);
            }
        };

        //This function is for deleting contacts

       const handleDelete = async (id) => {
            const confirm = window.confirm("Are you sure you want to delete this contact?");
            if (!confirm) return;

            try {
                const res = await fetch(`https://playground.4geeks.com/contact/agendas/${slug}/contacts/${id}`, {
                method: "DELETE"
                });

                if (!res.ok) throw new Error("Failed to delete contact");

                dispatch({ type: "DELETE_CONTACT", payload: id });

            } catch (error) {
                console.error("Error deleting contact", error);
                alert("Failed to delete contact.");
            }
        };

        useEffect(() => {
            const init = async () => {
                await ensureAgendaExists(); 
                await loadContacts();      
            };
        init();
        }, [dispatch, store.updated]);
        

  return (
    <div className='page'>
        <div className="navbar">
             <h1 className='title'>Contact List</h1>
            <button className='btn btn-primary' onClick={() => navigate("/add")}>Add Contact</button>
        </div>
        <div className="container list-container">
            {store.contacts.length === 0 ? (
                <p>No contacts found.</p>
            ) : (
                <ul>
                {store.contacts.map((contact) => (
                    <li key={contact.id}>
                        <div className="contact-container">
                            <div className='contact-image'>
                            <img src="https://cdn3.vectorstock.com/i/1000x1000/61/97/black-contact-person-icon-on-white-background-vector-31046197.jpg" alt="" />
                        </div>
                        <div className='contact-information'>
                            <span>{contact.name}</span> 
                            <span>{contact.email}</span>
                            <span>{contact.phone}</span>
                            <span>{contact.address}</span>
                        </div>
                        
                        </div>  
                        <button className='btn btn-danger ms-2 mb-3' onClick={() => handleDelete(contact.id)}>Delete</button>
                   
                    </li>
                ))}
                </ul>
            )}
        </div>
        
    </div>
  )
};

export default ContactList;