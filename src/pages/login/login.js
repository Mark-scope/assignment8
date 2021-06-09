import InputField from '../../components/input'
import { useState } from "react"


function Login(){
    const [values, setvalues] = useState({})
    const changevalue = (e) => {
        setvalues ({...values, [e.target.label]: e.target.value})
    }

    function submit(e){
        e.preventDefault();
      
        fetch('http://localhost:5000/api/v1/login', 
        {
          method: 'POST',
          body: JSON.stringify(values),
          headers: {
            'Content-Type': 'application/json'
          },
        })
        .then(response => response.json())
        .then(responseData => {
          console.log(responseData);
        })
    }


    return(
        <div >                 
                    <div >
                        <InputField label='Email' onChange={changevalue} />
                        <InputField label='Password'  placeholder='Confirm' type='password' onChange={changevalue} />
                        <button  onKeyUp={submit} onClick={submit}>Login</button> 
                    </div>                
        </div>

        

    )
}

export default Login;