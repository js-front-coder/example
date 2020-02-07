// Core
import React from "react";
import SVG from "react-inlinesvg";
import ReactTooltip from 'react-tooltip';

import { WrapperSection, Container } from "components/Common";
import { Button } from "components/Common";
import { Map } from "components";

import styles from "./Cash.module.scss";
import geoLocate from "theme/images/Map/geo_location.svg";
import hour from "theme/images/Map/hour.svg";
import arrow from "theme/images/Map/arrow-next.svg";
import locationSvg from "theme/images/Map/location.svg";
import photo from 'theme/images/Settings/photo.svg';

const days = {
    1: 'Mon',
    2: 'Tue',
    3: 'Wed',
    4: 'Th',
    5: 'Fr',
    6: 'Sat',
    7: 'San'
};

//This function takes in latitude and longitude of two location and returns the distance between them as the crow flies (in km)
function calcCrow(lat1, lon1, lat2, lon2)
{
  let R = 6371; // km
  let dLat = toRad(lat2-lat1);
  let dLon = toRad(lon2-lon1);
  let _lat1 = toRad(lat1);
  let _lat2 = toRad(lat2);

  let a = Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(_lat1) * Math.cos(_lat2);
  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  let d = R * c;
  return d;
}

// Converts numeric degrees to radians
function toRad(Value)
{
  return Value * Math.PI / 180;
}

const ListItem = ({ data, location, onGoTo, isActive, avatar}) => {
  const {fullName, address, _id, schedule} = data;
  const distance = location ?
      calcCrow(location.coords.latitude, location.coords.longitude, address.coordinates[0], address.coordinates[1]).toFixed(1) : 0.0;

  return (
    <div className={`${styles.listItem} ${isActive ? styles['listItem--active']:''}`.trim()}>
      <div className={`${styles.listItem__top}`}>
        <img className={`${styles.listItem__ava}`} src={avatar ? avatar : photo} alt="avatar" />
        <div className={`${styles.listItem__info}`}>
          <p className={`${styles.listItem__name}`}>{fullName}</p>
          <div className={`${styles.listItem__hours}`}>
            <SVG src={hour} alt={hour} />
              {
                  Object.keys(schedule).map(i => {
                      const day = schedule[i];
                      if(!day.active)
                          return false;
                      return (
                          <React.Fragment key={i}>
                              <div className={styles['hours__day']} data-tip data-for={'' + _id + i}>
                                  {days[i]}
                              </div>
                              <ReactTooltip id={'' + _id + i} aria-haspopup='true' effect="solid">
                                          <span key={i} className={styles['hours__item']}>
                                              {`${day.start} - ${day.end}`}
                                          </span>
                              </ReactTooltip>
                          </React.Fragment>
                      )
                  })
              }
          </div>
        </div>
        <button type="button" className={`${styles.listItem__goto}`} onClick={()=>onGoTo(data)}>
          <SVG src={arrow} alt="arrow" />
        </button>
      </div>
      <div className={`${styles.listItem__bottom}`}>
        <div className={`${styles.listItem__placed}`}>
          <SVG src={locationSvg} alt="location" />
          <span>{address.name}</span>
        </div>
        <div className={`${styles.listItem__distance}`}>{distance} km</div>
      </div>
    </div>
  );
};

export default ({
                  items,
                  onGeoClick,
                  location,
                  chooseItem,
                  chosenItem,
                  listRef,
                  onGoTo,
                  goto = {},
                  onGoBack
}) => {

  if(chosenItem && listRef){
    const l = items.findIndex(i => i._id === chosenItem);
    const lengthPlus = l * 136;

    listRef.current.scrollTop = lengthPlus;
  }

  console.log('ITEMS', items);

  return (
    <WrapperSection>
      <Container>
        <div className={styles.mainWrapper}>
          <div className={styles.innerWrapper}>
            <div className={styles.listWrapper}>
                <div className={styles.goBack} onClick={onGoBack}>
                    Back
                </div>
              <div className={styles.geoLocate} onClick={onGeoClick}>
                <SVG src={geoLocate} />
              </div>
              <div className={styles.listInner} ref={listRef}>
                {items.map(m => (
                  <ListItem
                      key={m._id}
                      isActive={m._id === goto._id}
                      data={m}
                      location={location}
                      chosenItem={chosenItem}
                      onGoTo={onGoTo}
                      avatar={m.avatar}
                  />
                ))}
              </div>
            </div>
            <Map
                className={styles.map}
                location={location}
                items={items}
                chooseItem={onGoTo}
                goToAddress={goto.address}
                markerPopup={(m)=> <ListItem
                    key={m._id}
                    isActive={m._id === goto._id}
                    data={m}
                    location={location}
                    chosenItem={chosenItem}
                    onGoTo={onGoTo}
                />}
            />
          </div>
        </div>
      </Container>
    </WrapperSection>
  );
};
