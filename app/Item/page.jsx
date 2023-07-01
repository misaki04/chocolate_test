import React from "react";
import styles from "./page.module.css";
import Link from "next/link";
import Header from "../components/Header";
import { contents } from "../contents";

export default function item() {
  return (
    <div>
      <Header title="項 目" />
      <ul className={styles.ul}>
        {contents.map((list, index) => {
          return (
            <div class={styles.listItem} key={index}>
              <div>★</div>
              <Link
                key={index}
                className={styles.button}
                as={`../contents/${list.url}`}
                href={`../contents/${list.url}`}
              >
                {list.text}
              </Link>
            </div>
          );
        })}
      </ul>
    </div>
  );
}