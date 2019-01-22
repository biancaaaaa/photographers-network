import React from "react";
import WithModal from "../RenderProp/WithModal";
import HireMeModal from "../contents/company/private-job/HireMeModal";

export const HireButton = ({
  uid,
  photographerName,
  siggnedInUser,
  photographerData,
  classes
}) => (
  <WithModal closeItemClass="close">
    {({ showModal, closeModalListener }) => (
      <React.Fragment>
        <div className={classes}>
          <h5>Hire me</h5>
        </div>
        {showModal && (
          <HireMeModal
            closeModal={closeModalListener}
            photographerId={uid}
            photographerName={photographerName}
            company={siggnedInUser}
            photographerData={photographerData}
          />
        )}
      </React.Fragment>
    )}
  </WithModal>
);
