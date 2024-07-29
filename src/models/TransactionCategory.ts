
// array typed so for z.enum() that is used for the input validation
export const expenseTransactionCategories:
  readonly [TransactionCategoryType, ...TransactionCategoryType[]] = [
    'Clothing', 'Education', 'Entertainment', 'Food', 'Gifts',
    'Groceries', 'Healthcare', 'Household Items', 'Housing',
    'Insurance', 'Investment', 'Personal', 'Retirement', 'Savings',
    'Transportation', 'Utilities', 'Other'
  ]

export const incomeTransactionCategories:
  readonly [TransactionCategoryType, ...TransactionCategoryType[]] = [
    'Allowance', 'Commision', 'Gifts', ' Goverment Payment',
    'Interest', 'Investment', 'Salary', 'Sale', 'Wage', 'Other'
  ]

export const transactionCategories:
  readonly [TransactionCategoryType, ...TransactionCategoryType[]] = [
    ...expenseTransactionCategories,
    ...(incomeTransactionCategories
      .filter((val) => !expenseTransactionCategories.includes(val)))
  ]

export type TransactionCategoryType = [
  'Clothing', 'Education', 'Entertainment', 'Food', 'Gifts',
  'Groceries', 'Healthcare', 'Household Items', 'Housing',
  'Insurance', 'Personal', 'Retirement', 'Savings',
  'Transportation', 'Utilities', ' Goverment Payment', 'Allowance',
  'Commision', 'Gifts', 'Interest', 'Investment', 'Salary',
  'Sale', 'Wage', 'Other'
][number]