'use client'
import useLocalStorageState from "use-local-storage-state"
import { useState } from "react"
import SearchResult from "./search_result"
import { GameData } from "./game_data"
import Image from "next/image"
import cartImage from "@/public/cart.svg"

export default function Cart() {
    const [localCart, setLocalCart] = useLocalStorageState<GameData[]>('cart', {
        defaultValue: []
    })
    const [showCart, setShowCart] = useState(false)

    const entries = localCart.map((entry) => <SearchResult key={entry.id} data={entry}/>)
    const sum = localCart.reduce((acc, curr) => acc + (curr.price ?? 0), 0)

    const CloseButton = <button className="text-4xl font-black cursor-pointer bg-slate-600 rounded-full p-4" onClick={() => setShowCart(false)}>{"＞"}</button>

    const CartToast = (
        <button className="flex justify-end text-2xl font-bold cursor-pointer fixed right-4 bottom-4 bg-slate-600 rounded-full p-4" onClick={() => setShowCart(true)}>
            <Image src={cartImage} alt="a shopping cart" width={48} height={48}/>
            <p className="text-center my-auto">({localCart?.length})</p>
        </button>
    )

    const Cart = (
        <div className="flex flex-col mx-auto gap-4 p-8 fixed bg-slate-900 w-full lg:w-4/5 right-0 h-full lg:rounded-l-xl">
            <div className="flex align-middle justify-between">
                {CloseButton}
                <p className="flex text-2xl font-bold items-center text-center">{`${localCart.length} items`}</p>
                <button className="text-2xl font-bold cursor-pointer" onClick={() => setLocalCart([])}>Empty Cart</button>
            </div>
            <div className="mx-auto flex flex-col gap-4">
                {entries}
                {sum > 0 && <p className="flex flex-1 justify-end text-4xl font-bold">Total: ${sum}</p>}
            </div>
        </div>
    )

    return (
        showCart ? Cart : CartToast
    )
}
