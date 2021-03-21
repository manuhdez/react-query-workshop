import styled from 'styled-components';

export const ListContainer = styled.section`
  padding: 1rem;
  border-radius: var(--corner-radius);
  box-shadow: var(--shadow-light);

  h1 {
    margin-top: 0.5rem;
    font-size: 2rem;
    font-weight: bold;
  }
`;

export const List = styled.ul`
  list-style: none;
  padding: 0;
`;
