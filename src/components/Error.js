import React from 'react';
import PropTypes from 'prop-types';

const Error = ({mensaje, error}) => {
    return ( 
        <div>
            {error ? 
            <p className="red darken-4 error">{mensaje}</p>
            : null
            }
        </div>
     );
}
Error.propTypes = {
    mensaje : PropTypes.string.isRequired,
    error : PropTypes.bool.isRequired
}

export default Error;