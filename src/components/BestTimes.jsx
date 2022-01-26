import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrophy } from '@fortawesome/free-solid-svg-icons'


const BestTimes = (props) => {
    return (
        <div className="toptimes">
            <p>Best times <hr />
                <br />
                <FontAwesomeIcon icon={faTrophy} color='gold' /> &ensp;
                {props.bestTimes[0] >= 60000 && ("0" + Math.floor((props.bestTimes[0] / 60000) % 60)).slice(-2) + ":" }
                {props.bestTimes[0] &&
                ("0" + Math.floor((props.bestTimes[0] / 1000) % 60)).slice(-2) + "." + 
                ("0" + ((props.bestTimes[0] / 10) % 100)).slice(-2)}
                <br />
                <FontAwesomeIcon icon={faTrophy} color='silver' /> &ensp;
                {props.bestTimes[1] >= 60000 && ("0" + Math.floor((props.bestTimes[1] / 60000) % 60)).slice(-2) + ":"} 
                {props.bestTimes[1] &&
                ("0" + Math.floor((props.bestTimes[1] / 1000) % 60)).slice(-2) + "." + 
                ("0" + ((props.bestTimes[1] / 10) % 100)).slice(-2)}
                <br />
                <FontAwesomeIcon icon={faTrophy} color='orange' /> &ensp;
                {props.bestTimes[2] >= 60000 && ("0" + Math.floor((props.bestTimes[2] / 60000) % 60)).slice(-2) + ":"}
                {props.bestTimes[2] &&
                ("0" + Math.floor((props.bestTimes[2] / 1000) % 60)).slice(-2) + "." + 
                ("0" + ((props.bestTimes[2] / 10) % 100)).slice(-2)}
            </p>
        </div>
        
    )
}

export default BestTimes
