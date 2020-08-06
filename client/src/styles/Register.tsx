import styled from 'styled-components';
interface RegisterFormInterface {
  active?: boolean;
}
export const RegisterContainer = styled.div<RegisterFormInterface>`
  width: 100%;
  height: ${(props) => (props.active ? '' : '40vh')};
  background-color: white;
`;
export const RegisterForm = styled.form<RegisterFormInterface>`
  width: 100%;
  background-color: white;
  padding: 2rem;
  display: ${(props) => (props.active ? 'flex' : 'none')};
  flex-direction: column;
  align-items: center;
`;
export const ButtonContainer = styled.div`
  display: flex;
  padding: 0 1.4rem;
`;
export const Button = styled.button<RegisterFormInterface>`
  width: 50%;
  background-color: inherit;
  border: none;
  border-bottom: 3px solid
    ${(props) =>
      props.active ? props.theme.colors.darkish : props.theme.colors.button};
  color: ${(props) => props.theme.colors.darkish};
  padding: 1rem 0;
  cursor: pointer;
  font-size: 1.5rem;
  font-weight: ${(props) => (props.active ? 400 : 600)};
  height: 100%;
  &:focus {
    outline: none;
  }
`;
export const RegisterButton = styled(Button)`
  border-bottom: ${(props) =>
    props.active
      ? '3px solid' + props.theme.colors.button
      : '3px solid' + props.theme.colors.darkish};
  font-weight: ${(props) => (props.active ? 600 : 400)};
`;
export const Header = styled.header`
  width: 100%;
  background-color: ${(props) => props.theme.colors.darkish};
  display: flex;
  align-items: center;
`;
export const Logo = styled.img`
  max-width: 100px;
  border-right: 1px solid ${(props) => props.theme.colors.lightBorder};
`;
export const MainContent = styled.main`
  display: grid;
  width: 80%;
  background-color: inherit;
  grid-template-columns: 1fr 1fr;
  grid-gap: 2rem;
  margin: 2rem auto;
`;
export const Proses = styled.section`
  display: grid;
  gap: 2rem;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 0.75fr 0.25fr;
  color: ${(props) => props.theme.colors.fontColor};
`;
export const Time = styled.div`
  background-color: white;
  grid-column: 1/3;
  padding: 2rem;
  border: 1px solid ${(props) => props.theme.colors.lightBorder};
  display: flex;
  align-items: center;
`;
export const Card = styled.div`
  padding: 4.5rem;
  border: 1px solid ${(props) => props.theme.colors.lightBorder};
  text-align: center;
  background-color: white;
  word-break: keep-all;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  line-height: 1.5rem;
`;
export const Title = styled.h4`
  color: ${(props) => props.theme.colors.darkish};
  padding: 0.5rem;
`;
export const LoginForm = styled.form<RegisterFormInterface>`
  width: 100%;
  background-color: white;
  padding: 2rem;
  display: ${(props) => (props.active ? 'none' : 'flex')};
  flex-direction: column;
  align-items: center;
`;
export const Checkbox = styled.input`
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
export const SuccessMessage = styled.h3`
  color: lightgreen;
  text-align: center;
  padding: 0.6rem;
`;
