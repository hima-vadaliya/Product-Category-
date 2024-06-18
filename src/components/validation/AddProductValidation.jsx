
import * as Yup from 'yup';

const  ModalValidation= Yup.object().shape({
    productName: Yup.string().required('Product Name is required'),
    productPrice: Yup.number()
      .required('Product Price is required')
      .positive('Price must be a positive number')
      .test('is-decimal', 'Price must be a valid decimal', value => (value + "").match(/^\d+(\.\d{1,2})?$/)),
  colors: Yup.array().min(1, 'At least one color must be selected').required('At least one color must be selected'),
  tags: Yup.array().min(1, 'At least one tags must be selected').required('At least one tags must be selected')
  });
  export default ModalValidation;