# FrontEnd

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.1.5.

## Development server

Run `ng serve` ou `npm run s`. Navigate to `http://localhost:4200/`.  

## Code scaffolding

Run `ng g c component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

##### Créer module
Avec  routage
`ng g m --route deossier/module-name --module App.module`
Exemple:
`ng g m --route pages/pages --module App.module`

Sans routage (juste module:)
Exemple: 
`ng g m   cores --module App.module`
##### Créer un component en precisant le module
`ng g c deossier/component-name -m=nom-module`
Exemple 1: Créer un component(page), qui sera ratacher au module page.module.ts
`ng g c /pages/home -m=pages `

exemple2: créer un component dans le dossier shareds qui se ratache a app.module.ts
`ng g c /shared/page-not-found -m=app`
##### Créer un service
`ng g s   dossier/service-name`

exemple : `ng g s   cores/services/login`
aprés avoir créé le services, il faut l'importer dans le provider du module
(cores.modules.ts)
##### Créer une classe
`ng g cl   deossier/classe-name`
##### Créer une interface
`ng g i   deossier/interface-name`
##### Créer un pipe
`ng g p   deossier/pipe-name`
##### Créer une directive
`ng g d deossier/directive-name`
##### Créer un guard
`ng g g deossier/guard-name`
## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e`  

## Setting up angular-in-memory-web-api
angular-in-memory-web-api is very easy to set up and configure.

### Step one
First, we need to install angular-in-memory-web-api as a dev dependency because we will be using it for development only:

```npm install angular-in-memory-web-api --save-dev```
