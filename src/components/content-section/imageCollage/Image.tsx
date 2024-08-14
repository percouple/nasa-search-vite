import React from "react";
import styled from "styled-components";

const StyledImg = styled.img`
  max-height: 200px;
  cursor: pointer;
  animation: fade-in;
  border-radius: 5px;
`;

export default function Image({ item }) {
  return (
      <StyledImg src={item.links[0].href} alt={item.data[0].title}></StyledImg>
  );
}
