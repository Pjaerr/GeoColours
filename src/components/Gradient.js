//Import React and React.propTypes
import React from 'react';
import PropTypes from 'prop-types'

//Import SASS Files
import './Gradient.scss';


/** <Gradient />
 * Takes two colours and creates a gradient that fills the bounding box moving downwards.
 * 
 * Prop {string}: firstColour - The colour at the top of the gradient.
 * 
 * Prop {string}: secondColour - The colour at the bottom of the gradient.
*/
class Gradient extends React.Component
{
    static propTypes =
        {
            firstColour: PropTypes.string.isRequired,
            secondColour: PropTypes.string.isRequired
        };

    render()
    {
        return (
            <div className="Gradient" style={{ backgroundImage: 'linear-gradient(to bottom,' + this.props.firstColour + ',' + this.props.secondColour + ')' }} />
        );
    }
}

export default Gradient;