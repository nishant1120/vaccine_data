import React from "react";

const RenderHospitalsAbove45 = ({ hospitals }) => {
  console.log(hospitals);
  return (
    <div className="list_parent">
      {hospitals?.map((hospital, i) => (
        <div className="renderHospitals" key={i}>
          {hospital.sessions.map((session, idx) =>
            session.min_age_limit === 45 ? (
              <>
                <div key={idx}>
                  <h3>{hospital.name}</h3>
                  <b id="no0fdoses">{session.available_capacity}</b> doses
                  available on dated:
                  {session.date}
                </div>
                <span>45+ patient</span>
              </>
            ) : null,
          )}
        </div>
      ))}
    </div>
  );
};

export default RenderHospitalsAbove45;
