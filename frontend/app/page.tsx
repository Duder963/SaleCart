import GameSearch from "@/components/game_search"
import { Suspense } from "react"

export default function Home() {
    return (
        <div className="overflow-x-hidden">
            <Suspense>
            <GameSearch />
            </Suspense>
        </div>
    )
}
