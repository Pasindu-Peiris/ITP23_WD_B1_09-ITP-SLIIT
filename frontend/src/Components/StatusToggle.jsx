import React from 'react';

function StatusToggle({ status, onToggle }) {
  const isAvailable = status === 'Available';

  return (
    <div className="toggle-switch-container">
      <div className='flex'>
      Status :&nbsp;
        <p className={`status-text ${isAvailable ? 'available-text' : 'unavailable-text'}`}>
           {status}&nbsp;&nbsp;
        </p>
        <label className={`toggle-switch ${isAvailable ? 'available' : 'unavailable'}`}>
          <input
            type="checkbox"
            checked={isAvailable}
            onChange={() => onToggle(isAvailable ? 'Unavailable' : 'Available')}
          />
          <span className="slider round"></span>
        </label>
      </div>
    </div>
  );
}

export default StatusToggle;
