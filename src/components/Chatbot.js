import React, { Component } from 'react'
import axios from 'axios/index'
import Message from './Message';
import Cookies from 'universal-cookie'
// import {withRoute} from 'react-router-dom'
import {v4 as uuid} from 'uuid'
import Card from './Card'
import QuickReplies from './QuickReplies';
// import 'materialize-css/dist/css/materialize.min.css';
const cookies = new Cookies()
class Chatbot extends Component {
    messagesEnd;    
    talkInput;

    constructor(props) {
        super(props);
        // this binding is necessary to make `this` work in the callback
        this._handleKeyPress = this._handleKeyPress.bind(this)
        this._handleQuickReplyPayload = this._handleQuickReplyPayload.bind(this)
        this.hide = this.hide.bind(this)
        this.show = this.show.bind(this)
        this.state ={
            messages:[],
            showBot: true,
            shopWelcomeSent: false
        }

        if(cookies.get('userID') === undefined){
            cookies.set('userID',uuid(), {path: '/'})
        }
    }
    async df_text_query(queryText){
        let says = {
            speaks: 'me',
            msg: {
                text: {
                    text: queryText
                }
            }
        }
        this.setState({messages: [...this.state.messages, says]});
        // const data = {text: queryText, userID: cookies.get('userID')}
        //  fetch('https://salty-meadow-27239.herokuapp.com/api/df_text_query', {
        //     method: 'POST',
        //     body: JSON.stringify(data),
        //     headers: {
        //         'Content-Type': 'application/json'
              
        //       },
        //       mode: 'no-cors', 
        //     cache: 'no-cache',
        //  })
        //     .then(response => {
        //         console.log(response)
        //         response.json()
        //     })
        //     .then(data => {
        //         if(data){
        //             for(let msg of data.data.fulfillmentMessages){
        //                 console.log(JSON.stringify(msg))
        //                 says = {
        //                     speaks: 'bot',
        //                     msg: msg
        //                 }
        //                 this.setState({messages: [...this.state.messages, says]});
        //             }
        //         }
                
        //     })
        //     .catch(error=> console.log(error))
          
        const res = await axios.post('https://ecommer-thanhttri.herokuapp.com/api/df_text_query',{text: queryText, userID: cookies.get('userID')})
        for(let msg of res.data.fulfillmentMessages){
            console.log(JSON.stringify(msg))
            says = {
                speaks: 'bot',
                msg: msg
            }
            this.setState({messages: [...this.state.messages, says]});
        }

    }
    async df_event_query(eventName){
        const res = await axios.post('https://ecommer-thanhttri.herokuapp.com/api/df_event_query', {event: eventName, userID: cookies.get('userID') });
    
        for(let msg of res.data.fulfillmentMessages){
            let says = {
                speaks: 'bot',
                msg: msg
            }
            this.setState({messages: [...this.state.messages, says]});
            
        }
    }

