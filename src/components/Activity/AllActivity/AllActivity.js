// Core
import React, { useEffect } from "react";
import { connect } from "react-redux";

import { activityActions } from "bus/activity/actions";

import { WrapperSection, Container } from "components/Common";
import { EmptyFolder } from "components/Activity/EmptyFolder/EmptyFolder";
import ActivityPoint from "../ActivityPoint/ActivityPoint";

import { SubNavigation } from "../SubNavigation/SubNavigation";

import styles from "./AllActivity.module.scss";

const AllActivity = ({ data, fetchActivityAsync, closeInfoModal }) => {
  useEffect(() => {
    fetchActivityAsync({ type: "all" });
    closeInfoModal();
  }, [closeInfoModal, fetchActivityAsync]);

  return (
    <WrapperSection>
      <Container>
        <SubNavigation />
        <div className={styles.activityWrapper}>
          {data.length > 0 ? <ActivityPoint data={data} /> : <EmptyFolder />}
        </div>
      </Container>
    </WrapperSection>
  );
};

const mapsStateToProps = state => ({
  data: state.activity.data,
  page: state.activity.page,
  pages: state.activity.pages
});

const mapDispatchToProps = {
  fetchActivityAsync: activityActions.fetchActivityAsync,
  closeInfoModal: activityActions.closeInfoModal
};

export default connect(
  mapsStateToProps,
  mapDispatchToProps
)(AllActivity);
