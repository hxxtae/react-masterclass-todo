import React from 'react';
import ReactDOM from 'react-dom';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components';
import { darkTheme } from './theme';
import Router from './Router';

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <ThemeProvider theme={darkTheme}>
        <Router />
      </ThemeProvider>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root')
);

// ---------------------------------------
// react-masterclass-todo 에서는
// recoil만을 집중적으로 다루는 프로젝트 입니다.
// ---------------------------------------
