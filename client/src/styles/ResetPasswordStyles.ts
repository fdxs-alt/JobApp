import styled from 'styled-components';

export const InputWrapper = styled.form`
  width: 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
export const ChangePasswordTitle = styled.p`
  font-size: 1.4rem;
  padding: 2rem;
  font-weight: 500;
  color: ${(props) => props.theme.colors.darkish};
`;
export const Button = styled.button`
  padding: 0.8rem 0.4rem;
  color: white;
  background-color: ${(props) => props.theme.colors.button};
  border: none;
  font-size: 1.2rem;
`;
