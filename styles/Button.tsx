import styled from 'styled-components';

export const Button = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  color: var(--dark);
  background: ${({ theme = 'primary' }) =>
    theme === 'primary' ? 'var(--green)' : 'var(--red)'};
`;
