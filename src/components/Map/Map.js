import React from 'react';
import { connect } from 'react-redux';
import MapView from './MapView';

const Map = (props) => {
    return <MapView {...props}/>
};

const mapStateToProps = state => ({
    initCountry: state.profile.user.country
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(Map);