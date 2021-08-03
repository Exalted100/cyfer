import Image from "next/image"
import styles from "../styles/HomeMain.module.css"

const HomeMain = () => {
    return (
        <>
        <div className={styles.firstDivContainer}>
            <div><Image src="/illustration.svg" alt="illustration" width={500} height={500} /></div>
            <div>
            <h2 className={styles.landingPageHeader}>More than just <br className={styles.vanishBreak} />secure notes</h2>
            <p className={styles.landingPageDescription}>Keep track of information that is important to you <br className={styles.vanishBreak} />in a way that never falls into the wrong hands.</p>
            <p className={styles.callToAction}>Get Started</p>
            </div>
        </div>

        <div className={styles.thirdDivContainer}>
            <h3 className={styles.h3Header}>Advanced Notes</h3>
            <p className={styles.shortlyDescription}>Store your notes safely on the web with <br className={styles.vanishBreak} />our advanced notes dashboard.</p>
            <div className={styles.advancedStatisticsContainer}>
            <div>
                <div className={styles.thirdDivImageContainer}></div>
                <h4>Access Anywhere</h4>
                <p>Why limit when you can create and view your notes? No reason. And you can do exactly this with us. You can create and view notes from any device.</p>
            </div>
            <div>
                <div className={styles.thirdDivImageContainer}></div>
                <h4>Safely Stored</h4>
                <p>Avoid having your notes fall into the wrong hands. Your notes are safely stored with a cypher. Only you can access your notes with your password.</p>
            </div>
            <div>
                <div className={styles.thirdDivImageContainer}></div>
                <h4>Share Notes</h4>
                <p>Why share your notes through possibly compromised media? Retain the safety of your notes by sharing them right from the web. Simply add other users.</p>
            </div>
            </div>
        </div>

        <div className={styles.fourthDivContainer}>
            <h3>Store your notes today</h3>
            <p>Get Started</p>
        </div>
        </>
    )
}

export default HomeMain