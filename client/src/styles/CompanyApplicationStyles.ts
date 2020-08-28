import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Wrapper = styled.div`
  width: 80%;
  margin: 2.3rem auto;
`;
export const Container = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  border-left: 3px solid ${(props) => props.theme.colors.darkish};
  border-top: 2px solid ${(props) => props.theme.colors.lightGray};
  border-right: 2px solid ${(props) => props.theme.colors.lightGray};
  border-bottom: 2px solid ${(props) => props.theme.colors.lightGray};
  margin-bottom: 3px;
`;
export const NoFeedback = styled.p`
  color: ${(props) => props.theme.colors.darkish};
  padding: 0.4rem;
  font-size: 1.1rem;
  font-weight: 500;
  align-self: center;
`;
export const JobOfferTitle = styled.p`
  color: ${(props) => props.theme.colors.darkish};
  padding: 0.4rem;
  font-size: 1.1rem;
  font-weight: 500;
  align-self: flex-start;
`;
export const PdfLink = styled.a`
  text-decoration: none;
  align-self: flex-start;
  font-size: 1.1rem;
  color: ${(props) => props.theme.colors.darkish};
  position: relative;
  &::before {
    content: '';
    width: 0;
  }
  &:hover {
    color: red;
    &::before {
      background-color: red;
      height: 2px;
      position: absolute;
      bottom: -1px;
      transition: width 0.3s ease-in-out;
      width: 100%;
    }
  }
`;
export const DeleteIcon = styled(FontAwesomeIcon)`
  font-size: 1.4rem;
  cursor: pointer;
  &:hover {
    color: red;
  }
`;
export const LinkContainer = styled.div`
  display: flex;
  padding: 1rem;
  justify-content: space-between;
  align-items: center;
`;
