import React from 'react';
import Link from 'next/link'
import {Controller, useForm} from "react-hook-form";
import {ValidationError} from "../components/common/form/ValidationError";
import {useHttp} from "../src/utils/hooks/http.hook";
import {Toast, useToast} from "../components/common/blocks/Toast";
import {AuthHeader} from "../components/auth/AuthHeader";
import {AuthImg} from "../components/auth/AuthImg";
import {SocialNetworksSignUp} from "../components/auth/SocialNetworksSignUp";
import {useDispatch} from "react-redux";
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
import {Layout} from "../components/layouts/Layout";
import {useRouter} from "next/router";
import {actionsAuth} from "../src/redux/auth-reducer";

export default function Login() {
    const {errors, control, handleSubmit} = useForm()
    const {show} = useToast()
    const router = useRouter()
    const dispatch = useDispatch()
    const {request, error, loading, clearError} = useHttp()

    const onSubmit = async (data: { first_name: string, username: string, password: string }) => {
        let response = await request<{ token: string }>("users/token", "post", data, null, false)

        if (response && response?.token) {
            dispatch(actionsAuth.setNewAuth(response.token, null, null , true))
            localStorage.setItem("token", response.token)
            await router.push("/")
            window.location.reload();
        }
    }

    React.useEffect(() => {
        error && show(error)
        return () => clearError()
    }, [error])

    return <Layout layoutId={2} title={"Login"}>
        <AuthHeader/>
        <SignUpSection>
            <Container>
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
                    <SignUpForm action="" onSubmit={handleSubmit(onSubmit)}>
                        <SignUpTitle className="signup__title">
                            Login
                        </SignUpTitle>
                        <SignUpDesc>
                            Don't&nbsp; have an&nbsp; account yet?&nbsp; — <Link href="/sign-up"><a className="signup__link">Sign Up</a></Link>
                        </SignUpDesc>
                        <SignUpLine>
                            <Controller as={<SignUpInput placeholder="Your name" type="text"/>}
                                        name="username"
                                        rules={{required: true, pattern: /.+@.+\..+/i}}
                                        control={control}
                                        defaultValue={""}
                            />
                            {errors.username && <ValidationError/>}
                        </SignUpLine>
                        <SignUpLine>
                            <Controller as={<SignUpInput placeholder="Password" type="password"/>}
                                        name="password"
                                        rules={{required: true}}
                                        control={control}
                                        defaultValue={""}
                            />
                            {errors.password && <ValidationError/>}
                        </SignUpLine>
                        <SignUpBlock>
                            <SignUpButton disabled={loading} type="submit"
                                          className="signup__btn btn">{loading ? "Pending..." : "Login"}</SignUpButton>
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