/* eslint-disable react-hooks/rules-of-hooks */
import React ,{ useState } from "react";

function countfun(){

    let [number, setNumber] = useState(0)


    function inc(){
        setNumber(++number)
    }

    return(
        <div>
            <h2>Function</h2>
            <h1>Count = {number}</h1>
            <button onClick={inc}>increment</button>
        </div>
    );
}

export default countfun;