"use client";
import React, { useEffect, useMemo, useState } from "react";
import Header from "@/app/components/Header/Header";
import styles from "./page.module.css";
import { AAA, BBB } from "@/app/data";

const Page = (props) => {
  const id = props.params.id;
  const [currentQuestion, setCurrentQuestion] = useState(0); //現在問題
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [explanation, setExplanation] = useState(null); // 説明

  /** クイズのデータを取得 */
  const questions = useMemo(() => {
    if (id === "special") {
      return AAA;
    } else if (id === "expert") {
      return BBB;
    } else if (id === "professional") {
      return CCC;
    }
  }, [id]);

  /** ヘッダーのタイトルを取得 */
  const title = useMemo(() => {
    if (id === "special") {
      return "スペシャリスト（初級）";
    } else if (id === "expert") {
      return "エキスパート(中級)";
    } else if (id === "professional") {
      return "プロフェッショナル(上級)";
    }
  }, [id]);

  //if文（三項演算子(true・false)
  const handleAnswerOptionClick = (selectedAnswer) => {
    if (selectedAnswer === questions[currentQuestion].answer) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }

    setExplanation(questions[currentQuestion].explanation); // 正解時に解説を表示
  };
  // アロー関数
  const handleRestartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setExplanation(null); // 解説の表示をリセット
  };
  // 三項演算子
  return (
    <div className="container">
      {/* 定義X（何をするか？）＝ 定義Xに何を代入するか？→今回であれば＄{}は文字列を代入*/}
      {/* <Header title={`問題${currentQuestion + 1}`} /> */}
      <Header title={title} />
      {showScore ? (
        <div className={styles.test}>
          <p className={styles.score}>
            得点：{score} / {questions.length}
          </p>
          {questions.map((question, index) => (
            <div key={index}>
              <p>Q.{index + 1}</p> {/* No.1〜No.20を表示 */}
              <p>{question.question}</p>
              <p className={styles.answer}>【解答】 {question.answer}</p>
              <p className={styles.explanation}>
                【解説】{question.explanation}
              </p>
            </div>
          ))}
          {/* 解説の表示 */}
          <button className={styles.restart} onClick={handleRestartQuiz}>
            再挑戦
          </button>{" "}
        </div>
      ) : (
        //問題と選択肢の表示
        <div>
          <h1 className={styles.Q}>Question {currentQuestion + 1}</h1>
          {/* 問題文表示*/}
          <p className={styles.question}>
            {questions[currentQuestion].question}
          </p>
          {/* 選択肢表示 */}
          <div className={styles.options}>
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                className={styles.button}
                onClick={() => handleAnswerOptionClick(option)}
              >
                {/*番号と選択を表示 } */}
                {`${index + 1}. ${option}`}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