    resolveAfterXaSeconds(x){
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(x);
            },x * 1000)
        })
    }
    
   async componentDidMount() {
        this.df_event_query('Welcome');
        if(window.location.pathname === '/shop' && !this.state.shopWelcomeSent){
            await this.resolveAfterXaSeconds(1)
            this.df_event_query('WELCOME_SHOP')
            this.setState({shopWelcomeSent: true, showBot: true})
        }

        this.props.history?.listen(()=> {
            console.log('listening')
            if(this.props.history.location.pathname === '/shop' && !this.state.shopWelcomeSent){ 
                this.df_event_query('WELCOME_SHOP')
                this.setState({shopWelcomeSent: true, showBot: true})
            }
        })

        
    }

    show(event) {
        event.preventDefault();
        this.setState({showBot: true})
    }
    hide(event) {
        event.preventDefault();

        this.setState({showBot: false})
    }

    componentDidUpdate() {
        this.messagesEnd.scrollIntoView({behavior: 'smooth'});
        if(this.talkInput){
            this.talkInput.focus()

        }
    }

    _handleQuickReplyPayload(event, payload, text){
        event.preventDefault();
        event.stopPropagation();

        // this.df_text_query(text)
        switch (payload){
            case 'recommended_yes':
                this.df_text_query('SHOW_RECOMMENDATIONS')
                break;
            case 'training_masterclass':
                this.df_event_query("MASTERCLASS")
                break;
            default:
                this.df_event_query(text)
                break;
        }
    }
    
    renderCards(cards){
        return cards.map((card, i) => <Card key={i} payload={card.structValue}></Card>)
    }
    
    renderOneMessage(messages, i){
        // console.log(messages?.payload?.fields?.cards?.listValue?.values)
        // console.log(messages, 'messages')
        if(messages.msg && messages.msg.text && messages.msg.text.text){
            console.log(messages.msg, 'messages.msg.payload.quick_replies')
            return <Message key={i} speaks={messages} text={messages.msg.text.text} />
        }else if(messages.msg && messages.msg.payload.fields.cards?.listValue.values){
            console.log(messages.msg.payload.fields.cards, 'success')
            return <div key={i}> 
                <div className="card-pannel grey lighten-5 z-depth-1">
                    <div style={{overflow: 'hidden'}}>
                        <div className="col s2">
                            <a className="btn-floating btn-large waves-effect waves-light red">{messages.speaks}</a>
                        </div>
                        <div style={{overflow: 'auto', overflowY: 'scroll'}}>
                            <div style={{height:300,width:messages.msg.payload.fields.cards.listValue.values.length * 270}}>
                                {this.renderCards(messages.msg.payload.fields.cards.listValue.values)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        } else if(messages.msg &&
                messages.msg.payload && 
                messages.msg.payload.fields && 
                messages.msg.payload.quick_replies
            
            ){
                
                return <QuickReplies 
                        text={messages.msg.payload.fields.text ? messages.msg.payload.fields.text : null}
                        key={i}
                        replyClick={this._handleQuickReplyPayload}
                        speaks={messages.speaks}
                        payload={messages.msg.payload.fields.quick_replies.listValue.values}
                    />
        }
    }

    renderMessages(stateMessage){
        if(stateMessage){
            return stateMessage.map((messages, i )=>{
                return this.renderOneMessage(messages, i)
            })
        }else{
            return null;
        }
    }

    _handleKeyPress(e){
        if(e.key === "Enter"){
            this.df_text_query(e.target.value);
            e.target.value = '';
        }
    }

    render(){
       if(this.state.showBot){
        return (
            <div style={{height: 500, width:400, position: 'fixed', bottom: 0, right:0, border: '1px solid lightgrey'}}>
                <nav>
                    <div className="nav-wrapper" style={{background: 'hsl(22, 31%, 52%)', display: 'flex', justifyContent: 'space-between', padding:'9px 16px', borderRadius: '3px'}}>
                        <a className="brand-logo" style={{color: '#fff'}}>
                            ChatBot
                        </a>
                        <ul id="nav-mobile" className="right hide-on-med-and-down">
                            <li><a href="/" onClick={this.hide} style={{color: '#fff'}}>Close</a></li>
                        </ul>
                    </div>
                </nav>
               <div id='chatbot' style={{height: 388, width: '100%', overflow: 'auto' , background: 'white', color: 'black', padding:'0 10px'}}>
                    {/* <h2 style={{padding:'9px 16px'}}>Chatbot</h2>    */}
                    {this.renderMessages(this.state.messages)}
                    <div ref={(el) =>{this.messagesEnd =el; }}
                    style={{float:'left', clear:"both"}}>

                    </div>
               </div>
               <div className="col s12">

               <input style={{outline: 'none', borderRadius: '3px',margin:0, paddingLeft: '1%', paddingRight: '1%', width: '100%', background: 'white', border: '1px solid #000', padding:'13px 4px'}} placeholder="type a message:" ref={(input) =>{this.talkInput = input}} type="text" onKeyPress={this._handleKeyPress}/>
               </div>

            </div>
        )
       }else {
        return (
            <div style={{height: 40, width:400, position: 'fixed', bottom: 0, right:0, border: '1px solid lightgrey'}}>
                <nav>
                    <div className="nav-wrapper" style={{background: '#fff', display: 'flex', justifyContent: 'space-between', padding:'9px 16px', border: '1px solid #ccc'}}>
                        <a className="brand-logo" style={{color: '#000'}}>
                            ChatBot
                        </a>
                        <ul id="nav-mobile" className="right hide-on-med-and-down">
                            <li><a href="/" onClick={this.show} style={{color: '#000'}}>Show</a></li>
                        </ul>
                    </div>
                </nav>
                <div ref={(el) => {this.messagesEnd = el;}}
                    style={{float: 'left', clear:'both'}}
                >

                </div>
            </div>
        )
       }
    }
}

export default Chatbot
