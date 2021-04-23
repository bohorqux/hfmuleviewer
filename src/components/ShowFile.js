import React from "react";
import api from "../api/github-healthfirst";
import XMLParser from "react-xml-parser";
import ReactJson from 'react-json-view';
import uuid from "react-uuid";

import Flows from "./Flows";

class ShowFile extends React.Component {
    state = {contents: ""};

    componentDidMount() {
        /* (async () => {
            const repoContents = await api.get(`repos/Mulesoft/${this.props.match.params.repo}/contents/${this.props.match.params.file}`, {
                "Content-Type": "application/xml; charset=utf-8",
                params: {ref: "develop"}
            }).then(res => {
                return res.data;
            });
            var xml = new XMLParser().parseFromString(repoContents);
            this.setState({contents: xml});
            console.log(this.state.contents);
        })(); */
        this.loadContents();
    }

    loadContents = async () => {
        const {repo_name, file} = this.props.match.params;
        const contents = await api.get(`repos/Mulesoft/${repo_name}/git/blobs/${file}`)
                .then(res => { return res.data});

        this.setState({contents})
    }

    renderFile(ext) {
        const {contents} = this.state;

        switch (ext) {
            case "xml":
               const xml = new XMLParser().parseFromString(contents);
               return <Flows xml={xml} />;
            case "json":
                return <ReactJson src={contents} />
            default:
                return contents;
        }
    }

    render() {
        if (this.state.contents.status === "") {
            return (
                <div>
                    <h1>Nothing yet...</h1>
                </div>
            );
        } else {
            return (
                <div>
                    <div>
{/*                         {this.state.contents.children.map(child => <h3 key={uuid()}>{child.name} - {child.attributes.name}</h3>)}
 */}                    
                    {this.renderFile(this.props.location.state.ext)}
                    </div>
                </div>
            )
        }
    }

}

export default ShowFile;