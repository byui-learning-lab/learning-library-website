import {type SchemaTypeDefinition} from 'sanity'

import libDoc from './libDoc'
import role from './role'
import teamMember from './teamMember'
import researchAgenda from './researchAgenda'
import project from './project'
import attributionDocument from './attributionDocument'
import quickDive from './quickDive'
import practiceGuide from './practiceGuide'
import canvasSandboxItem from './canvasSandboxItem'
import protocol from './protocol'
import workflow from './workflow'

export const schema: {types: SchemaTypeDefinition[]} = {
  types: [
    libDoc,
    role,
    teamMember,
    researchAgenda,
    project,
    attributionDocument,
    quickDive,
    practiceGuide,
    canvasSandboxItem,
    protocol,
    workflow,
  ],
}
