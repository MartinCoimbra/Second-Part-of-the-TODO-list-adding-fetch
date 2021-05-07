import React, { useState, useEffect } from "react";
import { List } from "./list.js";

export function Home() {
	const [tarea, setTarea] = useState([""]);
	const [tareasPendientes, setTareasPendientes] = useState([]);

	/* ************************* METODO GET ************************* */

	const getData = () => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/martinCoimbra")
			.then(resp => resp.json())
			.then(resp => setTareasPendientes(resp))
			.catch(error => console.log(true));
	};
	useEffect(() => {
		getData();
	}, []);
	/* ***************************************************************************** */

	/* ************************* METODO PUT ************************* */
	var myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");

	var raw = JSON.stringify(tareasPendientes);
	var requestOptions = {
		method: "PUT",
		headers: myHeaders,
		body: raw,
		redirect: "follow"
	};

	fetch(
		"https://assets.breatheco.de/apis/fake/todos/user/martinCoimbra",
		requestOptions
	)
		.then(response => response.text())
		.then(result => console.log(result))
		.catch(error => console.log("error", error));

	/* ***************************************************************************** */

	const borrarIDElement = idelement => {
		let newArray = [];
		console.log("tus tareas eran" + tareasPendientes);
		tareasPendientes.filter(function(element, i) {
			if (i != idelement) {
				newArray.push(element);
			}
		});
		setTareasPendientes(newArray);
		return console.log("Ahora tus tareas son:" + newArray);
	};
	const agregarTarea = e => {
		e.preventDefault();
		if (tarea != "") {
			setTareasPendientes([
				{ label: tarea, done: false },
				...tareasPendientes
			]);
			console.log(tareasPendientes);
			setTarea([""]);
		}
	};

	return (
		<div className=" mt-5">
			<div className="row justify-content-center">
				<div className="col-12 text-center">
					<h1 className="text-primary">Tareas</h1>
				</div>
				<div className="col-12 text-center">
					Tienes {tareasPendientes.length} tareas pendientes
				</div>
				<form onSubmit={agregarTarea} className="col-4">
					<input
						type="text"
						className="form-control mx-0"
						placeholder="Ingrese su tarea"
						onChange={e => setTarea(e.target.value)}
						value={tarea}
					/>
				</form>
			</div>
			<div className="row justify-content-center">
				<div className="col-4">
					<ul className="list-group">
						{/* Aqui el .map */}
						{tareasPendientes.map((element, i) => {
							return (
								<List
									key={i}
									tareasPendientes={element.label}
									idBorrar={i}
									borrarIDElement={borrarIDElement}
								/>
							);
						})}
					</ul>
				</div>
			</div>
		</div>
	);
}
