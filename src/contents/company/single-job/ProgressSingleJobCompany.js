import React from "react";
import {ProgressSingleJobViewCompany} from "../../../components/single-job/progress/ProgressSingleJobViewCompany";
import JSZip from "jszip";
import FileSaver from "file-saver";
import {connect} from "react-redux";
import {addNewNotification} from "../../../redux/actions/notifications-action";
import {acceptWork} from "../../../redux/actions/company-actions";
import jsPDF from "jspdf";

class ProgressSingleJobCompany extends React.Component {
  /**
   * Downloads zip file of submitted work.
   */
  downloadWork = () => {
    const {submittedWork} = this.props;
    let filesToDownload = [];
    //
    submittedWork.forEach(file => {
      // pushes Promise for download data to array
      filesToDownload.push(this.downloadURLAsAPromise(file.url));
      console.log(filesToDownload);
    });
    Promise.all(filesToDownload).then(values => {
      // create new zip file
      let zip = new JSZip();
      // add every value to the zip
      for (let i = 0; i < values.length; i++)
        zip.file(`submitted-work/${submittedWork[i].id}.jpg`, values[i]);

      zip.generateAsync({type: "blob"}).then(content => {
        // provides zip file for download
        FileSaver.saveAs(content, "download.zip");
      });
    });
  };

  /**
   * Creates Promise with the download data for current url.
   *
   * @param url
   * @returns {Promise}
   */
  downloadURLAsAPromise = url => {
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      xhr.open("GET", url);
      xhr.responseType = "blob";
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(xhr.response);
          } else {
            reject(new Error("Ajax error for " + url + ": " + xhr.status));
          }
        }
      };
      xhr.send();
    });
  };

  /**
   * Generates invoice to download.
   */
  generatePDF = () => {
    const {jobDescription, jobId} = this.props;
    let doc = new jsPDF();
    doc.setFontType("bold");
    doc.text(`Invoice for your job "${jobDescription.title}"`, 10, 10);
    doc.setFontType("normal");
    doc.text(`Netto amount: ${jobDescription.nettoAmount} EUR`, 10, 20);
    doc.text(`+ ${jobDescription.tax.percentage}% tax`, 10, 30);
    doc.text(`+ 10% fee`, 10, 40);
    doc.line(10, 43, 200, 43);
    doc.text(`Total amount: ${jobDescription.priceAmount} EUR`, 10, 50);
    doc.save(`invoice-${jobId}.pdf`);
  };

  /**
   * Accept the submitted work of the photographer.
   */
  acceptWork = () => {
    const {jobDescription, jobId, acceptedApplicant} = this.props;
    this.props.acceptSubmittedWork(jobId);
    // add notification
    this.props.addNotification({
      title: `${
        jobDescription.company.companyName
        } has accepted your submitted work for ${jobDescription.title}.`,
      link: `/progress-job/${jobId}`,
      read: false,
      createdAt: new Date().getTime(),
      recipientUserId: acceptedApplicant.uid
    });
  };

  render() {
    const {acceptedApplicant, submittedWork, jobDescription, jobId, companySent, companyReceived} = this.props;

    return (
      <React.Fragment>
        <ProgressSingleJobViewCompany
          acceptedApplicant={acceptedApplicant}
          deliveryStatus={jobDescription.deliveryStatus}
          submittedWork={submittedWork}
          acceptedWork={jobDescription.status === "closed"}
          acceptWorkHandler={this.acceptWork}
          downloadHandler={this.downloadWork}
          jobId={jobId}
          companySent={companySent}
          companyReceived={companyReceived}
        />
        <button className="gb-btn gb-btn-medium gb-btn-primary" onClick={this.generatePDF}>Download invoice</button>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  addNotification: notification => dispatch(addNewNotification(notification)),
  acceptSubmittedWork: jobId =>
    dispatch(acceptWork(jobId))
});

export default connect(
  null,
  mapDispatchToProps
)(ProgressSingleJobCompany);
