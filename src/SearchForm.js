import React, { useRef, useState } from "react";
import DatePicker from "react-date-picker";
import RenderHospitalsAbove45 from "./RenderHospitalsAbove45.js";
import {
  callVaccinebyPin,
  callVaccinebydistrict,
  states,
  districtCall,
} from "./api.js";
import RenderHospitalsAbove18 from "./RenderHospitalsAbove18.js";

const SearchForm = () => {
  const pinRef = useRef();
  const [date, onChangeDate] = useState(new Date());
  const [error, setError] = useState("");
  const [searchType, setSearchType] = useState("PinCode");
  const [statesIndia, setStatesIndia] = useState([]);
  const [selectedState, setSelectedState] = useState(null);
  const [DistirctState, setDistirctsState] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedDistrict_id, setSelectedDistrict_id] = useState(null);
  const [renderVaccineHospitals, setRenderVaccineHospitals] = useState(null);
  const [eighteenPlusOn, setEighteeenPlusOn] = useState(false);

  const callVaccinApibypin = async () => {
    var datee = parseInt(date.getDate());
    var month = parseInt(date.getMonth() + 1);
    var year = date.getFullYear();
    if (!pinRef.current.value || pinRef.current.value.length !== 6) {
      setError("Please Type a valid Pincode");
    } else {
      if (datee <= 9) datee = "0" + datee;
      if (month <= 9) month = "0" + month;
      var new_date = datee + "-" + month + "-" + year;

      const response = await callVaccinebyPin(pinRef.current.value, new_date);

      if (response.error) {
        setError("Please enter valid Details");
        setRenderVaccineHospitals(null);
        // console.log();
      } else if (response.centers.length) {
        setError("");
        setRenderVaccineHospitals(response.centers);
        console.log(response.centers);
      } else {
        setError("No Data Available For Above Selected Dates");
        setRenderVaccineHospitals(null);
      }
    }
  };

  const callStatesApi = async () => {
    var response = await states();
    setStatesIndia(response.states);
  };
  const callDictircsAPi = async (e) => {
    const stateId = e.target.childNodes[e.target.selectedIndex].getAttribute(
      "id",
    );
    setSelectedState(e.target.value);
    const response = await districtCall(stateId);
    setDistirctsState(response.districts);
  };
  const callVaccinApibyDiscript = async () => {
    const dates = new Date();
    var datee = parseInt(dates.getDate());
    var month = parseInt(dates.getMonth() + 1);
    var year = dates.getFullYear();
    if (datee <= 9) datee = "0" + datee;
    if (month <= 9) month = "0" + month;
    var new_date = datee + "-" + month + "-" + year;
    const response = await callVaccinebydistrict(selectedDistrict_id, new_date);
    if (response.error) {
      setError("Please enter valid Details");
      setRenderVaccineHospitals(null);

      // console.log();
    } else if (response.centers.length) {
      setError("");
      setRenderVaccineHospitals(response.centers);
      console.log(response.centers);
    } else {
      setError("No Data Available For Above Selected Dates");
      setRenderVaccineHospitals(null);
    }
  };
  return (
    <div className="searchForm">
      <div>
      <span class="buttonsearch" >
        <button class="searchby"
           onClick={() => {
            setSearchType("PinCode");
            setError("");
            setRenderVaccineHospitals(null);
          }}
        >
          Search By PinCode
        </button>
        </span>
        <span class="buttonsearch" >
        <button class="searchby"
          onClick={() => {
            setSearchType("District");
            callStatesApi();
            setError("");
            setRenderVaccineHospitals(null);
          }}
        >
          Search By District
        </button>
      </span>
      </div>
      <div>
        <div>    
          <DatePicker
            // type="date"
            onChange={onChangeDate}
            value={date}
            minDate={new Date()}
            className="datepicker"
          /></div>

      {searchType === "PinCode" ? (
        <>
        <span className="ip">
          <input className="pinCode" ref={pinRef} type="number" placeholder="pinCode" />
          </span>
          <button className="submit" onClick={() => callVaccinApibypin()}>Submit</button>
        </>
      ) : searchType === "District" ? (
        <div >
          <span className="districtTitle">Disritct:</span>
          <span style={{paddingRight:"8px"}}>
          <select className="district"
            value={selectedState}
            onChange={(e) => callDictircsAPi(e)}
            style={{ width: "250px" }}
          >
            <option value="Select State" selected disabled>
              Select State
            </option>
            {statesIndia.map((stateEle, id) => (
              <option
                value={stateEle.state_name}
                key={id}
                id={stateEle.state_id}
              >
                {stateEle.state_name}
              </option>
            ))}
          </select>
          </span>
          <span style={{paddingRight:"12px"}}>
          <select className="district"
            value={selectedDistrict}
            onChange={(e) => {
              setSelectedDistrict(e.target.value);
              setSelectedDistrict_id(
                e.target.childNodes[e.target.selectedIndex].getAttribute("id"),
              );
            }}
            style={{ width: "250px" }}
          >
            <option value="distrcit" selected disabled>
              Select Distirct
            </option>
            {DistirctState.map((stateEle, id) => (
              <option
                value={stateEle.district_name}
                key={id}
                id={stateEle.district_id}
              >
                {stateEle.district_name}
              </option>
            ))}
          </select>
          </span>
          <button className="submit" onClick={() => callVaccinApibyDiscript()}>Submit</button>
        </div>
      ) : null}
      </div>


      <div className="error">{error}</div>
      <button 
        className={eighteenPlusOn ? "selected" : "nothing"}
        onClick={() => setEighteeenPlusOn(!eighteenPlusOn)}
      >
        Show only 18-44
      </button>
      {eighteenPlusOn ? (
        <RenderHospitalsAbove18 hospitals={renderVaccineHospitals} />
      ) : (
        <RenderHospitalsAbove45 hospitals={renderVaccineHospitals} />
      )}
    </div>
  );
};

export default SearchForm;
