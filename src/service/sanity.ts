import { createClient } from '@sanity/client';
// https://www.sanity.io/docs/connect-your-content-to-next-js
// https://www.sanity.io/docs/js-client#quickstart
// https://www.sanity.io/docs/js-client#creating-if-not-already-present
import imageUrlBuilder from '@sanity/image-url';
// https://www.sanity.io/docs/image-url
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

export const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  useCdn: false,
  apiVersion: '2024-07-03',
  token: process.env.SANITY_SECRET_TOKEN,
});

const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source).width(800).url();
}

//myProjectId.api.sanity.io/v2021-06-07/assets/images/myDataset
export const assetsURL = `https://${process.env.SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/assets/images/${process.env.SANITY_DATASET}`;
