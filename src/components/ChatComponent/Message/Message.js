import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from "react-redux";
import MessageView from './MessageView';
import {getChatMember} from 'bus/chat/reducer';


class Message extends React.Component{
    constructor(props){
        super(props);
    }
    componentDidUpdate(prevProps){
        if(this.props.isActive){
            this.props.goToActive(ReactDOM.findDOMNode(this));
        }
    }
    render(){
        const {message, user, getMember, isActive, scrollToBottom} = this.props;
        return(
            <MessageView message={message} user={user} getMember={getMember} isActive={isActive} scrollToBottom={scrollToBottom}/>
        )
    }
}

const mapStateToProps = state => ({
    user: state.profile.user,
    getMember: getChatMember(state)
});

const mapDispatchToProps = {

};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Message);
