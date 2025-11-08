import express from "express"
import dotenv from "dotenv"
dotenv.config()

const KEY = process.env.KEY
const router = express.Router()

export async function getAPI(req, res) {
    res.status(200).json({success:true,message:"Server is live!"})
}

export async function getSearch(req, res) {
    let {game} = req.params
    game = decodeURIComponent(game)
    const search_url = "https://api.isthereanydeal.com/games/search/v1"
    let params = new URLSearchParams({
        key: KEY,
        title: game,
    })

    let data = await fetch(`${search_url}?${params.toString()}`)
        .then(res => res.json())
        .catch((err) => console.error(err))

    const results = []
    const ids = []
    for (let i in data) {
        ids.push(data[i].id)
        results.push({
            id: data[i].id,
            title: data[i].title,
            banner_url: data[i].assets.banner300,
        })
    }

    const price_url = "https://api.isthereanydeal.com/games/overview/v2"
    params = new URLSearchParams({
        key: KEY,
    })

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(ids)
    }
    
    data = await fetch(`${price_url}?${params.toString()}`, options)
        .then(res => res.json())
        .catch((err) => console.error(err))

    data = data.prices

    for (let i in data) {
        const result = results.find((r) => r.id == data[i].id)
        result.itad_url = data[i].urls?.game ?? null
        result.price = data[i].current?.price?.amount ?? null
        result.store = data[i].current?.shop?.name ?? null
        result.store_url = data[i].current?.url ?? null
        result.is_lowest = (result.price == (data[i].lowest?.price?.amount ?? 0))
    }

    res.status(200).json(results)
}

router.get("/", getAPI)
router.get("/:game", getSearch)
export default router
