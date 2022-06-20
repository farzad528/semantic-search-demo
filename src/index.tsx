import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { mergeStyles } from 'office-ui-fabric-react';
import { initializeIcons } from '@uifabric/icons';

import 'animate.css/animate.css';

initializeIcons();

// Inject some global styles
mergeStyles({
  selectors: {
    ':global(body), :global(html), :global(#app)': {
      margin: 0,
      padding: 0,
      height: '100vh',
      fontFamily: '"SegoeUI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    },
    ':global(p)': {
      margin: 0,
    },
    ':global(*)': {
      boxSizing: 'border-box',
    },
    ':global(html)': {
      overflowY: 'overlay',
    },
    ':global(a)': {
      textDecoration: 'none !important',
    },
    ':global(.learn-more-link)': {
      position: 'absolute',
      top: 20,
      right: 35,
      color: 'white',
      textDecoration: 'underline !important'
    }
  }
});

ReactDOM.render(<App />, document.getElementById('app'));
