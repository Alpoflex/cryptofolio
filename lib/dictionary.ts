export type Language = 'en' | 'tr';

export const dictionary = {
    en: {
        title: "CryptoFolio",
        subtitle: "Track Your Digital Assets",
        portfolio: {
            title: "Your Portfolio",
            totalValue: "Total Value",
            totalProfit: "Total Profit/Loss",
            addCoin: "Add Cryptocurrency",
            empty: "No coins in portfolio. Add some to get started!",
        },
        coin: {
            price: "Price",
            change24h: "24h Change",
            holdings: "Holdings",
            value: "Value",
            profit: "Profit/Loss",
            amount: "Amount",
            buyPrice: "Buy Price",
            remove: "Remove",
        },
        search: {
            placeholder: "Search cryptocurrency...",
            loading: "Loading...",
            noResults: "No results found",
        },
        chart: {
            day: "24H",
            week: "7D",
            month: "30D",
        }
    },
    tr: {
        title: "CryptoFolio",
        subtitle: "Dijital Varlıklarınızı Takip Edin",
        portfolio: {
            title: "Portföyünüz",
            totalValue: "Toplam Değer",
            totalProfit: "Toplam Kar/Zarar",
            addCoin: "Kripto Para Ekle",
            empty: "Portföyde coin yok. Ekleyerek başlayın!",
        },
        coin: {
            price: "Fiyat",
            change24h: "24s Değişim",
            holdings: "Sahip Olunan",
            value: "Değer",
            profit: "Kar/Zarar",
            amount: "Miktar",
            buyPrice: "Alış Fiyatı",
            remove: "Kaldır",
        },
        search: {
            placeholder: "Kripto para ara...",
            loading: "Yükleniyor...",
            noResults: "Sonuç bulunamadı",
        },
        chart: {
            day: "24S",
            week: "7G",
            month: "30G",
        }
    }
};
