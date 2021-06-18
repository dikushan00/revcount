import React from 'react';
import Link from 'next/link'
import {useForm} from "react-hook-form";
import {ValidationError} from "../components/common/form/ValidationError";
import {useHttp} from "../src/utils/hooks/http.hook";
import {Toast, useToast} from "../components/common/blocks/Toast";
import {AuthHeader} from "../components/auth/AuthHeader";
import {AuthImg} from "../components/auth/AuthImg";
import {SocialNetworksSignUp} from "../components/auth/SocialNetworksSignUp";
import {actionsAuth, checkAuthMe} from "../src/redux/auth-reducer";
import {useRouter} from "next/router";
import {useDispatch, useSelector} from "react-redux";
import {SignUpButton} from "../components/styled/buttons/Buttons";
import {
    BreadCrumbs,
    BreadCrumbsItem,
    BreadCrumbsLink,
    BreadCrumbsList,
    Container,
    SignUpBlock,
    SignUpContent,
    SignUpDesc,
    SignUpForm,
    SignUpInput,
    SignUpLine,
    SignUpSection,
    SignUpTitle
} from "../components/styled/signUp/components";
import {getIsAuth} from "../src/redux/auth-selector";

export default function Login() {
    const {register, errors, handleSubmit} = useForm()
    const {show} = useToast()
    const router = useRouter()
    const dispatch = useDispatch()
    const {authRequest, error, loading, clearError} = useHttp()

    const isAuth = useSelector(getIsAuth)
    const [isPasswordValid, setIsPasswordValid] = React.useState(true)

    React.useEffect(() => {
        dispatch(checkAuthMe())
    }, [])

    const onSubmit = async (data: { first_name: string, username: string, password: string }) => {

        let response = await authRequest<{token: string}>("users/token", "post", data)
        if(response) {
            router.push("/")
            dispatch(actionsAuth.setNewAuth(response.token, null))
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
            <Container >
                <BreadCrumbs>
                    <BreadCrumbsList>
                        <li>
                            <Link href="/"><BreadCrumbsLink>Home</BreadCrumbsLink></Link>
                        </li>
                        <li>
                            <BreadCrumbsItem>Login</BreadCrumbsItem>
                        </li>
                    </BreadCrumbsList>
                </BreadCrumbs>
                <SignUpContent>
                    <SignUpForm onSubmit={handleSubmit(onSubmit)}>
                        <SignUpTitle className="signup__title">
                            Login
                        </SignUpTitle>
                        <SignUpDesc>
                            Don't&nbsp; have an&nbsp; account yet?&nbsp; —  <Link href="/"><a className="signup__link">Sign Up</a></Link>
                        </SignUpDesc>
                        <SignUpLine>
                            <SignUpInput ref={register} required={true} name="username"
                                   placeholder="Your name" type="text"/>
                            {
                                errors.name && <ValidationError/>
                            }
                        </SignUpLine>
                        <SignUpLine>
                            <SignUpInput ref={register} required={true}
                                         onFocus={() => setIsPasswordValid(true)}
                                   name="password" placeholder="Password" type="password"/>
                        </SignUpLine>
                        <SignUpBlock>
                            <SignUpButton disabled={loading} type="submit" className="signup__btn btn">Login</SignUpButton>
                            <SocialNetworksSignUp />
                        </SignUpBlock>
                    </SignUpForm>
                    <AuthImg />
                </SignUpContent>
            </Container>
        </SignUpSection>
        <Toast/>
    </>
}