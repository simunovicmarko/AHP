import React, { FunctionComponent } from 'react'
import {Navbar} from './Components/Navbar';

export const Layout:FunctionComponent = ({children}) => {
    return (
        <div>
            <Navbar/>
            {children}
        </div>
    )
}
