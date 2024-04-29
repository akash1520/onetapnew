interface Item {
    [key: string]: number | boolean | string;
}

interface Result {
    aggregate: number;
    anyTrue: boolean;
    firstString: string | null;
}

type FinalResult = number | boolean | string | null;

interface Results {
    [key: string]: Result;
}

interface FinalResults {
    [key: string]: FinalResult;
}

interface TypeStrategy {
    isApplicable: (value: any) => boolean;
    execute: (key: string, value: any, results: Results) => void;
}

// Defining type strategies
const numberStrategy: TypeStrategy = {
    isApplicable: (value): value is number => typeof value === 'number',
    execute: (key, value, results) => {
        results[key].aggregate += value;
    }
};

const booleanStrategy: TypeStrategy = {
    isApplicable: (value): value is boolean => typeof value === 'boolean',
    execute: (key, value, results) => {
        if (value) {
            results[key].anyTrue = true;
        }
    }
};

const stringStrategy: TypeStrategy = {
    isApplicable: (value): value is string => typeof value === 'string',
    execute: (key, value, results) => {
        if (results[key].firstString === null) {
            results[key].firstString = value;
        }
    }
};

const strategies: TypeStrategy[] = [numberStrategy, booleanStrategy, stringStrategy];

function aggregateAllProperties(items: Item[]): FinalResults {
    const results: Results = {};

    items.forEach(item => {
        Object.keys(item).forEach(key => {
            const value = item[key];
            if (!(key in results)) {
                results[key] = { aggregate: 0, anyTrue: false, firstString: null };
            }
            const strategy = strategies.find(s => s.isApplicable(value));
            strategy?.execute(key, value, results);
        });
    });

    return Object.entries(results).reduce((acc, [key, data]) => {
        acc[key] = data.firstString ?? data.anyTrue ?? (data.aggregate !== 0 ? data.aggregate : null);
        return acc;
    }, {} as FinalResults);
}

const data: Item[] = [
    { value: 10, active: false, description: "First item", type: 'A' },
    { value: 20, active: true, description: "Second item", type: 'B' },
    { value: 30, active: false, type: 'A' },
    { value: 5, newProp: true }
];

const results = aggregateAllProperties(data);
console.log(results)
