import { useMemo, useState } from "react";


const useForm = ( initialForm = {}, formValidaciones = {} ) => {

    const [formState, setFormState] = useState( initialForm );
    const [formValidacion, setFormValidacion] = useState( {} );

    const formValido = useMemo(() => {
        return Object.keys( formValidacion ).every( key => formValidacion[key] === null );  //^ Si todos los campos son null, el formulario es valido.
    }, [formValidacion]);



    // Hacer cambios en el input
    const onInputChange = ({ target }) => {
        const { name, value } = target;

        setFormState(prevState => ({    //^ ...prevState = name, email, password
            ...prevState,
            [name]: value
        }));

        // Realizar la validación aquí
        if (formValidaciones[name]) {
            const [fnValidacion, errorMensaje] = formValidaciones[name];
            setFormValidacion(prevState => ({
                ...prevState,
                [`${name}Valido`]: fnValidacion(value) ? null : errorMensaje
            }));
        }
    };



    const onResetForm = () => { //^ Resetea el formulario
        setFormState( initialForm )
    };

    return {
        ...formState,   //^ ...formState = name, email, password
        formState,
        onInputChange,
        onResetForm,

        ...formValidacion,
        formValido
    };
};

export default useForm;