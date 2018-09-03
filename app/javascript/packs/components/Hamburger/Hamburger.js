import React from 'react';
import styled, { keyframes, css } from 'styled-components';

const bunTop = keyframes`
  10% {
    height: 54px;
  }
  25% {
    height: 70px;
  }
  40% {
    transform: translateY(-40px);
  }
  70% {
    transform: translateY(0);
  }
`;

const bunBottom = keyframes`
  10% {
    height: 20px;
  }
  25% {
    height: 30px;
  }
`;

const figure = keyframes`
  25% {
    transform: translateY(-30px);
  }
  50% {
    transform: translateY(0);
  }
`;

const tomato = keyframes`
  40% {
    transform: rotate(2deg) translateY(-16px);
  }
  50% {
    transform: rotate(-2deg) translateY(-8px);
  }
  70% {
    transform: rotate(0) translateY(0);
  }
`;

const lettuce = keyframes`
  40% {
    transform: rotate(-2deg) translateY(-14px);
  }
  50% {
    transform: rotate(0) translateY(-7px);
  }
  70% {
    transform: rotate(0) translateY(0);
  }
`;

const burger = keyframes`
  40% {
    transform: rotate(-2deg) translateY(-8px);
  }
  50% {
    transform: rotate(2deg) translateY(-4px);
  }
  70% {
    transform: rotate(0) translateY(0);
  }
`;

const face = keyframes`
  25% {
    height: 20px;
  }
  50% {
    height: 26px;
  }
`;

const shadow = keyframes`
  25% {
    width: 80px;
    transform: translate(28px,22px);
  }
  50% {
    width: 126px;
    transform: translate(0,0);
  }
`;

const Main = styled("main")`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 500px;
  height: 100%;
  margin: auto;
  padding: 12px;
`;

const Figure = styled("figure")`
  width: 100%;
  height: auto;
  max-width: 128px;
  animation: ${figure} 1s ease-in-out infinite;
  transform: translateZ(0);
`;

const TopBun = styled("div")`
  position: relative;
  width: 114px;
  height: 70px;
  margin-left: 7px;
  border-top-width: 0;
  animation: ${bunTop} 1s ease-in-out infinite;
  &:before, &:after {
    content: "";
    position: absolute;
    width: 100%;
    background-color: #ff7f07;
    box-shadow: inset rgba(black, 0.1) 21px 0 0;
    z-index: -1;
    box-sizing: border-box;
  }
  &:before {
    top: 0; left: -(7px);
    height: 100%;
    border: 7px solid #701e13;
    border-radius: 100% 100% 0 0;
  }
  &:after {
    bottom: 0; left: -(7px);
    height: 40%;
    border-right: 7px solid #701e13;
    border-left: 7px solid #701e13;
  }
`;

const Face = styled("div")`
  height: 26px;
  animation: ${face} 1s ease-in-out infinite;
`;

const eye = css`
  position: absolute;
  bottom: 20px;
  width: 20%;
  height: 30%;
  background-color: #ff7f07;
  border: 7px solid #701e13;
  border-radius: 100%;
  box-sizing: border-box;
  &:before {
    content: "";
    position: absolute;
    bottom: -7px; left: -7px;
    width: calc(100% + 15px);
    height: calc(50% + 7px);
    background-color: #ff7f07;
  }
`;

const LeftEye = styled("div")`
  ${eye}
  left: 42px;
`;

const RightEye = styled("div")`
  ${eye}
  left: 72px;
`;

const Mouth = styled("div")`
  position: absolute;
  bottom: 14px;
  left: 57px;
  width: 20%;
  height: 30%;
  border-radius: 100%;
  overflow: hidden;
  &:before {
    content: "";
    position: absolute;
    bottom: 0; left: 0;
    width: 100%;
    height: 50%;
    background-color: #701e13;
  }
  &:after {
    content: "";
    position: absolute;
    bottom: -5px;
    left: 6px;
    width: 11px;
    height: 11px;
    background-color: #ff2200;
    border-radius: 100%;
  }
`;

