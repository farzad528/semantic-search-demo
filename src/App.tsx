import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { SearchView } from './SearchView';
import UIStateStoreProvider from './Stores/UIStateStore';

import { WelcomeView } from './WelcomeView';
import background from './Assets/background.svg';

const wrapperStyle = {
  height: "100%",
  backgroundImage: `url(${background})`,
  backgroundSize: 'cover'
}

const learnMoreLink = "https://docs.microsoft.com/en-us/azure/search/semantic-search-overview";

export const App: React.FunctionComponent = () => {
  return (
    <Router>
      <UIStateStoreProvider>
        <Switch>
          <Route exact path="/">
            <div style={wrapperStyle}>
              <WelcomeView />
            </div>
          </Route>
          <Route exact path="/search">
            <SearchView />
          </Route>
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </UIStateStoreProvider>
      <a className="learn-more-link" href={learnMoreLink} target="_blank">Learn more about Semantic Search</a>
    </Router>
  );
};
