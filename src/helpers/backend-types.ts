// Just copy pasted from backend
import {FoodCategory} from './food-categories';

export type CoopSearchResult = {
  name: string;
  id: string;
};

export type MigrosSearchResult = {
  name: string;
  id: string;
};

export type WeightUnit = 'g' | 'l';

export type Label = 'FINE_FOOD' | 'BIO' | 'NATURAPLAN' | 'TERRASUISSE';

export type Supermarket = 'MIGROS' | 'COOP';

export type Product = {
  food: FoodCategory;
  store: Supermarket;
  origin: string | null;
  name: string;
  price: number | null;
  basePrice: number;
  baseUnit: WeightUnit;
  image: string | null;
  labels: Label[];
};

export type RecipeIngredient = {
  food: FoodCategory;
  gram: number;
  labelOverride?: string;
};

export type Remark = {
  message: string;
};

export type IngredientEvaluation = {
  label: string;
  unit: string;
  perPerson: number;
  food: FoodCategory;
  averageCarbonEmission: number;
  positiveRemarks: Remark[];
  negativeRemarks: Remark[];
};

export type Recipe = {
  name: string;
  ingredients: RecipeIngredient[];
};

export type RecipeEvaluationPossibilityIngredient = {
  products: Product[];
};

export type RecipeEvaluationPossibility = {
  store: Supermarket;
  ingredients: RecipeEvaluationPossibilityIngredient[];
};

export type RecipeEvaluation = {
  recipe: Recipe;
  possibilities: RecipeEvaluationPossibility[];
  ingredientEvaluation: IngredientEvaluation[];
};
