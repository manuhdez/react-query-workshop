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
    position: relative;
    margin: 0;
    line-height: 1rem;
    text-decoration: ${({ done }) => (done ? 'line-through' : 'none')};
  }

  p,
  input[type='text'] {
    margin-right: auto;
  }

  button {
    margin-left: 1rem;
  }

  &:hover {
    transform: translateY(-3px) scale(1.025);
  }
`;
