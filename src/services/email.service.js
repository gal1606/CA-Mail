import { storageService } from "./async-storage.service";
import { utilService } from "./util.service";
// filterby = {status:'inbox/sent/star/trash', txt:'abc', isRead: true/false/null}
// query({status:'inbox', txt:'', isRead:null})

const STORAGE_KEY = 'emails'
const STORAGE_TRASH_KEY = 'trash'

export const STORAGE = {
    EMAILS: 'emails',
    TRASH : 'trash',
    SENT: 'sent'
}


export const trash = []

export const inbox = [
    {
    id:'e101',
    subject:'Miss you!',
    body:'Would love to catch up sometimes',
    isRead:false,
    isStarred:false,
    sentAt:1551133930594,
    removedAt:null,
    from:'momo@momo.com',
    to:'user@appsus.com'
    },
    {
    id:'e102',
    subject:'Miss me!',
    body:'Would love to catch up sometimes',
    isRead:false,
    isStarred:false,
    sentAt:1551133930594,
    removedAt:null,
    from:'momo@momo.com',
    to:'user@appsus.com'
    },
    {
    id:'e103',
    subject:'Miss us!',
    body:'Would love to catch up sometimes ball',
    isRead:false,
    isStarred:false,
    sentAt:1551133930594,
    removedAt:null,
    from:'momo@momo.com',
    to:'user@appsus.com'
    },
    {
    id:'e104',
    subject:'Miss them!',
    body:'Would love to catch up sometimes ball',
    isRead:false,
    isStarred:false,
    sentAt:1551133930594,
    removedAt:null,
    from:'momo@momo.com',
    to:'user@appsus.com'
    },
    {
    id:'e105',
    subject:'Miss some!',
    body:'Would love to catch up sometimes',
    isRead:false,
    isStarred:false,
    sentAt:1551133930594,
    removedAt:null,
    from:'momo@momo.com',
    to:'user@appsus.com'
    },
    {
    id:'e106',
    subject:'Miss none!',
    body:'Would love to catch up sometimes',
    isRead:false,
    isStarred:false,
    sentAt:1551133930594,
    removedAt:null,
    from:'momo@momo.com',
    to:'user@appsus.com'
    },
    ]

export async function query(filterBy, emailFolder = STORAGE.EMAILS) {
    var emails = await storageService.query(emailFolder)
    console.log(emails,filterBy, emailFolder);
    if (filterBy) {
        const { isStarred, txt, isRead } = filterBy
 
        emails = emails.filter(email => txt && txt.length > 0? email.subject.includes(txt) : true)
        //.filter(email => isRead === null ?true : email.isRead === isRead)
        .filter(email => isStarred === null ?true : email.isStarred==isStarred)
    }
    return emails
}

export async function toggleStarred(emailId, emailFolder = STORAGE.EMAILS){
    const email = await getEmailById(emailId, emailFolder)
    email.isStarred = email.isStarred ? false : true
    await storageService.put(emailFolder, email)
}

export async function markAsRead(emailId, emailFolder = STORAGE.EMAILS){
    const email = await getEmailById(emailId, emailFolder)
    email.isRead = true
    await storageService.put(emailFolder, email)
}


export async function getEmailById(id, emailFolder = STORAGE.EMAILS){
    return storageService.get(emailFolder, id) 
}
export async function getTrashEmailById(id){
    return storageService.get(STORAGE.TRASH, id)

}

function remove(id) {
    return storageService.remove(STORAGE.EMAILS, id)
}

function _createEmails() {
    let emails = utilService.loadFromStorage(STORAGE.EMAILS)
    if (!emails || !emails.length) {
        emails = inbox
        utilService.saveToStorage(STORAGE.EMAILS, emails)
    }
}

export async function moveToTrash(emailId){
    const email = await getEmailById(emailId)
    console.log(email);
    remove(email.id)
    await storageService.post(STORAGE.TRASH, email)
}



export async function getTrash(filterBy){
    var emails = await storageService.query(STORAGE.TRASH)
    if (filterBy) {
        const { status, txt, isRead } = filterBy
 
        emails = emails.filter(email => txt && txt.length > 0? email.subject.includes(txt) : true)
        .filter(email => isRead === null ?true : email.isRead === isRead)

    }
    return emails
}
export async function getInbox(filterBy){
    var emails = await storageService.query(STORAGE.EMAILS)
    if (filterBy) {
        const { status, txt, isRead } = filterBy
 
        emails = emails.filter(email => txt && txt.length > 0? email.subject.includes(txt) : true)
        .filter(email => isRead === null ?true : email.isRead === isRead)

    }
    return emails
}

_createEmails()

// localstorage:
/**
 * emails:{
 *  inbox:[{},{}],
 *  sent:[{},{}],
 *  star:[{},{}],
 *  trash:[{},{}]
 * }
 * 
 */

// map: inbox.map(email =>)
/**  
 *  const result = []
 * for(let i = 0; i < inbox.length; i++){
    const email = inbox[i];

}
*/

