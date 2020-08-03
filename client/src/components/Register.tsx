import React, { useState } from 'react';
import { MyButton } from '../styles/Button';
import { RegisterForm } from '../styles/Register';
import { InputLabel, Input } from '../styles/LoginPageStyles';
import { useForm } from 'react-hook-form';
import Joi from '@hapi/joi';
import { joiResolver } from '@hookform/resolvers';
import { Error } from '../styles/LoginPageStyles';
import styled from 'styled-components';
const Checkbox = styled.input`
  display: flex;
  align-self: center;
  margin-left: 20px;
  height: 20px;
  width: 20px;
  cursor: pointer;
  &:checked {
    border: 1px solid #41b883;
    background-color: ${(props) => props.theme.colors.button};
  }
`;
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
  const { register, handleSubmit, errors } = useForm<RegisterProps>({
    resolver: joiResolver(schema),
  });
  const onSubmit = (data: RegisterProps) => console.log(data);
  return (
    <RegisterForm active={active} onSubmit={handleSubmit(onSubmit)}>
      <InputLabel>Name</InputLabel>
      <Input name="name" ref={register} />
      {errors.name && <Error>Name field can't be empty</Error>}
      <InputLabel>Surname</InputLabel>
      <Input name="surname" ref={register} />
      {errors.surname && <Error>Surname field can't be empty</Error>}
      <InputLabel>Email</InputLabel>
      <Input name="email" ref={register} />
      {errors.email?.type === 'string.empty' && (
        <Error>Email field cannot be empty</Error>
      )}
      {errors.email?.type === 'string.email' && (
        <Error>Email must be a valid email</Error>
      )}
      <InputLabel>Password</InputLabel>
      <Input name="password" ref={register} type="password" />
      {errors.password?.type === 'string.empty' && (
        <Error>Password field cannot be empty</Error>
      )}
      {errors.password?.type === 'string.min' && (
        <Error>Password field must be at least 8 characters</Error>
      )}
      <InputLabel style={{marginBottom: "15px"}}>
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
      <MyButton width={40}>Register</MyButton>
    </RegisterForm>
  );
};

export default Register;
