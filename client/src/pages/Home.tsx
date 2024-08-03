import Footer from "../components/landingPage/Footer";
import Hero from "../components/landingPage/Hero";
import Introduction from "../components/landingPage/Introduction";
import Navbar from "../components/landingPage/Navbar";
import Pricing from "../components/landingPage/Pricing";
import Stats from "../components/landingPage/Stats";
import Testimonials from "../components/landingPage/Testimonials";
import styles from "../utils/styles";

export default function Home() {
  return (
    <div className="w-full overflow-hidden">
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
          <div className={`${styles.boxWidth}`}>
              <Navbar />
          </div>
      </div>

      <div className={`${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
            <Hero />
        </div>
      </div>

      <div className={`${styles.flexStart} ${styles.paddingX}`}>
        <div className={`${styles.boxWidth}`}>
            <Stats/>
            <Introduction/>
            <Testimonials/>
            <Pricing/>
            <Footer/>
        </div>
      </div>
    </div>
  )
}
