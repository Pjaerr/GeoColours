//Import React and React.propTypes
import React from 'react';

//Import SASS Files
import './Card.scss';

/** <Card />
 * Renders its children within a material design style card.
*/
class Card extends React.Component
{
    render()
    {
        return (
            <div className="Card">
                {this.props.children}
            </div>
        );
    }
}

export default Card;