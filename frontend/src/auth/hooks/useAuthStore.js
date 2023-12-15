import alertify from 'alertifyjs';



const useAuthStore = () => {



    const validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;    //^ Expresión regular para validar un email

        return re.test(email);  //^ Devuelve true o false
    };



    const startSignUp = async (name, email, password) => {

        try {
            const { data } = await fetch('/api/user/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, password })
            });

            alertify.success('User created successfully');
            return data;

        } catch (error) {
            console.log(error);
            alertify.error('Error creating user');
        }
    };





    
    return {
    
        //^ Propiedades
    
    
    
        //^ Metodos
        validateEmail,
        startSignUp,
    }
};



export default useAuthStore;