import React from 'react';
import uuid from 'react-uuid';


const Flow = (props) => {
    console.log(props.connectors);
    return (
        <div>
            <h3>{props.name}</h3>
            <ul>
                {props.connectors.map(connector => <li key={uuid()}>{connector.name} - {connector.attributes['doc:name']}</li>)}
            </ul>
        </div>
    )
}

export default Flow;