# poe-dashboard dev dashboard

```sh
npm create astro@latest -- --template minimal
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/withastro/astro/tree/latest/examples/minimal)
[![Open with CodeSandbox](https://assets.codesandbox.io/github/button-edit-lime.svg)](https://codesandbox.io/p/sandbox/github/withastro/astro/tree/latest/examples/minimal)
[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/withastro/astro?devcontainer_path=.devcontainer/minimal/devcontainer.json)


## 🚀 Project Structure

The project file structure is found below and should follow this structure for future expansion-reference

```text
poe-app
├─ .git
│  ├─ COMMIT_EDITMSG
│  ├─ FETCH_HEAD
│  ├─ HEAD
│  ├─ branches
│  ├─ config
│  ├─ description
│  ├─ index
│  ├─ info
│  │  └─ exclude
│  ├─ logs
│  │  ├─ HEAD
│  │  └─ refs
│  │     ├─ heads
│  │     │  └─ main
│  │     └─ remotes
│  │        └─ origin
│  │           ├─ HEAD
│  │           └─ main
│  ├─ refs
│  │  ├─ heads
│  │  │  └─ main
│  │  ├─ remotes
│  │  │  └─ origin
│  │  │     ├─ HEAD
│  │  │     └─ main
│  │  └─ tags
├─ .gitignore
├─ .vscode
│  ├─ extensions.json
│  └─ launch.json
├─ README.md
├─ astro.config.mjs
├─ backend
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ server.js
│  └─ src
│     └─ env.d.ts
├─ components.json
├─ package-lock.json
├─ package.json
├─ public
│  └─ favicon.svg
├─ src
│  ├─ components
│  │  ├─ AppPage.tsx
│  │  └─ ui
│  │     ├─ badge.tsx
│  │     ├─ button.tsx
│  │     ├─ card.tsx
│  │     ├─ input.tsx
│  │     └─ label.tsx
│  ├─ env.d.ts
│  ├─ lib
│  │  └─ utils.ts
│  ├─ pages
│  │  └─ index.astro
│  └─ styles
│     └─ globals.css
├─ tailwind.config.mjs
└─ tsconfig.json

```

## 🧞 Commands

All commands are run from the root of the project, from a terminal:
Note that `"npm run dev"` invokes the concurrently addon that runs both the backend service as well as the frontend service

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).

```


```