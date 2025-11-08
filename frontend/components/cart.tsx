'use client'
import useLocalStorageState from "use-local-storage-state"
import SearchResult from "./search_result"
import { GameData } from "./game_data"

export function CartPage({toggleAction}: {toggleAction: () => void}) {
    const [localCart, setLocalCart] = useLocalStorageState<GameData[]>('cart', {
        defaultValue: []
    })

    const entries = localCart.map((entry) => <SearchResult key={entry.id} data={entry}/>)
    const sum = localCart.reduce((acc, curr) => acc + (curr.price ?? 0), 0)

    console.log(localCart.length)
    if (localCart.length == 0) {
        return (
            <div className="p-8">
                <button className="text-4xl font-bold cursor-pointer" onClick={() => toggleAction()}>{">"}</button>
                <p className="flex flex-1 h-full text-6xl m-auto items-center justify-center">Cart is empty</p>
            </div>
        )
    }

    return (
        <div className="flex flex-col mx-auto gap-4 p-8">
            <div className="flex justify-between">
            <button className="text-4xl font-black cursor-pointer bg-slate-600 rounded-full p-4" onClick={() => toggleAction()}>{"＞"}</button>
                <p className="text-4xl font-bold">{`${localCart.length} items`}</p>
                <button className="text-4xl font-bold cursor-pointer" onClick={() => setLocalCart([])}>Empty Cart</button>
            </div>
            <div className="m-auto flex flex-col gap-4">
                {entries}
            </div>
            <p className="flex flex-1 justify-end text-4xl font-bold">Total: ${sum}</p>
        </div>
    )
}
