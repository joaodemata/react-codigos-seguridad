import React from 'react'

const SECURITY_CODE = 'paradigma'

const UseState = ({name})=> {
    // Replica el comportamiento de las clases
    const [state, setState] = React.useState({value: '', error: false, loading: false, deleted: false, confirmed: false})
    // const [value, setValue] = React.useState("");
    // const [error, setError] = React.useState(false);
    // const [loading, setLoading] = React.useState(false)
    
    const onConfirm = () => {
        setState({...state, loading: false, error: false, confirmed: true})
    }

    const onError = () => {
        setState({...state, loading: false, error: true})
    }

    const onCheck = () => {
        setState({...state, loading: true})
    }

    const onWrite = (newValue)=> {setState({...state, value: newValue})}

    const onDelete = () => {setState({...state, value: '', deleted: true})}

    const onReset = () => {setState({...state, value: '', deleted: false, confirmed: false})}

    React.useEffect(()=>{
        console.log("Empezando el efecto");
        if(state.loading){
            setTimeout(()=> {
                console.log("Haciendo la validacion");

                if(state.value === SECURITY_CODE ){
                    onConfirm();
                }else {
                    onError();
                }

                console.log("Terminando la validacion");
            }, 3000)
        }
        console.log("Terminando el efecto");
    }, [state.loading])
    // Escribir el codigo de seguridad
  if(!state.deleted && !state.confirmed){
    return (
        <div>
            <h2>
                Eliminar {name}
            </h2>
            <p>
                Por favor, escribe el codigo de seguridad
            </p>
            {(state.error && !state.loading) && (<p>Error: el codigo es incorrecto</p>)}
            {state.loading && (<p>Cargando...</p>)}
            <input placeholder='Codigo de seguridad' value={state.value} onChange={(event)=> onWrite(event.target.value)}></input>
            <button onClick={()=> {
                   onCheck()
                }
                }>Comprobar</button>
        </div>
    );
  }else if(!state.deleted && state.confirmed){
    return (<React.Fragment>
        <p>Estas seguro de que quieres eliminar?</p>
        <button onClick={()=> onDelete()}>Si, eliminar</button>
        <button onClick={() => onReset()}>No, me arrepenti</button>
    </React.Fragment> 
    );
  } else {
    return (
        <React.Fragment>
            <h2>{name} ha sido eliminado</h2>
            <button onClick={()=> onReset()}>Resetear, volver atras</button>
        </React.Fragment>
    )
  }
}

export {UseState}