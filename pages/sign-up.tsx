import React from 'react';
import Link from 'next/link'
import {useForm} from "react-hook-form";
import {ValidationError} from "../components/common/form/ValidationError";
import {checkPassword} from "../src/utils/checkPassword";
import {useHttp} from "../src/utils/hooks/http.hook";
import {Toast, useToast} from "../components/common/blocks/Toast";
import {AuthHeader} from "../components/auth/AuthHeader";
import {AuthImg} from "../components/auth/AuthImg";
import {SocialNetworksSignUp} from "../components/auth/SocialNetworksSignUp";

export default function SignUp() {
    const {register, errors, handleSubmit} = useForm()
    const {show} = useToast()
    const [isPasswordValid, setIsPasswordValid] = React.useState(true)

    const {request, error, loading, clearError} = useHttp()
    const onSubmit = (data: { first_name: string, username: string, password: string }) => {
        let isPassWordValid = checkPassword(data.password)
        if (!isPassWordValid)
            setIsPasswordValid(false)

        let response = request("users/register", "post", data)
    }

    React.useEffect(() => {
        error && show(error)

        return () => {
            clearError()
        }
    }, [error])

    return <>
        <AuthHeader />
        <section className="signup">
            <div className="_container">
                <nav className="breadcrumbs">
                    <ul className="breadcrumbs__list">
                        <li>
                            <Link href="/"><a className="breadcrumbs__link">Home</a></Link>
                        </li>
                        <li>
                            <span className="breadcrumbs__item">Sign up</span>
                        </li>
                    </ul>
                </nav>
                <div className="signup__content">
                    <form onSubmit={handleSubmit(onSubmit)} action="/" className="signup__form">
                        <h1 className="signup__title">
                            Sign up
                        </h1>
                        <p className="signup__descr">
                            If&nbsp;you already have an&nbsp;account&nbsp;—
                            <Link href="/login"><a className="signup__link">Login</a></Link>
                        </p>
                        <div className="signup__line">
                            <input ref={register} required={true} name="first_name" className="signup__input"
                                   placeholder="Your name" type="text"/>
                            {
                                errors.name && <ValidationError/>
                            }
                        </div>
                        <div className="signup__line">
                            <input ref={register} required={true} name="username" className="signup__input"
                                   placeholder="Your E-mail" type="email"/>
                            {
                                errors.email && <ValidationError/>
                            }
                        </div>
                        <div className="signup__line">
                            <input ref={register} required={true} onFocus={() => setIsPasswordValid(true)}
                                   name="password" className="signup__input" placeholder="Password" type="password"/>
                            {
                                errors.password && <ValidationError/>
                            }
                            {
                                !isPasswordValid && <ValidationError>This password is not valid!</ValidationError>
                            }
                        </div>
                        <div className="signup__block">
                            <button disabled={loading} type="submit" className="signup__btn btn">Create an account</button>
                            <SocialNetworksSignUp />
                        </div>
                    </form>
                    <AuthImg />
                </div>
            </div>
        </section>
        <Toast />
    </>
}