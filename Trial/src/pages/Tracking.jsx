import React, { useEffect, useState } from "react";
import axios from "axios";
import { GoogleMap, LoadScript, Marker, DirectionsService, DirectionsRenderer } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "500px"
};

const center = {
  lat: 20.5937,
  lng: 78.9629
};

const TrackingMap = () => {
  const [bookings, setBookings] = useState([]);
  const [directions, setDirections] = useState([]);

  // Function to fetch LatLng from Geocoding API
  const getLatLng = async (address) => {
    const apiKey = "AIzaSyDUkq2hwjltBH-BkcZxVpRVPWuYL_0_uzI"; // Replace with your actual API key
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`
    );
    const location = response.data.results[0]?.geometry.location;
    return location;
  };

  // Function to fetch directions for each booking
  const getDirections = (start, end, index) => {
    const directionsService = new window.google.maps.DirectionsService();
    directionsService.route(
      {
        origin: start,
        destination: end,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirections((prevDirections) => {
            const newDirections = [...prevDirections];
            newDirections[index] = result;
            return newDirections;
          });
        } else {
          console.error("Error fetching directions:", result);
        }
      }
    );
  };

  // Fetch multiple bookings and process them
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/bookings"); // Adjust your API URL
        setBookings(res.data); // assuming you have multiple bookings now

        // Fetch locations and get directions for each booking
        for (let i = 0; i < res.data.length; i++) {
          const { startLocation, endLocation } = res.data[i];
          const start = await getLatLng(startLocation);
          const end = await getLatLng(endLocation);

          if (start && end) {
            // Fetch directions for each booking
            getDirections(start, end, i);
          }
        }
      } catch (err) {
        console.error("Error loading bookings:", err);
      }
    };

    fetchBookings();
  }, []);

  return (
    <LoadScript googleMapsApiKey="AIzaSyDUkq2hwjltBH-BkcZxVpRVPWuYL_0_uzI">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={5}>
        {bookings.map((booking, index) => {
          const { startLocation, endLocation } = booking;

          return (
            <React.Fragment key={index}>
              {/* Marker for start location */}
              {startLocation && <Marker position={startLocation} label={`Start ${index + 1}`} />}
              {/* Marker for end location */}
              {endLocation && <Marker position={endLocation} label={`End ${index + 1}`} />}

              {/* Directions Renderer for this booking */}
              {directions[index] && (
                <DirectionsRenderer
                  directions={directions[index]}
                  options={{ suppressMarkers: true }} // Disable default markers
                />
              )}
            </React.Fragment>
          );
        })}
      </GoogleMap>
    </LoadScript>
  );
};

export default TrackingMap;
