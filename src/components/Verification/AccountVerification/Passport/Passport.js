// Core
import React, { useState } from "react";
import { connect } from "react-redux";

import { book } from "navigation/book";
import { history } from 'helper/history';
import { verificationActions } from "bus/verification/actions";

import { Title } from "../Title/Title";
import Steps from "../Steps/Steps";
import { Navigations } from "../Navigations/Navigations";
import { WrapperSection, Container } from "components/Common";

import { PassportView } from "./PassportView";

const maxFileSize = 1048576 * 7;

const Passport = ({ uploadPhotoAsync }) => {
  const [passportFront, setPassportFront] = useState("");
  const [passportBack, setPassportBack] = useState("");
  const [passportFrontData, setPassportFrontData] = useState('');
  const [passportBackData, setPassportBackData] = useState('');

  const handleChangeImageFront = e => {
    let file = e.target.files[0];
    const reader = new FileReader();
    const data = new FormData();

    reader.addEventListener("load", e => {
      data.append('file', file);
      setPassportFront(e.target.result);
      setPassportFrontData(data);
    });

    if(e.target.files[0].size <= maxFileSize){
        if (e.target.value) {
            reader.readAsDataURL(e.target.files[0]);
        }
    } else {
        alert("File is too big!");
    }
  };

  const handleChangeImageBack = e => {
    let file = e.target.files[0];
    const reader = new FileReader();
    const data = new FormData();

    reader.addEventListener("load", e => {
      data.append('file', file);
      setPassportBack(e.target.result);
      setPassportBackData(data);
    });

      if(e.target.files[0].size <= maxFileSize){
          if (e.target.value) {
              reader.readAsDataURL(e.target.files[0]);
          }
      } else {
          alert("File is too big!");
      }
  };

  const resetImageFront = () => {
    setPassportFront("");
    setPassportFrontData('');
  };

  const resetImageBack = () => {
    setPassportBack("");
    setPassportBackData('');
  };

  const onSumbit = () => {
    if (passportFront && passportBack) {
      uploadPhotoAsync({ data: passportFrontData, page: "passport" });
      uploadPhotoAsync({ data: passportBackData });
    }
  };

  const handleBack = () => history.push(book.settings);

  return (
    <WrapperSection>
      <Container>
        <Title />
        <Steps />
        <Navigations />

        <PassportView
          onSumbit={onSumbit}
          passportFront={passportFront}
          passportBack={passportBack}
          resetImageFront={resetImageFront}
          resetImageBack={resetImageBack}
          handleChangeImageFront={handleChangeImageFront}
          handleChangeImageBack={handleChangeImageBack}
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
)(Passport);
