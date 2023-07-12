
import React from 'react'

const SECURITY_CODE = 'paradigma'

const UseReducer = ({name})=> {
    // Replica el comportamiento de las clases
    const [state, dispatch] = React.useReducer(reducer, initialState)
    
    const onConfirm = () => {
        dispatch({
            type: actionTypes.CONFIRM,
        });    }

    const onError = () => {
        dispatch({type: actionTypes.ERROR})
    }

    const onCheck = () => {
        dispatch({type: actionTypes.CHECK})

    }

    const onWrite = (newValue)=> {dispatch({type: actionTypes.WRITE, payload: newValue} )}

    const onDelete = () => {dispatch({type: actionTypes.DELETE})}

    const onReset = () => {dispatch({type: actionTypes.RESET})}

    React.useEffect(()=>{
        console.log("Empezando el efecto");
        if(state.loading){
            setTimeout(()=> {
                console.log("Haciendo la validacion");

                if(state.value === SECURITY_CODE ){
                    onConfirm()
                }else {
                    onError()
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
            <input placeholder='Codigo de seguridad' value={state.value} onChange={(event)=> onWrite(event.target.value) }></input>
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


const initialState = {value: '', error: false, loading: false, deleted: false, confirmed: false};

const actionTypes = {
    CONFIRM: 'CONFIRM',
    ERROR: 'ERROR',
    CHECK: 'CHECK',
    WRITE: 'WRITE',
    DELETE: 'DELETE',
    RESET: 'RESET'

}

const reducerObject = (state, payload) => {
    return  {
        [actionTypes.CONFIRM]: {...state, loading: false, error: false, confirmed: true},
        [actionTypes.ERROR]: {
            ...state,
            error: true,
            loading: false
        },
        [actionTypes.CHECK]: {
            ...state,
            loading: true
        },
        [actionTypes.WRITE]: {...state, value: payload},
        [actionTypes.DELETE]: {...state, value: '', deleted: true},
        [actionTypes.RESET]: {...state, value: '', deleted: false, confirmed: false}
    }
}

const reducer = (state, action) => {
    if(reducerObject(state)[action.type]){
        return reducerObject(state, action.payload)[action.type]
    }else {
        return state;
    }
}

export {UseReducer}


// // const reducer = (state, action) => {

// // };

// const reducerWithIf = (state, action) => {
//    if( action.type === 'ERROR'){
//         return {
//             ...state,
//             error: true,
//             loading: false
//         };
//    }else if(action.type === 'CHECK'){
//         return {
//             ...state,
//             loading: true
//         };
//    }
//    ///...
//    else {
//     return {
//         ...state
//     }
//    }
// };


// const reducerSwitch = (state, action) => {
//     switch(action.type){
//         case 'ERROR': 
//             return {
//                 ...state,
//                 error: true,
//                 loading: false
//             };
//         case 'CHECK': 
//             return {
//                 ...state,
//                 loading: true
//             };
//         default: 
//             return {
//                 ...state
//             }
//     }

// };
