import React, { useState } from "react";
import "./App.css";

const TicketForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    avatar: "",
  });
  const [errors, setErrors] = useState({});
  const [ticket, setTicket] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required";
    if (!formData.email.match(/^[^@]+@[^@]+\.[^@]+$/)) newErrors.email = "Invalid email";
    if (!formData.avatar.trim().match(/^https?:\/\/.+/)) newErrors.avatar = "Valid image URL is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setTicket(formData);
    }
  };

  return (
    <div className="container">
      <h2>🎟 Event Ticket Generator</h2>
      <form onSubmit={handleSubmit} className="form-container">
        <label>Full Name</label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Enter your full name"
          className="input-field"
        />
        {errors.fullName && <p className="error">{errors.fullName}</p>}

        <label>Email Address</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          className="input-field"
        />
        {errors.email && <p className="error">{errors.email}</p>}

        <label>Avatar URL</label>
        <input
          type="text"
          name="avatar"
          value={formData.avatar}
          onChange={handleChange}
          placeholder="Paste your image URL"
          className="input-field"
        />
        {errors.avatar && <p className="error">{errors.avatar}</p>}

        <button type="submit" className="submit-btn">Generate Ticket</button>
      </form>

      {ticket && (
        <div className="ticket">
          <img src={ticket.avatar} alt="Avatar" className="avatar" />
          <h3>{ticket.fullName}</h3>
          <p>{ticket.email}</p>
        </div>
      )}
    </div>
  );
};

export default TicketForm;
