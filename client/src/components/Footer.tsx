import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { size } from '../DefaultValues/HardCoded';

const FooterWrapper = styled.section`
  width: 100%;
  background-color: #191919;
`;
const FooterContainer = styled.div`
  margin: 0 auto;
  max-width: 1200px;
  width: 75%;
  color: white;
  display: grid;
  padding: 3rem 5rem;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  justify-content: space-around;

  @media (max-width: ${size.mobile}) {
    width: 95%;
  }
`;
const ColumnTitle = styled.p`
  font-size: 1.1rem;
  padding: 0.4rem;
`;
const FooterLink = styled(Link)`
  color: white;
  text-decoration: none;
  padding: 0.2rem;
  font-size: 0.9rem;
  &:hover {
    color: red;
  }
`;
type ColumProps = {
  bgColor?: string;
};
const Column = styled.div<ColumProps>`
  padding: 0 0.5rem;

  display: flex;
  flex-direction: column;
  border-left: 2px solid ${(props) => props.theme.colors.lightBorder};
  position: relative;
  &::after {
    content: '';
    position: absolute;
    height: 30px;
    width: 5px;
    top: 0;
    right: 0;
    left: -1px;
    bottom: 0;
    border-left: 5px solid ${(props) => props.bgColor};
  }
`;
const Footer = () => {
  return (
    <FooterWrapper>
      <FooterContainer>
        <Column bgColor="#00C2E9">
          <ColumnTitle>Company</ColumnTitle>
          <FooterLink to="/">About us</FooterLink>
          <FooterLink to="/">Careers</FooterLink>
          <FooterLink to="/">Pricing</FooterLink>
          <FooterLink to="/">Meet us</FooterLink>
          <FooterLink to="/">Our clients</FooterLink>
          <FooterLink to="/">Press</FooterLink>
        </Column>
        <Column bgColor="#109991">
          <ColumnTitle>Knowledge</ColumnTitle>
          <FooterLink to="/">IT jobs for Juniors</FooterLink>
          <FooterLink to="/">Help Center</FooterLink>
          <FooterLink to="/">IT recruitment guide</FooterLink>
          <FooterLink to="/">Job ad creator</FooterLink>
          <FooterLink to="/">Job ad format</FooterLink>
          <FooterLink to="/">Masterclazz</FooterLink>
        </Column>
        <Column bgColor="#DF5557">
          <ColumnTitle>Resources</ColumnTitle>
          <FooterLink to="/"> Blog</FooterLink>
          <FooterLink to="/">NFJ Insights</FooterLink>
          <FooterLink to="/">Job offers widgets</FooterLink>
          <FooterLink to="/">Store</FooterLink>
          <FooterLink to="/">GDPR</FooterLink>
          <FooterLink to="/">Privacy policy</FooterLink>
          <FooterLink to="/">Terms and conditions</FooterLink>
        </Column>
        <Column bgColor="#9367A5">
          <ColumnTitle>Get in touch</ColumnTitle>
          <FooterLink to="/"> Facebook</FooterLink>
          <FooterLink to="/">Twitter</FooterLink>
          <FooterLink to="/">Instagram</FooterLink>
          <FooterLink to="/">Email us</FooterLink>
          <FooterLink to="/">Subscribe to join</FooterLink>
        </Column>
      </FooterContainer>
    </FooterWrapper>
  );
};

export default Footer;
