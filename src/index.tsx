import React from 'react';
import ReactDOM from 'react-dom';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { darkTheme } from './theme';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <ThemeProvider theme={darkTheme}>
        <BrowserRouter>
          <Switch>
            <Route path={`${process.env.PUBLIC_URL}/`} >
              <App />
            </Route>
          </Switch>
        </BrowserRouter>
      </ThemeProvider>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root')
);

// ---------------------------------------
// react-masterclass-todo 에서는
// recoil만을 집중적으로 다루는 프로젝트 입니다.
// ---------------------------------------
