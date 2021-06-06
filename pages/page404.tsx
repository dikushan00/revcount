import React from "react";
import Link from 'next/link'

//status page when code 404
export default function Page404() {
    return (
        <div className="page404_wrap">
            <i className="fas fa-ban page404_icon"/>
            <h1 className="page404_title">404 Error Page</h1>

            <h2 className="page404_title">Oops! Page not found.</h2>
            <p className="page404_desc">
                We could not find the page you were looking for. Meanwhile, you may
                return to dashboard or try using the search form!
            </p>
            <Link href="/"><a>Back to home</a></Link>
        </div>
    );
}
