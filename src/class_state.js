import React from 'react'
import { Loading } from './loading';

const SECURITY_CODE = 'paradigma'


// Nota: Cuando extiendes de una clase y quieres hacerle un constructor a la actual debes utilizar el metodo super y pasarle todas las propiedades que recibe el constructor 

class ClassState extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            error: false,
            loading: false,
            value: ''
        }
    }


    UNSAFE_componentWillMount (){
        console.log("componentWillMount")
    }

    componentDidMount(){
        console.log("componentDidMount")
    }

    componentWillUnmount(){
        console.log("componentWillUnmount")
    }

    componentDidUpdate(){
        console.log("componentDidUpdate")
        // Sin este if la aplicacion ejecutaria este codigo cada 3000 segundos, porque el this.setState vuelve a llamar al metodo componentDidUpdate
        if(this.state.loading){
            setTimeout(()=> {
                console.log("Haciendo la validacion");

                if(this.state.value === SECURITY_CODE){
                    this.setState({error: false, loading: false})
                } else {
                    this.setState({error: true, loading: false})
                }

                console.log("Terminando la validacion");
            }, 3000)
        }
    }
    
    
    render() {
 
        return (
            <div>
                <h2>
                    Eliminar {this.props.name}
                </h2>
                <p>
                    Por favor, escribe el codigo de seguridad
                </p>
                {(this.state.error && !this.state.loading) && (<p>Error: el codigo es incorrecto</p>)}
                {this.state.loading && (<Loading/>)}
                <input placeholder='Codigo de seguridad' value={this.state.value} onChange={(event)=> {this.setState({value: event.target.value})}}></input>
                <button onClick={() => {
                    this.setState({loading: true})
                    // this.setState(prevState =>({error: !prevState.error}) )
                    }}>Comprobar</button>
            </div>
        )
    }
}


export {ClassState}