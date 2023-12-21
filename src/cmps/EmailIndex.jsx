import imgUrl from '../assets/imgs/react.png'
import { EmailList } from '../cmps/EmailList'
import { getInbox, getTrash, moveToTrash, query, toggleStarred, markAsRead, STORAGE } from '../services/email.service'
import inboxImg from '../assets/imgs/inbox.png'
import sentImg from '../assets/imgs/sent.png'
import starImg from '../assets/imgs/star.png'
import trashImg from '../assets/imgs/trash.png'
import { useEffect, useState } from 'react'
import { EmailFilter } from './EmailFilter'


export function EmailIndex({emailFolder, setEmailFolder}) {

    const [emailList, setEmailList] = useState([]);
    

    function loadEmails(){
        query(undefined,emailFolder).then((emailList)=>{setEmailList(emailList)})
    }

    function onEmailDelete(emailId){
        console.log('email id: ' + emailId);
        moveToTrash(emailId)
        loadEmails()
    }

    function onStarred(emailId){
        toggleStarred(emailId, emailFolder).then(()=>{
            console.log('email id: ' + emailId);
            loadEmails()
        })
    }
    
    function onRead(emailId){
        markAsRead(emailId, emailFolder).then(()=>{
            loadEmails()
        })
    }
    useEffect(()=>{
        loadEmails()
    },[])

    function showTrash(){
        getTrash().then((emails)=>{
            setEmailFolder(STORAGE.TRASH)
            setEmailList(emails)
        })
    }

    function showInbox(){
        getInbox().then((emails)=>{
            setEmailFolder(STORAGE.EMAILS)
            setEmailList(emails)
        })
    }

    function showStarred(){
        getInbox().then((emails)=>{
            query({isStarred:true}).then( emails => setEmailList(emails))
        })
    }

    const filter = (searchValue) => {
        if (!searchValue || searchValue.length === 0)
            loadEmails() //setEmailList(inbox)

        const result = emailList.filter((email) => (email.subject.includes(searchValue) || email.body.includes(searchValue)))

        console.log(result);
        setEmailList(result)
    }

    return (
        <section className="email-index">
            <EmailFilter handleSearch={filter} />
            <section className='body'>
                <div className='status-list'>
                    <div><img src={inboxImg} alt='inbox' onClick={showInbox}></img>Inbox</div>
                    <div><img src={sentImg} alt='sent'></img>Sent</div>
                    <div><img src={starImg} alt='starred' onClick={showStarred}></img>starred</div>
                    <div><img src={trashImg} alt='trash' onClick={showTrash}></img>Trash</div>
                </div>
                <EmailList emailList={emailList} onEmailDelete ={onEmailDelete} onStarred={onStarred} onRead={onRead} />
            </section>
        </section>
    )
}

