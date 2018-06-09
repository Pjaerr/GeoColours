//Import React and React.propTypes
import React from 'react';
import PropTypes from 'prop-types'

//Import SASS Files
import './Button.scss';

/** <Button />
 * Carrys out a function when clicked. Optional styles can be applied.
 * 
 * Prop {function}: onClick - The function that will be called when the button is clicked.
 * 
 * Prop {string}: style - How the button looks. One of ['border', 'raised'].
 * 
 * Prop {string}: backgroundColour - The fill colour of the button.
 * 
 * Prop {string}: textColour - The colour of the text within the button.
 * 
 * Prop {string}: width - The width of the button.
 * 
 * Prop {string}: height: The height of the button.
*/
class Button extends React.Component
{
    constructor(props)
    {
        super(props);

        //If a style has been supplied, assign the class representing that style to the button.
        this.classNames = "Button " + (this.props.style !== undefined ? this.props.style : "empty");

        //If no explicit dimensions are provided, fill parent container.
        this.styles =
            {
                width: '100%',
                height: '100%',
            };


        if (this.props.width !== undefined && this.props.height !== undefined)
        {
            this.styles.width = this.props.width;
            this.styles.height = this.props.height;
        }

        if (this.props.backgroundColour !== undefined)
        {
            this.styles.backgroundColor = this.props.backgroundColour;
        }

        if (this.props.textColour !== undefined)
        {
            this.styles.color = this.props.textColour;
        }
    }

    static propTypes =
        {
            onClick: PropTypes.func.isRequired,
            style: PropTypes.oneOf(['border', 'raised']),
            backgroundColour: PropTypes.string,
            textColour: PropTypes.string,
            width: PropTypes.string,
            height: PropTypes.string
        };

    render()
    {
        return (
            <div className={this.classNames} style={this.styles} onClick={this.props.onClick} >
                {this.props.children}
            </div>
        );
    }
}

export default Button;