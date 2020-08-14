import React, {useState} from "react";
import s from './TextField.module.css'
import 'font-awesome/css/font-awesome.css'
import axios from 'axios'
import {server_ip} from "../config";

const TextField = (props) => {
    const [isAdding, setIsAdding] = useState(false)
    const onTextChange = (text) => {
        props.setState({...props.state, fieldText: text})
    }
    const onAddClick = () => {
        if (props.state.fieldText) {
            props.setState({...props.state, fieldText: ""})
            setIsAdding(true)
            axios.post(server_ip, {title: props.state.fieldText}).then(({data}) => {
                let tasks = props.state.tasks.push({completed: false, _id: data.id, title: props.state.fieldText})
                props.setState({...props.state, fieldText: "", ...tasks})
            }).finally(() => {
                setIsAdding(false)
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
            <input placeholder={isAdding ? "Добавление..." : "Введите текст задачи"}
                   onKeyPress={onKeyPress}
                   autoFocus={true}
                   onChange={(e) => onTextChange(e.target.value)} value={props.state.fieldText}/>
            <button className={s.add} onClick={onAddClick}><i className="fa fa-plus"></i></button>
        </div>
    );
}

export default TextField
