import * as yup from 'yup';

export const storeCreateProductSchema = yup.object().shape({
  name: yup.string().trim().required('Name is required'),
  price: yup.number().required('Price is required'),
  status: yup.string().trim().required('Status is required'),
});
