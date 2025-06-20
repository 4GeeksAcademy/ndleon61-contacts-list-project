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

      {/* Modal */}
      {show && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Deletion</h5>
                <button type="button" className="btn-close" onClick={() => setShow(false)}></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete <strong>{contact.name}</strong>?</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShow(false)}>Cancel</button>
                <button type="button" className="btn btn-danger" onClick={handleDelete}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ContactCard;