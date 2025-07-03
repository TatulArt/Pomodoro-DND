import styles from "./page.module.css";
import Timer from "./components/timer/timer";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Timer />
      </main>
    </div>
  );
}
