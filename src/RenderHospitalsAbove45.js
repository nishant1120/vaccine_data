import React from "react";

const RenderHospitalsAbove45 = ({ hospitals }) => {
  console.log(hospitals);
  return (
    <div className="list_parent">
      {hospitals?.map((hospital, i) => (
        <div className="renderHospitals" key={i}>
          {hospital.sessions.map((session, idx) =>
            session.min_age_limit === 45 ? (
              <div key={idx}>
                <h3>{hospital.name}</h3>
                {session.available_capacity} doses available on dated:
                {session.date}
              </div>
            ) : null,
          )}
        </div>
      ))}
    </div>
  );
};

export default RenderHospitalsAbove45;
