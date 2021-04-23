import React from "react";
import api from "../api/github-healthfirst";
import { Link } from "react-router-dom";

class ShowSubDirectory extends React.Component {
    state = {sha: "", tree: []}

    componentDidMount() {
        this.loadData();
    }

    componentDidUpdate() {
        if (this.props.match.params.tree_sha !== this.state.sha) {
            this.loadData();
        }
    }

    loadData = async () => {
        const {repo_name, tree_sha} = this.props.match.params;
        const data = await api.get(`/repos/Mulesoft/${repo_name}/git/trees/${tree_sha}`)
            .then(res => {
                return res.data
            });
        this.setState({sha: data.sha, tree: data.tree});
    };

    getFileExtension(file) {
        const arr = file.split(".");
        const last = arr.length - 1;
        return arr[last];
    }

    renderFile(child, repo_name) {
        const ext = this.getFileExtension(child.path);
        let link = { 
            pathname: `/repos/contents/${repo_name}/${child.sha}`
         };
        switch (ext) {
            case "xml":
                link.state = {ext: "xml"};
                return (
                    <li key={child.sha}><Link to={link}> XML: {child.path}</Link></li>
                    );

            case "json":
                link.state = {ext: "json"};
                return (
                    <li key={child.sha}><Link to={link}> JSON: {child.path}</Link></li>
                    );
            default:
                link.state = {ext: "any"};
                return (
                    <li key={child.sha}><Link to={link}>FILE: {child.path}</Link></li>
                    );  
        }
    }

    renderDir(child, repo_name) {
        return <li key={child.sha}><Link to={`/repos/${repo_name}/dir/${child.sha}`}>DIR: {child.path}</Link></li>
    }

    renderList() {
        return this.state.tree.map(child => {
            const {repo_name} = this.props.match.params;
            switch (child.type) {
                case "blob":
                    return this.renderFile(child, repo_name);
                case "tree":
                    return this.renderDir(child, repo_name);
                default:
                    return <li key={child.sha}>ANY: {child.path}</li>
            }
        });
    }

    render() {
        if (this.state.sha === "") {
            return (
                <div>
                    <h1>Loading...</h1>
                </div>
            )
        } else {
            return (
                <div>
                    <h1>In Sub Dir</h1>
                    <ul>
                        {this.renderList()}
                    </ul>
                </div>
            );
        }
    }
}

export default ShowSubDirectory;