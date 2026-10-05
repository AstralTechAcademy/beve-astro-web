# Astro Starter Kit: Basics

```sh
npm create astro@latest -- --template basics
```
## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npx run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## Generate activities images links
  
The script gallery.ts uses application_default_credentials.json ile to connect and download all images stored in Google Cloud Storage (GCS) in the bucket 'beve-23eqr' and folder 'fotografias/actividades'. Inside 'fotografias/actividades' the images are structured in folder, every activities have a folder here.

To create the galleries for the activities you must run the command 

`node src/lib/gallery.ts`

## Generate images and push 

Due images.json is created before build astro web, we have to create this file before push the code to Github and run in Github action the build and publish actions.


`node src/lib/gallery.ts; git add src/lib/images.json; git commit -m "build"; git push origin main`
