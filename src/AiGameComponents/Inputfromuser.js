import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const InputFormUser = ({ infoSent }) => { 
  const [country1, setCountry1] = useState("");
  const [country2, setCountry2] = useState("");
  const navigate = useNavigate();

  
  const handleBac = () => {
    navigate(-1); 
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!country1 || !country2) {
      alert("one of the fields are empty");
      return;

    }

    infoSent(country1, country2);

    setCountry1("");
    setCountry2("");

  };

  return (

    <div>
    <form onSubmit={handleSubmit}>
      <label>
        Country 1:
        <input
          type="text"
          value={country1}
          onChange={(e) => setCountry1(e.target.value)}

        />

      </label>
      <br />
      <label>
        Country 2:
        <input
          type="text"
          value={country2}
          onChange={(e) => setCountry2(e.target.value)}

        />


      </label>
      <br />
      <button
  type="submit"
  style={{
    fontFamily: 'Roboto, sans-serif', 
    
    color: "white", 
    backgroundColor:"#005070", 
  
    padding: '12px 24px', 
    border: 'none',
    borderRadius: '5px', 
    cursor: 'pointer', 
    fontSize: '16px', 
    transition: 'background-color 0.3s',

    
  }}
 
 
>
  Explore!
</button>






    </form>

<br></br>

    <button   style={{
    fontFamily: 'Roboto, sans-serif', 
    
    color: "white", 
    backgroundColor:"#005070", 
  
    padding: '12px 24px', 
    border: 'none',
    borderRadius: '5px', 
    cursor: 'pointer', 
    fontSize: '16px', 
    transition: 'background-color 0.3s',
  } }onClick={handleBac}>
              Back to Recipe Search
            </button>
    </div>

  );
};

export default InputFormUser;