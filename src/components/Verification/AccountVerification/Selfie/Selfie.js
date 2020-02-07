// Core
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { book } from 'navigation/book';
import { history } from 'helper/history';
import { verificationActions } from 'bus/verification/actions';

import { SelfieView } from './SelfieView';
import { Title } from '../Title/Title';
import Steps from '../Steps/Steps';
import { WrapperSection, Container } from 'components/Common';

const maxFileSize = 1048576 * 7;
const Selfie = ({ uploadPhotoAsync }) => {
  const [selfiePhoto, setSelfiePhoto] = useState('');
  const [selfiePhotoData, setSelfiePhotoData] = useState('');

  const handleChangeImage = e => {
    let file = e.target.files[0];
    const reader = new FileReader();
    const data = new FormData();

    reader.addEventListener('load', e => {
      data.append('file', file);
      setSelfiePhoto(e.target.result);
      setSelfiePhotoData(data);
    });

      if(e.target.files[0].size <= maxFileSize){
          if (e.target.value) {
              reader.readAsDataURL(e.target.files[0]);
          }
      } else {
          alert("File is too big!");
      }
  };

  const resetImage = () => {
    setSelfiePhoto('');
    setSelfiePhotoData('');
  };

  const onSumbit = () => {
    if (selfiePhoto) {
      uploadPhotoAsync({ data: selfiePhotoData, page: 'selfie' });
    } else {
      return;
    }
  };

  const handleBack = () => history.push(book.verification.passport);

  return (
    <WrapperSection>
      <Container>
        <Title />
        <Steps />
        <SelfieView
          onSumbit={onSumbit}
          handleBack={handleBack}
          resetImage={resetImage}
          selfiePhoto={selfiePhoto}
          handleUploadSelfie={handleChangeImage}
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
)(Selfie);
