import React, {useContext} from 'react'
import AuthContex from '../auth-contex'

const Auth =(props)=>{

    const auth=useContext(AuthContex);

    return(
        <div>
            <h1>Auth page</h1>
            <button onClick={auth.login}>Login / Logout</button>
        </div>
    )
};

export default Auth;
