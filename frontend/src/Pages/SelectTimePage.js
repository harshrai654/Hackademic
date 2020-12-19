import React from "react";
import {Row,Col,Button, Divider} from "antd";
import utils from "../utils";
import {Redirect} from "react-router-dom";
import TimeSlots from "../Components/TimeSlots";
import Summary from "../Components/Summary"

class SelectTimePage extends React.Component{
    constructor(props){
        super(props);
        console.log(this.props.location)
        if(this.props.location && this.props.location.state){
            this.state = {
                auth:true,
                slots:[],
                ...this.props.location.state
            }
        }else{
            this.state = {
                auth:true,      //change it to false once dev is complete
                bank: {},
                date: "",
                mobile: "",
                reqId: "",
                slots:[],
                selectedSlot:-1
            }
        }

        this.selectSlot = this.selectSlot.bind(this);
    }

    componentDidMount(){
        //Auth Code for prvs user//
        utils.verifyAuth().then(data=>{
            console.log(data)
            if(data.status){
                this.setState({
                    auth:true
                })
            }else{
                this.setState({
                    auth:false
                })
            }
        })

        utils.getBankSlots({
            lat:this.state.bank.lat,
            lng:this.state.bank.lng,
            date:this.state.date
        }).then(data=>{
            console.log(data)
            this.setState({
                slots:data[0].timeSlots
            })
        })
    }

    selectSlot(index){
        console.log(index)
        this.setState({
            selectedSlot:index
        })
    }

    render(){
        return(
            <div>
                {   
                    this.state.auth ? (
                        <div>
                            <Row gutter={16} justify="space-around">
                                <TimeSlots 
                                    bank={this.state.bank}
                                    date={this.state.date}
                                    mobile={this.state.mobile}
                                    reqId={this.state.reqId}
                                    slots={this.state.slots}
                                    selectSlot={this.selectSlot}
                                    selectedSlot={this.state.selectedSlot}
                                />
                            </Row>
                            {this.state.selectedSlot !== -1 && (this.state.selectedSlot || this.state.selectedSlot === 0 ) && (
                                <Row gutter={16} justify="center">
                                <Col offset={1}> 
                                    <Summary
                                        bank={this.state.bank}
                                        selectedSlot={this.state.selectedSlot}
                                        date={this.state.date}
                                        mobile={this.state.mobile}
                                        slots={this.state.slots}
                                    />
                                    <Divider/>
                                    <Button type="danger" size="large">
                                        Book
                                    </Button>
                                </Col>
                            </Row>
                            )}
                        </div>
                    ):(
                        <Redirect to="/" />
                    )
                }
            </div>
        )
    }
}

export default SelectTimePage;