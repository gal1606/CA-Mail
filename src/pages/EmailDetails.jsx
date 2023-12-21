import imgUrl from '../assets/imgs/react.png'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {getEmailById} from '../services/email.service'

export function EmailDetails({emailFolder}) {
    const params = useParams()
    const navigate = useNavigate()

    const [email, setEmail] = useState({})
    
    console.log(params);
    useEffect(()=> {
        getEmailById(params.id, emailFolder).then((e)=>{
            console.log(e);
            setEmail(e);
        })
    }, [params])

    function handleOnBack(){
        
        navigate('/')   //http://localhost:5173/#
    }
    return (
        <section className="home">
            <h1>{email.subject}</h1>
            <p>{email.body}</p>
            <p>{email.id}</p>
            <button onClick={handleOnBack}>Back</button>
        </section>
    )
}