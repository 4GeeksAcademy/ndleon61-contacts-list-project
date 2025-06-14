import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalReducer } from '../store/Context';
import ContactCard from '../components/ContactCard';
import '../styles/ContactList.css';

const ContactList = () => {
  const navigate = useNavigate();
  const { store, dispatch } = useGlobalReducer();
  const slug = "david_leon01";

  const ensureAgendaExists = async () => {
    try {
      const res = await fetch(`https://playground.4geeks.com/contact/agendas/${slug}`);
      if (!res.ok) {
        await fetch(`https://playground.4geeks.com/contact/agendas/${slug}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({})
        });
      }
    } catch (error) {
      console.error("Agenda check failed", error);
    }
  };

  const loadContacts = async () => {
    try {
      const res = await fetch(`https://playground.4geeks.com/contact/agendas/${slug}/contacts`);
      const data = await res.json();
      dispatch({ type: 'SET_CONTACTS', payload: Array.isArray(data.contacts) ? data.contacts : [] });
    } catch (error) {
      console.error("Error loading contacts:", error);
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
        <h1 className='title'><i className="fa-solid fa-address-book"></i> Contact List</h1>
        <button className='btn btn-primary' onClick={() => navigate("/add")}>Add Contact</button>
      </div>
      <div>
        {store.contacts.length === 0 ? (
          <p>No contacts found.</p>
        ) : (
          <ul>
            {store.contacts.map(contact => (
              <ContactCard key={contact.id} contact={contact} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ContactList;