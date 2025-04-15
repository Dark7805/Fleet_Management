import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import {
  FaRoute, FaCar, FaUser, FaCalendarAlt, FaMoneyBillWave, FaEnvelope
} from "react-icons/fa";
import { LoadScript } from "@react-google-maps/api";
import './CreateBooking.css';

const GOOGLE_MAPS_API_KEY = "AIzaSyDUkq2hwjltBH-BkcZxVpRVPWuYL_0_uzI";

const CreateTripForm = () => {
  const [formData, setFormData] = useState({
    customerId: "", vehicleId: "", driverId: "", tripType: "",
    startLocation: "", endLocation: "", totalKm: 0,
    startDate: "", endDate: "", totalAmount: "", tripStatus: "", email: ""
  });

  const [customers, setCustomers] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const startRef = useRef(null);
  const endRef = useRef(null);

  useEffect(() => {
    Promise.all([ 
      axios.get("http://localhost:5000/api/getCustomers"),
      axios.get("http://localhost:5000/api/getVehicles"),
      axios.get("http://localhost:5000/api/getDrivers")
    ]).then(([custRes, vehRes, drivRes]) => {
      setCustomers(custRes.data);
      setVehicles(vehRes.data);
      setDrivers(drivRes.data);
    });
  }, []);

  const onLoadAutocomplete = (google) => {
    // Initialize Autocomplete once the Google Maps script is loaded
    if (startRef.current && endRef.current) {
      const fromAuto = new google.maps.places.Autocomplete(startRef.current);
      fromAuto.setFields(["formatted_address"]);
      fromAuto.addListener("place_changed", () => {
        const place = fromAuto.getPlace();
        setFormData((prev) => ({ ...prev, startLocation: place?.formatted_address || "" }));
      });

      const toAuto = new google.maps.places.Autocomplete(endRef.current);
      toAuto.setFields(["formatted_address"]);
      toAuto.addListener("place_changed", () => {
        const place = toAuto.getPlace();
        setFormData((prev) => ({ ...prev, endLocation: place?.formatted_address || "" }));
      });
    }
  };

  // Calculate distance between start and end locations
  useEffect(() => {
    if (formData.startLocation && formData.endLocation && window.google) {
      const service = new window.google.maps.DistanceMatrixService();
      service.getDistanceMatrix(
        {
          origins: [formData.startLocation],
          destinations: [formData.endLocation],
          travelMode: window.google.maps.TravelMode.DRIVING
        },
        (response, status) => {
          if (status === "OK") {
            const distanceText = response.rows[0].elements[0].distance.text;
            const distanceKm = parseFloat(distanceText.replace(/[^0-9.]/g, ""));
            setFormData((prev) => ({ ...prev, totalKm: distanceKm }));
          }
        }
      );
    }
  }, [formData.startLocation, formData.endLocation]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await axios.post("http://localhost:5000/api/trips", formData);
      alert("Trip created successfully!");
      setFormData({
        customerId: "", vehicleId: "", driverId: "", tripType: "",
        startLocation: "", endLocation: "", totalKm: 0,
        startDate: "", endDate: "", totalAmount: "", tripStatus: "", email: ""
      });
    } catch (err) {
      console.error(err);
      alert("Error creating trip");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <LoadScript
        googleMapsApiKey={GOOGLE_MAPS_API_KEY}
        libraries={["places"]}
        onLoad={() => onLoadAutocomplete(window.google)}
      />

      <div className="trip-form-container">
        <div className="form-header">
          <h2><FaRoute /> Create New Trip</h2>
          <p>Fill in the details below to schedule a new trip</p>
        </div>

        <form onSubmit={handleSubmit} className="trip-form">
          <div className="form-grid">
            <div className="form-group">
              <label><FaUser /> Customer</label>
              <select name="customerId" value={formData.customerId} onChange={handleChange} className="form-select" required>
                <option value="">Select Customer</option>
                {customers.map((c) => (<option key={c._id} value={c._id}>{c.name}</option>))}
              </select>
            </div>

            <div className="form-group">
              <label><FaCar /> Vehicle</label>
              <select name="vehicleId" value={formData.vehicleId} onChange={handleChange} className="form-select" required>
                <option value="">Select Vehicle</option>
                {vehicles.map((v) => (<option key={v._id} value={v._id}>{v.vehicleName}</option>))}
              </select>
            </div>

            <div className="form-group">
              <label><FaUser /> Driver</label>
              <select name="driverId" value={formData.driverId} onChange={handleChange} className="form-select" required>
                <option value="">Select Driver</option>
                {drivers.map((d) => (<option key={d._id} value={d._id}>{d.driverName}</option>))}
              </select>
            </div>

            <div className="form-group">
              <label><FaRoute /> Trip Type</label>
              <select name="tripType" value={formData.tripType} onChange={handleChange} className="form-select" required>
                <option value="">Select Trip Type</option>
                <option value="Single Trip">Single Trip</option>
                <option value="Round Trip">Round Trip</option>
                <option value="Hourly">Hourly</option>
                <option value="Daily">Daily</option>
              </select>
            </div>

            <div className="form-group">
              <label>From Location</label>
              <input ref={startRef} id="startLocation" type="text" placeholder="Enter starting point" className="form-input" required />
            </div>

            <div className="form-group">
              <label>To Location</label>
              <input ref={endRef} id="endLocation" type="text" placeholder="Enter destination" className="form-input" required />
            </div>

            <div className="form-group">
              <label>Distance (KM)</label>
              <input type="text" value={`${formData.totalKm.toFixed(1)} km`} readOnly className="form-input readonly" />
            </div>

            <div className="form-group">
              <label><FaCalendarAlt /> Start Date</label>
              <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} className="form-input" required />
            </div>

            <div className="form-group">
              <label><FaCalendarAlt /> End Date</label>
              <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} className="form-input" required />
            </div>

            <div className="form-group">
              <label><FaMoneyBillWave /> Total Amount (₹)</label>
              <input type="number" name="totalAmount" value={formData.totalAmount} onChange={handleChange} placeholder="Enter amount" className="form-input" required />
            </div>

            <div className="form-group">
              <label>Trip Status</label>
              <select name="tripStatus" value={formData.tripStatus} onChange={handleChange} className="form-select" required>
                <option value="">Select Status</option>
                <option value="Scheduled">Scheduled</option>
                <option value="Ongoing">Ongoing</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <div className="form-group">
              <label><FaEnvelope /> Customer Email</label>
              <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="customer@example.com" className="form-input" />
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="submit-btn" disabled={isSubmitting}>
              {isSubmitting ? (<><span className="spinner"></span> Submitting...</>) : "Create Trip"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateTripForm;
