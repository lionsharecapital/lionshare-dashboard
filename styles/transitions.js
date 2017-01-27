import { injectGlobal } from 'styled-components';

injectGlobal`
.assetPanel-enter {
  opacity: 0.01;
  transition: opacity 1000ms ease-in;
}
.assetPanel-enter.assetPanel-enter-active {
  opacity: 1;
}

.assetPanel-leave {
  opacity: 1;
  transition: opacity 1000ms ease-in;
}

.assetPanel-leave-active {
  opacity: 0.01;
}
`
