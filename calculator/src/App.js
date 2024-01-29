import React, { useState } from 'react';
import styles from './App.module.css';
import * as math from 'mathjs';

function App() {
	const NUMS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
	const operators = ['+', '-', '=', 'C'];
	const [currentExpression, setCurrentExpression] = useState('0');
	const [isResult, setIsResult] = useState(false);
	const [isNewExpression, setIsNewExpression] = useState(false);

	const handleClickOperators = (symbol) => {
		setIsResult(false);
		if (symbol === 'C') {
			setCurrentExpression('0');
			setIsNewExpression(true);
		} else if (symbol === '+' || symbol === '-') {
			setIsNewExpression(false);
			setCurrentExpression((prevExpression) => {
				const lastChar = prevExpression.slice(-1);
				if (lastChar === '+' || lastChar === '-') {
					return prevExpression.slice(0, -1) + symbol;
				} else {
					return prevExpression + symbol;
				}
			});
		} else if (symbol === '=') {
			const result = math.evaluate(currentExpression).toString();
			setCurrentExpression(result);
			setIsResult(true);
			setIsNewExpression(true);
		}
	};

	const handleClickNums = (symbol) => {
		if (isNewExpression) {
			setCurrentExpression((prevExpression) => (prevExpression = symbol));
			setIsNewExpression(false);
			setIsResult(false);
		} else {
			setCurrentExpression((prevExpression) =>
				prevExpression === '0' ? symbol : prevExpression + symbol,
			);
		}
	};

	return (
		<div className={styles.app}>
			<h1 className={styles.appHeader}>Калькулятор</h1>

			<div className={styles.container}>
				<div
					className={`${styles.containerOutput} ${
						isResult ? styles.result : ''
					}`}
				>
					{currentExpression}
				</div>
				{NUMS.map((el) => (
					<button
						key={el}
						className={styles.containerButtons}
						onClick={() => handleClickNums(el)}
					>
						{el}
					</button>
				))}
				{operators.map((el) => (
					<button
						key={el}
						className={styles.containerButtons}
						onClick={() => handleClickOperators(el)}
					>
						{el}
					</button>
				))}
			</div>
		</div>
	);
}

export default App;
