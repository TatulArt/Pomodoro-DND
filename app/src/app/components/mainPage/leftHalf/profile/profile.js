import React from "react";
import styles from "./profile.module.css";
import Image from "next/image";

const userProfile = {
  name: "John Doe",
  avatar: "https://i.pravatar.cc/120?img=3",
};

export default function Profile() {
  return (
    <div className={styles["profile-container"]}>
      <Image
        src={userProfile.avatar}
        alt={`${userProfile.name} avatar`}
        className={styles["profile-avatar"]}
        width={120}
        height={120}
      />
      <h2 style={{ fontSize: 22, fontWeight: 600, margin: 0 }}>
        {userProfile.name}
      </h2>
    </div>
  );
}