const Seeds = styled("div")`
  position: absolute;
  top: 62px;
  left: 0;
  z-index: 2;
`;

const Seed = styled("div")`
  position: absolute;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 2px 3px 2px;
  border-color: transparent transparent #ffc86d transparent;
  &:after {
    content: "";
    position: absolute;
    top: 2px;
    left: -2px;
    width: 4px;
    height: 3px;
    background-color: #ffc86d;
    border-radius: 100%;
  }
  &:nth-child(1) {
    bottom: 26px;
    left: 10px;
  }
  &:nth-child(2) {
    bottom: 10px;
    left: 16px;
  }
  &:nth-child(3) {
    bottom: 39px;
    left: 27px;
  }
  &:nth-child(4) {
    bottom: 22px;
    left: 32px;
  }
  &:nth-child(5) {
    bottom: 48px;
    left: 46px;
  }
  &:nth-child(6) {
    bottom: 40px;
    left: 62px;
  }
  &:nth-child(7) {
    bottom: 45px;
    left: 78px;
  }
  &:nth-child(8) {
    bottom: 32px;
    left: 96px;
  }
  &:nth-child(9) {
    bottom: 9px;
    left: 45px;
  }
  &:nth-child(10) {
    bottom: 14px;
    left: 84px;
  }
  &:nth-child(11) {
    bottom: 10px;
    left: 102px;
  }
`;

const Tomato = styled("div")`
  position: relative;
  width: 144px;
  height: 24px;
  margin: -7px -8px; 
  background-color: #ff2200;
  border: 7px solid #701e13;
  border-radius: 100px;
  z-index: 3;
  animation: ${tomato} 1s ease-in-out infinite;
  box-sizing: border-box;
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    background-color: rgba(black, 0.1);
    width: 29px;
  }
`;

const Lettuce = styled("div")`
  position: relative;
  width: 140px;
  height: 25px;
  margin: -7px -6px; 
  border-radius: 16px 16px 0 0;
  z-index: 2;
  animation: ${lettuce} 1s ease-in-out infinite;
`;

const Leaf = styled("div")`
  position: absolute;
  top: 0;
  width: 20px;
  height: 30px;
  background-color: #b3ba27;
  border: 7px solid #701e13;
  border-radius: 12px;
  z-index: 1;
  &:nth-child(1) {
    left: 0;
    background-color: #7e911d;
    box-sizing: border-box;
  }
  &:nth-child(2) {
    left: 24px;
    box-sizing: border-box;
    &:after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      background-color: rgba(black, 0.1);
      width: 3px;
      background-color: #7e911d;
      border-radius: 0 0 0 100px;
    }
  }
  &:nth-child(3) {
    left: 48px;
    box-sizing: border-box;
  }
  &:nth-child(4) {
    left: 72px;
    box-sizing: border-box;
  }
  &:nth-child(5) {
    left: 96px;
    box-sizing: border-box;
  }
  &:nth-child(6) {
    left: 120px;
    box-sizing: border-box;
  }
`;

const Cover = styled("div")`
  position: absolute;
  top: -14px;
  left: 7px;
  width: 126px;
  height: 32px;
  background-color: #b3ba27;
  border-top: 7px solid #701e13;
  z-index: 2;
  box-sizing: border-box;
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    background-color: rgba(black, 0.1);
    background-color: #7e911d;
    width: 27px;
    border-radius: 12px 0 0 0;
  }
`;

const Arch = styled("div")`
  position: absolute;
  bottom: -2px;
  width: 18px;
  height: 10px;
  background-color: #edb039;
  border: 7px solid #701e13;
  border-bottom-width: 0;
  border-radius: 100px 100px 0 0;
  &:nth-child(1) {
    left: 6px;
    box-sizing: border-box;
    &:before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      background-color: rgba(black, 0.1);
      width: 100%;
    }
  }
  &:nth-child(2) {
    left: 30px;
    box-sizing: border-box;
  }
  &:nth-child(3) {
    left: 54px;
    box-sizing: border-box;
  }
  &:nth-child(4) {
    left: 78px;
    box-sizing: border-box;
  }
  &:nth-child(5) {
    left: 102px;
    box-sizing: border-box;
  }
`;

