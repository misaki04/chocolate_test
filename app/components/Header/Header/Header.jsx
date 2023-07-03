"use client";
import React from "react";
import styles from "./header.module.css";
import Link from "next/link";
import Image from "next/image";
import Return from "../../images/Return.svg";

const Header = (props) => {
  const title = props.title;
  return (
    <div className={styles.contents}>
      <Link href={title === "項 目" ? "/" : "../Item"}>
        {/* 画像の変更（背景が黒だから項目と統一する） */}
        <Image className={styles.returnImg} src={Return} alt="戻るボタン" />
      </Link>
      <h2 className={styles.names}>{props.title}</h2>
    </div>
  );
};

export default Header;
