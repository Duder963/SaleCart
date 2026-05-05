/*
 * Term Card
 * Displays the data of a term from the glossary
 * Also handles processing the data into a more usable format
 */
import Image from "next/image"
import { GameData } from './game_data'
import useLocalStorageState from "use-local-storage-state"
import { useState } from "react"
import Link from 'next/link'
import missingImage from "@/public/missing.png"

export default function SearchResult({data, flashRemove = false, onRemoveStart}: {data: GameData, flashRemove?: boolean, onRemoveStart?: () => void}) {

    const {id, title, banner_url, itad_url, price, store, store_url, is_lowest} = data
    const [localCart, setLocalCart] = useLocalStorageState<GameData[]>('cart', {
        defaultValue: []
    })
    const inCart = localCart.some((i) => i.id == id)
    const [removing, setRemoving] = useState(false)
    const [justAdded, setJustAdded] = useState(false)

    function handleAddToCart() {
        setLocalCart(localCart.concat(data))
        setJustAdded(true)
    }

    function handleRemoveFromCart() {
        onRemoveStart?.()
        if (flashRemove) {
            setLocalCart((prev: GameData[]) => prev.filter((i) => i.id !== id))
        }
        setRemoving(true)
    }

    function handleAnimationEnd() {
        if (justAdded) setJustAdded(false)
        if (removing) {
            if (!flashRemove) {
                setLocalCart((prev: GameData[]) => prev.filter((i) => i.id !== id))
            }
            setRemoving(false)
        }
    }

    const button_class = "flex text-4xl self-stretch items-center w-12 justify-center cursor-pointer transition-colors duration-150 "

    const animClass = removing
        ? (flashRemove ? 'animate-cart-remove-flash' : 'animate-cart-remove')
        : justAdded ? 'animate-cart-add' : ''

    return (
        <div className={`flex content-stretch h-full rounded-xl overflow-clip shadow-md ${animClass}`} onAnimationEnd={handleAnimationEnd}>
            <div className='flex flex-1 flex-col sm:flex-row'>
                <Link
                    className='flex flex-1 flex-col lg:flex-row bg-slate-700 hover:bg-slate-600 h-full content-stretch items-center transition-colors duration-150'
                    href={itad_url ?? ""}
                >
                    <Image
                        src={banner_url ?? missingImage}
                        width={300}
                        height={140}
                        alt='A banner image of a video game'
                        style={{
                            maxWidth: "100%",
                            height: "auto",
                            objectFit: "cover"
                        }} />
                    <h3 className="flex-1 text-3xl m-4 font-bold text-center">{title}</h3>
                </Link>
                <Link href={store_url ?? ""} className='flex p-4 flex-col bg-slate-800 hover:bg-slate-700 md:w-30 justify-center text-center transition-colors duration-150'>
                    {price != null && <p className={"text-3xl font-bold" + (is_lowest ? " text-green-400" : "")}>{price > 0 ? `$${price}` : "Free"}</p>}
                    {store && <p className="text-lg font-semibold text-slate-300">{store}</p>}
                </Link>
            </div>
            {inCart
                ? <button disabled={removing} className={`${button_class} bg-slate-600 hover:bg-slate-500 text-white`} onClick={handleRemoveFromCart}>✕</button>
                : <button disabled={removing} className={`${button_class} bg-green-700 hover:bg-green-600 text-white`} onClick={handleAddToCart}>＋</button>
            }
        </div>
    );

}
