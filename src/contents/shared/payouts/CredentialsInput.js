import React from "react";
import {connect} from "react-redux";
import {NameInputSVG} from "../../../components/svg/NameInputSVG";
import {InputField} from "../../../components/form/InputField";
import {setBankCredentials} from "../../../redux/actions/profile-action";

class CredentialsInput extends React.Component {
  state = {
    iban: '',
    bic: ''
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  /*
   * Returns 1 if the IBAN is valid
   * Returns FALSE if the IBAN's length is not as should be (for CY the IBAN Should be 28 chars long starting with CY )
   * Returns any other number (checksum) when the IBAN is invalid (check digits do not match)
   */
  isValidIBANNumber(input) {
    let CODE_LENGTHS = {
      AD: 24, AE: 23, AT: 20, AZ: 28, BA: 20, BE: 16, BG: 22, BH: 22, BR: 29,
      CH: 21, CR: 21, CY: 28, CZ: 24, DE: 22, DK: 18, DO: 28, EE: 20, ES: 24,
      FI: 18, FO: 18, FR: 27, GB: 22, GI: 23, GL: 18, GR: 27, GT: 28, HR: 21,
      HU: 28, IE: 22, IL: 23, IS: 26, IT: 27, JO: 30, KW: 30, KZ: 20, LB: 28,
      LI: 21, LT: 20, LU: 20, LV: 21, MC: 27, MD: 24, ME: 22, MK: 19, MR: 27,
      MT: 31, MU: 30, NL: 18, NO: 15, PK: 24, PL: 28, PS: 29, PT: 25, QA: 29,
      RO: 24, RS: 22, SA: 24, SE: 24, SI: 19, SK: 24, SM: 27, TN: 24, TR: 26
    };
    let iban = String(input).toUpperCase().replace(/[^A-Z0-9]/g, ''), // keep only alphanumeric characters
      code = iban.match(/^([A-Z]{2})(\d{2})([A-Z\d]+)$/), // match and capture (1) the country code, (2) the check digits, and (3) the rest
      digits;
    // check syntax and length
    if (!code || iban.length !== CODE_LENGTHS[code[1]]) {
      return false;
    }
    // rearrange country code and check digits, and convert chars to ints
    digits = (code[3] + code[1] + code[2]).replace(/[A-Z]/g, function (letter) {
      return letter.charCodeAt(0) - 55;
    });
    // final check
    return CredentialsInput.mod97(digits);
  }

  static mod97(string) {
    let checksum = string.slice(0, 2), fragment;
    for (let offset = 2; offset < string.length; offset += 7) {
      fragment = String(checksum) + string.substring(offset, offset + 7);
      checksum = parseInt(fragment, 10) % 97;
    }
    return checksum;
  }

  static isValidBIC(input) {
    return input.match(/^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$/);
  }

  handleSubmit = e => {
    e.preventDefault();
    if (this.isValidIBANNumber(this.state.iban) &&
      CredentialsInput.isValidBIC(this.state.bic)) {
      this.props.setBankCredentials(this.state);
      this.props.closeHandler();
    } else {
      console.log("invalid iban or bic!");
    }
  };

  render() {
    const {iban, bic} = this.state;
    return (
      <div className="modal-become-premium">
        <div className="modal-inner-box grey-input-box">
          <p>Please enter your bank credentials.</p>
          <form onSubmit={this.handleSubmit}>
            <InputField
              svg={
                <NameInputSVG classes="gb-icon gb-icon-medium gb-icon-white inputIcon"/>
              }
              value={iban}
              changeHandler={this.handleChange}
              type="text"
              name="iban"
              placeholder="SEXX XXXX XXXX XXXX XXXX"
            />
            <InputField
              svg={
                <NameInputSVG classes="gb-icon gb-icon-medium gb-icon-white inputIcon"/>
              }
              value={bic}
              changeHandler={this.handleChange}
              type="text"
              name="bic"
              placeholder="Insert your BIC here"
            />
            <input type="submit" value="Submit" className="gb-btn gb-btn-medium gb-btn-primary"/>
          </form>
          <button onClick={this.props.closeHandler} className="gb-btn gb-btn-medium gb-btn-primary cancel-btn">Cancel
          </button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setBankCredentials: credentials => dispatch(setBankCredentials(credentials))
});

export default connect(null, mapDispatchToProps)(CredentialsInput);