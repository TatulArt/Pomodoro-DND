import styles from "./page.module.css";
import Timer from "../components/mainPage/rightHalf/timer/timer";
import Profile from "../components/mainPage/leftHalf/profile/profile";
import UserStats from "../components/mainPage/leftHalf/userStats/userStats";
import TaskSelector from "../components/mainPage/rightHalf/taskSelector/taskSelector";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles['main-page-container']}>
          <div className={styles['main-page-container-left']}>            
            <Profile />
            <UserStats /> 
          </div>
          <div className={styles['main-page-container-right']}>
            <Timer />
            <TaskSelector />
          </div>
        </div>
      </main>
    </div>
  );
}
