import React, { useState, useEffect } from "react";
import { shuffle } from 'lodash';
import he from 'he';
import Axios from "axios";
import Card from "./cards";
import Options from "./options";
import QuestionNum from "./question-num";
import FinalScreen from "../final";

export default function MCQ({ topicId, questionCount }) {

    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [showFinalScreen, setShowFinalScreen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [showNextQuestion, setShowNextQuestion] = useState(false);

    useEffect(() => {

        const getQuestions = () => {
            Axios.get(
              `https://opentdb.com/api.php?amount=${questionCount}&category=${topicId}&type=multiple`
            ).then((response) => {
                const questionsData = response.data.results.map((question) => {
                    const correctAnswer = he.decode(question.correct_answer.trim());
                    const allOptions = [...question.incorrect_answers, correctAnswer];
                    const shuffledOptions = shuffle(allOptions);
                    return {
                        ...question,
                        correctAnswer,
                        options: shuffledOptions,
                    };
                });
                setQuestions(questionsData);
            });
        };

        (questions.length === 0 && getQuestions());

    }, [questions, topicId, questionCount]);

    const currentQuestion = questions[currentQuestionIndex];

    const handleQuestion = (selectedAnswer) => {
        setSelectedOption(selectedAnswer);
        setShowNextQuestion(true);
        setTimeout(() => {
            if (selectedAnswer === currentQuestion.correctAnswer) {
              setScore((prevScore) => prevScore + 1);
            }
            if (currentQuestionIndex < questions.length - 1) {
              setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
              setSelectedOption(null);
              setShowNextQuestion(false);
            } else {
              setShowFinalScreen(true);
            }
        }, 100);
    };

    if (questions.length === 0 || !currentQuestion) {
        return (
            <div className="flex h-screen">
                <div className="m-auto xl:w-[65%] lg:w-[75%] md:w-[87.5%] sm:w-[92.5%] flex flex-col justify-center items-center">
                    <h2 className="tracking-wide text-lg font-semibold">Loading Questions...</h2>
                </div>
            </div>
        );
    }

    return showFinalScreen ? (
        <FinalScreen score={score} />
    ) : (
        <div className="flex h-screen">
            <div className="m-auto xl:w-[65%] lg:w-[75%] md:w-[87.5%] sm:w-[92.5%]">
                <Card question={he.decode(currentQuestion.question)} />
                <div className="mt-12 mb-5">
                    {currentQuestion.options.map((option, index) => {
                        const isCorrect = option === currentQuestion.correctAnswer;
                        const isSelected = option === selectedOption;
                        const optionClassName = isSelected
                          ? isCorrect
                              ? "bg-green-600 bg-green-700 ring-4 ring-green-800"
                              : "bg-red-600 bg-red-700 ring-4 ring-red-800"
                          : "bg-white border border-gray-200 hover:bg-gray-100";
                        return (
                            <Options key={index} option={he.decode(option.trim())} onClick={() => handleQuestion(option)} className={optionClassName} disabled={showNextQuestion} />
                        );
                    })}
                </div>
                <QuestionNum num={currentQuestionIndex + 1} count={questionCount} />
            </div>
        </div>
    );

}