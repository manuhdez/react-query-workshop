import styled from 'styled-components';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 20rem;
  padding: 1rem;
  margin-bottom: 2rem;
  border-radius: 5px;
  box-shadow: var(--shadow-light);
`;

export const TextInput = styled.div`
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
    height: 2rem;
    padding: 0.5rem 1rem;
    background: var(--grey);
    border: none;
    border-radius: var(--corner-radius);
    outline-color: var(--purple);
  }
`;
