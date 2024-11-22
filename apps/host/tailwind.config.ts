import type { Config } from 'tailwindcss'

import baseConfig from '../../tailwind.config.base'

const config: Config = {
  ...baseConfig,
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/common/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/*.{js,ts,jsx,tsx,mdx}',
    './src/widgets/**/*.{js,ts,jsx,tsx,mdx}',
    './src/application/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@packages/shared/src/ui/**/*.{js,ts,jsx,tsx}',
  ],
}

export default config
