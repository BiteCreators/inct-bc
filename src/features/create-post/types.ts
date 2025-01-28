export type ImageData = {
  initialUrl: string
  selectedFilter: Filters
  totalFile: File
  totalUrl: string
}

export type Filters =
  | 'blur'
  | 'brightness'
  | 'contrast'
  | 'grayscale'
  | 'heatmap'
  | 'negative'
  | 'original'
  | 'pixelate'
  | 'posterize'
  | 'sepia'
  | 'sharpen'
  | 'threshold'
  | 'vignette'
