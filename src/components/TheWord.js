import React from "react";
import styled from "styled-components";

const TheWord = ({ word }) => {
  console.log(word);
  return (
    <Wrapper>
      {word.revealed.map((ltr) => {
        return (
          <Span key={Math.random() * 10} line={ltr}>
            {ltr}
          </Span>
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.p`
  font-size: 20px;
  font-weight: 700;
  margin: 0 auto;
  display: flex;
`;
const Span = styled.span`
  display: block;
  border-bottom: ${(props) => (props.line ? "none" : "2px solid white")};
  width: 30px;
  margin: 0 3px;
  text-align: center;
`;

export default TheWord;
