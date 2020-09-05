import React from 'react';
import {
  FooterWrapper,
  FooterContainer,
  ColumnTitle,
  FooterLink,
  Column,
} from '../styles/FooterStyles';

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
