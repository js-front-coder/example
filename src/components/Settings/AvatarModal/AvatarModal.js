// Core
import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import AvatarEditor from 'react-avatar-editor';
import Dropzone from 'react-dropzone';

import { Portal, Button } from 'components/Common';
import { profileActions } from 'bus/profile/actions';

import close from 'theme/images/Common/close.svg';
import defaultPhoto from 'theme/images/Settings/photo.svg';

import styles from './AvatarModal.module.scss';

const AvatarModal = ({ closeModal, statusModalAvatar, uploadAvatarAsync }) => {
  const setEditorRef = useRef(null);
  const [avatar, setAvatar] = useState('');
  const [avatarData, setAvatarData] = useState('');

  const handleDrop = files => {
    let file = files[0];
    const data = new FormData();
    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      data.append('file', file);
      reader.onload = function() {
        setAvatar(reader.result);
        setAvatarData(data);
      };

      // data.append('file', file);
      // reader.onload = () => {
      // console.log('readeer', reader);
      //   setAvatar(reader);
      // }
    }

    // const reader = new FileReader();
    //
    // if(file){
    //   reader.readAsDataURL(file);
    //   reader.onload = function() {
    //     setAvatar(reader.result);
    //   };
    // }
  };

  const maxAvatarSize = 1048576 * 7;

  const confirmAvatar = () => {

    if (avatarData) {
      uploadAvatarAsync(avatarData);
    }
    closeModal();
    setAvatar('');

    // if (avatar) {
    //   uploadAvatarAsync(setEditorRef.current.getImage().toDataURL());
    // }
  };

  const closeAvatarModal = () => {
    setAvatar('');
    closeModal();
  };

  return (
    <>
      {statusModalAvatar && (
        <Portal>
          <div className={styles.wrapperModal}>
            <img
              src={close}
              alt="close"
              onClick={closeAvatarModal}
              className={styles.close}
            />
            <div className={styles.wrapperImage}>
              <AvatarEditor
                ref={setEditorRef}
                border={50}
                scale={1.3}
                width={300}
                height={300}
                image={avatar || defaultPhoto}
                borderRadius={150}
                style={{
                  borderRadius: '10px'
                }}
              />
            </div>

            <div className={styles.wrapperButtons}>
              <Dropzone onDrop={handleDrop} maxSize={maxAvatarSize}>
                {({ getRootProps, getInputProps, rejectedFiles}) => {
                  const isFileTooLarge = rejectedFiles.length > 0 && rejectedFiles[0].size > maxAvatarSize;

                  return(
                  <div {...getRootProps()}>
                    <Button blue value="Upload Photo" />
                    <input {...getInputProps()} />
                    {isFileTooLarge ?
                        <div className={styles.fileTooLarge}>File is too large.</div> : null}
                  </div>
                )}}
              </Dropzone>
              {avatar && (
                <Button blue value="Confirm" handleAction={confirmAvatar} />
              )}
            </div>
          </div>
        </Portal>
      )}
    </>
  );
};

const mapStateToProps = state => ({
  statusModalAvatar: state.profile.statusModalAvatar,
  profile: state.profile.user
});

const mapDispatchToProps = {
  closeModal: profileActions.closeModalAvatar,
  uploadAvatarAsync: profileActions.uploadAvatarAsync
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AvatarModal);
