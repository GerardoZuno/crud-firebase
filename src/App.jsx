import React, { useEffect, useState } from "react";
import { firebase } from "./firebase";

function App() {
  const [tareas, setTareas] = useState([]);
  const [tarea, setTarea] = useState("");

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const db = firebase.firestore();
        const data = await db.collection("tareas").get();
        /*console.log(data.docs)*/
        const arrayData = data.docs.map((item) => ({
          id: item.id,
          ...item.data(),
        }));
        console.log(arrayData);
        setTareas(arrayData);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerDatos();
  }, []);

  const agregar = async (e) => {
    e.preventDefault();
    if (!tarea.trim()) {
      console.log("elemento vacio");
      return;
    }
    try {
      const db = firebase.firestore();
      const nuevaTarea = {
        name: tarea,
        fecha: Date.now(),
      };
      //add te da un id aleatorio
      const data = await db.collection("tareas").add(nuevaTarea);
      console.log(data.docs);
      setTareas([
        ...tareas,
        {...nuevaTarea, id: data.id}
      ])
      setTarea("");
    } catch (error) {
      console.log(error);
    }
    
  };

  const eliminar = async (id) => {
      try{
        const db = firebase.firestore()
        await db.collection('tareas').doc(id).delete()
        const arrayFiltrado = tareas.filter((item) => item.id !== id)
        setTareas(arrayFiltrado)

      }catch(error){
        console.log(error)
      }
  }

  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-md-6">
          Lista las tareas
          <ul className="list-group">
            {tareas.map((item) => (
              <li className="list-group-item mr-20" key={item.id}>
                {item.name}
                <button 
                className="btn btn-danger btn-sm  float-right"
                onClick={() =>eliminar(item.id)}
                >
                  Eliminar
                </button>
                <button className="btn btn-warning btn-sm  float-right mr-2">
                  Editar
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-md-6">
          <h3>Formulario</h3>
          <form onSubmit={agregar}>
            <input
              type="text"
              placeholder="Ingrese Tarea"
              className="form-control mb-2"
              onChange={(e) => setTarea(e.target.value)}
              value={tarea}
            />
            <button type="submit" className="btn btn-block btn-dark">
              Agregar
            </button>
          </form>
          
        </div>
      </div>
    </div>
  );
}

export default App;
