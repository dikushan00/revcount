import React from 'react'
import { Link } from 'react-router-dom'

//status page when code 403
export const Page403 = ( ) => {
    return <div className = "page404_wrap">
        <i className="fas fa-ban page404_icon"/>
        <h1 className = "page404_title">403 Error Page</h1>

        <h2 className = "page404_title">Oops! Access denied</h2>
        <p className = "page404_desc">You are not authorized to open this section!</p>   
        <Link to = "/">Back to home</Link>   
    </div>
}
