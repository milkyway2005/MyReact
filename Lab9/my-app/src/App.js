import './App.css';
import { useState, useEffect } from 'react';

const CitySelect = () => {
	const cities = ['Москва', 'Санкт-Петербург', 'Рио-де-Жанейро', 'Лондон', 'Париж'];
	const [selectedCity, setSelectedCity] =useState('');

	const handleCityChange = (event) => {
		setSelectedCity(event.target.value);
	};

	return (
	<div className="block">
		<select value={selectedCity} onChange={handleCityChange}>
			<option value="">Выберите город</option>
			{cities.map((city, index) => (
				<option key={index} value={city}>
					{city}
				</option>
			))}
		</select>
		{selectedCity !== 'Рио-де-Жанейро' && <p>Нет, это не Рио-де-Жанейро!</p>}
	</div>
	);
};
		
const operations = [
	{ id: 1, label: '+', value: '+' },
	{ id: 2, label: '-', value: '-' },
	{ id: 3, label: '*', value: '*' },
	{ id: 4, label: '/', value: '/' },
];

function Calculator() {
	const [num1, setNum1] = useState('');
	const [num2, setNum2] = useState('');
	const [selectedOperation, setSelectedOperation] = useState(operations[0]);
	const [result, setResult] = useState('');

	const calculateResult = () => {
	const n1 = parseFloat(num1);
	const n2 = parseFloat(num2);

	if (isNaN(n1) || isNaN(n2)) {
		setResult('Введите корректные числа');
		return;
	}

	switch (selectedOperation.value) {
		case '+':
			setResult(`${n1} + ${n2} = ${n1 + n2}`);
			break;
		case '-':
			setResult(`${n1} - ${n2} = ${n1 - n2}`);
			break;
		case '*':
			setResult(`${n1} * ${n2} = ${n1 * n2}`);
			break;
		case '/':
			if (n2 === 0) {
				setResult('Деление на ноль невозможно');
			} else {
				setResult(`${n1} / ${n2} = ${n1 / n2}`);
			}
			break;
		default:
			setResult('');
		}
	};

	return (
		<div className="block">
			<input type="number" value={num1} onChange={(e) => setNum1(e.target.value)}/>
			<select value={selectedOperation.value} onChange={(e) =>
				  setSelectedOperation(
					operations.find((op) => op.value === e.target.value)
				  )}>
				{operations.map((op) => (
				<option key={op.id} value={op.value}>
					{op.label}
				</option>
				))}
			</select>
			<input type="number" value={num2} onChange={(e) => setNum2(e.target.value)}/>
			<button onClick={calculateResult}>Рассчитать</button>
			<p>{result}</p>
		</div>
	);
}
		
const Calculator2 = () => {
	const systemsOfNumbering = ['2', '8', '16'];
	const [inputNumber, setInputNumber] = useState('');
	const [selectedSystem, setSelectedSystem] = useState(systemsOfNumbering[0]);
	const [result, setResult] = useState('');

	const convertNumber = (number, toSystem) => {
		switch (toSystem) {
			case '2':
				return parseInt(number).toString(2);
			case '8':
				return parseInt(number).toString(8);
			case '16':
				return parseInt(number).toString(16);
			default:
				return number;
		}
	};

	const handleConvert = () => {
		const converted = convertNumber(inputNumber, selectedSystem);
		setResult(converted);
	};

	return (
		<div className="block">
			<input type="text" value={inputNumber} onChange={(e) => setInputNumber(e.target.value)}/>
			<span> В 10 системе </span>
			<button onClick={handleConvert}>Convert</button>
			<br/>
			<input type="text" value={result}/>
			<span> В </span>
			<select value={selectedSystem} onChange={(e) => setSelectedSystem(e.target.value)}>
				{systemsOfNumbering.map((system, index) => (
					<option key={index} value={system}>
					{system}
					</option>
				))}
			</select>
			<span> системе</span>
		</div>
	);
};
		
const BirthdateCalculator = () => {
	const [birthdate, setBirthdate] = useState('');
	const [secondsLived, setSecondsLived] = useState(0);

	const calculateSecondsLived = (dateString) => {
		const birthDate = new Date(dateString);
		const now = new Date();
		let diff = now - birthDate;
		diff /= 1000; // Переводим в секунды
		return diff;
	};

	useEffect(() => {
		const intervalId = setInterval(() => {
			setSecondsLived(calculateSecondsLived(birthdate));
		}, 1000);

		return () => clearInterval(intervalId);
	}, [birthdate]);

	const handleBirthdateChange = (e) => {
		const dateString = e.target.value;
		setBirthdate(dateString);
		setSecondsLived(calculateSecondsLived(dateString));
	};

	return (
		<div className="block">
			<label htmlFor="birthdate">Дата рождения :</label>
			<input type="date" id="birthdate" value={birthdate} onChange={handleBirthdateChange}/>
			<p>Вы прожили: {secondsLived.toFixed(0)} секунд.</p>
		</div>
	);
};
		
