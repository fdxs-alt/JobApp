import React from 'react';
import { MyButton } from '../styles/Button';
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
  Paragraph,
} from '../styles/LoginPageStyles';
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { useForm } from 'react-hook-form';
import Joi from '@hapi/joi';
import { joiResolver } from '@hookform/resolvers';

type reset = {
  email: string;
};
const schema = Joi.object({
  email: Joi.string()
    .required()
    .email({ minDomainSegments: 2, tlds: { allow: false } }),
});
const Login = () => {
  const { register, handleSubmit, errors } = useForm<reset>({
    resolver: joiResolver(schema),
  });
  const onSubmit = (data: reset) => console.log(data);
  return (
    <Container>
      <LinkContainer>
        <MyLink to="/">
          <Icon icon={faArrowCircleLeft} />
          Go back
        </MyLink>
      </LinkContainer>

      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        <Title>Set a new password</Title>
        <Paragraph>
          Please enter your e-mail and we will send you the link to set a new
          password.
        </Paragraph>
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
        <MyButton style={{ marginBottom: '1.5rem' }} width={40}>
          Send recovery email
        </MyButton>
        <MyLink to="/login">Back to login?</MyLink>
      </FormContainer>
    </Container>
  );
};

export default Login;
