import React from 'react';
import styled from 'styled-components';

const Card: React.FC = ({ children }) => <StyledCard>{children}</StyledCard>;

const StyledCard = styled.div`
  background-color: #1f1f2b; //${(props) => props.theme.color.grey[800]};
  color: #9090ff !important;
  display: flex;
  flex: 1;
  flex-direction: column;
`;

export default Card;
