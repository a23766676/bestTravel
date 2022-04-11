import React, { Component } from 'react';
import '../css/roomAllocation.css';
import CustomInputNumber from './CustomInputNumber'


class RoomAllocation extends Component {
   constructor(props) {
        super(props);
        this.state = {
            guestList:[],
            available:0
        }
        let initNum=1;
        let available=props.guest;
        for(let i=0;i<props.room;i++){
            this.state.guestList.push({
                adult:initNum,
                child:0
            })
            available=available-initNum;
        }
        this.state.available=available;
  }
  change(event,index,type){
    this.setState((state,props) => {
        state.guestList[index][type]=event.target.value;
        let sum=0;
        state.guestList.forEach(function(element) {
            sum+=element.child;
            sum+=element.adult;
        });
        state.available=props.guest - sum;
        return state;
      })
    this.props.onChange(this.state.guestList);
  }
  blur(event){
        // console.log(event );
  }
  render() {
    return (
		<div  className='container'>
            <div className='title'> 住宿人數：{this.props.guest}人/{this.props.room}房</div>
            <div className='available-container'>尚未分配人數：{this.state.available}人</div>
            {this.state.guestList.map(function(list,index){return <div className='room-container' key={'guest'+index}>
                        <div className='title'>房間：{list.adult+list.child}人</div>
                        <div className='item'>
                            <div className='subtitle-container'>
                                <span className='subtitle'>大人</span>
                                <span className='note'>年齡 20+</span>
                            </div>
                            <div>
                                <CustomInputNumber 
                                min={1}
                                max={this.state.available===0 ? 0 : (4-list.child)}
                                step={1} 
                                name={'adult'}
                                disabled={(this.props.guest===this.props.room)}
                                value={list.adult}
                                onChange={Event=>this.change(Event,index,'adult')}
                                onBlur={Event=>this.blur(Event)}/>
                            </div>
                        </div>
                        <div className='item'>
                            <div className='subtitle'>
                                小孩
                            </div>
                            <div>
                                <CustomInputNumber 
                                min={0}
                                max={this.state.available===0 ? 0 : (4-list.adult)}
                                step={1} 
                                name={'child'}
                                value={list.child}
                                disabled={(this.props.guest===this.props.room)}
                                onChange={Event=>this.change(Event,index,'child')}
                                onBlur={Event=>this.blur(Event)}/>
                            </div>
                        </div>
                    </div>}.bind(this))}
		</div>
    );
  }
}

export default RoomAllocation;