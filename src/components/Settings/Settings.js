// Core
import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {formatPhoneNumber} from 'react-phone-number-input';

import {profileActions} from 'bus/profile/actions';
import {authActions} from 'bus/auth/actions';
import {history} from 'helper/history';
import {book} from 'navigation/book';

import {WrapperSection, Container} from 'components/Common';

import {SettingsView} from './SettingsView';
import AvatarModal from './AvatarModal/AvatarModal';
import ChangeNumber from './ChangeNumber/ChangeNumber';
import SmsCode from './SmsCode/SmsCode';
import {getUserForm} from 'bus/profile/selectors';

const Settings = (
    {
        error,
        profile,
        userForm,
        updateProfile,
        openModalAvatar,
        statusModalSms,
        statusModalNumber,
        openModalNumber,
        authenticateAsync,
        uploadAvatarAsync,
        profileAvatar,
        clearSuccessFlag,
        updateSuccess,
        setProfile
    }) => {
    const submitSettings = (
        {
            firstName,
            lastName,
            email,
            address,
            username
        }) => {
        const data = {
            firstName,
            lastName,
            email,
            address,
            username,
            avatar: profileAvatar
        };

        updateProfile(data);
    };

    useEffect(() => {
        // const _onInit = auth2 => {
        //   console.log('init OK', auth2);
        // };
        //
        // const _onError = err => {
        //   console.log('error', err);
        // };
        return () => {
            clearSuccessFlag();
        }
    }, []);

    const [phone, phoneChange] = useState('');

    const handlePhoneChange = value => {
        phoneChange(formatPhoneNumber(value, 'International'));
    };

    const handleVerification = () => {
        if (profile.kyc.status === 'Empty') {
            history.push(book.verification.passport);
        } else {
            authenticateAsync();
            history.push(book.verification.status);
        }
    };

    const fillInTheFormGoogle = async (response, setter) => {

        const firstName = response.profileObj.givenName;
        const lastName = response.profileObj.familyName;

        await setProfile({firstName, lastName, avatar: response.profileObj.imageUrl});
    };

    const fillInTheFormFacebook = (response) => {
        const {name} = response;
        const _name = (() => {
            const spaceIndex = name.indexOf(' ');

            return {
                firstName: spaceIndex >= 0 ? name.slice(0, spaceIndex) : name,
                lastName: spaceIndex >= 0 ? name.slice(spaceIndex) : ''
            }
        })();
        setProfile({firstName: _name.firstName, lastName: _name.lastName, avatar: response.picture.data.url});
    };

    const fillInTheFormTwitter = () => {

    };

    const userNameChange = (e, setFieldValue) => {
        const value = e.target.value;
        if (value.match(/^[a-z0-9]{0,10}$/)) {
            setFieldValue('username', value)
        }
    };

    const handleName = (e, setFieldValue) => {
      const value = e.target.value;
      const name = e.target.name;

      if (value.match(/^[A-Za-z]{0,20}$/)) {
        setFieldValue(name, value);
      }
    };

    const handleEmail = (e, setFieldValue) => {
      const value = e.target.value;
      const name = e.target.name;

      if (value.match(/^[a-zA-Z0-9 ,.\-:"()@]*?$/)) {
        setFieldValue(name, value);
      }
    };

    const handleAddress = (e, setFieldValue) => {
      const value = e.target.value;
      const name = e.target.name;

      if (value.match(/^[a-zA-Z0-9 ,.\-:"()@]*?$/)) {
        setFieldValue(name, value);
      }
    };

    return (
        <WrapperSection>
            <Container>
                <SettingsView
                    error={error}
                    profile={profile}
                    userForm={userForm}
                    openModalAvatar={openModalAvatar}
                    openModalNumber={openModalNumber}
                    submitSettings={submitSettings}
                    userNameChange={userNameChange}
                    handleVerification={handleVerification}
                    userGoogleInfo={fillInTheFormGoogle}
                    userFacebookInfo={fillInTheFormFacebook}
                    userTwitterInfo={fillInTheFormTwitter}
                    profileAvatar={profileAvatar}
                    clearSuccessFlag={clearSuccessFlag}
                    updateSuccess={updateSuccess}
                    handleName={handleName}
                    handleEmail={handleEmail}
                    handleAddress={handleAddress}
                />
                <AvatarModal/>
                {statusModalNumber && (
                    <ChangeNumber phone={phone} handlePhoneChange={handlePhoneChange}/>
                )}
                {statusModalSms && <SmsCode phone={phone}/>}
            </Container>
        </WrapperSection>
    );
};

const mapStateToProps = state => ({
    profile: state.profile.user,
    userForm: getUserForm(state),
    profileAvatar: state.profile.user.avatar,
    statusModalNumber: state.profile.statusModalNumber,
    statusModalSms: state.profile.statusModalSms,
    error: state.profile.error,
    updateSuccess: state.profile.updateProfileSuccess,
});

const mapDispatchToProps = {
    openModalAvatar: profileActions.openModalAvatar,
    openModalNumber: profileActions.openModalNumber,
    setProfile: profileActions.fillProfile,
    updateProfile: profileActions.updateProfileAsync,
    authenticateAsync: authActions.authenticateAsync,
    uploadAvatarAsync: profileActions.uploadAvatarAsync,
    clearSuccessFlag: () => profileActions.clearProp('updateProfileSuccess')
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Settings);
