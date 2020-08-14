import React from "react";
import s from './TextField.module.css'
import 'font-awesome/css/font-awesome.css'
import axios from 'axios'
import {server_ip} from "../config";

const TextField = (props) => {
    const onTextChange = (text) => {
        props.setState({...props.state, fieldText: text})
    }
    const onAddClick = () => {
        if (props.state.fieldText) {
            axios.post(server_ip, {title: props.state.fieldText}).then(res => {
                console.log(res)
                let tasks = props.state.tasks.push({title: props.state.fieldText, isChecked: false})
                props.setState({...props.state, fieldText: "", ...tasks})
            })

        }
    }
    const onKeyPress = event => {
        if (event.key === 'Enter') {
            onAddClick()
        }
    }
    return (
        <div className={s.text_field}>
            <input placeholder="Введите текст задачи" onKeyPress={onKeyPress} autoFocus={true}
                   onChange={(e) => onTextChange(e.target.value)} value={props.state.fieldText}/>
            <button className={s.add} onClick={onAddClick}><i className="fa fa-plus"></i></button>
        </div>
    );
}

export default TextField
