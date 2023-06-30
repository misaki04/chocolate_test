import styles from "./page.module.css";
import Link from "next/link";
import Image from "next/image";
import Cacao from "../app/images/Cacao.jpg";
import Cacao1 from "../app/images/Cacao1.jpg";

export default function Home() {
  return (
    <main>
      <div className={styles.contents}>
        <header className={styles.header}>
          <Image className={styles.headerImg} src={Cacao} alt="カカオ" />
        </header>
        <div className={styles.title}>
          <h1>チョコレート検定</h1>
          <Image className={styles.img} src={Cacao1} alt="チョコレート" />
        </div>
        <Link className={styles.button} href={"../Item"}>
          START
        </Link>
      </div>
    </main>
  );
}
