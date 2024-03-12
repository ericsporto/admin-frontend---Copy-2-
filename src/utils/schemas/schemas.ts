import * as yup from 'yup';

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .required('Email is required')
    .email('Invalid email'),
  password: yup.string().trim().required('Password is required'),
});

export const registerSchema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .required('Email is required')
    .email('Invalid email'),
  name: yup.string().trim().required('Name is required'),
  password: yup
    .string()
    .trim()
    .required('Password is required')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&.*])(?=.{8,})/,
      'Must contain at least 8 characters, 1 uppercase, 1 number and 1 special character!',
    ),
  confirmPassword: yup
    .string()
    .trim()
    .required('Confirm password is required')
    .oneOf([yup.ref('password')], 'Password must match'),
  phone: yup
    .string()
    .trim()
    .matches(
      /^\(\d{2}\)\s\d{4,5}-\d{4}$/,
      'Invalid phone! Must be (xx) xxxxx-xxxx format!',
    )
    .required('Phone is required'),
  official_id_number: yup
    .string()
    .trim()
    .required('Oficial Number is required'),
  official_id_type: yup.string().trim().required('Oficial Type is required'),
});

export const forgotSchema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .required('Email is required')
    .email('Invalid email'),
});
export const changePasswordSchema = yup.object().shape({
  password: yup
    .string()
    .trim()
    .required('New password is required')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&.*])(?=.{8,})/,
      'Must contain at least 8 characters, 1 uppercase, 1 number and 1 special character!',
    ),
  confirmPassword: yup
    .string()
    .trim()
    .required('Confirm new password is required')
    .oneOf([yup.ref('password')], 'New password must match'),
});

export const Schema2FA = yup.object().shape({
  token: yup
    .string()
    .required('Token is required')
    .min(6, 'Must be exactly 6 digits')
    .max(6, 'Must be exactly 6 digits'),
});

export const resetSchema = yup.object().shape({
  password: yup
    .string()
    .trim()
    .required('Password is required')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&.*])(?=.{8,})/,
      'Must contain at least 8 characters, 1 uppercase, 1 number and 1 special character!',
    ),
  confirmPassword: yup
    .string()
    .trim()
    .required('Confirm password is required')
    .oneOf([yup.ref('password')], 'Password must match'),
});

export const twoFactorSchema = yup.object().shape({
  TwoFactorCode: yup
    .string()
    .trim()
    .required('Code is required')
    .min(6, 'Please enter a valid code')
    .max(6, 'Please enter a valid code'),
});

export const companyRegisterSchema = yup.object().shape({
  business_name: yup.string().trim().required('Name is required'),
  trading_name: yup.string().trim().required('Fantasy name is required'),
  official_id_type: yup.string().trim().required('Type document is required'),
});

export const storeRegisterSchema = yup.object().shape({
  name: yup.string().trim().required('Name is required'),
  support_email: yup
    .string()
    .trim()
    .required('Email is required')
    .email('Invalid email'),
  support_phone: yup.string().trim().required('Phone is required'),
});
