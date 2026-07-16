import React from 'react';
import './SavedLocations.css';

const SavedLocations = ({ locations, onLoad, onRemove }) => {
  return (
    <div className="saved-locations-container">
      <h3>⭐ Saved Locations</h3>
      <div className="saved-locations-grid">
        {locations.map((location) => (
          <div key={location.name} className="saved-location-card">
            <div className="location-info">
              <h4>{location.name}</h4>
              <p>{location.country}</p>
            </div>
            <div className="location-actions">
              <button
                className="btn btn-primary btn-small"
                onClick={() => onLoad(location.name)}
              >
                📍 Load
              </button>
              <button
                className="btn btn-danger btn-small"
                onClick={() => onRemove(location.name)}
              >
                ✕ Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedLocations;