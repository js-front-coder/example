import React from 'react';
import {connect} from "react-redux";
import ContactsView from './ContactsView';


class Contacts extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        const {className} = this.props;

        return(
            <ContactsView className={className}/>
        )
    }
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = {

};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Contacts);
