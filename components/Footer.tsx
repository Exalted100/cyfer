import styles from "../styles/Footer.module.css"
import Image from "next/image"

const Footer = () => {
    return (
        <footer className={styles.footerContainer}>
            <div className={styles.footerLogoContainer}>Cyfer</div>
            <div>
                <h5>Features</h5>
                <p>Notes creation</p>
                <p>Note storing</p>
                <p>Ciphered notes</p>
            </div>
            <div>
                <h5>Resources</h5>
                <p>Blog</p>
                <p>Developers</p>
                <p>Support</p>
            </div>
            <div>
                <h5>Company</h5>
                <p>About</p>
                <p>Our Team</p>
                <p>Careers</p>
                <p>Contact</p>
            </div>
            <div>
                <div><Image src="/icon-facebook.svg" alt="" width={20} height={20} /></div>
                <div><Image src="/icon-twitter.svg" alt="" width={20} height={20} /></div>
                <div><Image src="/icon-pinterest.svg" alt="" width={20} height={20} /></div>
                <div><Image src="/icon-instagram.svg" alt="" width={20} height={20} /></div>
            </div>
        </footer>
    )
}

export default Footer