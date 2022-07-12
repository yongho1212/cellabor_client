import React, { useState, useEffect, useRef } from "react";
  

let autoComplete;

const loadScript = (url, callback) => {
  let script = document.createElement("script");
  script.type = "text/javascript";

  if (script.readyState) {
    script.onreadystatechange = function() {
      if (script.readyState === "loaded" || script.readyState === "complete") {
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {
    script.onload = () => callback();
  }

  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
};

function handleScriptLoad(updateQuery, autoCompleteRef) {
  autoComplete = new window.google.maps.places.Autocomplete(
    autoCompleteRef.current,
    { types: ["(regions)"], componentRestrictions: { country: "kor" } }
  );
  autoComplete.setFields(["address_components", "formatted_address"]);
  autoComplete.addListener("place_changed", () =>
    handlePlaceSelect(updateQuery)
  );
}

async function handlePlaceSelect(updateQuery) {
  const addressObject = autoComplete.getPlace();
  const query = addressObject.formatted_address;
  updateQuery(query);
  console.log(query);
  console.log(addressObject);
  console.log(addressObject.formatted_address)
}

const SearchLocationInput = (props) => {
  const [query, setQuery] = useState("");
  const autoCompleteRef = useRef(null);
  const [address, setAddress] = useState("")
  
  props.setLocation(query);
  console.log(query);

  useEffect(() => {
    loadScript(
      `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLEPLACES_API}&libraries=places`,
      () => handleScriptLoad(setQuery, autoCompleteRef)
    );
  }, []);

const handleChange = (event, query) => {
    console.log(query);
    setQuery(event.target.value);
  }



  return (
    <div className="search-location-input" >
      <input
        ref={autoCompleteRef}
        onChange={handleChange}
        placeholder="enter city"
        value={query}
        style={{zIndex:200}}
      />
    </div>
  );
}

export default SearchLocationInput;