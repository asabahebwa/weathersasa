import React from "react";
import "../styles/Header.css";

function Header({
  city,
  handleCityChange,
  autocompleteCities,
  setSelectedCity,
  cities,
  setCoordinates,
  setLoading,
  autocompleteErr,
}) {
  return (
    <header className="app-header">
      <h1>WEATHER</h1>
      <div className="header-search">
        <div className="placesAutocomplete">
          <div className="placesAutocomplete__inputWrap">
            <input
              list="places"
              type="text"
              id="city"
              name="city"
              onChange={handleCityChange}
              onInput={(e) => {
                if (autocompleteCities.includes(e.target.value)) {
                  // console.log("Selected city from list:", e.target.value);
                  setSelectedCity(e.target.value);

                  // Find selected city coordinates when it matches
                  const selectedPlace = cities.find(
                    (c) => c.name === e.target.value
                  );
                  if (selectedPlace) {
                    const [longitude, latitude] = selectedPlace.coordinates;
                    setCoordinates({ latitude, longitude });
                    setLoading(true);
                  }
                }
              }}
              value={city}
              required
              placeholder="Enter a city"
              pattern={autocompleteCities.join("|")}
              autoComplete="off"
            />
            <datalist id="places">
              {autocompleteCities.map((city, i) => (
                <option key={i}>{city}</option>
              ))}
            </datalist>
          </div>
          {autocompleteErr && (
            <span className="inputError">{autocompleteErr}</span>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
