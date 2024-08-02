import { feedback } from "../../utils/constants";
import styles from "../../utils/styles";
import FeedbackCard from "./FeedbackCard";

export default function Testimonials() {
  return (
    <section id="testimonials" className={`${styles.paddingY} ${styles.flexCenter} flex-col relative`}>

      <div className="w-full flex justify-between items-center md:flex-row flex-col sm:mb-16 mb-6 relative z-[1]">
        <h1 className={`${styles.heading2}`}>What people are <br className="sm:block hidden" /> saying about us:</h1>
        <div className="w-full md:mt-0 mt-6">
          <p className={`${styles.paragraph} text-left max-w-[450px]`}>"Everything you need to manage your pantry efficiently, all in one place. From tracking inventory to organizing expiration dates, we provide the tools to keep your kitchen running smoothly."</p>
        </div>
      </div>

      <div className="mx-3 w-screen flex flex-nowrap relative z-[1] overflow-x-auto no-scrollbar">
        <div className="flex flex-nowrap space-x-4">
          {feedback.map((card) => (
            <FeedbackCard key={card.id} {...card} />
          ))}
        </div>
      </div>

    </section>
  )
}
