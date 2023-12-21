import imgUrl from '../assets/imgs/react.png'
import { EmailIndex } from '../cmps/EmailIndex'



export function EmailIndexPage({emailFolder, setEmailFolder}) {
    return (
        <section className="home">
            <EmailIndex emailFolder={emailFolder} setEmailFolder={setEmailFolder}/>
        </section>
    )
}