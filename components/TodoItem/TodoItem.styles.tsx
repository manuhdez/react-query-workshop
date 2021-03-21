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

    &::before {
      position: absolute;
      content: '';
      height: 2px;
      top: 50%;
      background: var(--dark);
      transform: translate(-0.5rem, -50%);
      transition: width 200ms ease-out;
      width: ${({ done }) => (done ? 'calc(100% + 1rem)' : '0')};
    }
  }

  button {
    margin-left: auto;
  }

  &:hover {
    transform: translateY(-3px) scale(1.025);
  }
`;
