import React from "react";
import api from "../api/github-healthfirst";
import { Link } from "react-router-dom";

class ShowMainDirectory extends React.Component {
    state = {dir: [] }

    componentDidMount() {
        this.loadDirectory();
    }

    loadDirectory = async () => {
        const {repo_name} = this.props.match.params;
        const dir = await api.get(`/repos/Mulesoft/${repo_name}/contents`)
        .then(res => {
            return res.data;
        });
        
        this.setState({dir});
    }

    getFileExtension(file) {
        const arr = file.split(".");
        const last = arr.length - 1;
        return arr[last];
    }

    renderFile(child, repo_name) {
        const ext = this.getFileExtension(child.name);
        let link = { 
            pathname: `/repos/contents/${repo_name}/${child.sha}`
         };
        switch (ext) {
            case "xml":
                link.state = {ext: "xml"};
                return (
                    <li key={child.sha}><Link to={link}> XML: {child.name}</Link></li>
                    );
            case "json":
                link.state = {ext: "json"};
                return (
                    <li key={child.sha}><Link to={link}> JSON: {child.name}</Link></li>
                    );
            default:
                link.state = {ext: "any"};
                return (
                    <li key={child.sha}><Link to={link}>FILE: {child.name}</Link></li>
                    );  
        }
    }

    renderDir(child, repo_name) {
        return <li key={child.sha}><Link to={`/repos/${repo_name}/dir/${child.sha}`}>DIR: {child.name}</Link></li>
    }

    renderList() {

        return this.state.dir.map(child => {
            const {repo_name} = this.props.match.params;

            switch (child.type) {
                case "file":
                    return this.renderFile(child, repo_name);
                case "dir":
                    return this.renderDir(child, repo_name);
                default:
                    return <li key={child.sha}>ANY: {child.name}</li>
            }
        });
    }

    render() {
        if (this.state.dir.length <= 0) {
            return (
                <div>
                    <h1>Loading...</h1>
                </div>
            )
        } else {
            return (
                <div>
                    <h1>in main dir</h1>
                    <ul>
                        {this.renderList()}
                    </ul>
                </div>
            );
        }
    }
}

export default ShowMainDirectory;