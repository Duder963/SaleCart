/*
 * Game Search
 * Handles searching though and displaying Game information
 */
'use client'
import { useState, useEffect } from "react"
import { GameData } from "./game_data"
import SearchResult from "./search_result"
import useLocalStorageState from "use-local-storage-state"

export default function GameSearch() {
    const [searchEntries, setSearchEntries] = useState<GameData[]>([])
    const [backendLive, setBackendLive] = useState<boolean>(true)
    const [loading, setLoading] = useState(false)
    const [localCart, setLocalCart] = useLocalStorageState<GameData[]>('cart', {
        defaultValue: []
    })
    const api = "http://localhost:4963/api"

    useEffect(() => {
        fetch(api)
        .then(res => res.json())
        .then(data => setBackendLive(data?.success === true))
        .catch(() => setBackendLive(false))

        // if (localCart) {
        //     let ids = localCart.map(e => e.id)
        //     console.log(ids)
        //     fetch(api, {
        //         method: "POST",
        //         body: JSON.stringify({ids})
        //     })
        // }

    }, [])

    async function HandleSearchKeyDown(event: any) {
        //If input not enter, return
        if ((event.which || event.keyCode) != 13) return

        const search: string = event.target.value
        if (!search) return

        setSearchEntries([])
        setLoading(true)
        const data = await fetch(`${api}/${encodeURIComponent(search)}`)
            .then(res => res.json())
            .catch((err) => { console.error(err); return [] })
        setSearchEntries(data)
        setLoading(false)
    }

    const entries = searchEntries.map((entry, i) => (
        <div
            key={entry.id}
            className="animate-fade-slide-up"
            style={{ animationDelay: `${i * 60}ms` }}
        >
            <SearchResult data={entry} flashRemove/>
        </div>
    ))
    const cartEntries = localCart.map((entry, i) => (
        <div
            key={entry.id}
            className="animate-fade-slide-up"
            style={{ animationDelay: `${i * 60}ms` }}
        >
            <SearchResult data={entry} flashRemove/>
        </div>
    ))

    if (backendLive === false) {
        return (
            <div className="flex flex-col mx-auto gap-4 p-4 w-9/10 sm:w-5/6 md:w-2/3 xl:w-1/2">
                <p className="text-center text-red-400 text-xl font-bold">Could not connect to the backend. Make sure the server is running.</p>
            </div>
        )
    }

    return (
        <div className="flex flex-col mx-auto gap-4 p-4 w-9/10 sm:w-5/6 md:w-2/3 xl:w-1/2">
            <input
                className="bg-slate-800 border-2 border-slate-600 focus:border-green-500 focus:outline-none text-center text-white text-xl h-12 rounded-full px-4 transition-colors duration-200 placeholder:text-slate-500"
                placeholder="Search Games..."
                onKeyDown={HandleSearchKeyDown}
            />
            {loading && (
                <div className="flex justify-center py-4">
                    <div className="animate-spin rounded-full h-9 w-9 border-t-2 border-b-2 border-green-500" />
                </div>
            )}
            <div className="m-auto flex flex-col gap-4 w-full">
                {!entries.length && !loading && (
                        <div className="m-auto flex flex-col gap-4 w-full">
                        <h1 className="text-4xl font-bold text-white text-center">Welcome to SaleCart</h1>
                        {cartEntries.length
                            ? <h2 className="text-2xl font-semibold text-slate-300 text-center border-b border-slate-600 pb-2">Your Cart</h2>
                            : <h2 className="text-xl font-semibold text-slate-500 text-center">Your cart is empty. Search for games above</h2>
                        }
                        {cartEntries}
                    </div>
                )}
                {entries}
            </div>
        </div>
    )
}
