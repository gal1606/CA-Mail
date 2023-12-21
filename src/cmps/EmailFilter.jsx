import { useState } from "react"

export function EmailFilter({handleSearch}) {
    const [searchValue,setValue] = useState('')

    return(
        <div>
            <input value={searchValue} onChange={(ev)=>setValue(ev.target.value)}/>
            <button onClick={()=>handleSearch(searchValue)}>
                search
            </button>
        </div>

    )
}