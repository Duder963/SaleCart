export interface GameData {
    id: string,
    title: string,
    banner_url: string | null,
    itad_url: string
    price: number | null,
    store: string | null,
    store_url: string | null
    is_lowest: boolean | null,
}
