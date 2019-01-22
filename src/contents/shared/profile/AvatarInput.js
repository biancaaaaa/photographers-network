import React from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { updatePhotoURL } from "../../../redux/actions/profile-action";

const mapDispatchToProps = dispatch => ({
  updatePhotoURL: (file, uid) => dispatch(updatePhotoURL(file, uid))
});

class AvatarInput extends React.Component {
  static propTypes = {
    uid: PropTypes.string.isRequired
  };

  state = {
    disabled: false
  };

  changeHandler = e => {
    const file = this.fileInput.files[0];

    //check if the file is less then 1MB
    if (file) {
      if (file.size > 1100000) {
        console.log("The file must be under 1MB. Please conform to the rules!");
      } else {
        const userId = this.props.uid;

        //block the user from uploading a new photo while
        //one already is uploading
        this.setState({ disabled: true });

        //Push the image to storage then to the user infos
        //when finished change disabled : false
        this.props
          .updatePhotoURL(file, userId)
          .then(() => {
            this.setState({ disabled: false });
          })
          .catch(err => {
            console.log(err);
            console.log("error while changing profile photo!");
          });
      }
    }
  };

  render() {
    const { disabled } = this.state;
    return (
      <div
        className="z"
        style={{
          flexGrow: 1,
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <label>
          <img
            style={{ cursor: "pointer" }}
            className="gb-avatar gb-avatar-x-large"
            src={this.props.userAvatar}
            alt="avatar"
          />
          <input
            style={{ display: "none" }}
            ref={node => (this.fileInput = node)}
            onChange={this.changeHandler}
            type="file"
            accept=".jpg, .jpeg, .png"
            disabled={disabled}
          />
        </label>
      </div>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(AvatarInput);
