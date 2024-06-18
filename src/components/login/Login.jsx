import React from 'react';
import '../login/login.css';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { loginUser } from './LoginSlice';

import { MDBContainer, MDBCard, MDBCardBody, MDBRow, MDBCol, MDBInput, MDBBtn, MDBIcon } from 'mdb-react-ui-kit';
import LoginValidation from './../validation/LodinValidation';

const initialValues = {
  email: "",
  password: "",
};

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: LoginValidation,
      onSubmit: async (values, action) => {
        try {
          const token = await dispatch(loginUser(values)).unwrap();
          if (token) {
            navigate("/dashboard");
          }
        } catch (error) {
          console.error('Login failed:', error);
        }
        action.resetForm();
      },
    });

  return (
    <MDBContainer className='my-5'>
      <MDBRow className='g-0 align-items-center'>
        <MDBCol col='6'>
          <MDBCard className='my-5 cascading-right' style={{ background: 'hsla(0, 0%, 100%, 0.55)', backdropFilter: 'blur(30px)' }}>
            <MDBCardBody className='p-5 shadow-5 text-center'>
              <h2 className="fw-bold mb-5">Sign in now</h2>
              <MDBInput
                wrapperClass='mb-4'
                label='Email'
                id='form3'
                type='email'
                autoComplete="off"
                name="email"
                placeholder="Email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.email && touched.email && (
                <p className="form-error">{errors.email}</p>
              )}
              <MDBInput
                wrapperClass='mb-4'
                label='Password'
                id='form4'
                type='password'
                autoComplete="off"
                name="password"
                placeholder="Password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.password && touched.password && (
                <p className="form-error">{errors.password}</p>
              )}
              <MDBBtn className='w-100 mb-4' size='md' type="submit" onClick={handleSubmit}>Login</MDBBtn>
              <div className="text-center">
                <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                  <MDBIcon fab icon='facebook-f' size="sm" />
                </MDBBtn>
                <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                  <MDBIcon fab icon='twitter' size="sm" />
                </MDBBtn>
                <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                  <MDBIcon fab icon='google' size="sm" />
                </MDBBtn>
                <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                  <MDBIcon fab icon='github' size="sm" />
                </MDBBtn>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
        <MDBCol col='6'>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-8iySc-9E50uu_ZVU1qR-ueSnsy-9fkdrkIyt1iNjF3uxFv2gxJ3lQctVpOxJFxs_8SM&usqp=CAU" className="w-100 ms-5 rounded-4 shadow-4" alt="" fluid />
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Login;
