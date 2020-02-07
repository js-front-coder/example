import React from 'react';
import {connect} from "react-redux";
import ChatComponentView from './ChatComponentView';
import {chatActions} from 'bus/chat/actions';


class ChatComponent extends React.Component{
    constructor(props){
        super(props);
        props.chatServerPrepare();
    }
    componentDidUpdate(prevProps){
        if(prevProps.server !== this.props.server && this.props.server){
            this.props.chatServerConnectionTry();
        }
        // if(prevProps.connection !== this.props.connection && this.props.connection){
        //     this.props.chatCreateNewRoom({phone: '+255233333313'});
        //     this.props.chatCreateNewRoom({phone: '+255234567890'});
        // }
    }
    componentWillUnmount(){
        this.props.chatServerDestroy();
    }
    render(){
        return <ChatComponentView />
    }
}

const mapStateToProps = state => ({
    server: state.chat.server,
    connection: state.chat.connection,
});

const mapDispatchToProps = {
    chatServerPrepare: chatActions.chatServerPrepare,
    chatServerConnectionTry: chatActions.chatServerConnectionTry,
    chatServerDestroy: chatActions.chatServerDestroy,
    chatCreateNewRoom: chatActions.chatCreateNewRoom
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ChatComponent);
