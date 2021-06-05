import React from "react";
import {Link} from "react-router-dom";

export const Header = () => {
    return <header className="header">
        <div className="header__menu menu">
            <div className="menu__icon icon-menu">
                <span/>
                <span/>
                <span/>
            </div>
            <nav className="menu__body">
                <ul className="menu__list">
                    <li className="menu__item"><Link to="/" className="menu__link">Owerview</Link></li>
                    <li className="menu__item"><Link to="/" className="menu__link">Milestone</Link></li>
                    <li className="menu__item"><Link to="/" className="menu__link">Payment</Link></li>
                    <li className="menu__item"><Link to="/" className="menu__link">Contacts
                        <span className="menu__link-span">3</span></Link>
                    </li>
                </ul>
            </nav>
        </div>
        <div className="header__registration">
            <div className="header__indexer">
                your invite id - 888BA0
            </div>
            <Link to="/" className="header__registration-icon">
                <svg width={16} height={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0)">
                        <path
                            d="M2.66675 4.5C2.66675 2.754 4.08741 1.33333 5.83342 1.33333H11.9221C11.7027 0.566 11.0034 0 10.1667 0H2.50008C1.48875 0 0.666748 0.822 0.666748 1.83333V12.1667C0.666748 13.178 1.48875 14 2.50008 14H2.66675V4.5Z"
                            fill="#868594"/>
                        <path
                            d="M13.5 2.66675H5.83333C4.822 2.66675 4 3.48875 4 4.50008V14.1667C4 15.1781 4.822 16.0001 5.83333 16.0001H13.5C14.5113 16.0001 15.3333 15.1781 15.3333 14.1667V4.50008C15.3333 3.48875 14.5113 2.66675 13.5 2.66675ZM12.1667 14.0001H7.16667C6.89067 14.0001 6.66667 13.7761 6.66667 13.5001C6.66667 13.2241 6.89067 13.0001 7.16667 13.0001H12.1667C12.4427 13.0001 12.6667 13.2241 12.6667 13.5001C12.6667 13.7761 12.4427 14.0001 12.1667 14.0001ZM12.1667 11.3334H7.16667C6.89067 11.3334 6.66667 11.1094 6.66667 10.8334C6.66667 10.5574 6.89067 10.3334 7.16667 10.3334H12.1667C12.4427 10.3334 12.6667 10.5574 12.6667 10.8334C12.6667 11.1094 12.4427 11.3334 12.1667 11.3334ZM12.1667 9.00008H7.16667C6.89067 9.00008 6.66667 8.77608 6.66667 8.50008C6.66667 8.22408 6.89067 8.00008 7.16667 8.00008H12.1667C12.4427 8.00008 12.6667 8.22408 12.6667 8.50008C12.6667 8.77608 12.4427 9.00008 12.1667 9.00008ZM12.1667 6.33341H7.16667C6.89067 6.33341 6.66667 6.10941 6.66667 5.83341C6.66667 5.55741 6.89067 5.33341 7.16667 5.33341H12.1667C12.4427 5.33341 12.6667 5.55741 12.6667 5.83341C12.6667 6.10941 12.4427 6.33341 12.1667 6.33341Z"
                            fill="#868594"/>
                    </g>
                    <defs>
                        <clipPath id="clip0">
                            <rect width={16} height={16} fill="white"/>
                        </clipPath>
                    </defs>
                </svg>
            </Link>
            <Link to="/" className="header__user">
                <svg width={40} height={40} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx={20} cy={20} r={20} fill="#E6E8EF"/>
                    <path
                        d="M26 15C26 18.3137 23.3137 21 20 21C16.6863 21 14 18.3137 14 15C14 11.6863 16.6863 9 20 9C23.3137 9 26 11.6863 26 15Z"
                        fill="#868594"/>
                    <path d="M5 33C5 33 10 40 20 40V24C11.5 24 5 33 5 33Z" fill="#868594"/>
                    <path d="M35 33C35 33 30 40 20 40V24C28.5 24 35 33 35 33Z" fill="#868594"/>
                </svg>
            </Link>
        </div>
    </header>

}