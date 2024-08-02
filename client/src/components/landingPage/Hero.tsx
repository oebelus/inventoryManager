import styles from "../../utils/styles";
import GetStarted from "./GetStarted";

export default function Hero() {
  return (
    <section id="home" className={`flex md:flex-row flex-col ${styles.paddingY}`}>
      <div className={`flex-1 flex justify-between items-center text-left flex-col xl:px-0 sm:px-16 px-6`}>
        <div className="flex flex-col xl:flex-row justify-between items-center w-full">
          <div className="xl:w-2/3">
            <h1 className="font-semibold ss:text-[72px] text-[52px]">
              Transform Your Pantry into an {" "}
              <span className="bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 bg-clip-text text-transparent">Organized</span> <br className="sm:block hidden" /> {" "}
              <span className="font-semibold ss:text-[72px] text-[52px]">Haven</span>
            </h1>
            <p className={`${styles.paragraph} max-w-[470px] mt-5`}>Our intuitive tool simplifies the process of tracking your pantry items, monitoring expiration dates, and reducing food waste, tailored to your household needs.</p>
            <div className="mt-10 sm:text-center lg:text-left xs:text-center">
              <GetStarted />
            </div>
          </div>
        </div>
      </div>

      <div className="hidden w-[40%] md:flex">
        <img src="hero.png" alt="" />
      </div>
    </section>
  )
}
