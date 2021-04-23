import React from 'react';
import history from "../history";

import Home from "./Home";
import ListRepos from "./ListRepos";
import ShowFile from "./ShowFile";
import ShowMainDirectory from "./ShowMainDirectory";
import ShowSubDirectory from "./ShowSubDirectory";

import {Router, Route, Switch} from "react-router-dom";

class App extends React.Component {

  /* state = {apiResponse: ""};
  
  callAPI() {
    fetch("http://localhost:9000/testAPI")
      .then(res => res.text())
      .then(res => this.setState({apiResponse: res}));
  }

  componentDidMount() {
    this.callAPI();
  } */

  render() {
    return (
      <div className="ui container">
        <Router history={history}>
          <div>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/repos" exact component={ListRepos} />
              <Route path="/repos/:repo_name" exact component={ShowMainDirectory} />
              <Route path="/repos/contents/:repo_name/:file" exact component={ShowFile}/>
              <Route path="/repos/:repo_name/dir/:tree_sha" exact component={ShowSubDirectory} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;