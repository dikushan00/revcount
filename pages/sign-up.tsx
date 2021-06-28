import React from 'react';
import Link from 'next/link'
import {Controller, useForm} from "react-hook-form";
import {ValidationError} from "../components/common/form/ValidationError";
import {useHttp} from "../src/utils/hooks/http.hook";
import {Toast, useToast} from "../components/common/blocks/Toast";
import {AuthHeader} from "../components/auth/AuthHeader";
import {AuthImg} from "../components/auth/AuthImg";
import {SocialNetworksSignUp} from "../components/auth/SocialNetworksSignUp";
import {useDispatch, useSelector} from "react-redux";
import {actionsAuth} from "../src/redux/auth-reducer";
import {actionsProfile} from "../src/redux/profile-reducer";
import {useRouter} from "next/router";
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
import {Layout} from "../components/layouts/Layout";

type SignUpResponseType = { "user_id": number, username: string, error: any, first_name: string, token: string }

export default function SignUp() {
    const { errors, handleSubmit, control} = useForm()
    const router = useRouter()
    const {show} = useToast()
    const dispatch = useDispatch()

    const {request, error, loading, clearError} = useHttp()
    const isAuth = useSelector(getIsAuth)

    const onSubmit = async (data: { first_name: string, username: string, password: string }) => {

        let response = await request<SignUpResponseType>("users/register", "post", data, null, false)
        if (response) {
            router.push("/")
            dispatch(actionsAuth.setNewAuth(response.token, null, response.user_id))
            dispatch(actionsProfile.setProfile({
                user_id: response.user_id,
                email: response.username,
                avatar: "",
                first_name: response.first_name
            }))
            localStorage.setItem("token", response.token)
        }
    }

    React.useEffect(() => {
        error && show(error)
        return () => clearError()
    }, [error])

    if (isAuth) {
        router.push("/")
    }

    return <Layout layoutId={2} title={"Sign Up"}>
        <AuthHeader/>
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
                    <SignUpForm onSubmit={handleSubmit(onSubmit)} className="signup__form">
                        <SignUpTitle>
                            Sign up
                        </SignUpTitle>
                        <SignUpDesc>
                            If&nbsp;you already have an&nbsp;account&nbsp;—
                            <Link href="/login"><a className="signup__link">Login</a></Link>
                        </SignUpDesc>
                        <SignUpLine>
                            <Controller as={<SignUpInput placeholder="Your name" type="text"/>} name="first_name"
                                        rules={{required: true}}
                                        control={control}
                                        defaultValue={""}
                            />
                            {errors.first_name && <ValidationError/>}
                        </SignUpLine>
                        <SignUpLine>
                            <Controller as={<SignUpInput placeholder="Your E-mail" />} name="username"
                                        rules={{required: true, pattern: /.+@.+\..+/i}}
                                        control={control}
                                        defaultValue={""}
                            />
                            {errors.username && <ValidationError>This field is required or check your email</ValidationError>}
                        </SignUpLine>
                        <SignUpLine>
                            <Controller as={<SignUpInput placeholder="Password" type="password"/>} name="password"
                                        rules={{required: true , pattern: /^[A-Za-z0-9]\w{7,15}$/}}
                                        control={control}
                                        defaultValue={""}
                            />
                            {errors.password && <ValidationError>This field is required or check your password</ValidationError>}
                        </SignUpLine>
                        <SignUpBlock>
                            <SignUpButton disabled={loading} type="submit">Create an account</SignUpButton>
                            <SocialNetworksSignUp/>
                        </SignUpBlock>
                    </SignUpForm>
                    <AuthImg/>
                </SignUpContent>
            </Container>
        </SignUpSection>
        <Toast/>
    </Layout>
}