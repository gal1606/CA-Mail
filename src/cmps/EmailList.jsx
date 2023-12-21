import imgUrl from '../assets/imgs/react.png'
import { EmailPreview } from './EmailPreview'

export function EmailList({emailList, onEmailDelete, onStarred, onRead}) {
    return (
        <section className="email-list">
            {
                emailList.map(email=><EmailPreview email={email} key={email.id} onEmailDelete={onEmailDelete} onStarred={onStarred} onRead={onRead}/>)
            }
        </section>
    )
}