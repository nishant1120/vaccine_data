import React from "react";

const RenderHospitalsAbove18 = ({ hospitals }) => {
  return (
    <div className="list_parent">
      <table >
                  <tr style={{padding:"16px"}}>
                    <th>Hospital Name</th>
                    <th>Dose availability</th>
                    <th>Age eligibilty</th>
                    </tr>
 
      {hospitals?.map((hospital, i) => (
        // <div className="renderHospitals" key={i}>
          hospital.sessions.map((session, idx) =>
            session.min_age_limit === 18 ? (
              <> 
                  <tr key={idx} style={{padding:"16px"}}>
                    
                    <td class="hospitalName">
                         {hospital.name}
                      </td>
                      <td class="hospitalName">
                    
                    <b id="no0fdoses">{session.available_capacity}</b> doses
                    available on dated: {" "}
                    {session.date}  </td>
                    <td class="hospitalName">
                      <span>18+ patient</span>
                    </td>
                    </tr>
              </>
            ) : null,
          )
      ))}
      </table>
    </div>
  );
};

export default RenderHospitalsAbove18;
