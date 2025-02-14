import React, { useState, useEffect } from "react";
import "./App.css";

const TicketBooking = () => {
  const [step, setStep] = useState(1);
  const [selectedTicket, setSelectedTicket] = useState(() => localStorage.getItem('selectedTicket') || null);
  const [numTickets, setNumTickets] = useState(() => Number(localStorage.getItem('numTickets')) || 1);
  const [userData, setUserData] = useState(() => {
    const savedData = localStorage.getItem('userData');
    return savedData ? JSON.parse(savedData) : { name: "", email: "", photo: "" };
  });
  const [previewPhoto, setPreviewPhoto] = useState(() => localStorage.getItem('previewPhoto') || null);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    localStorage.setItem('selectedTicket', selectedTicket);
    localStorage.setItem('numTickets', numTickets);
    localStorage.setItem('userData', JSON.stringify(userData));
    if (previewPhoto) localStorage.setItem('previewPhoto', previewPhoto);
  }, [selectedTicket, numTickets, userData, previewPhoto]);

  const handleTicketSelection = (ticketType) => setSelectedTicket(ticketType);

  const handleNext = () => {
    if (step === 1 && selectedTicket) setStep(2);
    else if (step === 2) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (userData.name.trim() && emailPattern.test(userData.email) && previewPhoto) {
        setUserData(prev => ({ ...prev, photo: previewPhoto }));
        setStep(3);
      } else setShowError(true);
    }
  };

  const handleBack = () => step > 1 && setStep(step - 1);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
    setShowError(false);
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewPhoto(reader.result);
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
    localStorage.clear();
  };

 return (
  <>
    <div className="navBar">
      <nav className="navbar">
        <div className="logo">ticz</div>
        <div className="nav-links">
          <a href="#">Events</a>
          <a href="#">My Tickets</a>
          <a href="#">About Project</a>
        </div>
        <button className="my-tickets-btn">MY TICKETS →</button>
      </nav>
    </div>
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
            <button className={selectedTicket === "Premium" ? "selected" : ""} onClick={() => handleTicketSelection("Premium")}>
              $250 (VVIP Access) 🏆
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
    </>
  );
};

export default TicketBooking;
