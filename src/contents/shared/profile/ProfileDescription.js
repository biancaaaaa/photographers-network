import React from "react";
import {connect} from "react-redux";
import {setDescription} from "../../../redux/actions/profile-action";
import {actionReset} from "../../../redux/actions/generalLoadingErrorSucces-actions";

class ProfileDescription extends React.Component {
  state = {
    description: this.props.description || '',
    edit: false,
    registeredHandler: false
  };

  /**
   * Enables the edit state of the description.
   * Adds event listeners and auto scale of textarea.
   */
  turnOnEdit = () => {
    if (!this.props.otherUser) {
      this.setState({edit: true},
        () => {
          const textArea = document.getElementsByClassName("profile-desc-area")[0];
          this.autoExpand(textArea);
          if (!this.state.registeredHandler) {
            document.getElementsByClassName("profile-content")[0].addEventListener("click", this.saveOnOutsideClick);
            textArea.addEventListener('input', this.addAutoExpand, false);
          }
          this.setState({registeredHandler: true});
        }
      );
    }
  };

  /**
   * Adds auto expand to target.
   *
   * @param e
   */
  addAutoExpand = e => {
    this.autoExpand(e.target);
  };

  /**
   * Saves changes of the description,
   * when clicking outside.
   *
   * @param e
   */
  saveOnOutsideClick = e => {
    if (!e.target.classList.contains("profile-desc-area") &&
      !e.target.classList.contains("btn")) {
      this.saveDescription();
    }
  };

  /**
   * Handles change of the textarea.
   *
   * @param e
   */
  handleChange = e => {
    if (e.key === "Enter") return;
    this.setState({[e.target.name]: e.target.value});
  };

  /**
   * Saves description after pressing enter.
   *
   * @param e
   */
  handleKeyEvent = e => {
    if (e.key === "Enter") {
      this.saveDescription();
    }
  };

  /**
   * Auto expands textarea to text.
   *
   * @param field
   */
  autoExpand = field => {
    // Reset field height
    field.style.height = 'inherit';

    // Get the computed styles for the element
    const computed = window.getComputedStyle(field);

    // Calculate the height
    const height = parseInt(computed.getPropertyValue('border-top-width'), 10)
      + parseInt(computed.getPropertyValue('padding-top'), 10)
      + field.scrollHeight
      + parseInt(computed.getPropertyValue('padding-bottom'), 10)
      + parseInt(computed.getPropertyValue('border-bottom-width'), 10);

    field.style.height = height + 'px';
  };

  /**
   * Saves description after submit.
   *
   * @param e
   */
  handleSubmit = e => {
    e.preventDefault();
    this.saveDescription();
  };

  /**
   * Cancels edit mode, does not save changes.
   *
   * @param e
   */
  handleCancel = e => {
    e.preventDefault();
    this.reset();
  };

  /**
   * Saves the description in the dataabase.
   */
  saveDescription = () => {
    this.props.updateProfileDesc(this.state.description);
    this.setState({edit: false});
    this.reset();
  };

  /**
   * Resets edit state and event listeners.
   */
  reset = () => {
    this.setState({edit: false, registeredHandler: false});
    const profileArea = document.getElementsByClassName("profile-content")[0];
    profileArea.removeEventListener('click', this.saveOnOutsideClick);
    document.removeEventListener('input', this.addAutoExpand, false);
  };

  componentDidMount() {
    if (!this.props.description) this.setState({edit: true});
  }

  componentWillUnmount() {
    this.props.resetAction();
  }

  render() {
    const {description, edit} = this.state;
    return (
      <div className="black">
        <h3>Description</h3>
        {!description || edit ?
          this.props.otherUser ?
            <p>No description</p> :
            <React.Fragment>
              <form onSubmit={this.handleSubmit}>
             <textarea placeholder="Enter your description here"
                       name="description"
                       className="profile-desc-area"
                       onKeyPress={this.handleKeyEvent}
                       onChange={this.handleChange}
                       value={description}
                       onClick={this.turnOnEdit}
             />
                <input type="submit" value="Save" className="btn"/>
              </form>
              <button onClick={this.handleCancel} className="btn">Cancel</button>
            </React.Fragment> :
            <p className="profile-desc" onClick={this.turnOnEdit}>
              {this.props.description}
            </p>
        }
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  updateProfileDesc: desc => dispatch(setDescription(desc)),
  resetAction: () => dispatch(actionReset())
});

export default connect(null, mapDispatchToProps)(ProfileDescription);