import React from 'react';
import Terminal from './components/Terminal';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import theme from './styles/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <div className="App">
        <Terminal />
      </div>
    </ThemeProvider>
  );
}

export default App;
