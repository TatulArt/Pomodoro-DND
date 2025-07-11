'use client';

import styles from "./page.module.css";
import Timer from "../components/mainPage/rightHalf/timer/timer";
import Profile from "../components/mainPage/leftHalf/profile/profile";
import UserStats from "../components/mainPage/leftHalf/userStats/userStats";
import TaskSelector from "../components/mainPage/rightHalf/taskSelector/taskSelector";
import Link from "next/link";
import { useAuth } from "../AuthContext";

export default function Home() {
  const { isLoggedIn } = useAuth();

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles['main-page-container']}>
          <div className={styles['main-page-container-left']}>
            {isLoggedIn && <div>
              <Profile />
              <UserStats /> 
            </div>}
            
            {!isLoggedIn && <div className={styles['not-logged-in-container']}>
              <div className={styles['not-logged-in-container-text']}>
                <h1 className={styles['not-logged-in-container-text-title']}>
                  Добро пожаловать в <span>PomodoroDND</span>
                </h1>
                <p>
                  PomodoroDND - это приложение для управления задачами и планирования времени с использованием метода помидора и возможностью прокачки навыков.
                </p>
              </div>
              <Link href="/authPage">
                <button className={styles['register-button']}>
                  Зарегистрироваться/Войти
                </button>
              </Link>
            </div>}

          </div>
          <div className={styles['main-page-container-right']}>
            <Timer />
            {isLoggedIn && <TaskSelector />}
            {!isLoggedIn && <div className={styles['not-logged-in-timer-text']}>
                <p>Чтобы использовать выбор задач, вам нужно зарегистрироваться</p>
            </div>}
          </div>
        </div>
      </main>
    </div>
  );
}
