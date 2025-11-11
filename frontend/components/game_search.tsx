/*
 * Glossary Suite
 * Handles searching though and displaying the glossary
 */
'use client'
import { useState } from "react"
import { GameData } from "./game_data"
import SearchResult from "./search_result"

export default function GameSearch() {
    const [searchEntries, setSearchEntries] = useState<GameData[]>([])
    const api = "http://localhost:4963/api"

    async function HandleSearchKeyDown(event: any) {
        //If input not enter, return
        if ((event.which || event.keyCode) != 13) return

        const search: string = event.target.value
        if (!search) return
        
        const data = await fetch(`${api}/${encodeURIComponent(search)}`)

        .then(res => res.json())
        .catch((err) => {console.error(err); return []})

        setSearchEntries(data)
    }

    const entries = searchEntries.map((entry) => <SearchResult key={entry.id} data={entry}/>)
    return (
        <div className="flex flex-col mx-auto gap-4 p-4 w-9/10 sm:w-5/6 md:w-2/3 xl:w-1/2">
            <input 
                className="border-2 border-slate-600 text-center text-white text-xl h-10 rounded-full"
                placeholder="Search Games..."
                onKeyDown={HandleSearchKeyDown}
            />
            <div className="m-auto flex flex-col gap-4">
                {entries}
            </div>
        </div>
    )
}
