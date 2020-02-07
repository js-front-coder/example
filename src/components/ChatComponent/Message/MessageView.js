import React from 'react';
import { Emoji } from 'emoji-mart'
import styles from './Message.module.scss';
import './emoji-js.scss';
import './Message.scss';
import emojiJs from 'emoji-js';

const eC = new emojiJs.EmojiConvertor();
eC.img_sets.apple.path = 'https://unpkg.com/emoji-datasource-apple@4.0.4';
eC.img_sets.apple.sheet = 'https://unpkg.com/emoji-datasource-apple@4.0.4/img/apple/sheets-256/64.png';

// Configure this library to use the sheets defined in `img_sets` (see above)
eC.use_sheet = true;


const textView = (value, scrollToBottom) => {
    if(value.includes('.gif')){
        const gifEnd = value.indexOf('.gif');
        const gifStart = value.indexOf('https');
        const gif = value.slice(gifStart, gifEnd+4);
        return (<img src={gif} onLoad={scrollToBottom}/>);
    } else {
        return value.split('\n').map((p, index) =>{
            return(<p key={index} dangerouslySetInnerHTML={(()=>({__html: eC.replace_colons(p)}))()}/>)
    })
    }
};

export default ({message, user, getMember, scrollToBottom}) => {
    const {_id} = user;
    const {text, owner, conversation} = message;

    const messageOwner = getMember({roomId: conversation, memberId: owner});

    const messageOwnerName = (() => {
      if( messageOwner.firstName && messageOwner.lastName ) {
          return `${messageOwner.firstName} ${messageOwner.lastName}`;
      }
      else if (messageOwner.firstName || messageOwner.lastName) {
          return messageOwner.firstName || messageOwner.lastName;
      } else {
          return messageOwner.phone;
      }
    });

    return (
        <div className={`${styles.wrapper} ${owner === _id ? styles['current'] : styles['someone']}`}>
            <div className={`${styles.message}`}>
                <div className={`${styles['message__avatar']} ${messageOwner && !messageOwner.avatar ? styles['message__avatar--none'] : ''}`}>
                    {messageOwner && messageOwner.avatar ? <img src={messageOwner.avatar} alt="avatar of the member" className={`${messageOwner.type === 'Business' && styles.avatarBorder}`}/> : null}
                </div>
                <div className={`${styles['message__main']}`}>
                    <div className={styles['message__name']}>{messageOwner ? messageOwnerName() : owner}</div>
                    <div className={styles['message__text']}>{textView(text, scrollToBottom)}</div>
                </div>
            </div>
        </div>
    );
}