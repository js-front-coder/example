// Core
import React from 'react';
import { connect } from 'react-redux';

import { activityActions } from 'bus/activity/actions';

import { ActivityPointView } from './ActivityPointView';

const ActivityPoint = ({ id, data, openInfoModal, closeInfoModal }) => {
  const handleShowInfo = newId => {
    if (id) {
      closeInfoModal();
    } else {
      openInfoModal(newId);
    }
  };
  return (
    <ActivityPointView
      id={id}
      data={data}
      handleShowInfo={handleShowInfo}
    />
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
)(ActivityPoint);
