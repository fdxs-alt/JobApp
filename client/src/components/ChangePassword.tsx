import React from 'react';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers';
import Joi from '@hapi/joi';
import { InputLabel, Input, Error } from '../styles/LoginPageStyles';
import { ResetInputType } from '../pages/Auth/Reset';
import { Button } from '../styles/ResetPasswordStyles';
import { CustomToast } from '../utils/CustomToast';
import { ToastContainer } from 'react-toastify';
import { useMutation } from '@apollo/client';
import { CHANGE_PASSWORD } from '../Graphql/AuthMutations';
import { Container, ChangePasswordWrapper } from '../styles/UserPageStyles';

interface ResetInputInterface extends ResetInputType {
  prevPassword: string;
}
const schema = Joi.object({
  password: Joi.string().required().min(8),
  confirmPassword: Joi.string().required().min(8),
  prevPassword: Joi.string().required(),
});
const ChangePassword = () => {
  const { handleSubmit, errors, register, reset } = useForm<
    ResetInputInterface
  >({
    resolver: joiResolver(schema),
  });
  const [changePassword, { loading }] = useMutation(CHANGE_PASSWORD);

  const handleFormSubmit = async ({
    confirmPassword,
    password,
    prevPassword,
  }: ResetInputInterface) => {
    if (password !== confirmPassword) {
      CustomToast('Passwords must be identical', 'error');
      reset();
      return;
    }
    const data = {
      prevPassword,
      password,
      confirmPassword,
    };
    try {
      await changePassword({ variables: { data } });
      if (!loading) CustomToast('Password was changed successfully', 'success');
      reset();
    } catch (error) {
      CustomToast(error.message, 'error');
      reset();
    }
  };
  return (
    <Container>
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
      <ChangePasswordWrapper onSubmit={handleSubmit(handleFormSubmit)}>
        <InputLabel>Previous password</InputLabel>
        <Input type="password" name="prevPassword" ref={register} />
        {errors.prevPassword.type === 'string.empty' && (
          <Error>Previous password field cannot be empty</Error>
        )}
        <InputLabel>Password</InputLabel>
        <Input type="password" name="password" ref={register} />
        {errors.password.type === 'string.empty' && (
          <Error>Password field cannot be empty</Error>
        )}
        {errors.password.type === 'string.min' && (
          <Error>Password field must be at least 8 characters</Error>
        )}
        <InputLabel>Confirm password</InputLabel>
        <Input type="password" name="confirmPassword" ref={register} />
        {errors.confirmPassword.type === 'string.empty' && (
          <Error>Password field cannot be empty</Error>
        )}
        {errors.confirmPassword.type === 'string.min' && (
          <Error>Password field must be at least 8 characters</Error>
        )}
        <Button type="submit">Change password</Button>
      </ChangePasswordWrapper>
    </Container>
  );
};

export default ChangePassword;
