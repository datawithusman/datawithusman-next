import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from './env'

const sanityConfigured = projectId !== 'your_project_id_here'

export const client = sanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
    })
  : null