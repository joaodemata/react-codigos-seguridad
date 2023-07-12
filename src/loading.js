import React from 'react'

// Nota: Cuando extiendes de una clase y quieres hacerle un constructor a la actual debes utilizar el metodo super y pasarle todas las propiedades que recibe el constructor 

class Loading extends React.Component {
    componentWillUnmount(){
        console.log("componentWillUnmount")
    }

    
    render() {
 
        return (
            <p>Cargando...</p>
        )
    }
}


export {Loading}