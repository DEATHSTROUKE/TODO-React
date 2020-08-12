import React from "react";
import s from './TextField.module.css'
import 'font-awesome/css/font-awesome.css'

const TextField = (props) => {
    const onTextChange = (text) => {
        console.log(text)
        props.setState({...props.state, fieldText: text})
    }
    const onAddClick = () => {
        if (props.state.fieldText) {
            let tasks = props.state.tasks.push({title: props.state.fieldText, isChecked: false})
            props.setState({...props.state, fieldText: "", ...tasks})
        }
    }
    return (
        <div className={s.text_field}>
            <input placeholder="Введите текст задачи" onChange={(e) => onTextChange(e.target.value)} value={props.fieldText}/>
            <button className={s.add} onClick={onAddClick}><i className="fa fa-plus"></i></button>
        </div>
    );
}

export default TextField
