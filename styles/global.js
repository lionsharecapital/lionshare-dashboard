import { injectGlobal } from 'styled-components';

injectGlobal`
* { box-sizing: border-box }

::-webkit-scrollbar {
  display: none;
}

html, body, #__next {
  height: 100%;
  cursor: default;
}

body {
  font-family: monospace;
  font-weight: 500;
  font-size: 20px;
  -webkit-font-smoothing: antialiased;
  line-height: 1.5;
  color: #fff;
  background-color: #000;
}

a {
  color: $white;
}

input:focus {
  outline:none;
}

/* Remove spinners from input[type=number] */
input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

*[role=button] {
  cursor: pointer;
}
`;
