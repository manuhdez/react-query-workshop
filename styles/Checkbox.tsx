import styled from 'styled-components';

export default styled.input.attrs({ type: 'checkbox' })`
  --size: 1.25rem;

  /* appearance: none; */
  width: var(--size);
  height: var(--size);
  border: 2px solid var(--purple);
  border-radius: var(--rounded);
  outline: none;

  :checked {
    background: var(--green);
    animation: change 200ms ease-out;
  }

  @keyframes change {
    0% {
      transform: scale(1);
    }

    33% {
      transform: scale(1.1);
    }

    66% {
      transform: scale(0.9);
    }

    100% {
      transform: scale(1);
    }
  }
`;
