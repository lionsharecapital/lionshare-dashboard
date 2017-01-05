import { injectGlobal } from 'styled-components';

injectGlobal`
@font-face {
  font-family: 'San Francisco Mono';
  src: url('/static/fonts/SFMono-Light.otf') format('opentype');
  font-weight: 300;
}

@font-face {
  font-family: 'San Francisco Mono';
  src: url('/static/fonts/SFMono-Regular.otf') format('opentype');
  font-weight: 400;
}

@font-face {
  font-family: 'San Francisco Mono';
  src: url('/static/fonts/SFMono-Medium.otf') format('opentype');
  font-weight: 500;
}

@font-face {
  font-family: 'San Francisco Mono';
  src: url('/static/fonts/SFMono-Semibold.otf') format('opentype');
  font-weight: 600;
}

@font-face {
  font-family: 'San Francisco Mono';
  src: url('/static/fonts/SFMono-Bold.otf') format('opentype');
  font-weight: 700;
}

@font-face {
  font-family: 'San Francisco Mono';
  src: url('/static/fonts/SFMono-Heavy.otf') format('opentype');
  font-weight: 800;
}
`;
