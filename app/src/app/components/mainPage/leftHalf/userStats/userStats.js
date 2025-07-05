import React from "react";
import styles from "./userStats.module.css";

const userStats = {
    Strength: 14,
    Dexterity: 12,
    Constitution: 13,
    Intelligence: 16,
    Wisdom: 11,
    Charisma: 15,
};

export default function Profile() {
  return (
      <div className={styles["user-stats-container"]}>
        <h3 className={styles["user-stats-title"]}>
          Stats
        </h3>
        <table className={styles["user-stats-table"]}>
          <tbody>
            {Object.entries(userStats).map(([stat, value]) => (
              <tr key={stat}>
                <td className={styles["user-stats-stat-name"]}>
                  {stat}
                </td>
                <td className={styles["user-stats-stat-value"]}>
                  {value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  );
}
