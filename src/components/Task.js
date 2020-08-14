import React from "react";
import s from './Task.module.css'

const Task = (props) => {
    return (
        <div className={s.task + " " + (props.isChecked ? s.checked : "")} onClick={() => props.onChecked(props.id)}>
            <button className={s.check}>
                <i className="fa fa-check"></i></button>
            <p className={s.title}>{props.title}</p>
            <button className={s.delete} onClick={() => props.onDelete(props.id)}>
                <i className="fa fa-trash-o"></i></button>
        </div>
    );
}

export default Task
