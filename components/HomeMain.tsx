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
                <h4>Brand Recognition</h4>
                <p>Boost your brand recognition with each click. Generic links don’t mean a thing. Branded links help instil confidence in your content.</p>
            </div>
            <div>
                <div className={styles.thirdDivImageContainer}></div>
                <h4>Detailed Records</h4>
                <p>Gain insights into who is clicking your links. Knowing when and where people engage with your content helps inform better decisions.</p>
            </div>
            <div>
                <div className={styles.thirdDivImageContainer}></div>
                <h4>Fully Customizable</h4>
                <p>Improve brand awareness and content discoverability through customizable links, supercharging audience engagement.</p>
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