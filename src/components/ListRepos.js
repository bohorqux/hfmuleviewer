import React from "react";
import api from "../api/github-healthfirst";
import { Link } from "react-router-dom";
import uuid from 'react-uuid';

class ListRepos extends React.Component {
    state = {repos: [] };

    componentDidMount() {
        this.loadRepos();
    }

    loadRepos = async () => {
        const repos = await this.getRepos();
        this.setState({repos});
    }

    /* getEntireRepoList = async (pageNo=1) => {
        const results = await this.getRepos(pageNo);
        if (results.length > 0 && pageNo < 3) {
            return results.concat(await this.getEntireRepoList(pageNo + 1));
        } else {
            return results;
        }
    }; */

    getRepos = async () => {
        /* var apiResults = await api.get("/orgs/Mulesoft/repos", {
            params: {page: {pageNo}, per_page: "100"}
        }).then(res => {
            return res.data;
        }); */
        const repos = await api.get("/orgs/Mulesoft/repos").then(res => { return res.data });
        return repos;
    }

    render() {
        if (this.state.repos.length <= 0) {
            return (
                <div>
                    <h1>Loading List...</h1>
                </div>
            );
        } else {
            return (
                <div>
                    <h1>Repos</h1>
                    <ul>
                        {this.state.repos.map(repo => <li key={uuid()}><Link to={`/repos/${repo.name}`}>{repo.name}</Link></li>)}
                    </ul>
                </div>
            );
        }
    }
}

export default ListRepos;