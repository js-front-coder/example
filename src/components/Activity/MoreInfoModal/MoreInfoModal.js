// Core
import React from "react";
import { Portal } from "components/Common";
import { activityActions } from 'bus/activity/actions';


import close from "theme/images/Common/close.svg";

import styles from "./MoreInfoModal.module.scss";
import {connect} from "react-redux";

const MoreInfoModal = ({ type, additional, closeInfoModal, openInfoModal, id }) => {
    const handleShowInfo = newId => {
        if (id) {
            closeInfoModal();
        } else {
            openInfoModal(newId);
        }
    };

  return (
    <Portal>
      <div className={styles.wrapperModal}>
        <img
          src={close}
          alt="close"
          onClick={handleShowInfo}
          className={styles.close}
        />
        <div className={styles.title}>
          It may take up-to 6 business days for {type} transaction
        </div>
        {type === "topup" && (
          <>
            <div className={styles.WrapperPoint}>
              <p className={styles.name}>Account Holder</p>
              <p className={styles.value}>Dimo Ltd</p>
            </div>
            <div className={styles.WrapperPoint}>
              <p className={styles.name}>Bank</p>
              <p className={styles.value}>Stanbick</p>
            </div>
            <div className={styles.WrapperPoint}>
              <p className={styles.name}>Account No.</p>
              <p className={styles.value}>04313456</p>
            </div>
            <div className={styles.WrapperPoint}>
              <p className={styles.name}>SWIFT</p>
              <p className={styles.value}>5BICNGLX</p>
            </div>
            <div className={styles.WrapperPoint}>
              <p className={styles.name}>Reference</p>
              <p className={styles.value}>{additional.reference}</p>
            </div>
          </>
        )}

        {type === "redeem" && (
          <>
            <div className={styles.WrapperPoint}>
              <p className={styles.name}>Bank Account Holder Name</p>
              <p className={styles.value}>{additional.account}</p>
            </div>
            <div className={styles.WrapperPoint}>
              <p className={styles.name}>Bank</p>
              <p className={styles.value}>Stanbick</p>
            </div>
            <div className={styles.WrapperPoint}>
              <p className={styles.name}>Credit Card No.</p>
              <p className={styles.value}>{additional.number}</p>
            </div>
          </>
        )}
      </div>
    </Portal>
  );
};


const mapsStateToProps = state => ({
    id: state.activity.infoModal.id
});

const mapDispatchToProps = {
    openInfoModal: activityActions.openInfoModal,
    closeInfoModal: activityActions.closeInfoModal
};

export default connect(
    mapsStateToProps,
    mapDispatchToProps
)(MoreInfoModal);

