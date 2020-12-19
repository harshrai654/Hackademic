import React from "react";
import {Descriptions} from "antd";
import {EnvironmentTwoTone} from "@ant-design/icons";

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
                <a href={`http://maps.google.com/?q=${props.bank.lat},${props.bank.lng}`} target="_blank">
                    <EnvironmentTwoTone/>
                </a>
            </Descriptions.Item>
        </Descriptions>
    );
}

export default Summary;