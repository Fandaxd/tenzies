import React from 'react'

const Die = (props) => {
    


    return (
        <div className='die' onClick={props.toggleIsHeld} id={props.id} key={props.key} style={props.style}>
            {props.value}
            
        </div>
    )
}

export default Die
