'use client'
import useLocalStorageState from "use-local-storage-state"
import { useState } from "react"
import SearchResult from "./search_result"
import { GameData } from "./game_data"
import Image from "next/image"
import cartImage from "@/public/cart.svg"

function CartItem({ entry, emptying, delay }: { entry: GameData, emptying: boolean, delay: number }) {
    const [collapsing, setCollapsing] = useState(false)
    const isCollapsing = collapsing || emptying
    return (
        <div
            className={`grid transition-[grid-template-rows] duration-[280ms] ease-in ${isCollapsing ? 'grid-rows-[0fr]' : 'grid-rows-[1fr]'}`}
            style={emptying ? { transitionDelay: `${delay}ms` } : undefined}
        >
            <div className="min-h-0 overflow-hidden">
                <div
                    className={`pb-4 ${emptying ? 'animate-cart-remove' : ''}`}
                    style={emptying ? { animationDelay: `${delay}ms` } : undefined}
                >
                    <SearchResult data={entry} onRemoveStart={() => setCollapsing(true)} />
                </div>
            </div>
        </div>
    )
}

export default function Cart() {
    const [localCart, setLocalCart] = useLocalStorageState<GameData[]>('cart', {
        defaultValue: []
    })
    const [showCart, setShowCart] = useState(false)

    const [emptying, setEmptying] = useState(false)

    function handleEmptyCart() {
        setEmptying(true)
        setTimeout(() => {
            setLocalCart([])
            setEmptying(false)
        }, localCart.length * 40 + 300)
    }

    const entries = localCart.map((entry, i) => (
        <CartItem key={entry.id} entry={entry} emptying={emptying} delay={i * 40} />
    ))
    const sum = localCart.reduce((acc, curr) => acc + (curr.price ?? 0), 0)

    return (
        <>
            {/* Backdrop */}
            <div
                className={`fixed inset-0 bg-black/60 z-40 transition-opacity duration-300 ${showCart ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setShowCart(false)}
            />

            {/* Cart toast button */}
            <button
                className={`flex justify-end gap-2 text-2xl font-bold cursor-pointer fixed right-4 bottom-4 bg-slate-700 hover:bg-slate-600 border border-slate-500 rounded-full p-4 z-30 shadow-xl transition-all duration-300 ${showCart ? 'opacity-0 pointer-events-none scale-75' : 'opacity-100 scale-100'}`}
                onClick={() => setShowCart(true)}
            >
                <Image
                    src={cartImage}
                    alt="a shopping cart"
                    width={48}
                    height={48}
                    style={{ maxWidth: "100%", height: "auto" }}
                />
                <p className="text-center my-auto">({localCart?.length})</p>
            </button>

            {/* Cart panel */}
            <div className={`flex flex-col gap-4 p-8 fixed bg-slate-900 border-l border-slate-700 w-full lg:w-4/5 right-0 top-0 h-full lg:rounded-l-xl z-50 shadow-2xl transition-transform duration-300 ease-in-out ${showCart ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex align-middle justify-between items-center">
                    <button
                        className="text-2xl font-black cursor-pointer bg-slate-700 hover:bg-slate-600 rounded-full w-12 h-12 flex items-center justify-center transition-colors duration-150"
                        onClick={() => setShowCart(false)}
                        aria-label="Close cart"
                    >
                        ✕
                    </button>
                    <p className="text-2xl font-bold">{localCart.length} {localCart.length === 1 ? 'item' : 'items'}</p>
                    <button
                        className="text-lg font-bold cursor-pointer flex items-center gap-2 text-slate-400 hover:text-red-400 transition-colors duration-150 disabled:opacity-40 disabled:cursor-not-allowed"
                        onClick={handleEmptyCart}
                        disabled={emptying || localCart.length === 0}
                    >
                        🗑️ Empty
                    </button>
                </div>
                <div className="flex flex-col overflow-y-auto">
                    {entries}
                    {sum > 0 && (
                        <p className="flex flex-1 justify-end text-4xl font-bold text-green-400 pt-2 border-t border-slate-700">
                            Total: ${sum.toFixed(2)}
                        </p>
                    )}
                </div>
            </div>
        </>
    )
}
