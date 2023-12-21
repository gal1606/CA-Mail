import { Link } from 'react-router-dom'
import imgUrl from '../assets/imgs/react.png'
import trashImg from '../assets/imgs/trash.png'
import { useNavigate } from 'react-router-dom'
import emptyStarImg from '../assets/imgs/star.png'
import filledStarImg from '../assets/imgs/star-2.png'


export function EmailPreview({ email, onEmailDelete, onStarred, onRead }) {

    const navigate = useNavigate()

    //console.log(email);
    function handleNav() {
        onRead(email.id)
        navigate(`email/${email.id}`)
    }

    function handleDelete(ev){
        ev.stopPropagation()
        onEmailDelete(email.id)
    }

    function handleStarred(ev){
        ev.stopPropagation()
        onStarred(email.id)
    }   

    return (

        <section className={`email-preview ${email.isRead ? 'email-read' : 'email-unRead'}`} onClick={handleNav} >
            <div className='is-starred' onClick={handleStarred}>
                {email.isStarred ? <img src={emptyStarImg}/> : <img src={filledStarImg}/>}
            </div>
            <div className='email-subject'>
                {email.subject}
            </div>
            <div className='email-body'>
                {email.body}
            </div>
            <div className='sent-at'>
                {email.sentAt}
            </div>
            <img src={trashImg} alt='trash' onClick={handleDelete}></img>
        </section>

    )
}