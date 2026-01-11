export interface Coin {
    id: string;
    symbol: string;
    name: string;
    image: string;
    current_price: number;
    price_change_percentage_24h: number;
    market_cap: number;
    total_volume: number;
}

export interface PortfolioCoin {
    coin: Coin;
    amount: number;
    buyPrice: number;
}

export interface ChartData {
    time: string;
    price: number;
}
