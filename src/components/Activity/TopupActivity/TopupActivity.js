// Core
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { activityActions } from "bus/activity/actions";
import { selectorTopUp } from "bus/activity/selectors";

import { WrapperSection, Container } from "components/Common";
import { EmptyFolder } from "components/Activity/EmptyFolder/EmptyFolder";
import ActivityPoint from "../ActivityPoint/ActivityPoint";

import { SubNavigation } from "../SubNavigation/SubNavigation";

import styles from "./TopupActivity.module.scss";

const TopupActivity = ({ data, fetchActivityAsync, closeInfoModal }) => {
  useEffect(() => {
    fetchActivityAsync({ type: "topup" });
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
  data: selectorTopUp(state),
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
)(TopupActivity);
