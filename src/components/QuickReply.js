import React from 'react'
// import 'materialize-css/dist/css/materialize.min.css';
const QuickReply = (props) => {

    if(props.reply.structValue.fields.payload){
        return (
            <a href="#" style={{margin: 3, color: '#000'}} class="btn-floating btn-large waves-effect waves-light red"
                onClick={(event) =>
                props.click(
                    event,
                    props.reply.structValue.fields.payload.stringValue,
                    props.reply.structValue.fields.text.stringValue
                )
                }
            >
                {props.reply.structValue.fields.text.stringValue}
            </a>
        )
    }else{
        return (
            <a style={{margin: 3, color: '#000'}} href={props.reply.structValue.fields.link.stringValue}
            class="btn-floating btn-large waves-effect waves-light red">
                {props.reply.structValue.fields.text.stringValue}
            </a>
        )
    }

    
}

export default QuickReply
