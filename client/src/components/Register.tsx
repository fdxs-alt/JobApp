import React from 'react';
import { MyButton } from '../styles/Button';
import { RegisterForm } from '../styles/Register';
import { InputLabel, Input } from '../styles/LoginPageStyles';
interface Props {
  active: boolean;
}
const Register: React.FC<Props> = ({ active }: Props) => {
  return (
    <RegisterForm active={active}>
      <InputLabel>Company</InputLabel>
      <Input />
      <InputLabel>Name</InputLabel>
      <Input />
      <InputLabel>Surname</InputLabel>
      <Input />
      <InputLabel>Email</InputLabel>
      <Input />
      <InputLabel>Password</InputLabel>
      <Input />
      <InputLabel>Confirm password</InputLabel>
      <Input />
      <MyButton>Register</MyButton>
    </RegisterForm>
  );
};

export default Register;
