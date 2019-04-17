import React, { useState } from 'react';

import Todo from './components/Todo'
import Header from './components/Header'
import Auth from "./components/Auth";
import AuthContex from './auth-contex'
import './App.css';


const App =(props)=>{

  const [page, setPage]=useState('auth');
  const [authStatus, setAuthStatus]=useState(false);

  const switchPage=(pageName)=>{
      setPage(pageName);
  }

  const login=()=>{
    setAuthStatus(!authStatus);
  }

  return(
      <div className="App">
        <AuthContex.Provider value={{status:authStatus, login:login}}>

          <Header onLoadTodos={switchPage.bind(this, 'todos')} onLoadAuth={()=>switchPage('auth')}/>
          <hr/>

          {page==='auth'? <Auth/> : <Todo/>}

        </AuthContex.Provider>
      </div>
  )
};

export default App;
