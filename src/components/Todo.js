import React, {useState, useEffect} from 'react';
import axios from 'axios'

const todo=(props)=>{
    //const inputState=useState(''); //the "useState" returns a array that have two things 1st the initial value of the state (variable) and 2nd the function to set the value of that state (variable)
    const [todoName, setTodoName]=useState('');
    const [todoList, setTodoList]=useState([]);
    const [todoState, setTodoState]=useState({userInput:'', todoList2:[]}); //using a single useState to make full todo list

    useEffect(()=>{
        axios.get('https://test-react-hook-d07b5.firebaseio.com/todos.json').then(res=>{
            console.log(res);
            const todoData=res.data;
            const todos=[];
            for(const key in todoData){
                //todos.push({id:key, name:todoData[key].name});
                todos.push(todoData[key].name);
            }
            setTodoList(todos);
        });

        return ()=>{console.log('cleanUp')} // this return statement gives the effect of "componentWillUnmount()"
    }, []);// if we don't give have input field here as "üseEffect(()=>{})" then it will run after each update and if we have an empty array [] it will only run at mounting and before unmounting of the component

    useEffect(()=>{
        document.addEventListener('mousemove', mouseMoveHandler);

        return ()=>{
            document.removeEventListener('mousemove', mouseMoveHandler); // cleanup the handler after each update
        }
    }, []);
    const mouseMoveHandler=(event)=>{
        console.log(event.clientX, event.clientY);
    };



    const inputChangeHandler=(event)=>{
            //inputState[1](event.target.value);
        setTodoName(event.target.value);
    };
    const todoAddHandler=()=>{
        setTodoList(todoList.concat(todoName));
        axios.post('https://test-react-hook-d07b5.firebaseio.com/todos.json', {name: todoName}).then(res=>console.log(res)).catch(err=>console.log(err))
    };

    const inputChangeHandler2=(event)=>{
        setTodoState({userInput: event.target.value, todoList2:todoState.todoList2});
    };
    const todoAddHandler2=()=>{
        setTodoState({
            userInput:todoState.userInput,
            todoList2:todoState.todoList2.concat(todoState.userInput)
        });
    };


    return (
        <React.Fragment>
            <input type="text" placeholder="Todo" onChange={inputChangeHandler} value={todoName}/>
            <button type="button" onClick={todoAddHandler}>Add</button>

            <ul>
                {todoList.map(todo=>{ return <li key={todo}>{todo}</li>})}
            </ul>

            <input type="text" placeholder="Using combined useState" onChange={inputChangeHandler2} value={todoState.userInput}/>
            <button type="button" onClick={todoAddHandler2}>Add</button>

            <ul>
                {todoState.todoList2.map(todo=>{ return <li key={todo}>{todo}</li>})}
            </ul>
        </React.Fragment>
    );
};

export default todo;
