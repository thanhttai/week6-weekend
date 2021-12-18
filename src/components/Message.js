import React from 'react'
// import robot from '../assets/robot.jpg'
const Message = (props) => {
    return (
        <div className="col s12 m8 offset-m2 offset-l3">
            <div className="card-panel grey lighten-5 z-depth-1">
                <div className="row valign-wrapper">
                    {props.speaks === 'bot' && 
                    <div className="col s2" style={{display: 'flex', padding: '0 10px'}}>
                        <img alt="" src="https://upload.wikimedia.org/wikipedia/en/thumb/b/bd/Doraemon_character.png/220px-Doraemon_character.png" style={{width: '100px', height: '100px'}}/>
                        <a href="#" className="btn-floating btn-large waves-effect waves-light red">{props.speaks}</a>
                    </div>
                    }
                    <div className="col s10">
                        <span className="black-text">
                            {props.text}
                        </span>
                    </div>
                    {props.speaks === 'me' && 
                    <div className="col s2">
                        <a href="#" className="btn-floating btn-large waves-effect waves-light red">{props.speaks}</a>
                    </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Message
