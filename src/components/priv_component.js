//for checking user is signed up or not 
import React from 'react';
import {Navigate,Outlet} from 'react-router-dom';
const Private=()=>{
    const auth=localStorage.getItem('user');

    return auth ?<Outlet/>:<Navigate to ="signup"></Navigate>
}
export default Private;