const NumbersSorting = () => {
	const [numbers, setNumbers] = useState([]);
	const [inputValue, setInputValue] = useState('');
	const [filter, setFilter] = useState('Все');

	const filters = ['Все', 'Чётные', 'Нечётные'];

	const handleInputChange = (event) => {
		setInputValue(event.target.value);
	};

	const handleAddNumber = () => {
		setNumbers([...numbers, Number(inputValue)]);
		setInputValue('');
	};

	const handleFilterChange = (event) => {
		setFilter(event.target.value);
	};

	const filteredNumbers = numbers.filter((number) => {
		if (filter === 'Чётные' && number % 2 === 0) return true;
		if (filter === 'Нечётные' && number % 2 !== 0) return true;
		return filter === 'Все';
	});

	return (
		<div className="block">
			<input type="number" value={inputValue} onChange={handleInputChange} />
			<button onClick={handleAddNumber}>+</button>
			<div>
				{filteredNumbers.map((number, index) => (
					<span key={index}>{number} </span>
				))}
			</div>
			<div>
				{filters.map((filterOption) => (
					<label key={filterOption}>
						<input type="checkbox" value={filterOption} checked={filter === filterOption}
						onChange={handleFilterChange}/>
					{filterOption}
					</label>
				))}
			</div>
		</div>
	);
};



const RegistrationForm = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [usernameError, setUsernameError] = useState('');
	const [passwordError, setPasswordError] = useState('');
	const [confirmPasswordError, setConfirmPasswordError] = useState('');

	const validateUsername = () => {
		if (!username) {
			setUsernameError('Логин обязателен');
		} else if (username.length < 6 || username.length > 20) {
			setUsernameError('Логин должен содержать от 6 до 20 символов');
		} else if (!/^[A-Za-z0-9]+$/.test(username)) {
			setUsernameError('Логин может содержать только латинские буквы и цифры');
		} else {
			setUsernameError('');
		}
	};

	const validatePassword = () => {
		if (!password) {
			setPasswordError('Пароль обязателен');
		} else {
			setPasswordError('');
		}
	};

	const validateConfirmPassword = () => {
		if (!confirmPassword) {
			setConfirmPasswordError('Поле "Повтор пароля" обязательно');
		} else if (confirmPassword !== password) {
			setConfirmPasswordError('Пароли не совпадают');
		} else {
			setConfirmPasswordError('');
		}
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		validateUsername();
		validatePassword();
		validateConfirmPassword();

		if (!usernameError && !passwordError && !confirmPasswordError) {
			console.log('Успешная регистрация');
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<label>
				Логин:
				<input type="text" value={username} onChange={(e) => setUsername(e.target.value)}
				  onBlur={validateUsername}/>
				<br/>
				{usernameError && <div className="error">{usernameError}</div>}
			</label>
			<label>
				Пароль:
				<input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
				  onBlur={validatePassword}/>
				<br/>
				{passwordError && <div className="error">{passwordError}</div>}
			</label>
			<label>
				Повтор пароля:
				<input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
				  onBlur={validateConfirmPassword}/>
				{confirmPasswordError && <div className="error">{confirmPasswordError}</div>}
			</label>
			<br/>
			<button type="submit">Зарегистрироваться</button>
		</form>
	);
};



const ProfileForm = () => {
	const [firstName, setFirstName] = useState('');
	const [middleName, setMiddleName] = useState('');
	const [lastName, setLastName] = useState('');
	const [birthDate, setBirthDate] = useState('');
	const [address, setAddress] = useState('');
	const [errors, setErrors] = useState({});

	const validateName = (name) => {
		return name.length > 0;
	};

	useEffect(() => {
		validateForm();
	}, [firstName, middleName, lastName, birthDate, address]);

	const validateForm = () => {
		const newErrors = {};

		if (!validateName(firstName)) {
			newErrors.firstName = 'Обязательное поле';
		}

		if (!validateName(middleName)) {
			newErrors.middleName = 'Обязательное поле';
		}

		if (!validateName(lastName)) {
			newErrors.lastName = 'Обязательное поле';
		}

		setErrors(newErrors);

		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const isValid = validateForm();

		if (isValid) {
			console.log('Form submitted:', {
				firstName,
				middleName,
				lastName,
				birthDate,
				address,
			});
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<div>
				<label htmlFor="firstName">Имя:</label>
				<input type="text" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)}
				  onBlur={() => validateName(firstName)}/>
				{errors.firstName && <div className="error">{errors.firstName}</div>}
			</div>
			<div>
				<label htmlFor="middleName">Отчество:</label>
				<input type="text" id="middleName" value={middleName} onChange={(e) => setMiddleName(e.target.value)}
				  onBlur={() => validateName(middleName)}/>
				{errors.middleName && <div className="error">{errors.middleName}</div>}
			</div>
			<div>
				<label htmlFor="lastName">Фамилия:</label>
				<input type="text" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)}
				  onBlur={() => validateName(lastName)}/>
				{errors.lastName && <div className="error">{errors.lastName}</div>}
			</div>
			<div>
				<label htmlFor="birthDate">Дата рождения:</label>
				<input type="date" id="birthDate" value={birthDate}
				  onChange={(e) => setBirthDate(e.target.value)}/>
			</div>
			<div>
				<label htmlFor="address">Адрес:</label>
				<input type="text" id="address" value={address}
				  onChange={(e) => setAddress(e.target.value)}/>
			</div>
			<button type="submit">Сохранить</button>
		</form>
	);
};

function App() {
  return (
    <div className="App">
		<div className="Ex">
			<CitySelect /><Calculator /><Calculator2 />
				<BirthdateCalculator /><NumbersSorting />
		</div>
		
		<div className="Ex">
			<RegistrationForm />
		</div>
		
		<div className="Ex">
			<ProfileForm />
		</div>
    </div>
  );
}

export default App;
