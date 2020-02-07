// Core
import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {history} from 'helper/history';
import {book} from 'navigation/book';
// import * as R from 'ramda';

import CashView from './CashView';

import './Cash.scss';

import {topupActions} from 'bus/topup/actions';

export class Cash extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            location: undefined,
            items: [],
            goto: undefined
        };

        this.listRef = React.createRef();
    }

    chooseItem = (id) => {
        console.log(id);
        this.setState({chosenItem: id});
    };

    onGoTo = (item) => {
        this.setState({goto: item});
    };

    static getDerivedStateFromProps(props, state){
        return {
            ...state,
            items: props.merchants
        }
    }

    componentDidMount() {
        this.props.getMerchants()
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevState.goto !== this.state.goto){
            const element = this.listRef.current;
            let index = undefined;
            let activeItem = this.state.items.find((item,i) => {
                index = i;
                return item._id === this.state.goto._id;
            });
            if(activeItem){
                element.scrollTop = 136 * index;
            }
        }
    }

    handleOnGoBack = (e) => {
      history.push(book.topupRedeem.topupRedeem);
    };

    handleGeoClick = (e) =>{
        const geolocation = navigator.geolocation;

        const location = new Promise((resolve, reject) => {
            if (!geolocation) {
                reject(new Error('Not Supported'));
            }

            geolocation.getCurrentPosition((position) => {
                resolve(position);
            }, () => {
                reject (new Error('Permission denied'));
            });
        });

        location.then(res => {
            const goto = {address : {coordinates: [res.coords.latitude, res.coords.longitude]}};
            console.log(goto);
            this.setState({location: res, goto})
        }).catch((e)=>{
            this.setState({location: undefined})
        })
    };

    render() {
        const {location, items, chosenItem, goto} = this.state;
        return (
            <CashView
                items={items}
                location={location}
                onGeoClick={this.handleGeoClick}
                chosenItem={chosenItem}
                chooseItem={this.chooseItem}
                listRef={this.listRef}
                onGoTo={this.onGoTo}
                goto={goto}
                onGoBack={this.handleOnGoBack}
            />
        );
    }
};

const mapStateToProps = state => ({
    merchants: state.topup.merchants
});

const mapDispatchToProps = {
    getMerchants: topupActions.getMerchantsAsync
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Cash);
