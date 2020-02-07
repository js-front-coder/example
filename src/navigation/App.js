// Core
import React from 'react';
import { connect } from 'react-redux';
import LiveChat from 'react-livechat';

import Public from './Public';
import Private from './Private';

class App extends React.Component{
  constructor(props){
    super(props);

    this.state={
      wait: true,
      gotIt: false
    };
    this.livechat = null;
    this.onChatLoaded = this.onChatLoaded.bind(this);
  }

  onChatLoaded(ref){
    this.livechat = ref;
  }

  componentDidUpdate() {
    if(this.props.isAuthenticated && !this.state.gotIt){
      this.setState({gotIt: true}, ()=>{
        setTimeout(()=>{
          this.setState({wait: false});
        }, 1000)
      })
    }

  }

  render(){
    const {isAuthenticated, user} = this.props;

    const _name = user.firstName.length ? user.firstName : 'User';
    const _email = user.email.length ? user.email : 'User@useremail.com';

    if(!isAuthenticated && this.livechat){
      this.livechat.close_chat();
      this.livechat.hide_chat_window();
    }

    return isAuthenticated ? <React.Fragment>
      <Private />
      {!this.state.wait ?
          <LiveChat license={11131707}
                    visitor={{name: _name , email: _email}}
                    onChatLoaded={this.onChatLoaded}
          />: null}
    </React.Fragment> : <Public />;
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.profile.user
});

export default connect(mapStateToProps)(App);
