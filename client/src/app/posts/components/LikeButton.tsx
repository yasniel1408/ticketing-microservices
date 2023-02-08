"use client"; // Para poder usar hooks desde el cliente debemos agregar este string al inicio
import { useState } from "react";
import styles from "./LikeButton.module.css";


export const LikeButton = () => {
  const [like, setLike] = useState(0);

  const handleClick = (event: any) => {
    event.preventDefault();
    setLike(like + 1);
  };

  return (
    <button className={styles.button} onClick={handleClick}>
      LikeButton = {like}
    </button>
  );
};
