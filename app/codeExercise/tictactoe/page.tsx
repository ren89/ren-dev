"use client";
import { Alert } from "@/components/shared/alert";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";

/*
TODO: 
  - vs. computer mode 
    - easy, randomized empty squares
    - middle,  block player & randomize empty squares
    - hard,  block player & computer will fill winning squares
    - impossible,  best course of action
*/

export default function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<"X" | "O">("X");

  const handleClick = (index: number) => {
    const newBoard = [...board];
    if (newBoard[index] || calculateWinner(newBoard)) return;
    newBoard[index] = currentPlayer;
    setBoard(newBoard);
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  };

  const calculateWinner = (squares: string[]) => {
    if (squares.every((square) => square !== null)) {
      return "Draw";
    }

    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const [a, b, c] of lines) {
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }

    return null;
  };

  const winner = calculateWinner(board);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer("X"); //TODO: randomize first player
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <h1 className="text-4xl font-bold mb-6">Tic Tac Toe</h1>
      <div className="text-lg font-medium mb-4">
        Next Player: {currentPlayer}
      </div>
      <div className="grid grid-cols-3 gap-2">
        {board.map((value, index) => (
          <button
            key={index}
            className="w-20 h-20 bg-teal-400/10 text-2xl font-bold flex items-center justify-center text-teal-300 hover:bg-teal-800/10"
            onClick={() => handleClick(index)}
          >
            {value}
          </button>
        ))}
      </div>
      <Button
        className="mt-6 px-4 py-2 bg-[#1e2e54] rounded hover:bg-teal-400/10 hover:text-teal-300"
        onClick={resetGame}
      >
        Reset Game
      </Button>
      <Alert
        isOpen={!!winner}
        onClose={resetGame}
        description={
          <div className="pb-8 text-center">
            {winner === "Draw" ? (
              <>
                <p className="text-3xl text-white font-bold pb-4">
                  🎉 Game Over 🎉
                </p>
                <p className="text-xl">🤝 Its a draw! Well played! 🤝</p>
                <p className="text-xl">
                  👏 Great job! Ready for another round? 👏
                </p>
              </>
            ) : (
              <>
                <p className="text-3xl text-white font-bold pb-4">
                  🎉 Game Over 🎉
                </p>
                <p className="text-xl">
                  🏆 <span className="font-bold">Player {winner}</span> is the
                  winner! 🏆
                </p>
                <p className="text-xl">
                  👏 Great job! Ready for another round? 👏
                </p>
              </>
            )}
          </div>
        }
        actionText="🔄 Play Again"
      />
    </div>
  );
}
