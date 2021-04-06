import styled from 'styled-components';

export const Button = styled.button`
  padding: 0.6rem 1rem;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  color: var(--dark);
  background: ${({ theme = 'primary' }) =>
    theme === 'primary' ? 'var(--green)' : 'var(--red)'};

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const RoundedButton = styled(Button)`
  padding: 0.4rem 0.6rem;
  font-size: 0.9rem;
  border-radius: 50%;
  background: var(--grey);
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding-right: 0.8rem;

  &:hover {
    background: var(--darker-grey);
  }
`;
