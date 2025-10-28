export const MOCK_DATA = {
    user: {
        documentType: "DNI",
        documentNumber: "12345678",
        password: "demo123",
        name: "Josue Eduardo David",
        initials: "JE",
    },
    accounts: [
        {
        id: 1,
        name: "Cuenta sueldo",
        accountNumber: "3703",
        availableBalance: 30.17,
        accountingBalance: 30.17,
        type: "sueldo",
        },
    ],
    cards: [
        {
        id: 1,
        name: "Mundo sueldo",
        cardNumber: "9429",
        type: "debit",
        },
    ],
    transactions: [
        {
        id: 1,
        date: "2025-10-19",
        description: "Transf inmediata al 003 223391",
        amount: -20.0,
        accountId: 1,
        },
        {
        id: 2,
        date: "2025-10-18",
        description: "Transf inmediata al 003 923663",
        amount: -50.0,
        accountId: 1,
        },
    ],
    summary: {
        income: 0.0,
        expenses: 88.0,
    },
};
