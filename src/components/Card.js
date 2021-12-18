import React from 'react'
// import 'materialize-css/dist/css/materialize.min.css';
const Card = (props) => {
    return (
        <div style={{width: 270, padding: '10px 10px'}}>
            <div class="card">
                <div class="card-image" style={{width:'100%'}}>
                <img src={props.payload.fields.image.stringValue} alt={props.payload.fields.header.stringValue} style={{width: '100%'}}/>
                <span class="card-title">{props.payload.fields.header.stringValue}</span>
                </div>
                <div class="card-content">
                    {props.payload.fields.description.stringValue}
                    <p><a href="#">{props.payload.fields.price.stringValue}</a></p>
                </div>
                <div class="card-action">
                <a href={props.payload.fields.link.stringValue} target="_blank">GET NOW</a>
                </div>
            </div>
                
        </div>
    )
}

export default Card
