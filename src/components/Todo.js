import React, {useState, useEffect, useReducer, useRef, useMemo} from 'react';
import axios from 'axios'
import List from './list'
import {useFormInput} from '../hooks/forms'

const todo=(props)=>{
    //const inputState=useState(''); //the "useState" returns a array that have two things 1st the initial value of the state (variable) and 2nd the function to set the value of that state (variable)
    const [todoName, setTodoName]=useState('');
    const [todoList, setTodoList]=useState([]);
    const [todoState, setTodoState]=useState({userInput:'', todoList2:[]}); //using a single useState to make full todo list
    const [inputIsValid, setInputIsValid]=useState(false);
    const todoInput=useFormInput();//custom Hook

    const todoListReducer=(state, action)=>{
        switch (action.type) {
            case 'ADD':
                return state.concat(action.payload);
            case 'SET':
                return action.payload;
            case 'REMOVE':
                return state.filter((todo)=>{ return todo.id !== action.payload} );
            default:
                return state;
        }
    };
    const [todoList3, dispatch]=useReducer(todoListReducer, []); //Better solution than "useState"//the first argument is the reducer function and 2nd one is the initial state




    useEffect(()=>{
        axios.get('https://test-react-hook-d07b5.firebaseio.com/todos.json').then(res=>{
            console.log(res);
            const todoData=res.data;
            const todos=[];
            for(const key in todoData){
                todos.push({id:key, name:todoData[key].name});
                //todos.push(todoData[key].name);
            }
            //setTodoList(todos);
            dispatch({type:'SET', payload:todos});
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
       // console.log(event.clientX, event.clientY);
    };





    const inputChangeHandler=(event)=>{
            //inputState[1](event.target.value);
        setTodoName(event.target.value);
    };
    const todoAddHandler=()=>{

        axios.post('https://test-react-hook-d07b5.firebaseio.com/todos.json', {name: todoName})
            .then(res=>{
                //console.log(res.data.name);

                setTimeout(()=>{
                    let todoItem={id:res.data.name, name:todoName};
                    setTodoList(prevTodoList => prevTodoList.concat(todoItem));
                    //setTodoList(todoList.concat(todoItem));
                }, 3000)

            }).catch(err=>console.log(err))
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




    const inputChangeHandler_Reducer=(event)=>{
        setTodoName(event.target.value);
    };
    const todoAddHandler_Reducer=()=>{
        axios.post('https://test-react-hook-d07b5.firebaseio.com/todos.json', {name: todoName})
            .then(res=>{
                //console.log(res.data.name);

                setTimeout(()=>{
                    let todoItem={id:res.data.name, name:todoName};
                    //setTodoList(prevTodoList => prevTodoList.concat(todoItem));

                    dispatch({type:'ADD', payload:todoItem})

                }, 3000)

            }).catch(err=>console.log(err))
    };
    const todoRemoveHandler=(todoId)=>{
        axios.delete('https://test-react-hook-d07b5.firebaseio.com/todos/'+todoId+'.json')
            .then(res=>{

                dispatch({type:'REMOVE', payload:todoId});

            }).catch(err=>console.log(err));

    };



    const todoInputRef=useRef();// make the todoInputRef a reference receiver

    const todoAddHandler4=()=>{

        const todoName4=todoInputRef.current.value; //from this refrence we get the value of the input item where "todoInputRef" is placed. We dont need to save it into another state like "useState()" "todoName" we can just directly add the value to the "todoList3"

        axios.post('https://test-react-hook-d07b5.firebaseio.com/todos.json', {name: todoName4})
            .then(res=>{

                setTimeout(()=>{
                    let todoItem={id:res.data.name, name:todoName4};
                    dispatch({type:'ADD', payload:todoItem})

                }, 3000)

            }).catch(err=>console.log(err))
    };
    const todoRemoveHandler4=(todoId)=>{
        axios.delete('https://test-react-hook-d07b5.firebaseio.com/todos/'+todoId+'.json')
            .then(res=>{

                dispatch({type:'REMOVE', payload:todoId});

            }).catch(err=>console.log(err));

    };
    const inputValidationHandler =(event)=>{
        if(event.target.value.trim()===''){
            setInputIsValid(false);
        }else{
            setInputIsValid(true);
        }
    };



    const todoAddHandler_customHook=()=>{

        const todoName5=todoInput.value; //

        axios.post('https://test-react-hook-d07b5.firebaseio.com/todos.json', {name: todoName5})
            .then(res=>{

                    let todoItem={id:res.data.name, name:todoName5};
                    dispatch({type:'ADD', payload:todoItem})

            }).catch(err=>console.log(err))
    };
    const todoRemoveHandler_customHook=(todoId)=>{
        axios.delete('https://test-react-hook-d07b5.firebaseio.com/todos/'+todoId+'.json')
            .then(res=>{

                dispatch({type:'REMOVE', payload:todoId});

            }).catch(err=>console.log(err));

    };



    return (
        <React.Fragment>
            <input type="text" placeholder="Todo" onChange={inputChangeHandler} value={todoName}/>
            <button type="button" onClick={todoAddHandler}>Add</button>

            <ul>
                {todoList.map(todo=>{ return <li key={todo.id}>{todo.name}</li>})}
            </ul>
            <hr></hr>


            <input type="text" placeholder="Using combined useState" onChange={inputChangeHandler2} value={todoState.userInput}/>
            <button type="button" onClick={todoAddHandler2}>Add</button>

            <ul>
                {todoState.todoList2.map(todo=>{ return <li key={todo}>{todo}</li>})}
            </ul>
            <hr></hr>


            <input type="text" placeholder="Using useReducer" onChange={inputChangeHandler_Reducer} value={todoName}/>
            <button type="button" onClick={todoAddHandler_Reducer}>Add</button>

            <ul>
                {todoList3.map(todo=>{ return <li style={{cursor:'pointer'}} key={todo.id} onClick={()=>todoRemoveHandler(todo.id)}>{todo.name}</li>})}
            </ul>
            <hr></hr>


            <input type="text" placeholder="Using useRef" ref={todoInputRef} onChange={inputValidationHandler} style={{backgroundColor: inputIsValid? 'transparent':'red'}}/>
            <button type="button" onClick={todoAddHandler4}>Add</button>

            {/*
            <ul>
                {todoList3.map(todo=>{ return <li key={todo.id} onClick={()=>todoRemoveHandler4(todo.id)}>{todo.name}</li>})}
            </ul>
            */}

            {useMemo(()=>(<List items={todoList3} onClick={todoRemoveHandler4}/>),[todoList3])} {/* useMemo() to avoid unnecessary rerendering. it will only rerender when "todoList3" changes */}

            <hr></hr>


            <input type="text"
                   placeholder="Using custom Hook"
                   onChange={todoInput.onChange}
                   value={todoInput.value}
                   style={{backgroundColor: todoInput.validity? 'transparent':'red'}}/>
            <button type="button" onClick={todoAddHandler_customHook}>Add</button>

            {useMemo(()=>(<List items={todoList3} onClick={todoRemoveHandler_customHook}/>),[todoList3])} {/* useMemo() to avoid unnecessary rerendering. it will only rerender when "todoList3" changes */}

        </React.Fragment>
    );
};

export default todo;
