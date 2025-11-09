import GameSearch from "@/components/game_search"
import Cart from "@/components/cart"
import { Suspense } from "react"

export default function Home() {
    return (
        <div className="overflow-x-hidden">
            <Suspense>
            <Cart />
            <GameSearch />
            </Suspense>
        </div>
    )
}
