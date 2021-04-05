import styled, { css } from 'styled-components';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 36rem;
  padding: 1rem;
  margin-bottom: 3rem;
  border-radius: 5px;
  box-shadow: var(--shadow-light);
`;

interface TextInputProps {
  hasError: boolean;
}

export const TextInput = styled.div<TextInputProps>`
  display: flex;
  flex-direction: column;
  margin-bottom: 0.5rem;

  label {
    color: var(--dark);
    font-size: 1rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }

  input {
    height: 2.5rem;
    padding: 0.5rem 1rem;
    background: var(--grey);
    border: none;
    border-radius: var(--corner-radius);
    outline-color: ${(props) =>
      props.hasError ? 'var(--red)' : 'var(--green)'};

    ${({ hasError }) =>
      hasError &&
      css`
        outline-color: var(--red);
        box-shadow: 0 0 0 2px var(--red);
      `}
  }
`;
