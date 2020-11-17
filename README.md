# Property Aggragator

## Project Description

```
Finance Plus | Finance Plus | Real Estate, NHF, Mortgages &amp; Home | Loans
```

### Get Started

```
* clone project using HTTPS, SSH or GitHub CLI
* run "npm install ." to install all dependencies and create node module
```

### Depedencies

```
* @emotion/core & @emotion/styled = Emotion is a performant and flexible CSS-in-JS library.
* @fortawesome/fontawesome-svg-core, @fortawesome/free-brands-svg-icons, @fortawesome/free-solid-svg-icons, @fortawesome/react-fontawesome
```

### Folder Structure

```
* node_modules - Packages are dropped into the node_modules folder under the prefix. When installing locally, this means that you can require("packagename") to load its main module, or require("packagename/lib/path/to/sub/module") to load other modules.
* public - Contains the root html page and some other files
* package.json - Contains project config and dependencies
* src -
    * Index.js - this is the root file
    * routes.js - contains the major components
    * App.css, index.css, responsive.css - base css files
    * commons - Contains repeated component look
    * constants - Contains contants used around the application
    * hoc - Higher other component that provides some default styling to components
    * store - Contains the redux setup, actions, types, reducers, middlewares
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
