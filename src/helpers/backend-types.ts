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
  image: string;
};

export type Remark = {
  message: string;
  co2Change: number;
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
  slug: string;
  ingredients: RecipeIngredient[];
  instructions: string;
  image: string;
};

export type ProductWithCarbonProjection = {
  product: Product;
  co2Offset: number;
  positiveRemarks: Remark[];
  negativeRemarks: Remark[];
};

export type RecipeEvaluationPossibilityIngredient = {
  products: ProductWithCarbonProjection[];
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
