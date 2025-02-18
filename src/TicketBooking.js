"use client"

import { useState, useEffect } from "react"
import { Upload } from "lucide-react"
import "./App.css"

const TicketBooking = () => {
  const [step, setStep] = useState(1)
  const [selectedTicket, setSelectedTicket] = useState(() => localStorage.getItem("selectedTicket") || null)
  const [numTickets, setNumTickets] = useState(() => Number(localStorage.getItem("numTickets")) || 1)
  const [userData, setUserData] = useState(() => {
    const savedData = localStorage.getItem("userData")
    return savedData ? JSON.parse(savedData) : { name: "", email: "", photo: "", specialRequest: "" }
  })
  const [previewPhoto, setPreviewPhoto] = useState(null)
  const [showError, setShowError] = useState(false)

  useEffect(() => {
    localStorage.setItem("selectedTicket", selectedTicket || "")
    localStorage.setItem("numTickets", String(numTickets))
    localStorage.setItem("userData", JSON.stringify({ ...userData, photo: "" }))
  }, [selectedTicket, numTickets, userData])

  const handleTicketSelection = (ticketType) => setSelectedTicket(ticketType)

  const handleNext = () => {
    if (step === 1 && selectedTicket) setStep(2)
    else if (step === 2) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (userData.name.trim() && emailPattern.test(userData.email)) {
        setUserData((prev) => ({ ...prev, photo: previewPhoto }))
        setStep(3)
      } else setShowError(true)
    }
  }

  const handleBack = () => step > 1 && setStep(step - 1)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setUserData((prev) => ({ ...prev, [name]: value }))
    setShowError(false)
  }

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => setPreviewPhoto(reader.result)
      reader.readAsDataURL(file)
    }
  }

  const resetForm = () => {
    setStep(1)
    setSelectedTicket(null)
    setNumTickets(1)
    setUserData({ name: "", email: "", photo: "", specialRequest: "" })
    setPreviewPhoto(null)
    setShowError(false)
    localStorage.clear()
  }

  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="nav-left">
          <div className="logo">
            <span className="logo-icon">ꔮ</span>
            <span>tixz</span>
          </div>
          <div className="nav-links">
            <a href="#">Events</a>
            <a href="#">My Tickets</a>
            <a href="#">About Project</a>
          </div>
        </div>
        <button className="my-tickets-btn">
          MY TICKETS <span className="arrow">→</span>
        </button>
      </nav>

      <main className="main-content">
        <div className="form-container">
          {step === 1 && (
            <div className="step-content">
              <div className="step-header">
                <h1>Ticket Selection</h1>
                <span className="step-indicator">Step 1/3</span>
              </div>

              <div className="event-card">
                <h2>Techember Fest '25</h2>
                <p className="event-description">
                  Join us for an unforgettable experience at
                  <br />
                  [Event Name]! Secure your spot now.
                </p>
                <p className="event-details">📍 [Event Location] || March 15, 2025 | 7:00 PM</p>
              </div>

              <div className="ticket-section">
                <label className="section-label">Select Ticket Type:</label>
                <div className="ticket-options">
                  {[
                    { type: "Free", price: "Free", access: "REGULAR ACCESS", limit: "20/52" },
                    { type: "VIP", price: "$150", access: "VIP ACCESS", limit: "20/52" },
                    { type: "VVIP", price: "$150", access: "VVIP ACCESS", limit: "20/52" },
                  ].map((ticket) => (
                    <button
                      key={ticket.type}
                      className={`ticket-option ${selectedTicket === ticket.type ? "selected" : ""}`}
                      onClick={() => handleTicketSelection(ticket.type)}
                    >
                      <div className="ticket-info">
                        <span className="ticket-price">{ticket.price}</span>
                        <span className="ticket-access">{ticket.access}</span>
                        <span className="ticket-limit">{ticket.limit}</span>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="ticket-quantity">
                  <label className="section-label">Number of Tickets</label>
                  <select
                    value={numTickets}
                    onChange={(e) => setNumTickets(Number(e.target.value))}
                    className="quantity-select"
                  >
                    {[1, 2, 3, 4, 5].map((num) => (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="button-group">
                  <button className="btn-secondary" onClick={resetForm}>
                    Cancel
                  </button>
                  <button className="btn-primary" onClick={handleNext} disabled={!selectedTicket}>
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="step-content">
              <div className="step-header">
                <h1>Attendee Details</h1>
                <span className="step-indicator">Step 2/3</span>
              </div>

              <div className="upload-section">
                <p className="section-label">Upload Profile Photo</p>
                <div className="upload-area">
                  <input
                    type="file"
                    id="photo-upload"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                  <label htmlFor="photo-upload" className="upload-box">
                    {previewPhoto ? (
                      <img src={previewPhoto || "/placeholder.svg"} alt="Preview" className="preview-image" />
                    ) : (
                      <>
                        <Upload className="upload-icon" />
                        <span>Drag & drop or click to upload</span>
                      </>
                    )}
                  </label>
                </div>
              </div>

              <form className="form-fields">
                <div className="form-group">
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    value={userData.name}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email *"
                    value={userData.email}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="section-label">Special request?</label>
                  <textarea
                    name="specialRequest"
                    placeholder="Textarea"
                    value={userData.specialRequest}
                    onChange={handleInputChange}
                    className="form-textarea"
                  />
                </div>

                {showError && <p className="error-message">Please fill in all required fields correctly.</p>}

                <div className="button-group">
                  <button type="button" className="btn-secondary" onClick={handleBack}>
                    Back
                  </button>
                  <button type="button" className="btn-primary" onClick={handleNext}>
                    Get My Free Ticket
                  </button>
                </div>
              </form>
            </div>
          )}

          {step === 3 && (
            <div className="step-content">
              <div className="step-header">
                <h1>Your Ticket is Booked!</h1>
                <span className="step-indicator">Step 3/3</span>
              </div>

              <p className="success-message">Check your email for a copy or you can download</p>

              <div className="ticket-preview">
                <div className="ticket-card">
                  <h2>Techember Fest '25</h2>
                  <div className="ticket-details">
                    <p>📍 04 Rumens road, Ikoyi, Lagos</p>
                    <p>📅 March 15, 2025 | 7:00 PM</p>
                  </div>

                  {previewPhoto && (
                    <div className="ticket-photo">
                      <img src={previewPhoto || "/placeholder.svg"} alt="Profile" />
                    </div>
                  )}

                  <div className="ticket-info-grid">
                    <div className="info-group">
                      <label>Enter your name</label>
                      <p>{userData.name}</p>
                    </div>
                    <div className="info-group">
                      <label>Enter your email *</label>
                      <p>{userData.email}</p>
                    </div>
                    <div className="info-group">
                      <label>Ticket Type</label>
                      <p>{selectedTicket}</p>
                    </div>
                    <div className="info-group">
                      <label>Ticket for :</label>
                      <p>{numTickets}</p>
                    </div>
                  </div>

                  {userData.specialRequest && (
                    <div className="special-request">
                      <label>Special request?</label>
                      <p>{userData.specialRequest}</p>
                    </div>
                  )}

                  <div className="ticket-barcode">
                    <div className="barcode-image"></div>
                    <div className="barcode-number">234567 891026</div>
                  </div>
                </div>
              </div>

              <div className="button-group">
                <button className="btn-secondary" onClick={resetForm}>
                  Book Another Ticket
                </button>
                <button className="btn-primary">Download Ticket</button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default TicketBooking

