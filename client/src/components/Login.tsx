import React from 'react';
import { LoginForm } from '../styles/Register';
import { MyButton } from '../styles/Button';
import { InputLabel, Input } from '../styles/LoginPageStyles';
import { useForm } from 'react-hook-form';
import Joi from '@hapi/joi';
import { joiResolver } from '@hookform/resolvers';
import { Error } from '../styles/LoginPageStyles';
import { LOGIN } from '../Graphql/AuthMutations';
import { useMutation } from '@apollo/client';
import { withRouter, RouteComponentProps, Redirect } from 'react-router-dom';
import { setToken } from '../AccessToken';
import isAuth from '../Graphql/isAuth';
type login = {
  email: string;
  password: string;
};
const schema = Joi.object({
  email: Joi.string()
    .required()
    .email({ minDomainSegments: 2, tlds: { allow: false } }),
  password: Joi.string().required(),
});
interface Props {
  active: boolean;
}

const Login: React.FC<RouteComponentProps & Props> = ({ active }: Props) => {
  const [login] = useMutation(LOGIN);
  const { register, handleSubmit, errors } = useForm<login>({
    resolver: joiResolver(schema),
  });
  const onSubmit = async ({ email, password }: login) => {
    const input = { email, password };
    try {
      const response = await login({ variables: { input } });
      if (response && response.data) {
        setToken(response.data.login.accessToken);
        isAuth(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <LoginForm active={active} onSubmit={handleSubmit(onSubmit)}>
      <InputLabel htmlFor="Email">Email</InputLabel>
      <Input
        name="email"
        placeholder="john@doe.com"
        ref={register({ required: true })}
      />
      {errors.email?.type === 'string.empty' && (
        <Error>Email field cannot be empty</Error>
      )}
      {errors.email?.type === 'string.email' && (
        <Error>Email must be a valid email</Error>
      )}
      <InputLabel htmlFor="Password">Password</InputLabel>
      <Input
        type="password"
        name="password"
        placeholder="Don't tell anybody"
        ref={register({ required: true })}
      />
      {errors.password?.message && (
        <Error>Password field cannot be empty</Error>
      )}
      <MyButton style={{ marginBottom: '1.5rem' }} width={30}>
        Log in
      </MyButton>
    </LoginForm>
  );
};

export default withRouter(Login);
