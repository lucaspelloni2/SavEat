export interface Color {
  red: number;
  hex: string;
  blue: number;
  green: number;
}

export interface Vibrant {
  red: number;
  hex: string;
  blue: number;
  green: number;
}

export interface MutedLight {
  red: number;
  hex: string;
  blue: number;
  green: number;
}

export interface Muted {
  red: number;
  hex: string;
  blue: number;
  green: number;
}

export interface VibrantDark {
  red: number;
  hex: string;
  blue: number;
  green: number;
}

export interface VibrantLight {
  red: number;
  hex: string;
  blue: number;
  green: number;
}

export interface MutedDark {
  red: number;
  hex: string;
  blue: number;
  green: number;
}

export interface DominantColors {
  vibrant: Vibrant;
  muted_light: MutedLight;
  muted: Muted;
  vibrant_dark: VibrantDark;
  vibrant_light: VibrantLight;
  muted_dark: MutedDark;
}

export interface ColorPalette {
  colors: Color[];
  average_luminance: number;
  dominant_colors: DominantColors;
}
