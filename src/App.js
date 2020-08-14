import React from 'react';
import s from './App.module.css';
import TextField from "./components/TextField";
import Task from "./components/Task";
import axios from 'axios';
import {server_ip} from "./config";

const App = () => {
    const [state, setState] = React.useState({fieldText: "", tasks: []})
    React.useEffect(() => {
        let st = {
            fieldText: "",
            tasks: []
        }
        axios.get(`${server_ip}`).then(res => {
            st.tasks = res.data
            setState(st)
            console.log(st)
        })
    }, [])

    const onChecked = (id) => {
        let tasks = state.tasks
        tasks[id].isChecked = !tasks[id].isChecked
        setState({...state, tasks})
    }
    const onDelete = (id) => {
        let tasks = state.tasks
        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i]._id === id) {
                tasks.splice(i, 1)
            }
        }
        setState({...state, tasks})
        axios.delete(`${server_ip}/${id}`).then(res => {
            console.log(res)
        })
    }

    return (
        <div className={s.todo}>
            <div className={s.title}>
                <h4>Список задач</h4>
            </div>
            <div className={s.main}>
                <TextField setState={setState} state={state}/>
                <div className={s.list}>
                    {state.tasks.map((task, index) => <Task title={task.title}
                                                            isChecked={task.isChecked}
                                                            setState={setState}
                                                            key={index}
                                                            id={task._id}
                                                            onChecked={onChecked}
                                                            onDelete={onDelete}/>)}
                </div>
            </div>
        </div>
    );
}

export default App;
