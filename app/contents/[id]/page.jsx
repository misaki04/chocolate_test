"use client";
import React, { useState } from "react";
import Header from "@/app/components/Header";
import styles from "./page.module.css";
import Link from "next/link";

//薄い水色(キー）：オレンジ（バリュー）ITEMS （定数）で渡す
const ITEMS = [
  {
    title: "スペシャルリスト（初級）",
    id: "special",
    message: `生産現場から最終商品に至る、カカオやチョコレートに関する幅広い知識を習得し、自らのチョコレートの世界を広げる事ができる方向けの初級レベル。`,
  },

  {
    title: "エキスパート(中級)",
    id: "expert",
    message: `カカオやチョコレートに関する幅広い知識をもとに、友人・知人など自らが所属するコミュニケーションにチョコレートの楽しみの世界を広げる活動を行うことができる傾けの中級レベル。`,
  },

  {
    title: "プロフェッショナル(上級)",
    id: "professional",
    message:
      "カカオやチョコレートに関する幅広く、専門的な知識を持ち、自らチョコレート文化を世の中に発信できる。チョコレート好きの頂点を目指す方向け の上級レベル。",
  },
];

function Page(props) {
  console.log(props);
  // 下記、idは箱 = props(プロパティー)・params（回転）・id 23行目<Linkのas=..{list.url}の順番に出力している
  const id = props.params.id;
  const data = ITEMS.find((item) => item.id === id);
  console.log("データの形は？", data);
  const [selectedText, setSelectedText] = useState("");
  // console.logはpropsが下記のバリューとあっているか確かめるために実行している。

  return (
    <div>
      <Header title={data.title} />
      <h3 className={styles.contents}>出題内容</h3>
      <p className={styles.text}>{data.message}</p>
      <Link href="/" className={styles.button}>
        ２０問
      </Link>
    </div>
  );
}

export default Page;
