interface Game {
    gameName: string;
    gameImage?: string | null; // Optional
}

interface Item {
    Game: Game;
    itemName: string;
    itemType: string;
    itemImage?: string | null; // Optional
}

interface CoinsSpend {
    id: number;
    coinsSpend: number;
    Game: Game;
}

interface CoinsEarned {
    id: number;
    gameBalance: number;
    Game: Game;
}

interface PurchaseHistory {
    id: number;
    createdAt: string; // Date string
    amount: number;
    Item: Item;
}

interface Data {
    coinsSpend: CoinsSpend[];
    coinsEarned: CoinsEarned[];
    purchaseHistory: PurchaseHistory[];
}


export type {Data, CoinsEarned, CoinsSpend}