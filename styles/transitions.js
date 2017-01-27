import { injectGlobal } from 'styled-components';

injectGlobal`
.assetPanel-enter {
  opacity: 0.01;
  transition: opacity 3000ms;
}
.assetPanel-enter.assetPanel-enter-active {
}

.assetPanel-leave {
  opacity: 1;
  transition: opacity 3000ms;
}

.assetPanel-leave-active {
  opacity: 0.01;
}
`
