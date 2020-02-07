import React from 'react';
import {connect} from "react-redux";
import FilterView from './FilterView';
import { chatActions } from 'bus/chat/actions';


class Filter extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            search: ''
        }
    }

    onChangeHandler = (e) => {
        this.setState({search: e.target.value}, ()=>{
            const timeout = setTimeout(()=>{
                if(this.timeout === timeout)
                    this.props.onSearchChange(this.state.search);
            }, 1000);
            this.timeout = timeout;
        });
    };

    render(){
        const {className} = this.props;
        const {search} = this.state;

        return(
            <FilterView className={className} search={search} onChange={this.onChangeHandler}/>
        )
    }
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = {
    onSearchChange: chatActions.chatSearchChange
};

export default connect(
    undefined,
    mapDispatchToProps
)(Filter);
