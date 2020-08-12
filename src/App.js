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
        axios.get(`${server_ip}/api/todo`).then(res => {
            st.tasks = res.data
            setState(st)
        })
    }, [])

    const onChecked = (id) => {
        let tasks = state.tasks
        tasks[id].isChecked = !tasks[id].isChecked
        setState({...state, tasks})
    }
    const onDelete = (id) => {
        let tasks = state.tasks
        tasks.splice(id, 1)
        setState({...state, tasks})
    }

    return (
        <div className={s.todo}>
            <div className={s.title}>
                <h4>Список задач</h4>
            </div>
            <div className={s.main}>
                <TextField fieldText={state.fieldText} setState={setState} state={state}/>
                <div className={s.list}>
                    {state.tasks.map((task, index) => <Task title={task.title}
                                                            isChecked={task.isChecked}
                                                            setState={setState}
                                                            key={index}
                                                            id={index}
                                                            onChecked={onChecked}
                                                            onDelete={onDelete}/>)}
                </div>
            </div>
        </div>
    );
}

export default App;
