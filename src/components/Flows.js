import React from 'react';
import XMLViewer from 'react-xml-viewer';
import Flow from "./Flow";
import uuid from 'react-uuid';

class Flows extends React.Component {

    render() {
        if (this.props.xml === undefined) {
            return (
                <div>
                    <h1>Loading...</h1>
                </div>
            )
        } else {
            const flows = this.props.xml.getElementsByTagName("flow");
            return  (
                <div>
                    {flows.map(flow => <Flow key={uuid()} name={flow.attributes.name} connectors={flow.children} />)}
                </div>
            )
        }
    }
}

export default Flows;