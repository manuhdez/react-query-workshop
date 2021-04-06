import styled from 'styled-components';
import Checkbox from 'styles/Checkbox';

interface ItemProps {
  done: boolean;
}

export const Item = styled.li<ItemProps>`
  display: flex;
  align-items: center;
  padding: 0.6rem 1rem;
  margin-bottom: 1rem;
  border-radius: var(--corner-radius);
  box-shadow: var(--shadow-light);
  transition: transform 200ms ease-out;

  ${Checkbox} {
    margin-right: 1.5rem;
  }

  p {
    text-decoration: ${({ done }) => (done ? 'line-through' : 'none')};
  }

  input[type='text'] {
    width: 70%;
    appearance: none;
    border: none;
    outline: none;
    color: rgba(0, 0, 0, 0.5);
  }

  p,
  input[type='text'] {
    display: flex;
    align-items: center;
    font-size: 1rem;
    line-height: 1rem;
    letter-spacing: 1;
    height: 1.3rem;
    padding: 0;
    margin: 0;
    margin-right: auto;
  }

  button {
    margin-left: 1rem;
  }

  &:hover {
    transform: translateY(-3px) scale(1.025);
  }
`;
