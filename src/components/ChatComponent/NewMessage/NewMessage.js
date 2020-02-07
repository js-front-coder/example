import React from 'react';
import {connect} from "react-redux";
import NewMessageView from "./NewMessageView";
import {chatActions} from "../../../bus/chat/actions";


class NewMessage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentState: 'default',
            giphyOpened: false,
            smilesOpened: false,
            emojiOpened: false
        };

        this.setMessageRef = this.setMessageRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    setMessageRef(node) {
        this.message = node;
    }

    textareaRef = (node) => {
        this.textarea = node;
    };

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentDidUpdate(prevProps) {
        if(prevProps.currentRoomId !== this.props.currentRoomId){
            this.setState({
                currentState: 'default',
                giphyOpened: false,
                smilesOpened: false,
                emojiOpened: false
            })
        }
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    messageChangeHandler = (e) => {
        if (e.target.value === '\n' && !e.shiftKey) {
            //this.props.changeCurrentRoomMessage(e.target.value);
        } else {
            this.props.changeCurrentRoomMessage(e.target.value);
        }
    };

    handleGif = () => {
        this.setState({
            giphyOpened: !this.state.giphyOpened,
            emojiOpened: false
        });
    };

    handleSelectGif = (value) => {
        this.setState({giphyOpened: false, currentState: 'default'}, ()=>{
            //this.props.changeCurrentRoomMessage(value.fixed_width.url);
            this.props.chatSendNewMessage({text: value.fixed_width.url, conversationId: this.props.currentRoomId});
        });
    };

    handleEmoji = () => {
        this.setState({
            emojiOpened: !this.state.emojiOpened,
            giphyOpened: false
        });
    };

    handleSelectEmoji = value => {
        console.log('message icon', value);
        this.props.changeCurrentRoomMessage(this.textarea.value + value.native);
        this.handleEmoji();
    };

    switchState =(flag)=> {
        if(flag !== undefined){
            this.setState({currentState: flag ? 'active': 'default'});
        }else {
            this.setState({currentState: this.state.currentState === 'default' ? 'active': 'default'})
        }
    };

    sendHandle = () => {
        const {currentRoomId, newMsg} = this.props;

        if(newMsg.length) {
            this.props.chatSendNewMessage({text: newMsg, conversationId: currentRoomId});
            this.setState({
                currentState: 'default'
            });
        }
    };

    handleClickOutside(event) {
        if (this.message && !this.message.contains(event.target)) {
            this.setState({currentState: 'default'});
        }
    }

    render() {
        const {currentState, giphyOpened, smilesOpened, emojiOpened} = this.state;
        const {className, newMsg} = this.props;

        return (
            <NewMessageView switchState={this.switchState}
                            giphyOpened={giphyOpened}
                            emojiOpened={emojiOpened}
                            smilesOpened={smilesOpened}
                            className={className}
                            message={newMsg}
                            setMessageRef={this.setMessageRef}
                            sendHandle={this.sendHandle}
                            onInputChange={this.messageChangeHandler}
                            handleGifClick={this.handleGif}
                            handleSelectGif={this.handleSelectGif}
                            handleEmojiClick={this.handleEmoji}
                            handleSelectEmoji={this.handleSelectEmoji}
                            active={this.state.currentState === 'active'}
                            textareaRef={this.textareaRef}
            />
        )
    }
}

const mapStateToProps = state => ({
    currentRoomId: state.chat.activeRoom.id,
    newMsg: state.chat.activeRoom.newMsg
});

const mapDispatchToProps = {
    chatSendNewMessage: chatActions.chatSendNewMessage,
    changeCurrentRoomMessage: chatActions.changeCurrentRoomMessage
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NewMessage);
