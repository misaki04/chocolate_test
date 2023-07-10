"use client";
import React, { useMemo, useState } from "react";
import Header from "@/app/components/Header/Header";
import styles from "./page.module.css";
import { special, expert, professional } from "@/app/data";

const Page = (props) => {
  const id = props.params.id;
  const [currentQuestion, setCurrentQuestion] = useState(0); //現在問題
  const [correctAnswers, setCorrectAnswers] = useState([]); //正解の回答
  const [userAnswers, setUserAnswers] = useState([]); //ユーザーの回答
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [explanation, setExplanation] = useState(null); // 説明

  /** クイズのデータを取得 */
  const questions = useMemo(() => {
    if (id === "special") {
      return special;
    } else if (id === "expert") {
      return expert;
    } else if (id === "professional") {
      return professional;
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
  //ユーザーが選択した回答が正解かどうか判定するための処理
  const handleAnswerOptionClick = (selectedAnswer) => {
    const currentQuestionData = questions[currentQuestion];
    const isCorrectAnswer = selectedAnswer === currentQuestionData.answer;

    // 正解と回答を配列に追加
    setCorrectAnswers([...correctAnswers, currentQuestionData.answer]);
    setUserAnswers([...userAnswers, selectedAnswer]);

    // スコアを加算する為の処理
    if (isCorrectAnswer) {
      setScore(score + 1);
    }
    // 問題を出題するか最終問題でスコアを表示するか制御
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
    // 正解時に解説を表示
    setExplanation(questions[currentQuestion].explanation);
  };
  // クイズをリスタートするための処理（
  const handleRestartQuiz = () => {
    setCurrentQuestion(0); // 問題番号をリセット
    setScore(0); // スコアをリセット
    setShowScore(false); // スコアの表示状態をリセット
    setExplanation(null); // 解説の表示をリセット
  };

  return (
    <div>
      {/* 定義X（何をするか？）＝ 定義Xに何を代入するか？→今回であれば＄{}は文字列を代入*/}
      <Header title={title} />
      {showScore ? (
        // スコアの表示
        <div className={styles.test}>
          <div className={styles.result}>
            {/* 得点の表示 */}
            <p className={styles.score}>
              得点：{score} / {questions.length}
            </p>
            {/* 再挑戦ボタンの表示 */}
            <button className={styles.restart} onClick={handleRestartQuiz}>
              再挑戦
            </button>
          </div>
          {/* 問題ごとの結果を表示 */}
          {questions.map((question, index) => (
            <div className={styles.container} key={index}>
              {/* 問題番号と問題文の表示 */}
              <p>
                Q.{index + 1} {question.question}
              </p>
              {/* ユーザーの回答を表示 */}
              <p>【回答】{userAnswers[index]}</p>
              {/* 正解の表示 */}
              <p className={styles.answer}>【正解】 {correctAnswers[index]}</p>
              {/* 解説の表示 */}
              <p className={styles.explanation}>
                【解説】{question.explanation}
              </p>
            </div>
          ))}
        </div>
      ) : (
        //問題と選択肢の表示
        <div>
          <h1 className={styles.Q}>Question {currentQuestion + 1}</h1>
          {/* 問題文の表示*/}
          <p className={styles.question}>
            {questions[currentQuestion].question}
          </p>
          {/* 選択肢の表示 */}
          <div className={styles.options}>
            {/* {questions[currentQuestion].options.map((option, index) => ( */}
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
