import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalReducer } from '../store/Context';


const ContactCard = ({ contact }) => {
  const navigate = useNavigate();
  const { dispatch } = useGlobalReducer();
  const slug = "david_leon01";
  const [show, setShow] = useState(false);

  const handleDelete = async () => {
    try {
      const res = await fetch(`https://playground.4geeks.com/contact/agendas/${slug}/contacts/${contact.id}`, {
        method: "DELETE"
      });

      if (!res.ok) throw new Error("Failed to delete contact");

      dispatch({ type: "DELETE_CONTACT", payload: contact.id });
    } catch (err) {
      alert("Error deleting contact.");
    } finally {
      setShow(false);
    }
  };

  return (
    <>
      <li className="container list-container">
        <div className="contact-container">
          <div className='contact-image'>
            <i className="fa-solid fa-circle-user"></i>
          </div>
          <div className='contact-information'>
            <span id="fullName">{contact.name}</span>
            <span>{contact.email}</span>
            <span>{contact.phone}</span>
            <span>{contact.address}</span>
          </div>
          <div className="buttons">
            <button className='btn btn-danger ms-2 mb-3' onClick={() => setShow(true)}>Delete</button>
            <button className='btn btn-warning ms-2' onClick={() => navigate(`/edit/${contact.id}`)}>Edit</button>
          </div>
        </div>
      </li>

      {show && (
        <div className="modal-backdrop-custom">
          <div className="modal-content-custom">
            <div className="modal-header-custom">
              <h5 className="modal-title-custom">Confirm Deletion</h5>
              <button onClick={() => setShow(false)} style={{ background: 'none', border: 'none', color: 'white', fontSize: '1.2rem' }}>×</button>
            </div>
            <div className="modal-body">
              Are you sure you want to delete <strong>{contact.name}</strong>?
            </div>
            <div className="modal-footer-custom">
              <button className="btn btn-secondary" onClick={() => setShow(false)}>Cancel</button>
              <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ContactCard;