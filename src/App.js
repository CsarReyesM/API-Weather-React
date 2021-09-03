import React, {useState, useEffect} from 'react';
import Clima from './components/Clima';
import Formulario from './components/Formulario';
import Header from './components/Header';
import Error from './components/Error';

function App() {
  
  // State del formulario
  const [busqueda, setBusqueda] = useState({
    ciudad: '', 
    pais: ''
  })
  // Extraer ciudad y pais
  const {ciudad , pais} = busqueda;
  // Agregar otro state para no consultar todo el tiempo 
  // sino hasta que de submit
  const [consultar, setConsultar] = useState(false);
  // Otro state para guardar la peticion en un state
  const [resultado, setResultado] = useState({});
  // State para validar error cod 404
  const [error, setError] = useState(false)

  useEffect(() => {
    const consultarAPI = async () => {
      if(consultar){
        const apiKey = 'fb2accc5d111b2468dfd54f73a37bb98'
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${apiKey}`;
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();

        setResultado(resultado);
        setConsultar(false)
        // Detecta si hubo resultados correctos en la consulta
        if(resultado.cod === '404'){
          setError(true);
          return;
        }else{
          setError(false);
          return;
        };

      }
    }
      consultarAPI();
   // eslint-disable-next-line
  },[consultar]);

  let componente;
  if(error){
    componente = <Error error={error} mensaje="No hay resultados"/>
  }else{
        componente = <Clima
        resultado={resultado}
        />
  }


  return(
    <>
    <Header
      titulo={'Clima React'}
    />
    <div className="contenedor-form">
      <div className="container">
        <div className="row">
          <div className="col m6 s12">
            <Formulario
              busqueda={busqueda}
              setBusqueda={setBusqueda}
              setConsultar={setConsultar}
            />
          </div>
          <div className="col m6 s12">
              {componente}
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default App;
