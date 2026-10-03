import { Storage } from '@google-cloud/storage';

const storage = new Storage();

const BUCKET_NAME = 'beve-23eqr';
const PREFIX = 'fotografias/actividades';

export async function getGalleryImages() {
    const [files] = await storage
    .bucket(BUCKET_NAME)
    .getFiles({
        prefix: PREFIX,
    });

    return files.filter((file) =>
      /\.(jpg|jpeg|webp|)$/i.test(file.name)
    )
    .map((file) => ({
      name: file.name.split('/').pop(),
      url: file.publicUrl()
    }));;
}

export interface GalleryImage {
  url: string;
  alt?: string;
}

interface GalleryApiResponse {
  images?: Array<string | GalleryImage>;
}

function normalizeImage(entry: string | GalleryImage): GalleryImage {
  if (typeof entry === 'string') {
    return { url: entry, alt: '' };
  }

  return {
    url: entry.url,
    alt: entry.alt ?? '',
  };
}

export async function fetchActivityGallery(activityId: string): Promise<GalleryImage[]> {
  const files = await getGalleryImages();

  if (!files) {
    console.warn(
      `Galería vacía para actividad ${activityId}.`,
    );
    return []
  }
  
  return files.map(({ url }) => normalizeImage(url));
}
