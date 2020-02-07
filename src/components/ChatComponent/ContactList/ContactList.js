import React from 'react';
import {connect} from "react-redux";
import { chatActions } from 'bus/chat/actions';
import { getMessagesByText } from 'bus/chat/reducer';

import ContactListView from './ContactListView';

class ContactList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
          contacts: [],
          messages: []
        };
    }
    static getDerivedStateFromProps(props, state){
        const contacts = props.search ? props.list.filter(item => {
            const otherMembers = item.members.filter( m => m._id !== props.userId);
            const values = otherMembers.map(m => m.phone).join(' ');
            return values.includes(props.search);
        }) : props.list;
        const messages = props.messages;

        return {
            contacts,
            messages
        }
    }
    render(){
        const { className, selectMessageHandler } = this.props;
        const { contacts, messages } = this.state;

        return(
            <ContactListView
                className={className}
                contacts={contacts}
                messages={messages}
                selectMessage={selectMessageHandler}
            />
        )
    }
}

const mapStateToProps = state => ({
    list: state.chat.rooms,
    messages: state.chat.search ? getMessagesByText(state)(state.chat.search): [],
    userId: state.profile.user._id,
    search: state.chat.search
});

const mapDispatchToProps = {
    selectMessageHandler: chatActions.chatSelectMessage
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ContactList);
