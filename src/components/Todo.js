import React, {useState} from 'react';

const todo=(props)=>{
    //const inputState=useState(''); //the "useState" returns a array that have two things 1st the initial value of the state (variable) and 2nd the function to set the value of that state (variable)
    const [todoName, setTodoName]=useState('');
    const inputChangeHandler=(event)=>{
            //inputState[1](event.target.value);
        setTodoName(event.target.value);
    };

    return (
        <React.Fragment>
            <input type="text" placeholder="Todo" onChange={inputChangeHandler} value={inputState[0]}/>
            <button type="button">Add</button>

            <ul></ul>
        </React.Fragment>
    );
};

export default todo;
