
// array typed so for z.enum() that is used for the input validation
export const transactionCategories:
  readonly [TransactionCategoryType, ...TransactionCategoryType[]] = [
    'Clothing', 'Education', 'Entertainment', 'Food', 'Gifts',
    'Groceries', 'Healthcare', 'Household Items', 'Housing',
    'Insurance', 'Personal', 'Retirement', 'Savings',
    'Transportation', 'Utilities', 'Other'
  ]

export type TransactionCategoryType = [
  'Clothing', 'Education', 'Entertainment', 'Food', 'Gifts',
  'Groceries', 'Healthcare', 'Household Items', 'Housing',
  'Insurance', 'Personal', 'Retirement', 'Savings',
  'Transportation', 'Utilities', 'Other'
][number]