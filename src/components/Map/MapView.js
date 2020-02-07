import React, {Component} from 'react'
import {Icon} from "leaflet";
import {Map as LeafletMap, TileLayer, Marker, Popup} from 'react-leaflet';
import styles from './Map.module.scss';
import markerIcon from 'theme/images/Map/icon_marker.svg';
import geoLocateBlue from 'theme/images/Map/geo_location_blue.svg';
import 'leaflet/dist/leaflet.css';

export default function Map(
    {
        width,
        height,
        zoom = 7,
        className,
        location,
        items,
        chooseItem,
        goToAddress={},
        markerPopup = () => {},
        initCountry
    }) {
    const _style = {
        width: width !== undefined ? width : '100%',
        height: height !== undefined ? height : '525px'
    };
    const onChooseMarker = (id) => {
        chooseItem(id);
    };
    const initCoords = initCountry === 'TZ' ? [-6.402, 34.993] : initCountry === 'UG' ? [1.378, 32.287] : [50.401699, 30.482512];
    return (
        <LeafletMap
            center={goToAddress.coordinates ? goToAddress.coordinates : initCoords}
            zoom={zoom}
            attributionControl={true}
            zoomControl={true}
            doubleClickZoom={true}
            scrollWheelZoom={true}
            dragging={true}
            animate={true}
            easeLinearity={0.35}
             className={`${styles.lefletMap} ${className}`.trim()}
             style={_style}
        >
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
            />
            {items.map(i =>(
                <Marker
                    position={[i.address.coordinates[0], i.address.coordinates[1]]}
                    icon={new Icon({
                        iconUrl: markerIcon,
                        iconSize: [50, 60],
                    })}
                    onClick={()=>onChooseMarker(i)}
                >
                    {/*<Popup>*/}
                        {/*{markerPopup(i)}*/}
                    {/*</Popup>*/}
                </Marker>
            ))}
            {location && (
                <Marker
                    position={[location.coords.latitude, location.coords.longitude]}
                    icon={new Icon({
                        iconUrl: geoLocateBlue
                    })}
                >
                    <Popup>
                        Popup for any custom information.
                    </Popup>
                </Marker>
            )}
        </LeafletMap>
    )
}