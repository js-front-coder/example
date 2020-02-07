import React from 'react';
import SVG from "react-inlinesvg";
import GiphyPicker from 'react-giphy-component'
import svgGif from 'theme/images/Chat/file-gif.svg';
import svgSmiles from 'theme/images/Chat/icn_24_smile.svg';
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'

import styles from './NewMessage.module.scss';

export default (
    {
        className = '',
        message = '',
        giphyOpened,
        smilesOpened,
        onInputChange,
        handleGifClick,
        handleSelectGif,
        handleEmojiClick,
        switchState,
        active,
        sendHandle,
        setMessageRef,
        emojiOpened,
        handleSelectEmoji,
        textareaRef
    }) => {
    const handleKeyPress = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            sendHandle();
        }
    };
    const handleInputClick = (e) => {
        switchState(true);
    };
    return (
        <div className={`${className} ${styles.newMessage} ${active ? styles['newMessage--active'] : ''}`}
             tabIndex={0}
             onKeyPress={handleKeyPress}
             ref={setMessageRef}
        >
            <div className={styles.newMessage__wrapper}>
                <textarea
                    className={styles.newMessage__input}
                    value={message}
                    onClick={handleInputClick}
                    onChange={onInputChange}
                    ref={textareaRef}
                />

                <div className={styles.popups}>
                    {giphyOpened ? <GiphyPicker
                        onSelected={handleSelectGif}
                        apiKey={'zS3daYmQZ7rYwTlB17YK5a8vFXgw9a9C'}
                    /> : null}
                    {emojiOpened ? <Picker onSelect={handleSelectEmoji} /> : null}
                </div>
                <div className={styles.newMessage__controls}>
                    <SVG className={styles.newMessage__gif} src={svgGif} onClick={handleGifClick}/>
                    <SVG className={styles.newMessage__smiles} src={svgSmiles} onClick={handleEmojiClick}/>
                    <div className={styles.newMessage__send} onClick={sendHandle}>
                        Send
                    </div>
                </div>
            </div>
        </div>
    );
}