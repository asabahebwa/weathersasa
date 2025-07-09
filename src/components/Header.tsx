import {
  useState,
  useRef,
  useEffect,
  type ChangeEvent,
  type FocusEvent,
  type MouseEvent,
} from "react";
import {
  faSearch,
  faTimes,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { type Place } from "../services/fetchPlace";
import { type Coordinates } from "../services/forecast";
import "../styles/Header.css";

interface HeaderProps {
  city: string;
  handleCityChange: (e: ChangeEvent<HTMLInputElement>) => void;
  autocompleteCities: Place[];
  setAutocompleteCities: (cities: Place[]) => void;
  setSelectedCity: (city: string) => void;
  cities: Place[];
  setCoordinates: (coordinates: Coordinates) => void;
  setLoading: (loading: boolean) => void;
  autocompleteErr: string | null;
}

function Header({
  city,
  handleCityChange,
  autocompleteCities,
  setAutocompleteCities,
  setSelectedCity,
  cities,
  setCoordinates,
  setLoading,
  autocompleteErr,
}: HeaderProps) {
  const [inputFocused, setInputFocused] = useState<boolean>(false);
  const [isMobileView, setIsMobileView] = useState<boolean>(
    window.innerWidth < 900
  );

  const spacerRef = useRef<HTMLDivElement>(null);
  const spacerInputRef = useRef<HTMLInputElement>(null);

  // Add responsive handler
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 900);
    };

    window.addEventListener("resize", handleResize);

    // Initial check on mount
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Add click outside detection
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // If header spacer is open and click is outside of it
      if (
        inputFocused &&
        spacerRef.current &&
        !spacerRef.current.contains(event.target as Node)
      ) {
        handleSpacerClose(event);
      }
    };

    // Add event listener when component mounts or inputFocused changes
    document.addEventListener("mousedown", handleClickOutside);

    // Remove event listener on cleanup
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [inputFocused]);

  const getSelectedCity = (city: Place) => {
    if (autocompleteCities.includes(city)) {
      setSelectedCity(city.name);

      //Find selected city coordinates when it matches
      const selectedPlace = cities.find((c) => c.name === city.name);

      if (selectedPlace) {
        const [latitude, longitude] = [selectedPlace.lat, selectedPlace.lon];
        setCoordinates({ latitude, longitude });
        setLoading(true);
        setInputFocused(false);
        setAutocompleteCities([]);
        handleCityChange({
          target: { value: "" },
        } as ChangeEvent<HTMLInputElement>);
      }
    }
  };

  // Function to handle focusing on the header input
  const handleHeaderInputFocus = (
    e: MouseEvent<HTMLElement> | FocusEvent<HTMLElement>
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setInputFocused(true);
    setAutocompleteCities([]);
    // Use a small timeout to ensure the DOM has updated
    setTimeout(() => {
      if (spacerInputRef.current) {
        spacerInputRef.current.focus();
      }
    }, 10);
  };

  const handleSpacerClose = (e: MouseEvent | MouseEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setInputFocused(false);
    setAutocompleteCities([]);
    handleCityChange({
      target: { value: "" },
    } as ChangeEvent<HTMLInputElement>);
  };

  const handleMobileSearchClick = () => {
    setInputFocused(true);
    setAutocompleteCities([]);
    // Use a small timeout to ensure the DOM has updated
    setTimeout(() => {
      if (spacerInputRef.current) {
        spacerInputRef.current.focus();
      }
    }, 10);
  };

  return (
    <div
      className={`header-container ${
        inputFocused ? "header-container-focused" : ""
      }`}
    >
      <header className="app-header">
        <h1>WEATHER</h1>
        <div className="header-search">
          <div className="placesAutocomplete">
            <div className="placesAutocomplete__inputWrap">
              <input
                type="text"
                id="fakeCity"
                name="city"
                readOnly
                onFocus={(e) => handleHeaderInputFocus(e)}
                value={city}
                placeholder="Enter a city"
              />
              <span className="search-icon">
                <FontAwesomeIcon icon={faSearch} size="xl" />
              </span>
            </div>
          </div>
        </div>
        {isMobileView && (
          <div
            className="mobile-header-search-icon"
            onClick={() => handleMobileSearchClick()}
          >
            <FontAwesomeIcon icon={faSearch} size="xl" color="white" />
          </div>
        )}
      </header>
      <header
        ref={spacerRef}
        className="app-header-spacer"
        style={{
          height:
            autocompleteCities.length === 0
              ? isMobileView
                ? "550px"
                : "470px"
              : isMobileView
              ? 140 + autocompleteCities.length * 45 + "px"
              : 80 + autocompleteCities.length * 45 + "px",
        }}
      >
        <div className="app-header-spacer-header">
          <h1>WEATHER</h1>
          <div className="app-header-spacer-header-search">
            <div className="app-header-spacer-header-search__placesAutocomplete">
              <div className="app-header-spacer-header-search__placesAutocomplete__inputWrap">
                <input
                  ref={isMobileView ? null : spacerInputRef}
                  list="places"
                  type="text"
                  id="city"
                  name="city"
                  onChange={handleCityChange}
                  value={city}
                  required
                  placeholder="Enter a city"
                  pattern={autocompleteCities.join("|")}
                  autoComplete="off"
                />
                <span className="app-header-spacer-search-icon">
                  <FontAwesomeIcon icon={faSearch} size="xl" />
                </span>
              </div>
              {autocompleteErr && (
                <span className="app-header-spacer-inputError">
                  {autocompleteErr}
                </span>
              )}
              <div
                style={{ position: "absolute", zIndex: 100, overflowY: "auto" }}
                className="app-header-spacer-autocomplete-wrapper"
              >
                {autocompleteCities.map((city, i) => {
                  console.log(city);
                  return (
                    <div
                      onClick={() => getSelectedCity(city)}
                      key={i}
                      style={{ cursor: "pointer" }}
                      className="app-header-spacer-autocomplete-item"
                    >
                      {city.name}, {city.region}, {city.country}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div
            className="app-header-spacer-close-icon"
            onClick={(e) => handleSpacerClose(e)}
          >
            <FontAwesomeIcon icon={faTimes} size="xl" />
          </div>
        </div>
        <div className="app-header-spacer-header-search-mobile">
          <div className="app-header-spacer-header-search__placesAutocomplete">
            <div className="app-header-spacer-header-search__placesAutocomplete__inputWrap">
              <input
                ref={isMobileView ? spacerInputRef : null}
                list="places"
                type="text"
                id="mobileCity"
                name="city"
                onChange={handleCityChange}
                value={city}
                required
                placeholder="Enter a city"
                pattern={autocompleteCities.join("|")}
                autoComplete="off"
              />
              <span className="app-header-spacer-search-icon">
                <FontAwesomeIcon icon={faSearch} size="xl" />
              </span>
            </div>
            {autocompleteErr && (
              <span className="app-header-spacer-inputError">
                {autocompleteErr}
              </span>
            )}
            <div
              style={{ position: "absolute", zIndex: 100, overflowY: "auto" }}
              className="app-header-spacer-autocomplete-wrapper"
            >
              {autocompleteCities.map((city, i) => {
                return (
                  <div
                    onClick={() => getSelectedCity(city)}
                    key={i}
                    style={{ cursor: "pointer" }}
                    className="app-header-spacer-autocomplete-item"
                  >
                    {city.name}, {city.region}, {city.country}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        {autocompleteCities.length === 0 && (
          <div className="app-header-spacer-locations">
            <p className="app-header-spacer-locations-heading">My Locations</p>
            <div className="app-header-spacer-locations-remember">
              <h4>Remember the places that matter to you</h4>
              <p>
                Add them to your locations to get relevant local info from the
                app.
                {isMobileView ? null : <br />} Sign in or Register to start
                adding.
              </p>
              <div className="app-header-spacer-locations-remember-buttons">
                <div className="app-header-spacer-locations-remember-button">
                  <FontAwesomeIcon icon={faUserCircle} size="xl" />
                  <span className="app-header-spacer-locations-remember-button-text">
                    Sign in
                  </span>
                </div>
                or
                <span className="app-header-spacer-locations-remember-register-text">
                  Register
                </span>
              </div>
            </div>
          </div>
        )}
        {autocompleteCities.length === 0 && (
          <div className="app-header-spacer-recent-searches">
            <div className="app-header-spacer-recent-searches-heading">
              <p>Recent searches</p>
            </div>
            <div className="app-header-spacer-recent-searches-content">
              <p>
                You haven't searched for any locations yet.
                <br />
                Previous searches will appear here.
              </p>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}

export default Header;
