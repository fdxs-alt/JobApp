import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
export const TitleAndCompanyColumn = styled.div`
  display: flex;
  width: 60%;
  align-items: center;
`;
export const LocalisationColumn = styled.div`
  display: flex;
  width: 40%;
  align-items: center;
  justify-content: flex-end;
`;
export const OfferTitle = styled(Link)`
  text-decoration: none;
  color: ${(props) => props.theme.colors.darkish};
  font-size: 1.1rem;
  font-weight: 500;
  padding: 0 0.4rem;
  &:hover {
    color: red;
  }
`;
export const CompanyInfo = styled.span`
  color: ${(props) => props.theme.colors.secondaryFont};
  font-size: 0.9rem;
  padding: 0 0.4rem;
`;
export const Icon = styled(FontAwesomeIcon)`
  margin-right: 0.5rem;
  font-size: '1.5rem';
`;
export const LocalisationInfo = styled.span`
  padding: 0 2rem;
`;
