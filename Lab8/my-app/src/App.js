import './App.css';
import { useState, useEffect } from 'react';

function Timer1(){
	const [time, setTime] = useState(10);
	useEffect(() => {
		const timerId = setInterval(
			() => {
			if (time > 0) {
				setTime(time => time - 1);
			}
			clearInterval(timerId)},
			1000
		);
		return () => clearInterval(timerId);
	}, [time]);
			
	return <>{time}</>;
}
		
function Timer2(){
	const [time, setTime] = useState(0);
	useEffect(() => {
		const timerId = setInterval(
			() => setTime(time => time + 1), 1000);
		return () => clearInterval(timerId);
	}, []);
			
	return <>{time}</>;
}
function ShowTimer2(){
	const [running, setRunning] = useState(false);
	return (
		<div>
			<button onClick = {() => setRunning(!running)}>Старт</button>
			{running && <Timer2 />}
		</div>
	)
}
		
function PrimeNumbers() {
	const [primeNumbers, setPrimeNumbers] = useState([]);

	useEffect(() => {
	const intervalId = setInterval(() => {
		const newPrimeNumber = generateNextPrimeNumber(primeNumbers[primeNumbers.length - 1]);
		setPrimeNumbers(prevNumbers => [...prevNumbers, newPrimeNumber]);
	}, 1000);

	return () => {
		clearInterval(intervalId);
		};
	}, [primeNumbers]);

	return (
	<div>
		<h1>Простые числа:</h1>
		<p>{primeNumbers.join(', ')}</p>
	</div>
	);
}
function generateNextPrimeNumber(lastPrimeNumber) {
	let nextNumber = lastPrimeNumber ? lastPrimeNumber + 1 : 2;

	while (!isPrime(nextNumber)) {
		nextNumber++;
	}

	return nextNumber;
}
function isPrime(num) {
	if (num <= 1) return false;
	for (let i = 2, sqrt = Math.sqrt(num); i <= sqrt; i++)
	if (num % i === 0) return false;
	return true;
}
		
function TrafficLight(){
	const [activeColor, setActiveColor] = useState('red');
	useEffect(() => {
	const intervalId = setInterval(() => {
		setActiveColor((prevColor) => {
		if (prevColor === 'red') return 'yellow';
		if (prevColor === 'yellow') return 'green';
		return 'red';
		});
	}, 1000);

	return () => clearInterval(intervalId);
	}, []);

	const getColorStyle = (color) => ({
		backgroundColor: color,
		opacity: color === activeColor ? 1 : 0.3,
	});

	return (
	<div className="traffic-light">
		<div className="circle" style={getColorStyle('red')}></div>
		<div className="circle" style={getColorStyle('yellow')}></div>
		<div className="circle" style={getColorStyle('green')}></div>
	</div>
	);
}
		
function Revert({ s }){
	const [revertedString, setRevertedString] = useState(s);

	useEffect(() => {
		const intervalId = setInterval(() => {
		const lastChar = revertedString.slice(-1);
		const newString = lastChar + revertedString.slice(0, -1);
		setRevertedString(newString);
		}, 1000);

		return () => clearInterval(intervalId);
	}, [revertedString]);

	return (
		<div>
			<h2>{revertedString}</h2>
		</div>
	);
}

function App() {
  return (
    <div className="App">
		<><Timer1 /><ShowTimer2 /><PrimeNumbers /><TrafficLight />
			<Revert s="привет!" /></>
    </div>
  );
}

export default App;
