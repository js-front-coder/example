import React from 'react';
import {connect} from "react-redux";
import ContactView from './ContactView';
import {chatActions} from 'bus/chat/actions';
import * as R from 'ramda';

class Contact extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        const {className, room, roomIsActive, lastMsg, setActiveRoom, user} = this.props;

        return(
            <ContactView
                className={className}
                room={room}
                lastMsg={lastMsg}
                setActiveRoom={setActiveRoom}
                roomIsActive={roomIsActive}
                user={user}
            />
        )
    }
}

const mapStateToProps = (state, props) => {
    const activeRoom =  state.chat.activeRoom;
    const room = state.chat.rooms.find(r => r.id === props.roomId);

  return {
      user: state.profile.user,
      room,
      lastMsg: room.msgList.length ? room.msgList.slice(-1)[0]: {},
      roomIsActive: activeRoom.hasOwnProperty('id') ? activeRoom.id === R.path(['contact', 'id'], props) : false
  };
};

const mapDispatchToProps = {
    setActiveRoom: chatActions.setActiveRoom
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Contact);
