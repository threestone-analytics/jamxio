import styled from 'styled-components';

export const Alert = styled.h1`
  font-family: 'Roboto', sans-serif;
  font-style: normal;
  font-weight: 'bold';
  font-size: 15px;
  color: ${props => (props.red ? '#FF5A5F' : '#0000ff')};
  margin: 10px;
  text-decoration: ${props => (props.blue ? 'underline' : 'none')};
  ${props => (props.isOpen === true ? '' : 'visibility: hidden')};
`;
