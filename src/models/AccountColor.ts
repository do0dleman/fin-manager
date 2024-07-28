
// array typed so for z.enum() that is used for the input validation
export const accountColors:
  readonly [AccountColorType, ...AccountColorType[]] = [
    'red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'purple'
  ]

export type AccountColorType = [
  'red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'purple'
][number]