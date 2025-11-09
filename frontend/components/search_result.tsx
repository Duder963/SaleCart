/*
 * Term Card
 * Displays the data of a term from the glossary
 * Also handles processing the data into a more usable format
 */
import Image from 'next/image'
import { GameData } from './game_data'
import useLocalStorageState from "use-local-storage-state"
import Link from 'next/link'
import missingImage from "@/public/missing.png"

export default function SearchResult({data}: {data: GameData}) {

    const {id, title, banner_url, itad_url, price, store, store_url, is_lowest} = data
    const [localCart, setLocalCart] = useLocalStorageState<GameData[]>('cart', {
        defaultValue: []
    })
    // const [inCart, setInCart] = useState(localCart.some((i) => i.id == id))
    const inCart = localCart.some((i) => i.id == id)

    function addToCart(game: GameData) {
        setLocalCart(localCart.concat(game))
    }

    function removeFromCart() {
        setLocalCart(localCart.filter((i) => i.id != id))
    }

    const button_class = "flex text-6xl self-stretch items-center w-10 justify-center cursor-pointer"

    return (
        <div className='flex content-stretch h-full rounded-xl overflow-clip'>
            <div className='flex flex-1 flex-col sm:flex-row'>
                <Link 
                    className='flex flex-1 flex-col lg:flex-row bg-slate-700 hover:bg-slate-600 h-full content-stretch items-center'
                    href={itad_url ?? ""} 
                >
                    <Image src={banner_url ?? missingImage} width={300} height={140} objectFit='cover' alt='A banner image of a video game'/>
                    <h3 className="flex-1 text-3xl m-4 font-bold text-center">{title}</h3>
                </Link>
                <Link href={store_url ?? ""} className='flex p-4 flex-col bg-slate-800 hover:bg-slate-700 md:w-30 justify-center text-center'>
                    {price != null && <p className={"text-3xl font-bold" + (is_lowest && " text-green-300")}>{price > 0 ? `\$${price}` : "Free"}</p>}
                    {store && <p className="text-xl font-bold">{store}</p>}
                </Link>
            </div>
            {inCart
                ? <button className={`${button_class} bg-slate-500 hover:bg-slate-400`} onClick={() => removeFromCart()}>x</button>
                : <button className={`${button_class} bg-green-700 hover:bg-green-600`} onClick={() => addToCart(data)}>+</button>
            }
        </div>
    )

}
