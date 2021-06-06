import React from 'react';
import Link from 'next/link'

export default function SignUp() {
    return <>
        <header className="header-signup">
            <div className="header-signup__content _container">
                <div className="header-signup__logo">
                    <Link href="/">
                        <a className="header-signup__logo-link">
                            <picture>
                                <source srcSet={"/img/icons/logo.svg"} type="image/webp"/>
                                <img src={"/img/icons/logo.svg"} alt="logo"/></picture>
                        </a>
                    </Link>
                </div>
                <div className="header-signup__menu menu">
                    <div className="header-signup__icon icon-menu">
                        <span/>
                        <span/>
                        <span/>
                    </div>
                    <nav className="header-signup__body">
                        <ul className="header-signup__list">
                            <li className="header-signup__item">
                                <Link href="/">
                                    <a className="header-signup__link">How it works</a>
                                </Link>
                            </li>
                            <li className="header-signup__item">
                                <Link href="/">
                                    <a className="header-signup__link">Storytelling</a>
                                </Link>
                            </li>
                            <li className="header-signup__item">
                                <Link href="/">
                                    <a className="header-signup__link">Benefits</a>
                                </Link>
                            </li>
                            <li className="header-signup__item">
                                <Link href="/">
                                    <a className="header-signup__link">Features</a>
                                </Link>
                            </li>
                            <li className="header-signup__item">
                                <Link href="/">
                                    <a className="header-signup__link">More about payment</a>
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
                <button className="header-signup__btn">Sing up</button>
            </div>
        </header>
        <section className="signup">
            <div className="_container">
                <nav className="breadcrumbs">
                    <ul className="breadcrumbs__list">
                        <li>
                            <Link href="/"><a className="breadcrumbs__link">Home</a></Link>
                        </li>
                        <li>
                            <span className="breadcrumbs__item">Sing up</span>
                        </li>
                    </ul>
                </nav>
                <div className="signup__content">
                    <form action="/" className="signup__form">
                        <h1 className="signup__title">
                            Sing up
                        </h1>
                        <p className="signup__descr">
                            If&nbsp;you already have an&nbsp;account&nbsp;— <Link href="/"><a className="signup__link">Login</a></Link>
                        </p>
                        <div className="signup__line">
                            <input className="signup__input" placeholder="Your name" type="text"/>
                        </div>
                        <div className="signup__line">
                            <input className="signup__input" placeholder="Your E-mail" type="email"/>
                        </div>
                        <div className="signup__line">
                            <input className="signup__input" placeholder="Password" type="password"/>
                        </div>
                        <div className="signup__block">
                            <button type="submit" className="signup__btn btn">Create an account</button>
                            <ul className="signup__box">
                                <li className="signup__item">
                                    <Link href="/">
                                        <a>
                                            <svg width={30} height={30} viewBox="0 0 30 30" fill="none"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M11.3072 25.9971C11.3 25.999 11.2925 26 11.285 25.9999C7.29645 25.9625 4 18.0737 4 14.0547C4 7.48356 9.08739 6.04373 11.0475 6.04373C11.9642 6.10728 12.8631 6.32139 13.7058 6.6769C13.8387 6.73326 13.9737 6.78483 14.1103 6.83153C14.8287 7.07713 15.6229 7.06597 16.3139 6.75151C17.3462 6.2907 18.4614 6.02965 19.5969 5.98302C20.6966 5.96146 21.785 6.20145 22.7667 6.682C23.7485 7.16255 24.5938 7.86899 25.2285 8.73949C25.4569 9.07297 25.374 9.53134 25.0477 9.76992C24.3402 10.1876 23.7516 10.7699 23.3352 11.4639C22.9188 12.1579 22.6878 12.9417 22.6633 13.7442C22.639 14.6026 22.8695 15.4497 23.3274 16.185C23.7853 16.9202 24.4513 17.5126 25.2464 17.8919C25.6169 18.107 26 18.3308 26 18.8165C26 19.1339 23.3847 25.9549 19.5844 25.9549C18.8327 25.9399 18.0934 25.7658 17.4184 25.4449C16.8195 25.1547 16.1601 25.001 15.4905 24.9956C14.9627 25.0491 14.4471 25.1844 13.9636 25.3963C13.129 25.7497 12.2348 25.9524 11.3251 25.9944C11.3191 25.9946 11.3131 25.9956 11.3072 25.9971Z"
                                                    fill="#262C53"/>
                                                <path
                                                    d="M19.9969 0C20.0801 0.69735 20.0146 1.40384 19.8043 2.07561C19.594 2.74738 19.2435 3.3701 18.7745 3.90511C18.3055 4.44012 17.728 4.87601 17.0779 5.18572C16.0012 5.6987 14.9137 4.70273 15.3329 3.58614C15.5618 2.97673 15.9018 2.40599 16.3426 1.90311C17.2699 0.845328 18.5749 0.165668 19.9969 0C19.9969 0 19.9969 0 19.9969 0Z"
                                                    fill="#262C53"/>
                                            </svg>
                                        </a>
                                    </Link>
                                </li>
                                <li className="signup__item">
                                    <Link href="/">
                                        <a>
                                            <svg width={30} height={30} viewBox="0 0 30 30" fill="none"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M16.0655 17.2682H21.4453C20.9588 18.6521 20.0396 19.8426 18.8236 20.6635C17.6077 21.4844 16.1598 21.892 14.6941 21.826C13.2285 21.76 11.823 21.2239 10.6858 20.2971C9.54859 19.3703 8.74008 18.102 8.37994 16.6799C8.0198 15.2579 8.12717 13.7577 8.68617 12.4014C9.24516 11.0451 10.2261 9.90486 11.4837 9.14939C12.7413 8.39391 14.2088 8.0634 15.6689 8.20675C17.129 8.3501 18.5042 8.95971 19.5908 9.94534C19.7276 10.072 19.9072 10.1424 20.0937 10.1424C20.2802 10.1424 20.4598 10.072 20.5966 9.94534L22.5706 8.08791C22.6436 8.01902 22.7017 7.93596 22.7415 7.84382C22.7812 7.75167 22.8017 7.65239 22.8017 7.55205C22.8017 7.45171 22.7812 7.35243 22.7415 7.26028C22.7017 7.16814 22.6436 7.08509 22.5706 7.0162C20.584 5.12813 17.962 4.05279 15.2216 4.0022C13.063 3.95905 10.9395 4.55183 9.11558 5.70673C7.29162 6.86163 5.84782 8.52758 4.96404 10.4971C4.08026 12.4665 3.79556 14.6525 4.14542 16.7826C4.49528 18.9126 5.46422 20.8927 6.93155 22.4762C8.39888 24.0596 10.2997 25.1764 12.3973 25.6874C14.4949 26.1983 16.6965 26.081 18.7278 25.3499C20.7591 24.6187 22.5304 23.3062 23.8211 21.5758C25.1117 19.8453 25.8645 17.7734 25.9859 15.6182C25.9937 15.5459 26 13.0929 26 13.0929H16.0655C15.87 13.0929 15.6826 13.1706 15.5443 13.3088C15.4061 13.447 15.3284 13.6344 15.3284 13.8299V16.5312C15.3284 16.7267 15.4061 16.9141 15.5443 17.0523C15.6826 17.1905 15.87 17.2682 16.0655 17.2682Z"
                                                    fill="#FA6729"/>
                                            </svg>
                                        </a>
                                    </Link>
                                </li>
                                <li className="signup__item">
                                    <Link href="/">
                                        <a>
                                            <svg width={30} height={30} viewBox="0 0 30 30" fill="none"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M20.5451 4.00806H17.6683C16.9468 3.96743 16.2248 4.08071 15.5511 4.34025C14.8775 4.5998 14.2679 4.99956 13.7634 5.51256C13.2589 6.02556 12.8713 6.63987 12.6268 7.31401C12.3823 7.98816 12.2865 8.70645 12.3459 9.42042V11.9169H9.45173C9.39227 11.9169 9.3334 11.9285 9.27849 11.9511C9.22358 11.9737 9.17372 12.0068 9.13175 12.0486C9.08978 12.0903 9.05654 12.1399 9.03393 12.1944C9.01132 12.2489 8.99979 12.3073 9 12.3662V15.9797C9 16.0984 9.0476 16.2123 9.13231 16.2963C9.21702 16.3803 9.33192 16.4274 9.45173 16.4274H12.3443V25.5522C12.3443 25.671 12.3919 25.7849 12.4766 25.8689C12.5614 25.9528 12.6763 26 12.7961 26H16.5715C16.6913 26 16.8062 25.9528 16.8909 25.8689C16.9756 25.7849 17.0232 25.671 17.0232 25.5522V16.4306H20.4056C20.5254 16.4306 20.6403 16.3834 20.725 16.2994C20.8097 16.2155 20.8573 16.1016 20.8573 15.9828V12.3662C20.8573 12.247 20.8096 12.1327 20.7246 12.0485C20.6396 11.9642 20.5243 11.9169 20.404 11.9169H17.0248V9.80062C17.0248 8.78414 17.2689 8.26725 18.6098 8.26725H20.5483C20.6681 8.26725 20.783 8.22008 20.8677 8.13611C20.9524 8.05214 21 7.93825 21 7.81949V4.46053C21.0004 4.40113 20.9889 4.34223 20.9662 4.28725C20.9436 4.23227 20.9101 4.18229 20.8678 4.14022C20.8255 4.09814 20.7752 4.06479 20.7198 4.04211C20.6644 4.01942 20.605 4.00785 20.5451 4.00806Z"
                                                    fill="#0076FF"/>
                                            </svg>
                                        </a>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </form>
                    <div className="signup__images">
                        <picture>
                            <source srcSet={"/img/main/signup-img.svg"} type="image/webp"/>
                            <img src={"/img/main/signup-img.svg"} alt="signup"/></picture>
                    </div>
                </div>
            </div>
        </section>
    </>
}
