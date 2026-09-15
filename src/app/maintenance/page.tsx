import Image from "next/image";
import styles from "./page.module.css";

export default function CampaignHoldingPage() {
  return (
    <main className={styles.page}>
      <Image
        src="https://images.unsplash.com/photo-1549144511-f099e773c147?w=1920&q=80"
        alt=""
        fill
        priority
        sizes="100vw"
        className={styles.background}
      />
      <div className={styles.shade} aria-hidden="true" />
      <section className={styles.content} aria-labelledby="candidate-name">
        <div className={styles.portrait}>
          <Image
            src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/3f1dffb1-af34-4504-ad53-002ab57ea34a/Clarisse-Surin-Barreau-de-Paris-agrandi-1768856738089.png?width=8000&height=8000&resize=contain"
            alt="Clarisse Surin"
            fill
            priority
            sizes="(max-width: 700px) 76vw, 400px"
            className={styles.photo}
          />
        </div>
        <div className={styles.text}>
          <h1 id="candidate-name">Clarisse Surin</h1>
          <p className={styles.role}>Candidate bâtonnière<br />au Barreau de Paris</p>
          <p className={styles.year}>2028</p>
        </div>
      </section>
    </main>
  );
}
