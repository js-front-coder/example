// Core
import React, {useState, useEffect, createRef} from 'react';
import {connect} from 'react-redux';
import {Formik, Form, Field} from 'formik';
import cx from 'classnames';
import Select from 'react-select';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import close from 'theme/images/Common/close.svg';

import {send} from 'bus/forms/shapes';

import {sendActions} from 'bus/send/actions';
import {usersActions} from 'bus/users/actions';

import {WrapperSection, Container, ModalWallet, Portal} from 'components/Common';
import {SuccesModal} from './Modal/Succes';

import historySrc from 'theme/images/Send/history.svg';

import styles from './Send.module.scss';

import * as constants from 'helper/constants';

// const currency = [
//   {value: 'DIMO', label: 'Dimo'},
//   {value: 'dTZS', label: 'dTZS'},
//   {value: 'dUGX', label: 'dUGX'}
// ];

const Send = (
  {
    isModal = false,
    closeModal = () => {
    },
    status,
    sendAsync,
    valueSlider,
    numbersOfUsers,
    setValueSlider,
    fillNumberUsers,
    closeSuccessModal,
    currentCountry,
    history,
    getHistory,
      to = '',
      next = () => {}
  }) => {
  const formikForm = createRef();
  let currency;

  const allCurrency = constants.currency;

  useEffect(() => {
    fillNumberUsers();
  }, [fillNumberUsers]);

  const [amount, setAmount]                 = useState(0);
  const [phone, setPhone]                   = useState(to);
  const [number, setNumber]                 = useState('');
  const [chosenCurrency, setCurrency]       = useState(currentCountry === 'TZ' ? 'dTZS' : 'dUGX');
  // const [chosenCurrency, setCurrency]       = useState('DIMO');
  const [historyBlock, setHistoryBlock]     = useState(false);
  const [historyNumbers, setHistoryNumbers] = useState(numbersOfUsers.data);

  const checkCurrency = () => {
    if (currentCountry === 'TZ') {
      currency = [
        // {value: 'DIMO', label: 'Dimo'},  * hiddenDimo *
        {value: 'dTZS', label: 'TZS'}  // label: dTZS - ChangeCurrency
      ]
    } else if (currentCountry === 'UG') {
      currency = [
        // {value: 'DIMO', label: 'Dimo'},   * hiddenDimo *
        {value: 'dUGX', label: 'UGX'}  // label: dUGX - ChangeCurrency
      ]
    }
    return currency;
  };

  const handleSubmit = data => {
    sendAsync({
      to: data.newMember.replace(/@/, ''),
      amount: data.amount,
      notes: data.comments,
      currency: data.currency.value
    }, next);

    setAmount(data.amount);
    setNumber(data.number.value);
  };

  const handleCloseModal = () => {
    closeSuccessModal();
    setValueSlider(1);
    getHistory();
  };

  const handleAmount = (value, setFieldValue) => {
    if (/^(?=.*\d)\d*(?:\.\d{0,2})?$/.test(value) && value.length < 11) {
      setFieldValue('amount', value);
    }
    if (value === '') {
      setFieldValue('amount', '');
    }
  };

  const handleSlider = value => {
    if (value < 3) {
      setValueSlider(value);
      formikForm.current.submitForm();
    }
  };

  const handleHistoryBlock = () => {
    getHistory();
    setHistoryBlock(!historyBlock);
  };

  const checkHistoryNumber = data => {

    // let result = historyNumbers.data.filter(item => {
    //   return item.phone.indexOf(data) + 1;
    // });
    //
    // setHistoryNumbers(result);
    //
    // if (data) {
    //   setHistoryBlock(true)
    // } else {
    //   setHistoryBlock(false)
    // }

  };


  return (
    <>{
        !isModal ? (
            <WrapperSection>
              <Container>
                <div className={styles.wrapperSend}>
                  <Formik
                    ref={formikForm}
                    initialValues={{...send.shape, newMember: to}}
                    render={props => {
                      const {isValid, touched, errors, values, setFieldValue} = props;
                      // if (errors.amount) {
                      //   setValueSlider(1);
                      // } else if (errors.number) {
                      //   setValueSlider(1);
                      // }

                      const handleSelect = (value) => {
                        setFieldValue('currency', value);
                        setCurrency(value);
                      };

                      const styleAmount = cx(styles.input, styles.inputAmount, {
                        [styles.invalidInput]: !isValid && touched.amount && errors.amount
                      });

                      const styleCurrency = cx(styles.select, {
                        [styles.invalidInput]: !isValid && touched.currency && errors.currency
                      });

                      const styleNewMember = cx(styles.input, styles.inputNewMember);

                      return (
                        <Form className={styles.form}>
                          <p className={styles.label}>Enter amount to send</p>
                          <div className={styles.wrapperAmount}>
                            <div className={styles.blockAmount}>
                              <Field
                                type="string"
                                name="amount"
                                autoComplete="off"
                                placeholder='0.00'
                                value={values.amount}
                                className={styleAmount}
                                onChange={e =>
                                  handleAmount(e.target.value, setFieldValue)
                                }
                              />
                            </div>
                            <div className={styles.typeCash}>
                              <Select
                                value={values.currency}
                                className={styleCurrency}
                                options={checkCurrency()}
                                onChange={handleSelect}
                              />
                            </div>
                          </div>

                          <div className={styles.wrapperRecept}>
                            <p className={styles.label}>
                              <span className={styles.receptTitle}>Receiver</span>
                            </p>
                            <Field
                              type="string"
                              name="newMember"
                              autoComplete="off"
                              placeholder='Phone number or Username'
                              className={styleNewMember}
                              onChange={e => {
                                setFieldValue('newMember', e.target.value);
                                setPhone(e.target.value);
                                checkHistoryNumber(e.target.value);
                              }}
                            />
                            <img
                              src={historySrc}
                              alt="historySrc"
                              className={styles.history}
                              onClick={handleHistoryBlock}
                            />

                            {historyBlock && (
                              <div className={styles.wrapperSelect}>
                                <ul>
                                  {numbersOfUsers.data.map((item, index) => {
                                    return (
                                      <li
                                        key={index}
                                        className={styles.itemHistory}
                                        onClick={() => {
                                          setFieldValue('newMember', item.phone);
                                          setPhone(item.phone);
                                          handleHistoryBlock();
                                        }}
                                      >
                                        {item.phone} ({item.name})
                                      </li>
                                    );
                                  })}
                                </ul>
                              </div> || <></>
                            )}
                          </div>

                          <p className={styles.label}>Notes (optional)</p>

                          <Field
                            name="comments"
                            component="textarea"
                            placeholder='Type your notes'
                            value={values.comments}
                            className={styles.notes}
                          />

                          <Slider
                            min={1}
                            max={3}
                            step={1}
                            value={valueSlider}
                            onChange={handleSlider}
                          />
                        </Form>
                      );
                    }}
                    validationSchema={send.schema}
                    onSubmit={handleSubmit}
                  />
                </div>
                <ModalWallet number={number}/>
              </Container>
            </WrapperSection>
          ) : <Portal>
            <div className={styles.wrapperSendModal}>
              <div className={styles.wrapperSend}>
                <img
                  src={close}
                  alt="close"
                  className={styles.close}
                  onClick={closeModal}
                />
                <Formik
                  ref={formikForm}
                  initialValues={{...send.shape, newMember: to}}
                  render={props => {
                    const {isValid, touched, errors, values, setFieldValue} = props;

                    // if (errors.amount) {
                    //   setValueSlider(1);
                    // } else if (errors.number) {
                    //   setValueSlider(1);
                    // }

                    const handleSelect = (value) => {
                      setFieldValue('currency', value);
                      setCurrency(value);
                    };

                    const styleAmount = cx(styles.input, styles.inputAmount, {
                      [styles.invalidInput]: !isValid && touched.amount && errors.amount
                    });

                    const styleCurrency = cx(styles.select, {
                      [styles.invalidInput]: !isValid && touched.currency && errors.currency
                    });

                    const styleNewMember = cx(styles.input, styles.inputNewMember);

                    return (
                      <Form className={styles.form}>
                        <p className={styles.label}>Enter amount to send</p>
                        <div className={styles.wrapperAmount}>
                          <div className={styles.blockAmount}>
                            <Field
                              type="string"
                              name="amount"
                              autoComplete="off"
                              placeholder='0.00'
                              value={values.amount}
                              className={styleAmount}
                              onChange={e =>
                                handleAmount(e.target.value, setFieldValue)
                              }
                            />
                          </div>
                          <div className={styles.typeCash}>
                            <Select
                              value={values.currency}
                              className={styleCurrency}
                              options={checkCurrency()}
                              onChange={handleSelect}
                            />
                          </div>
                        </div>

                        <div className={styles.wrapperRecept}>
                          <p className={styles.label}>
                            <span className={styles.receptTitle}>Recept</span>
                          </p>
                          <Field
                            type="string"
                            name="newMember"
                            autoComplete="off"
                            placeholder='Phone number or Username'
                            value={values.newMember}
                            className={styleNewMember}
                            onChange={e => {
                              setFieldValue('newMember', e.target.value);
                              setPhone(e.target.value);
                              checkHistoryNumber(e.target.value);
                            }}
                          />
                          <img
                            src={historySrc}
                            alt="historySrc"
                            className={styles.history}
                            onClick={handleHistoryBlock}
                          />

                          {historyBlock && (
                            <div className={styles.wrapperSelect}>
                              <ul>
                                {numbersOfUsers.data.map((item, index) => {
                                  return (
                                    <li
                                      key={index}
                                      className={styles.itemHistory}
                                      onClick={() => {
                                        setFieldValue('newMember', item.phone);
                                        setPhone(item.phone);
                                        handleHistoryBlock();
                                      }}
                                    >
                                      {item.phone} ({item.name})
                                    </li>
                                  );
                                })}
                              </ul>
                            </div> || <></>
                          )}
                        </div>

                        <p className={styles.label}>Notes (optional)</p>

                        <Field
                          name="comments"
                          component="textarea"
                          placeholder='Type your notes'
                          value={values.comments}
                          className={styles.notes}
                        />

                        <Slider
                          min={1}
                          max={3}
                          step={1}
                          value={valueSlider}
                          onChange={handleSlider}
                        />
                      </Form>
                    );
                  }}
                  validationSchema={send.schema}
                  onSubmit={handleSubmit}
                />
              </div>
            </div>
          </Portal>

      }
    <SuccesModal
      status={status}
      amount={amount}
      number={number}
      phone={phone}
      currency={chosenCurrency}
      handleCloseModal={handleCloseModal}
    />
    </>
  );
};

const mapStateToProps = state => ({
  status: state.send.status,
  valueSlider: state.send.valueSlider,
  history: state.send.history,
  numbersOfUsers: state.users.numbersOfUsers,
  currentCountry: state.profile.user.country
});

const mapDispatchToProps = {
  sendAsync: sendActions.sendAsync,
  getHistory: sendActions.getHistoryAsync,
  setValueSlider: sendActions.setValueSlider,
  closeSuccessModal: sendActions.closeSuccessModal,
  fillNumberUsers: usersActions.fillNumberUsersAsync
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Send);
