import type { Config } from 'tailwindcss'

import baseConfig from '../../tailwind.config.base'

const config: Config = {
  ...baseConfig,
  content: ['./node_modules/@packages/shared/src/ui/**/*.{js,ts,jsx,tsx}'],
}

export default config
