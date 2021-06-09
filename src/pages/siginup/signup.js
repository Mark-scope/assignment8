import Input from '../../components/input'
import { useState } from "react"



function Login(){

    const [values, setvalues] = useState({})
    const changevalue = (e) => {
        setvalues ({...values, [e.target.label]: e.target.value})
    }

    function submit(e){
        e.preventDefault();
      
        fetch('http://localhost:5000/api/v1/signup', 
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
                        <Input  label='Name'  placeholder='First and Last name' type='text' onChange={changevalue} />
                        <Input label='Email'  placeholder='<name>@gmail.com' type='email' onChange={changevalue} />
                        <Input label='Password' type='password' onChange={changevalue} />
                        <button onKeyUp={submit} onClick={submit} >Sign Up</button>
                    </div>         
        </div>

        

    )
}

export default Login;