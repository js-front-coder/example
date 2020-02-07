import React from 'react';
import {connect} from "react-redux";
import MessageListView from './MessageListView';
import {chatActions} from "../../../bus/chat/actions";


class MessageList extends React.Component {
    constructor(props) {
        super(props);

        this.scrollEnd = React.createRef();
    }

    componentDidMount() {
        if (this.scrollEnd) {
            this.scrollEnd.current.scrollIntoView();
        }
    }

    componentDidUpdate(prevProps) {
        this.scrollToBottom();
    }

    scrollToBottom = () => {
        this.scrollEnd.current.scrollIntoView();
    };

    goToActiveHandler = (node) => {
        node.classList.add('message--active');
        setTimeout(()=>{
            node.classList.remove('message--active');
            this.props.clearActiveMessage();
        }, 4500);
    };

    render() {
        const {className, list, isNew, activeMsg} = this.props;

        return (
            <MessageListView
                isNew={isNew}
                className={className}
                list={list}
                listRef={this.scrollEnd}
                activeMsg={activeMsg}
                goToActive={this.goToActiveHandler}
                scrollToBottom={this.scrollToBottom}
            />
        )
        //return null;
    }
}

const mapStateToProps = (state, props) => {
    const room = state.chat.rooms.find(r => r.id === props.roomId);
    return {
        list: room ? props.isNew ? room.newMsgList : room.msgList : [],
        listLength: room ? room.msgList.length : 0,
        activeMsg: state.chat.activeMessage
    };
};

const mapDispatchToProps = {
    clearActiveMessage: () => chatActions.setActiveMessage({})
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageList)
