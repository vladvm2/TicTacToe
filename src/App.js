import React, { useState, useEffect } from 'react';
import './App.css'; // Asigură-te că ai acest fișier CSS în proiect

const App = () => {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [isPlayerTurn, setIsPlayerTurn] = useState(true);
    const [gameOver, setGameOver] = useState(false);

    const computerMove = () => {
        let availablePositions = board.map((val, idx) => val === null ? idx : null).filter(val => val !== null);
        if (availablePositions.length === 0) return;

        let randomPos = availablePositions[Math.floor(Math.random() * availablePositions.length)];
        let newBoard = [...board];
        newBoard[randomPos] = 'O';
        setBoard(newBoard);
        setIsPlayerTurn(true);
    };

    const handlePress = (index) => {
        if (board[index] !== null || !isPlayerTurn || gameOver) return;

        let newBoard = [...board];
        newBoard[index] = 'X';
        setBoard(newBoard);
        setIsPlayerTurn(false);
    };

    const checkGameOver = () => {
        const winLines = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];
        for (let i = 0; i < winLines.length; i++) {
            const [a, b, c] = winLines[i];
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a];
            }
        }
        if (!board.includes(null)) {
            return 'E';
        }
        return null;
    };

    useEffect(() => {
        const winner = checkGameOver();
        if (winner) {
            alert(winner === 'E' ? 'Egalitate!' : `Castigatorul este: ${winner}`);
            setGameOver(true);
        } else if (!isPlayerTurn && !gameOver) {
            setTimeout(computerMove, 500);
        }
    }, [board, isPlayerTurn, gameOver]);

    const resetGame = () => {
        setBoard(Array(9).fill(null));
        setIsPlayerTurn(true);
        setGameOver(false);
    };

    const renderCell = (index) => {
        return (
            <button className="cell" onClick={() => handlePress(index)}>
                {board[index]}
            </button>
        );
    };

    return (
        <div className="game-container">
            <div className="game-board">
                {Array.from({ length: 9 }).map((_, index) => renderCell(index))}
            </div>
            <button className="reset-button" onClick={resetGame}>Reset Game</button>
            {!gameOver && (
                <p className="status-message">
                    {isPlayerTurn ? 'Randul tau' : 'Randul calculatorului'}
                </p>
            )}
        </div>
    );
};

export default App;
