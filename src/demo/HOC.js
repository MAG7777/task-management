import React from "react";



export default function Hoc(props){
    console.log(props)
    return(
        <>
        <div>
            Hello fomr HOC!!!
            {props.children}
        </div>
        </>

    );
}