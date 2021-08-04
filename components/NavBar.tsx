import Image from 'next/image'
import { useState } from 'react'
import styles from "../styles/NavBar.module.css"
import Link from "next/link"

const NavBar = () => {
    const [toggle, setToggle] = useState(true)
    const [mobileNavMenuStyle, setmobileNavMenustyle] = useState({})
    const [mobileNavContainerStyle, setmobileNavContainerStyle] = useState({})
    const [structuralDivStyle, setstructuralDivStyle] = useState({})

    const toggleHamburger = () => {
        if (toggle) {
            setToggle(false)
            setmobileNavMenustyle({
                "display": "block"
            })
            setmobileNavContainerStyle({
                "width": "100%",
                "height": "100%",
                "top": "0",
                "position": "fixed",
                "backgroundColor": "rgba(250, 250, 250, 0.3)"
            })
            setstructuralDivStyle({
                "display": "block"
            })
        } else {
            setToggle(true)
            setmobileNavMenustyle({
                "display": "none"
            })
            setmobileNavContainerStyle({
                "width": "100%",
                "height": "fit-content",
                "top": "0",
                "position": "static",
                "backgroundColor": "rgba(250, 250, 250, 0)"
            })
            setstructuralDivStyle({
                "display": "none"
            })
        }
    }

    return (
        <div>
            <nav className={styles.navigationContainerDesktop}>
                <ul>
                    <li id={styles.brandName}>Cyfer</li>
                    <li>Features</li>
                    <li>Pricing</li>
                    <li>Resources</li>
                </ul>

                <ul>
                    <li><Link href="/login"><a>Login</a></Link></li>
                    <li id={styles.signUpButton}><Link href="/signup"><a>Sign up</a></Link></li>
                </ul>
            </nav>

            <nav className={styles.navigationContainerMobile} style={mobileNavContainerStyle}>
                <div className={styles.navImagesContainer}>
                    <div id={styles.brandNameMobile}>Cyfer</div>
                    <div><Image className={styles.hamburgerIcon} src="/icon-hamburger.svg" alt="hamburger icon" width={30} height={20} onClick={toggleHamburger}/></div>
                </div>
                <ul className={styles.navBarMobileContainer} style={mobileNavMenuStyle}>
                    <li>Features</li>
                    <li>Pricing</li>
                    <li>Resources</li>
                    <li>Login</li>
                    <li id={styles.signUpButton}>Sign up</li>
                </ul>
            </nav>

            <div className={styles.structuralDiv} style={structuralDivStyle}></div>
        </div>
    )
}

export default NavBar