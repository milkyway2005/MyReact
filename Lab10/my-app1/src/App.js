import './App.css';
import { useState, useEffect } from 'react';


const URL = "https://jsonplaceholder.typicode.com";
function Task1(){
	const [error, setError] = useState("");
	const [id, setId] = useState("");
	const [title, setTitle] = useState("");
	const [body, setBody] = useState("");
	const [userId, setUserId] = useState("");
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
			
	const handlerSubmit = async (e) => {
		e.preventDefault();
		setError("");
				
		try{
			const response = await fetch(`${URL}/posts/${id}`);
			if(response.status !== 200){
				throw Error("404 error");
			}
			const data = await response.json();
			setTitle(data.title);
			setBody(data.body);
			setUserId(data.userId);
					
			const responseUser = await fetch(`${URL}/users/${userId}`);
			if(responseUser.status !== 200){
				throw Error("404 error");
			}
			const dataUser = await responseUser.json();
			setName(dataUser.name);
			setEmail(dataUser.email);
		} catch (e){
			setError(e.message);
			setId("");
			setTitle("");
			setBody("");
			setUserId("");
			setName("");
			setEmail("");
		}
	};
			
	return <>
		<div>
			<form onSubmit={handlerSubmit}>
				<input value = {id} onChange = {e => setId(e.target.value)}/>
				<button>Получить данные</button>
			</form>
		</div>
		{error && <div>{error}</div>}
		{id && <div>
			<p><b>{title}</b></p>
			<p>{body}</p>
			<p><b>{name}</b></p>
			<p>{email}</p>
		</div>}
	</>
}

function App() {
  return (
    <div className="App">
		<Task1 />
    </div>
  );
}

export default App;
