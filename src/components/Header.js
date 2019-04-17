import React, {useContext} from 'react'
import AuthContex from '../auth-contex'

const Header =(props)=>{

    const auth=useContext(AuthContex);

    return(
        <header>
            {auth.status? <button onClick={props.onLoadTodos}>Todo List</button>  : null } | {' '}

            <button onClick={props.onLoadAuth}>Auth</button>
        </header>
    )
};

export default Header;
