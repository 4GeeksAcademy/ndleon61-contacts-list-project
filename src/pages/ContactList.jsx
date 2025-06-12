import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalReducer } from '../store/Context';

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
    <div>
        <div className="navbar">
             <h1>Contact List</h1>
            <button className='btn btn-primary' onClick={() => navigate("/add")}>Add Contact</button>
        </div>
        <div className="container">
            {store.contacts.length === 0 ? (
                <p>No contacts found.</p>
            ) : (
                <ul>
                {store.contacts.map((contact) => (
                    <li key={contact.id}>
                    {contact.name} – {contact.email} - {contact.phone} - {contact.address}
                    <button className='btn btn-danger ms-2' onClick={() => handleDelete(contact.id)}>Delete</button>
                    </li>
                ))}
                </ul>
            )}
        </div>
        
    </div>
  )
};

export default ContactList;