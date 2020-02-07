// Core
import React, { useEffect } from "react";
import { connect } from "react-redux";

import { activityActions } from "bus/activity/actions";
import { selectorRedeem } from "bus/activity/selectors";

import { WrapperSection, Container } from "components/Common";
import { EmptyFolder } from "components/Activity/EmptyFolder/EmptyFolder";
import ActivityPoint from "../ActivityPoint/ActivityPoint";

import { SubNavigation } from "../SubNavigation/SubNavigation";

import styles from "./RedeemActivity.module.scss";

const RedeemActivity = ({ data, fetchActivityAsync, closeInfoModal }) => {
  useEffect(() => {
    fetchActivityAsync({ type: "redeem" });
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
  data: selectorRedeem(state),
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
)(RedeemActivity);
