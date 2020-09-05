import styled from 'styled-components';
import { size } from '../DefaultValues/HardCoded';

export const ButtonContainer = styled.section`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  grid-column: 1/3;
`;
export const DeleteButton = styled.button`
  padding: 0.8rem 3rem;
  color: ${(props) => props.theme.colors.darkish};
  border: none;
  font-size: 1.3rem;
  background-color: white;
  cursor: pointer;
  font-weight: 500;
  &:hover {
    color: red;
  }
`;
export const ChangePasswordWrapper = styled.form`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
export const Container = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const Wrapper = styled.div`
  min-height: inherit;
  width: 70%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 0.4fr 1fr;
  grid-template-rows: 0.6fr 1fr 0.2fr;
  gap: 1rem;
  align-items: center;
  justify-content: center;

  @media (max-width: ${size.tablet}) {
    margin: 1.3rem auto;
    width: 90%;
    display: flex;
    flex-direction: column;
  }
`;
export const InfoSectiontitle = styled.p`
  color: ${(props) => props.theme.colors.darkish};
  font-weight: 500;
  text-align: center;
  font-size: 1.2em;
`;
export const UserInfoContainer = styled.section`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const UserInfo = styled.p`
  font-size: 1.2em;
  padding: 0.4rem;
`;
