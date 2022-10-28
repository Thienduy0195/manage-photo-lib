# RECRUITMENT PROCESS MANAGEMENT - GRAPHICPROSE

## Setup docker
```
cd project folder
docker-compose build
docker-compose up -d

Exec docker and migrate database
docker exec -it ben_mpl_back_end bash
cd backend
composer install
php artisan key:generate

php artisan migrate:fresh --seed
php artisan passport:install


```

## Install and use

- Get the project code

```bash
git clone git@github.com:htactive-phutq/php-recruitment-process-management.git
```

- Installation dependencies

```bash
cd recruitment-process-management/frontend

yarn install || npm install

```

- run

```bash
yarn start || npm run start
```

- build

```bash
yarn build || npm run build
```

## Formater for backend

```bash
cd backend
tools/php-cs-fixer/vendor/bin/php-cs-fixer fix [folder]
```

## Git Contribution submission specification

- reference [react](https://github.com/vuejs/vue/blob/dev/.github/COMMIT_CONVENTION.md) specification ([Angular](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular))

  - `feat` Add new features
  - `fix` Fix the problem/BUG
  - `style` The code style is related and does not affect the running result
  - `perf` Optimization/performance improvement
  - `refactor` Refactor
  - `revert` Undo edit
  - `test` Test related
  - `docs` Documentation/notes
  - `chore` Dependency update/scaffolding configuration modification etc.
  - `workflow` Workflow improvements
  - `ci` Continuous integration
  - `types` Type definition file changes
  - `wip` In development
