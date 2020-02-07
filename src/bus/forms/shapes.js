// Core
import { object, string, ref } from 'yup';

export const signUp = {
  shape: {
    email: '',
    password: '',
    rePassword: '',
    type: 'Personal'
  },
  schema: object().shape({
    email: string()
      .email()
      .required(),
    password: string()
      .min(8)
      .max(32)
      .matches(/[a-z]/)
      .matches(/[A-Z]/)
      .matches(/[0-9]/)
      .required(),
    rePassword: string()
      .oneOf([ref('password'), null], "Passwords don't match")
      .required('Confirm Password is required')
  })
};

export const login = {
  shape: {
    password: ''
  },
  schema: object().shape({
    password: string().required()
  })
};

export const forgotPassword = {
  shape: {
    email: ''
  },
  schema: object().shape({
    email: string()
      .email()
      .required()
  })
};

export const resetPassword = {
  shape: {
    password: '',
    rePassword: ''
  },
  schema: object().shape({
    password: string()
      .min(8)
      .max(32)
      .matches(/[a-z]/)
      .matches(/[A-Z]/)
      .matches(/[0-9]/)
      .required(),
    rePassword: string()
      .oneOf([ref('password'), null], "Passwords don't match")
      .required('Confirm Password is required')
  })
};

export const bankRedeem = {
  shape: {
    account: '',
    bank: '',
    swift: '',
    number: '',
    comments: ''
  },
  schema: object().shape({
    account: string()
      .matches(/[a-z]/)
      .required(),
    bank: string()
      .matches(/[a-z]/)
      .required(),
    swift: string()
      .matches(/[A-Z]/)
      .matches(/[0-9]/)
      .required(),
    number: string()
      .matches(/[0-9]/)
      .min(16)
      .max(16)
      .required(),
    comments: string()
  })
};

export const send = {
  shape: {
    amount: '',
    // currency: { value: 'DIMO', label: 'Dimo' },  * hiddenDimo *
    typeSearch: { value: 'phone', label: 'Phone' },
    number: '',
    comments: '',
    newUser: false,
    newMember: ''
  },
  schema: object().shape({
    amount: string().required(),
    currency: object().shape({
      value: string().required(),
      label: string().required()
    }),
    number: string(),
    comments: string(),
    newMember: string()
  })
};

export const settings = {
  schema: object().shape({
    username: string()
        .matches(/[a-z0-9]/)
        .matches(/^\S*$/)
        .min(4)
        .max(10)
  })
};

export const sms = {
  shape: {
    sms: ''
  },
  schema: object().shape({
    sms: string().required()
  })
};
