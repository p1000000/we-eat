import React from "react";
import PropTypes from "prop-types";
import styled from 'styled-components';

import hero from "../images/hero.jpg";

const StyledHero = styled("div")`
  position: relative;
  height: 350px;
`;

const Image = styled("img")`
  height: 100%;
  width: 100%;
  object-fit: cover;
`;

const Title = styled("div")`
  font-family: 'vegan';
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  font-size: 100px;
  text-shadow: 0px 10px 60px #fff;
`;

const Hero = ({ children }) => (
  <StyledHero>
    <Image src={hero} />
    <Title>
      WeEat
    </Title>
    {children}
  </StyledHero>
);

Hero.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

Hero.defaultProps = {
  children: null
};

export default Hero;
