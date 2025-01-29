import { type SchemaTypeDefinition } from 'sanity'
import product from './product'
import HeroImages from './heroImages'


export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product , HeroImages],
}
