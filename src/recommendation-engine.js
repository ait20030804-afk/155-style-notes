import { outfitCases } from './case-data.js'

export function getRecommendation(input) {
  const outfitCase = outfitCases.find((item) => item.scene === input.scene)
  if (!outfitCase) return null

  return {
    outfitCase,
    budgetGuidance: outfitCase.budgetGuidance[input.budget],
    selectedStyle: input.style,
  }
}
