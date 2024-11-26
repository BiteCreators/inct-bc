import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  documents: ['src/**/*.{ts,tsx}'],
  generates: {
    './src/common/types/': {
      plugins: [],
      preset: 'client',
      presetConfig: {
        gqlTagName: 'gql',
      },
    },
  },
  ignoreNoDocuments: true,
  // schema: process.env.NEXT_PUBLIC_GRAPHQL_API_URL,
  schema: 'https://inctagram.work/api/v1/graphql',
}

export default config
