import * as yup from 'yup';

export const categoryRegisterSchema = yup.object().shape({
  name: yup.string().trim().required('Name is required'),
  description: yup.string().trim().required('Description is required'),
  is_active: yup.boolean().required('Status is required'),
});
