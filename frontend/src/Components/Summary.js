import React from "react";
import {Descriptions,Alert} from "antd";
import {EnvironmentTwoTone} from "@ant-design/icons";
import DescriptionsItem from "antd/lib/descriptions/Item";

const Summary = function(props){
    const formDate = `${props.date.getDate()} / ${props.date.getMonth()+1} /${props.date.getFullYear()}`;
    let slotBooked = props.slots[props.selectedSlot];
    return(
        <Descriptions title="Summary" bordered>
            <Descriptions.Item label="Bank">{props.bank.name}</Descriptions.Item>
            <Descriptions.Item label="Mobile">{props.mobile}</Descriptions.Item>
            <Descriptions.Item label="Date">{formDate}</Descriptions.Item>
            <Descriptions.Item label="Time-Slot">{`${slotBooked.start}-${slotBooked.end}`}</Descriptions.Item>
            <Descriptions.Item label="Location">
                <a href={`http://maps.google.com/?q=${props.bank.lat},${props.bank.lng}`} target="_blank" rel="noreferrer">
                    <EnvironmentTwoTone/>
                </a>
            </Descriptions.Item>
            <Descriptions.Item label="Error">
                {props.error && !props.alloted && <Alert message="You already have a scheduled booking" type="error" />}
            </Descriptions.Item>
            <DescriptionsItem lable="Success">
                {props.alloted && !props.error && <Alert message={`Booked successfully. Your verification link is : http://localhost:4080/?q=${props.reqId}`} type="success" />}
            </DescriptionsItem>
        </Descriptions>
    );
}

export default Summary;