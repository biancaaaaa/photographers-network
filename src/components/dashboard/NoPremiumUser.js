import React from "react";
import { PropTypes } from "prop-types";
import WithModal from "../../RenderProp/WithModal";
import PaypalButton from "../../contents/shared/PayPalButton";
import CLIENT from "../../paypal/Client";
import { connect } from "react-redux";
import { markAsPremium } from "../../redux/actions/profile-action";

const ENV = process.env.NODE_ENV === "production" ? "production" : "sandbox";

class NoPremiumUser extends React.Component {
  state = {
    buttonStatus: "Become Premium"
  };
  static propTypes = {
    user: PropTypes.object.isRequired
  };

  makeUserPremium = () => {
    if (this.state.buttonStatus !== "Become Premium") {
      return;
    }
    this.setState(() => ({
      buttonStatus: "Loading..."
    }));
    this.props
      .markAsPremium(this.props.uid)
      .then(() =>
        this.setState(() => ({
          buttonStatus: "Done!"
        }))
      )
      .catch(err =>
        this.setState(() => ({
          buttonStatus: "Error"
        }))
      );
  };

  onError = () => {
    this.setState({ error: "Something went wrong!" });
  };

  onCancel = () => {
    this.setState({ error: "Your cancelled your payment!" });
  };

  succesPayment = () => {
    this.makeUserPremium();
  };

  render() {
    const { buttonStatus } = this.state;
    const total = 30;
    return (
      <React.Fragment>
        <p>For a portofolio you have to be premium.</p>
        <WithModal closeItemClass="close-modal">
          {({ showModal }) => (
            <React.Fragment>
              <h2>Become premium</h2>
              <div
                style={{ display: showModal ? "flex" : "none" }}
                className="modal-become-premium close-modal"
              >
                <div className="modal-inner-box">
                  <h2>
                    If you become premium it will be awsome trust me, you will
                    not regret it!
                  </h2>
                  <div
                    onClick={this.makeUserPremium}
                    className={`become-premium-button ${
                      buttonStatus === "Done!" ? "close-modal" : ""
                    }`}
                  >
                    {buttonStatus}
                  </div>
                  <PaypalButton
                    client={CLIENT}
                    env={ENV}
                    commit={true}
                    currency={"SEK"}
                    total={total}
                    onSuccess={this.succesPayment}
                    onError={this.onError}
                    onCancel={this.onCancel}
                  />
                </div>
              </div>
            </React.Fragment>
          )}
        </WithModal>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  uid: state.firebase.auth.uid
});

const mapDispatchToProps = dispatch => ({
  markAsPremium: uid => dispatch(markAsPremium(uid))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NoPremiumUser);
