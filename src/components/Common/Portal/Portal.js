// Core
import { Component } from 'react';
import ReactDOM from 'react-dom';

import styles from './Portal.module.scss';

class Portal extends Component {
  el = document.createElement('div');

  componentDidMount() {
    this.el.setAttribute('class', styles.modalWrapper);
    document.body.appendChild(this.el);
    document.body.classList.add('no-scroll');
  }

  componentWillUnmount() {
    document.body.removeChild(this.el);
    document.body.classList.remove('no-scroll');
  }

  render() {
    const { children } = this.props;
    return ReactDOM.createPortal(children, this.el);
  }
}

export default Portal;
