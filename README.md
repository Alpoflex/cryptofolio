# CryptoFolio

Real-time cryptocurrency portfolio tracker. Track prices, calculate holdings, monitor the market.

## Features

**Live Data**
- Real-time prices from CoinGecko API
- Top 100 cryptocurrencies
- 24h price changes
- Market cap rankings

**Portfolio Management**
- Add/remove coins
- Track quantities
- Auto-calculate total value
- LocalStorage persistence

**Market Overview**
- Global market cap
- 24h volume
- BTC dominance
- Market stats

## Stack

Next.js • TypeScript • Tailwind • CoinGecko API • Chart.js

## Local Setup

```bash
npm install
npm run dev
```

No API key needed - CoinGecko's free tier works out of the box.

## Notes

Data updates every 60 seconds. Portfolio calculations are client-side only (your data stays private).

Built to scratch my own itch - wanted a simple way to track crypto without signing up for yet another centralized platform.

---

*Uses CoinGecko free API. Market data may have slight delays.*
