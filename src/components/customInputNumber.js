import React, { Component } from 'react';
import '../css/customInputNumber.css';


class CustomInputNumber extends Component {
    constructor(props) {
        super(props);
        this.state = {
            target:{
                value: props.value,
                name: props.name,
                step: props.step,
            },
            interval:null
        }
    }
    accumulate(){
        this.add();
        this.state.interval = setInterval(()=>{
            this.add();
        },800);
        document.body.addEventListener('mouseup',()=>{
            this.clearInterval();
        }, { once: true })
    }
    clearInterval(){
        clearInterval(this.state.interval);
        this.state.interval = null;
        this.nameInput.focus();
    }
    add() {
        if(this.props.disabled||this.state.target.value>=this.props.max){
            this.clearInterval();
        }else{
            if((this.state.target.value+this.state.target.step)>this.props.max){
                this.state.target.value=this.props.max;
            }else{
                this.state.target.value=this.state.target.value+this.state.target.step;
            }
            this.props.onChange(this.state);
        }
    }
    cumulative(){
        this.cut();
        this.state.interval = setInterval(()=>{
            this.cut();
        },800);
        document.body.addEventListener('mouseup',()=>{
            this.clearInterval();
        }, { once: true })
    }
    cut() {
        if(this.state.target.value>this.props.min){
            if((this.state.target.value-this.state.target.step)<this.props.min){
                this.state.target.value = this.props.min;
            }else{
                this.state.target.value=this.state.target.value-this.state.target.step;
            }
            this.props.onChange(this.state);
        }else{
            this.clearInterval();
        }
    }
    cahnge() {
        this.props.onChange(this.state);
    }
    blur(event) {
        if(!event.currentTarget.contains(event.relatedTarget)){
            this.props.onBlur(this.state);
        }
    }
    render() {
        return (
            <div className="customInput-container" tabIndex="-1" onBlur ={this.blur.bind(this)} >
                {(this.state.target.value <= this.props.min||this.props.disabled) ?
                    <div className="customInput-item customInput-button disabled">–</div> :
                    <div className="customInput-item customInput-button" 
                        onMouseDown={this.cumulative.bind(this) }>–</div>}
                <input type="text" 
                        disabled={this.props.disabled}
                        ref={(input) => { this.nameInput = input; }} 
                        value={this.state.target.value} 
                        className="customInput-item customInput-text"
                        onChange={this.cahnge.bind(this)} />
                {(this.state.target.value >= this.props.max||this.props.disabled) ?
                    <div className="customInput-item customInput-button disabled">+</div> :
                    <div className="customInput-item customInput-button" 
                        onMouseDown={this.accumulate.bind(this)}>+</div>}
            </div>
        );
    }
}

export default CustomInputNumber;