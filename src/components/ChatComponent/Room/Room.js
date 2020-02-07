import React from 'react';
import {connect} from "react-redux";
import RoomView from './RoomView';
import {Send} from 'components';
import {chatActions} from 'bus/chat/actions';
import {getChatMember} from 'bus/chat/reducer';


class Room extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            modalIsOpen: false
        };
    }

    componentDidMount(){
        this.props.readAllNewMsgs();
    }

    componentDidUpdate(prevProps){
        if(prevProps.room.id !== this.props.room.id){
            this.props.readAllNewMsgs();
        }
    }

    onSendMoneyHandler = (e) => {
        this.setState({modalIsOpen: true});
    };

    onCloseModal = () => {
        this.setState({modalIsOpen: false});
    };

    render(){
        const {className, room, user} = this.props;
        const {modalIsOpen} = this.state;

        const otherMember = room.members ? room.members.filter(m => m._id !== user._id)[0] : undefined;

        return(
            <>
                <RoomView className={className} onSendMoney={this.onSendMoneyHandler} room={room} user={user}/>
                {modalIsOpen ? <Send
                    isModal
                    closeModal={this.onCloseModal}
                    next={(dataSend)=>{
                        const {to, amount, currency} = dataSend;
                        const member = this.props.member({roomId: room.id, memberId: to});
                        const toText = member.firstName && member.lastName ? `${member.firstName} ${member.lastName}` : member.phone;
                        const text = `Sent ${amount} ${currency} to ${toText}`;
                        this.props.chatSendNewMessage({text, conversationId: room.id});
                    }}
                    to={otherMember ? otherMember.phone : undefined}
                /> : null}
            </>
        )
    }
}

const mapStateToProps = state => ({
    room: state.chat.activeRoom,
    user: state.profile.user,
    member: (configs)=>getChatMember(state)(configs)
});

const mapDispatchToProps = {
    readAllNewMsgs: chatActions.chatReadAllNewMsgs,
    chatSendNewMessage: chatActions.chatSendNewMessage
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Room);
