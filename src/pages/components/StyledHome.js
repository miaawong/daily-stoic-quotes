import React from "react";
import styled, { keyframes } from "styled-components";

export const Main = styled.main`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 80%;
  margin: 0 auto;
`;

const fadein = keyframes`
0% { 
  opacity: 0;
}
100% { 
  opacity: 1;
}
`;

export const Quote = styled.div`
  width: 70%;
  margin: 0 auto;
  animation: 2s ${fadein} ease-in;

  .new-quote {
    animation: 2s ${fadein} ease-in;
  }
`;

export const Button = styled.button`
  border-radius: 6px;
  padding: 15px;
  font-size: 16px;
  width: 7rem;
  background-color: #525252;
  color: #fff;
  border: none;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
