import React, { useState } from "react";
import Topics from "../topics";

export default function FinalScreen({ score }) {

    const [newGame, setNewGame] = useState(false);

    const handleNewGame = () => {
      setNewGame(true);
    };

    return newGame ?
      <Topics /> :
      (
          <div className="flex h-screen">
              <div className="m-auto xl:w-[65%] lg:w-[75%] md:w-[87.5%] sm:w-[92.5%] text-center flex flex-col items-center justify-center">
                  <h5 className="text-3xl font-semibold tracking-wide text-gray-900 my-10">Your Final Score Is: {score}</h5>
                  <button className="text-white focus:outline-none ring-4 font-medium rounded-full text-lg px-7 py-3 text-center mr-2 mb-2 bg-green-600 hover:bg-green-700 ring-green-800" onClick={handleNewGame}>Begin New Quiz</button>
              </div>
          </div>
      );

}