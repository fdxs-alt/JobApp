import React from 'react';
import { MyButton } from '../../styles/Button';
import {
  Container,
  LinkContainer,
  MyLink,
  Icon,
  FormContainer,
  InputLabel,
  Input,
  Title,
  Error,
} from '../../styles/LoginPageStyles';
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { useForm } from 'react-hook-form';
import Joi from '@hapi/joi';
import { joiResolver } from '@hookform/resolvers';
import { LOGIN } from '../../Graphql/AuthMutations';
import { useMutation } from '@apollo/client';
import { setToken } from '../../AccessToken';
import isAuthenticated, { isOwner } from '../../Graphql/isAuth';
import { useHistory } from 'react-router-dom';
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
const Login = () => {
  const history = useHistory();
  const [login, { error, loading }] = useMutation(LOGIN);
  const { register, handleSubmit, errors } = useForm<login>({
    resolver: joiResolver(schema),
  });
  const onSubmit = async ({ email, password }: login) => {
    const input = { email, password };
    try {
      const response = await login({ variables: { input } });
      if (response && response.data) {
        isAuthenticated(true);
        setToken(response.data.login.accessToken);
        if (response.data.login.user.hasCompany) {
          isOwner(true);
          history.push('/dashboard');
        }
      }
    } catch (error) {
      isAuthenticated(false);
    }
  };

  return (
    <Container>
      <LinkContainer>
        <MyLink to="/">
          <Icon icon={faArrowCircleLeft} />
          Go back
        </MyLink>
      </LinkContainer>

      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        <Title>Log in to Employer Panel</Title>
        <InputLabel htmlFor="Email">E-mail</InputLabel>
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
        {loading ? (
          <MyButton style={{ marginBottom: '1.5rem' }} width={30} disabled>
            Log in
          </MyButton>
        ) : (
          <MyButton style={{ marginBottom: '1.5rem' }} width={30}>
            Log in
          </MyButton>
        )}
        {error?.message && (
          <Error style={{ textAlign: 'center' }}>{error.message}</Error>
        )}

        <MyLink to="/reset">Forgot password?</MyLink>
      </FormContainer>
    </Container>
  );
};

export default Login;
