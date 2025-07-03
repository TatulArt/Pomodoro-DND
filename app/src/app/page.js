import styles from "./page.module.css";
import Timer from "./components/timer/timer";
import Profile from "./components/profile/profile";
import UserStats from "./components/userStats/userStats";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles['main-page-container']}>
          <Profile /> 
          <Timer />
          <UserStats />
        </div>
      </main>
    </div>
  );
}
