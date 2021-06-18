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
import {useDispatch, useSelector} from "react-redux";
import {actionsAuth, checkAuthMe} from "../src/redux/auth-reducer";
import {actionsProfile} from "../src/redux/profile-reducer";
import {useRouter} from "next/router";
import {SignUpButton} from "../components/styled/buttons/Buttons";
import {
    BreadCrumbs, BreadCrumbsItem,
    BreadCrumbsLink,
    BreadCrumbsList,
    Container, SignUpBlock, SignUpContent, SignUpDesc, SignUpForm, SignUpInput, SignUpLine,
    SignUpSection, SignUpTitle
} from "../components/styled/signUp/components";
import {getIsAuth} from "../src/redux/auth-selector";

export default function SignUp() {
    const {register, errors, handleSubmit} = useForm()
    const router = useRouter()
    const {show} = useToast()
    const dispatch = useDispatch()

    const isAuth = useSelector(getIsAuth)
    const [isPasswordValid, setIsPasswordValid] = React.useState(true)

    React.useEffect(() => {
        dispatch(checkAuthMe())
    }, [])

    const {authRequest, error, loading, clearError} = useHttp()
    const onSubmit = async (data: { first_name: string, username: string, password: string }) => {
        let isPassWordValid = checkPassword(data.password)
        if (!isPassWordValid) {
            setIsPasswordValid(false)
            return
        }

        let response = await authRequest<{ "user_id": number, username: string, error: any, first_name: string, token: string }>("users/register", "post", data)
        if(response) {
            router.push("/")
            dispatch(actionsAuth.setNewAuth(response.token, null, response.user_id))
            dispatch(actionsProfile.setProfile({id: response.user_id, email: response.username, avatar: "", firstName: response.first_name}))
            localStorage.setItem("token", response.token)
        }
    }

    React.useEffect(() => {
        error && show(error)
        return () => clearError()
    }, [error])


    if(isAuth) {
        router.push("/")
    }
    return <>
        <AuthHeader />
        <SignUpSection>
            <Container>
                <BreadCrumbs>
                    <BreadCrumbsList>
                        <li>
                            <Link href="/">
                                <BreadCrumbsLink className="breadcrumbs__link">Home</BreadCrumbsLink>
                            </Link>
                        </li>
                        <li>
                            <BreadCrumbsItem className="breadcrumbs__item">Sign up</BreadCrumbsItem>
                        </li>
                    </BreadCrumbsList>
                </BreadCrumbs>
                <SignUpContent>
                    <SignUpForm onSubmit={handleSubmit(onSubmit)} action="/" className="signup__form">
                        <SignUpTitle>
                            Sign up
                        </SignUpTitle>
                        <SignUpDesc>
                            If&nbsp;you already have an&nbsp;account&nbsp;—
                            <Link href="/login"><a className="signup__link">Login</a></Link>
                        </SignUpDesc>
                        <SignUpLine>
                            <SignUpInput ref={register} required={true} name="first_name"
                                   placeholder="Your name" type="text"/>
                            {
                                errors.name && <ValidationError/>
                            }
                        </SignUpLine>
                        <SignUpLine>
                            <SignUpInput ref={register} required={true} name="username"
                                   placeholder="Your E-mail" type="email"/>
                            {
                                errors.email && <ValidationError/>
                            }
                        </SignUpLine>
                        <SignUpLine>
                            <SignUpInput ref={register} required={true} onFocus={() => setIsPasswordValid(true)}
                                   name="password" placeholder="Password" type="password"/>
                            {
                                errors.password && <ValidationError/>
                            }
                            {
                                !isPasswordValid && <ValidationError>This password is not valid!</ValidationError>
                            }
                        </SignUpLine>
                        <SignUpBlock>
                            <SignUpButton disabled={loading} type="submit">Create an account</SignUpButton>
                            <SocialNetworksSignUp />
                        </SignUpBlock>
                    </SignUpForm>
                    <AuthImg />
                </SignUpContent>
            </Container>
        </SignUpSection>
        <Toast />
    </>
}