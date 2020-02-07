// Core
import React, { useState } from 'react';
import { connect } from 'react-redux';

import { verificationActions } from 'bus/verification/actions';

import { book } from "navigation/book";
import { history } from 'helper/history';
import { Title } from '../Title/Title';
import Steps from '../Steps/Steps';
import { Navigations } from '../Navigations/Navigations';
import { WrapperSection, Container } from 'components/Common';

import { LicenceView } from './LicenceView';

const maxFileSize = 1048576 * 7;
const Licence = ({ uploadPhotoAsync }) => {
  const [licencePhoto, setLicenceFront] = useState('');
  const [licencePhotoData, setLicencePhotoData] = useState('');

  const handleChangeImage = e => {
    let file = e.target.files[0];
    const reader = new FileReader();
    const data = new FormData();

    reader.addEventListener('load', e => {
      data.append('file', file);
      setLicenceFront(e.target.result);
      setLicencePhotoData(data);
    });

      if (e.target.files[0].size <= maxFileSize) {
        if (e.target.value) {
          reader.readAsDataURL(e.target.files[0]);
        }
      } else {
        alert("File is too big!");
      }
  };

  const handleBack = () => history.push(book.settings);

  const resetImage = () => {
    setLicenceFront('');
    setLicencePhotoData('');
  };

  const onSumbit = () => {
    if (licencePhoto) {
      uploadPhotoAsync({ data: licencePhotoData, page: 'licence' });
    } else {
      return;
    }
  };

  return (
    <WrapperSection>
      <Container>
        <Title />
        <Steps />
        <Navigations />

        <LicenceView
          onSumbit={onSumbit}
          resetImage={resetImage}
          licencePhoto={licencePhoto}
          handleChangeImage={handleChangeImage}
          handleBack={handleBack}
        />
      </Container>
    </WrapperSection>
  );
};

const mapDispatchToProps = {
  uploadPhotoAsync: verificationActions.uploadPhotoAsync
};

export default connect(
  null,
  mapDispatchToProps
)(Licence);
