import React, { useState } from 'react';
import { MyButton } from '../../styles/Button';
import { RegisterForm, Checkbox } from '../../styles/Register';
import { InputLabel, Input } from '../../styles/LoginPageStyles';
import { useForm } from 'react-hook-form';
import Joi from '@hapi/joi';
import { joiResolver } from '@hookform/resolvers';
import { Error } from '../../styles/LoginPageStyles';
import { useMutation } from '@apollo/client';
import { REGISTER } from '../../Graphql/AuthMutations';
import { ToastContainer } from 'react-toastify';
import { CustomToast } from '../../utils/CustomToast';
import Spinner from '../Spinner';
interface Props {
  active: boolean;
}
interface RegisterProps {
  name: string;
  surname: string;
  email: string;
  password: string;
  company?: string;
  hasCompany: boolean;
}

const schema = Joi.object({
  email: Joi.string()
    .required()
    .email({ minDomainSegments: 2, tlds: { allow: false } }),
  password: Joi.string().required().min(8),
  surname: Joi.string().required(),
  name: Joi.string().required(),
  hasCompany: Joi.boolean(),
  company: Joi.optional(),
});

const Register: React.FC<Props> = ({ active }: Props) => {
  const [isOwner, setisOwner] = useState(false);
  const [reg, { loading }] = useMutation(REGISTER);

  const { register, handleSubmit, errors, reset } = useForm<RegisterProps>({
    resolver: joiResolver(schema),
    defaultValues: { hasCompany: false },
  });

  const onSubmit = async ({
    email,
    password,
    hasCompany,
    name,
    surname,
    company,
  }: RegisterProps) => {
    const input = {
      email,
      password,
      hasCompany,
      name,
      surname,
      companyName: company,
    };
    try {
      await reg({ variables: { input } });
      setisOwner(false);
      CustomToast(
        'Account created succesfully, confirm your email now',
        'success',
      );
      reset();
    } catch (error) {
      console.log(error);
      CustomToast('Email is already in use, try another email', 'error');
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={{ width: '30%' }}
      />
      <RegisterForm active={active} onSubmit={handleSubmit(onSubmit)}>
        <InputLabel>Name</InputLabel>
        <Input name="name" ref={register} />
        {errors && errors.name && <Error>Name field cant be empty</Error>}
        <InputLabel>Surname</InputLabel>
        <Input name="surname" ref={register} />
        {errors && errors.surname && <Error>Surname field cant be empty</Error>}
        <InputLabel>Email</InputLabel>
        <Input name="email" ref={register} />
        {errors && errors.email && errors.email.type === 'string.empty' && (
          <Error>Email field cannot be empty</Error>
        )}
        {errors && errors.email && errors.email.type === 'string.email' && (
          <Error>Email must be a valid email</Error>
        )}
        <InputLabel>Password</InputLabel>
        <Input name="password" ref={register} type="password" />
        {errors &&
          errors.password &&
          errors.password.type === 'string.empty' && (
            <Error>Password field cannot be empty</Error>
          )}
        {errors && errors.password && errors.password.type === 'string.min' && (
          <Error>Password field must be at least 8 characters</Error>
        )}
        <InputLabel style={{ marginBottom: '15px' }}>
          Are you the owner of the company?
          <Checkbox
            type="checkbox"
            name="hasCompany"
            ref={register}
            onClick={() => setisOwner(!isOwner)}
          />
        </InputLabel>

        {isOwner && (
          <>
            <InputLabel>Company</InputLabel>
            <Input name="company" ref={register} required />
          </>
        )}

        {!loading ? (
          <MyButton width={40}>Register</MyButton>
        ) : (
          <Spinner loading={loading} small size={50} />
        )}
      </RegisterForm>
    </>
  );
};

export default Register;
