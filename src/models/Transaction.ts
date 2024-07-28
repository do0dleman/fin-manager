type Transaction = {
    id: string
    name: string | undefined
    amount: number;
    category: string;
    type: "income" | "expense";
}

export default Transaction