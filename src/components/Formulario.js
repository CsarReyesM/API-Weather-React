import React, {useState} from 'react';
import Error from './Error';
import PropTypes from 'prop-types';

const Formulario = ({busqueda, setBusqueda, setConsultar}) => {
    // Extraer ciudad y pais
    const {ciudad , pais} = busqueda;
    // Funcion que coloca los elementos en el state
    const handleChange = (e) => {
        setBusqueda({
            ...busqueda,
        [e.target.name] : e.target.value
        })
    };
    // Cuando el usuario da submit al form
    const [error, setError] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        // Validar
        if(ciudad.trim() === '' || pais.trim() === ''){
            setError(true)
            return;
        }
        setError(false);
        // pasarlo al componente principal
        setConsultar(true);
    }

 
    return ( 
        <form onSubmit={handleSubmit}>
            {error ? <Error mensaje='Todos los campos son obligatorios' /> : null }
            

            <div className="input-field col s12">
                <input
                    type="text"
                    name="ciudad"
                    id="ciudad"
                    value={ciudad}
                    onChange={handleChange}
                />
                <label htmlFor="ciudad">Ciudad: </label>
            </div>
            <div className="input-field col s12">
                <select
                    name="pais"
                    id="pais"
                    value={pais}
                    onChange={handleChange}
                >
                    <option value="">--Seleccione un País--</option>
                    <option value="US">Estados Unidos</option>
                    <option value="MX">México</option>
                    <option value="AR">Argentina</option>
                    <option value="CO">Colombia</option>
                    <option value="CR">Costa Rica</option>
                    <option value="ES">España</option>
                    <option value="PE">Perú</option>
                </select>
                <label htmlFor="pais">País: </label>
            </div>
            <div className="input-field col s12">
                <input 
                    type="submit"
                    value="Buscar"
                    className="waves-effect waves-light btn-large btn-block accent-4"
                    onClick={handleSubmit}
                />
            </div>
        </form>

     );
}
Formulario.propTypes = {
    busqueda: PropTypes.object.isRequired ,
    setBusqueda: PropTypes.func.isRequired,
    setConsultar: PropTypes.func.isRequired
}
 
export default Formulario;