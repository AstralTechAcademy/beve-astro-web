import { Storage } from '@google-cloud/storage';
import { writeFile } from 'node:fs/promises';

const storage = new Storage();

const BUCKET_NAME = 'beve-23eqr';
const PREFIX = 'fotografias/actividades';

export async function getGalleryImages() {
    const [files] = await storage
    .bucket(BUCKET_NAME)
    .getFiles({
        prefix: PREFIX,
    });

  const filesByFolder = new Map<string, {
    name: string;
    url: string;
  }[]>();

  files.forEach((file) => {
    const parts = file.name.split('/');
    const name = parts.pop() ?? 'default';
    const folder = parts.pop() ?? 'default';

    if (!filesByFolder.has(folder)) {
      filesByFolder.set(folder, []);
    }

    const regex = /\b(jpg|png|jpeg)\b/g;
    if (regex.test(file.publicUrl()))
    {
      filesByFolder.get(folder)!.push({
        name,
        url: file.publicUrl()
      });
    }
  });

  return filesByFolder
}

const files = await getGalleryImages();

if (files.size == 0) {
  console.warn(
    `Galería vacía para actividad`,
  );
}

const json = Object.fromEntries(files);

await writeFile(
  './src/lib/images.json',
  JSON.stringify(json, null, 2),
  'utf8'
);
