import React, { useState } from "react";
import "./App.css";

const TicketBooking = () => {
  const [step, setStep] = useState(1);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [numTickets, setNumTickets] = useState(1);
  const [userData, setUserData] = useState({ name: "", email: "", photo: "" });
  const [previewPhoto, setPreviewPhoto] = useState(null);
  const [showError, setShowError] = useState(false);

  const handleTicketSelection = (ticketType) => {
    setSelectedTicket(ticketType);
  };

  const handleNext = () => {
    if (step === 1 && selectedTicket) {
      setStep(2);
    } else if (step === 2) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (userData.name && emailPattern.test(userData.email) && previewPhoto) {
        setUserData({ ...userData, photo: previewPhoto });
        setStep(3);
      } else {
        setShowError(true);
      }
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
    setShowError(false);
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewPhoto(reader.result);
        setShowError(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const resetForm = () => {
    setStep(1);
    setSelectedTicket(null);
    setNumTickets(1);
    setUserData({ name: "", email: "", photo: "" });
    setPreviewPhoto(null);
    setShowError(false);
  };

  return (
    <div className="container">
      <h2 className="title">🎉 Techember Fest "25 🎟️</h2>
      <p className="event-details">Join us for an unforgettable experience! 🕺💃</p>
      <p className="event-info">📍 Event Location | 🕒 March 15, 2025 | 7:00 PM</p>

      {step === 1 && (
        <div className="ticket-selection slide-in">
          <h2>🎫 Ticket Selection</h2>
          <p>Select your ticket type:</p>
          <div className="ticket-options">
            <button
              className={selectedTicket === "Free" ? "selected" : ""}
              onClick={() => handleTicketSelection("Free")}
            >
              Free (Regular Access)
            </button>
            <button
              className={selectedTicket === "VIP" ? "selected" : ""}
              onClick={() => handleTicketSelection("VIP")}
            >
              $150 (VIP Access) 🌟
            </button>
          </div>
          <label htmlFor="numTickets">🎟️ Select Number of Tickets:</label>
          <input
            type="number"
            id="numTickets"
            min="1"
            value={numTickets}
            onChange={(e) => setNumTickets(e.target.value)}
          />
          <div className="buttons">
            <button onClick={resetForm}>❌ Cancel</button>
            {selectedTicket && <button onClick={handleNext}>➡️ Next</button>}
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="attendee-details fade-in">
          <h2>📝 Attendee Details</h2>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={userData.name}
            onChange={handleInputChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={userData.email}
            onChange={handleInputChange}
          />
          <input type="file" accept="image/*" onChange={handlePhotoUpload} />
          {previewPhoto && (
            <div className="photo-preview zoom-in">
              <h3>📸 Preview</h3>
              <img src={previewPhoto} alt="Preview" />
            </div>
          )}
          {showError && <p style={{ color: "red" }}>⚠️ Please fill in all fields with a valid email!</p>}
          <div className="buttons">
            <button onClick={handleBack} style={{ fontSize: "16px", padding: "14px" }}>⬅️ Back</button>
            <button onClick={handleNext} style={{ fontSize: "16px", padding: "14px" }}>
              Get My {selectedTicket} Ticket 🎟️
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="ticket-ready fade-in">
          <h2>✅ Your Ticket is Booked!</h2>
          <p>Name : {userData.name} 🎉</p>
          <p>Email : {userData.email} 📩</p>
          {userData.photo && <img src={userData.photo} alt="Profile" />}
          <div className="buttons">
            <button>📥 Download Ticket</button>
            <button onClick={resetForm}>🔄 Book Another Ticket</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketBooking;
