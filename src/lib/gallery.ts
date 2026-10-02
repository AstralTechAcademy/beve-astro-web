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

function getGalleryEndpoint(activityId: string): string | undefined {
  const baseUrl = import.meta.env.GALLERY_API_URL;

  if (!baseUrl) {
    return undefined;
  }

  return baseUrl.replace('{id}', activityId);
}

export async function fetchActivityGallery(activityId: string): Promise<GalleryImage[]> {
  const endpoint = getGalleryEndpoint(activityId);

  if (!endpoint) {
    console.warn(
      `[gallery] GALLERY_API_URL no configurada. Galería vacía para actividad ${activityId}.`,
    );
    return [normalizeImage("https://assets.diarioconcepcion.cl/2022/10/pag-14-4-Colegio-Bicentenario-Republica-de-Brasil-foto-isidoro.jpg"),
      normalizeImage("https://assets.diarioconcepcion.cl/2022/10/pag-14-4-Colegio-Bicentenario-Republica-de-Brasil-foto-isidoro.jpg"),
      normalizeImage("https://assets.diarioconcepcion.cl/2022/10/pag-14-4-Colegio-Bicentenario-Republica-de-Brasil-foto-isidoro.jpg"),
      normalizeImage("https://assets.diarioconcepcion.cl/2022/10/pag-14-4-Colegio-Bicentenario-Republica-de-Brasil-foto-isidoro.jpg"),
      normalizeImage("https://assets.diarioconcepcion.cl/2022/10/pag-14-4-Colegio-Bicentenario-Republica-de-Brasil-foto-isidoro.jpg"),
      normalizeImage("https://assets.diarioconcepcion.cl/2022/10/pag-14-4-Colegio-Bicentenario-Republica-de-Brasil-foto-isidoro.jpg"),
      normalizeImage("https://assets.diarioconcepcion.cl/2022/10/pag-14-4-Colegio-Bicentenario-Republica-de-Brasil-foto-isidoro.jpg"),
      normalizeImage("https://assets.diarioconcepcion.cl/2022/10/pag-14-4-Colegio-Bicentenario-Republica-de-Brasil-foto-isidoro.jpg"),
      normalizeImage("https://assets.diarioconcepcion.cl/2022/10/pag-14-4-Colegio-Bicentenario-Republica-de-Brasil-foto-isidoro.jpg"),
      normalizeImage("https://assets.diarioconcepcion.cl/2022/10/pag-14-4-Colegio-Bicentenario-Republica-de-Brasil-foto-isidoro.jpg"),
      normalizeImage("https://assets.diarioconcepcion.cl/2022/10/pag-14-4-Colegio-Bicentenario-Republica-de-Brasil-foto-isidoro.jpg"),
      normalizeImage("https://assets.diarioconcepcion.cl/2022/10/pag-14-4-Colegio-Bicentenario-Republica-de-Brasil-foto-isidoro.jpg"),
      normalizeImage("https://assets.diarioconcepcion.cl/2022/10/pag-14-4-Colegio-Bicentenario-Republica-de-Brasil-foto-isidoro.jpg"),
      normalizeImage("https://assets.diarioconcepcion.cl/2022/10/pag-14-4-Colegio-Bicentenario-Republica-de-Brasil-foto-isidoro.jpg"),
      normalizeImage("https://assets.diarioconcepcion.cl/2022/10/pag-14-4-Colegio-Bicentenario-Republica-de-Brasil-foto-isidoro.jpg"),
    ];
  }

  try {
    const response = await fetch(endpoint);

    if (!response.ok) {
      console.warn(
        `[gallery] Error ${response.status} al obtener galería de ${activityId}: ${endpoint}`,
      );
      return [];
    }

    const data = (await response.json()) as GalleryApiResponse | string[];

    if (Array.isArray(data)) {
      return data.map(normalizeImage);
    }

    if (!data.images?.length) {
      return [];
    }

    return data.images.map(normalizeImage);
  } catch (error) {
    console.warn(`[gallery] No se pudo obtener la galería de ${activityId}:`, error);
    return [];
  }
}