const Cheese = styled("div")`
  position: relative;
  width: 128px;
  height: 32px;
  margin-top: -18px;
  background-color: #edb039;
  border: 7px solid #701e13;
  border-top-width: 0;
  box-sizing: border-box;
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    background-color: rgba(black, 0.1);
    width: 21px;
  }
`;

const Burger = styled("div")`
  position: relative;
  width: 144px;
  height: 24px;
  margin: -7px -8px; 
  background-color: #d76817;
  border: 7px solid #701e13;
  border-radius: 100px;
  animation: ${burger} 1s ease-in-out infinite;
  box-sizing: border-box;
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    background-color: rgba(black, 0.1);
    width: 29px;
  }
`;

const Spot = styled("div")`
  position: absolute;
  width: 4px;
  height: 4px;
  border-radius: 100%;
  background-color: #b34b10;
  &:nth-child(1) {
    top: 3px;
    left: 6px;
  }
  &:nth-child(2) {
    top: 4px;
    left: 20px;
    width: 2px;
    height: 2px;
  }
  &:nth-child(3) {
    top: 3px;
    left: 32px;
    width: 3px;
    height: 3px;
  }
  &:nth-child(4) {
    top: 4px;
    left: 46px;
    width: 2px;
    height: 2px;
  }
  &:nth-child(5) {
    top: 5px;
    left: 59px;
    width: 3px;
    height: 3px;
  }
  &:nth-child(6) {
    top: 3px;
    left: 70px;
    width: 2px;
    height: 2px;
  }
  &:nth-child(7) {
    top: 3px;
    left: 78px;
    width: 5px;
    height: 5px;
  }
  &:nth-child(8) {
    top: 2px;
    left: 88px;
    width: 2px;
    height: 2px;
  }
  &:nth-child(9) {
    top: 4px;
    left: 96px;
    width: 3px;
    height: 3px;
  }
  &:nth-child(10) {
    top: 3px;
    left: 106px;
    width: 4px;
    height: 4px;
  }
  &:nth-child(11) {
    top: 3px;
    left: 114px;
    width: 2px;
    height: 2px;
  }
  &:nth-child(12) {
    top: 3px;
    left: 120px;
    width: 4px;
    height: 4px;
  }
`;

const BottomBun = styled("div")`
  position: relative;
  width: 128px;
  height: 30px;
  border-radius: 0 0 20px 20px;
  background-color: #ff7f07;
  border: 7px solid #701e13;
  box-shadow: inset rgba(black, 0.1) 21px 0 0;
  z-index: 2;
  animation: ${bunBottom} 1s ease-in-out infinite;
  box-sizing: border-box;
`;

const Shadow = styled("div")`
  width: 126px;
  height: 14px;
  background-color: #7f6501;
  border-radius: 100px;
  z-index: -1;
  margin-top: -6px;
  margin-left: -6px;
  animation: ${shadow} 1s ease-in-out infinite;
`;

export default () => (
  <Main>
    <Figure>
        <TopBun>
            <Face>
                <LeftEye />
                <RightEye />
                <Mouth />
            </Face>
            <Seeds>
                <Seed />
                <Seed />
                <Seed />
                <Seed />
                <Seed />
                <Seed />
                <Seed />
                <Seed />
                <Seed />
                <Seed />
                <Seed />
            </Seeds>
        </TopBun>
        <Tomato />
        <Lettuce>
            <Leaf />
            <Leaf />
            <Leaf />
            <Leaf />
            <Leaf />
            <Leaf />
            <Cover>
              <Arch />
              <Arch />
              <Arch />
              <Arch />
              <Arch />
            </Cover>
        </Lettuce>
        <Cheese />
        <Burger>
          <Spot />
          <Spot />
          <Spot />
          <Spot />
          <Spot />
          <Spot />
          <Spot />
          <Spot />
          <Spot />
          <Spot />
          <Spot />
          <Spot />
        </Burger>
        <BottomBun />
        <Shadow />
    </Figure>
  </Main>
);
