/*
 * Glossary Suite
 * Handles searching though and displaying the glossary
 */
'use client'
import { useState } from "react"
import Image from "next/image"
import { GameData } from "./game_data"
import SearchResult from "./search_result"
import { CartPage } from "./cart"
import cartImage from "@/public/cart.svg"
import useLocalStorageState from "use-local-storage-state"

export default function GameSearch() {
    const [searchEntries, setSearchEntries] = useState<GameData[]>([])
    const [localCart,] = useLocalStorageState<GameData[]>('cart')
    const [showCart, setShowCart] = useState(false)
    const api = "http://localhost:4963/api"

    async function HandleSearchKeyDown(event: any) {
        //If input not enter, return
        if ((event.which || event.keyCode) != 13) return

        const search: string = event.target.value
        if (!search) return
        
        const data = await fetch(`${api}/${encodeURIComponent(search)}`)

        .then(res => res.json())
        .catch((err) => console.error(err))

        setSearchEntries(data)
    }

    const entries = searchEntries.map((entry) => <SearchResult key={entry.id} data={entry}/>)
    return (
        <div className="flex flex-col mx-auto gap-4 p-4 w-9/10 sm:w-5/6 md:w-2/3 xl:w-1/2">
            <button className="flex justify-end text-2xl font-bold cursor-pointer fixed right-4 bottom-4 bg-slate-600 rounded-full p-4" onClick={() => setShowCart(true)}>
                <Image src={cartImage} alt="a shopping cart" width={48} height={48}/>
                <p className="text-center my-auto">({localCart?.length})</p>
            </button>
            <input 
                className="border-2 border-slate-600 text-center text-white h-10 rounded-full"
                placeholder="Search Games..."
                onKeyDown={HandleSearchKeyDown}
            />
            <div className="m-auto flex flex-col gap-4">
                {entries}
            </div>
            {showCart && <div className="fixed bg-slate-900 w-4/5 right-0 h-full rounded-l-xl">
                <CartPage toggleAction={() => setShowCart(false)}/>
            </div>}
        </div>
    )
}
