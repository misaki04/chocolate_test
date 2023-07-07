"use client";
import styles from "./page.module.css";
import Header from "../components/Header/Header";

//     //  ①ここはヘッダー
//     //  ②メインエリア
//     //  ③問題文
//     //  ④選択するボタン

import React, { useState } from "react";
import { questions } from "../data";

// 関数
export default function QuizApp() {
  const [currentQuestion, setCurrentQuestion] = useState(0); //現在問題
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [explanation, setExplanation] = useState(null); // 説明
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
      <Header title={`スペシャリスト（初級)`} />
      {showScore ? (
        <div className={styles.test}>
          <p>
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
}
