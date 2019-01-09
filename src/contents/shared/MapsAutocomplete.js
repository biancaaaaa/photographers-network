import React from "react";
import PlacesAutocomplete, {
  geocodeByAddress
} from "react-places-autocomplete";
import locationIconURL from '../../png-icons/location-icon.png';

const searchOptions = {
  types: ["address"]
};

export default class LocationSearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { address: "" };
  }

  //generates the city/street/lat/long if provided
  generateAdress = data => {
    // Most of the world locality = city
    // For Sweden and UK postal_town = city
    // In Japan, the component differs across prefectures
    // Brooklyn and other parts of New York City do not include the city as part of the address. They use sublocality_level_1 instea
    let country, city, streetNumber, streetName, postalCode;

    data[0].address_components.forEach(el => {
      const types = el.types;

      if (types.includes("country")) {
        //set country
        country = el.long_name;
      } else if (types.includes("locality") || types.includes("postal_town")) {
        //set town
        city = el.long_name;
      } else if (types.includes("street_number")) {
        //set street number
        streetNumber = el.long_name;
      } else if (types.includes("route")) {
        //set the street
        streetName = el.long_name;
      } else if (types.includes("postal_code")) {
        //set the postal code
        postalCode = el.long_name;
      }
    });

    //get lat and long
    const lat = data[0].geometry.location.lat();
    const long = data[0].geometry.location.lng();

    return { country, city, streetNumber, streetName, lat, long, postalCode };
  };

  handleSelect = address => {
    geocodeByAddress(address)
      .then(results => {
        //update the input value with the selected one
        this.handleChange(results[0].formatted_address, "locationPlaceholder");

        //generate / verify and update the town/country...
        const addressData = this.generateAdress(results);
        //for now street number is optional, but not the street , city, country
        if (
          !addressData.country ||
          !addressData.city ||
          !addressData.streetName ||
          !addressData.postalCode
        ) {
          //reset the old adressData from the state
          this.handleChange({}, "detailedAddress");
          console.log(
            "WRONG TYPE OF DATA, the adress must contain city/street/country!"
          );
          return;
        }
        //update it on the state, make it ready to be stored in the firestore

        this.handleChange(addressData, "detailedAddress");
      })
      .catch(error => console.error("Error", error));
  };

  handleChange = (e, changeThis) => {
    this.props.changeHandler({
      target: {
        name: changeThis,
        value: e
      }
    });
  };

  render() {
    const { locationPlaceholder } = this.props;
    return (
      <PlacesAutocomplete
        value={locationPlaceholder}
        onChange={e => this.handleChange(e, "locationPlaceholder")}
        onSelect={this.handleSelect}
        searchOptions={searchOptions}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <label className="inputLabel">
            <img src={locationIconURL} alt="calendar" className="gb-icon-small inputIcon"/>
            <input
              name="location"
              {...getInputProps({
                placeholder: "Enter your locaction",
                className: "gb-text-input gb-text-input-trans-background"
              })}
            />
            {suggestions.length > 0 && (
              <div
                style={{
                  color: "black",
                  position: "absolute",
                  top: "100%",
                  zIndex: "10",
                  textAlign: "left",
                  left: "0",
                  width: "100%"
                }}
                className="autocomplete-dropdown-container"
              >
                {loading && <div>Loading...</div>}
                {suggestions.map(suggestion => {
                  const className = suggestion.active
                    ? "suggestion-item--active"
                    : "suggestion-item";
                  return (
                    <div {...getSuggestionItemProps(suggestion, { className })}>
                      <strong>{suggestion.formattedSuggestion.mainText}</strong>{" "}
                      <small>
                        {suggestion.formattedSuggestion.secondaryText}
                      </small>
                    </div>
                  );
                })}
                <div className="dropdown-footer">
                  <div>
                    <img
                      src="https://github.com/hibiken/react-places-autocomplete/blob/master/demo/images/powered_by_google_default.png?raw=true"
                      alt="Google Logo"
                      className="dropdown-footer-image"
                    />
                  </div>
                </div>
              </div>
            )}
          </label>
        )}
      </PlacesAutocomplete>
    );
  }
}
