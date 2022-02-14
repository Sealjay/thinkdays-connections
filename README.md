# thinkdays-connections
> An exploration of how humans make connections to build trust.

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
![GitHub issues](https://img.shields.io/github/issues/Sealjay/thinkdays-connections)
![GitHub](https://img.shields.io/github/license/Sealjay/thinkdays-connections)
![GitHub Repo stars](https://img.shields.io/github/stars/Sealjay/thinkdays-connections?style=social)

## Overview
A short research project exploring how humans make connections to build trust, and representing the results in the format of a 2D game.

## Architecture
- DAPR
  - Backend
    - World State
    - Player State
    - Player Actions
    - Updates via WebSockets
  - Frontend - React App
    - React Application
    - Connects via websockets
  - Frontend - Server App
    - Serves React App

## Licensing
thinkdays-connections code is available under the [MIT Licence](./LICENCE), whilst associated writeups are released under [Creative Commons Attribution-ShareAlike 4.0 International](Attribution-ShareAlike 4.0 International). Full licensing information in the [licence exceptions](./LICENCE-EXCEPTIONS.md) file.

## Contact
Feel free to contact me [on Twitter](https://twitter.com/sealjay_clj). For bugs, please [raise an issue on GitHub](https://github.com/Sealjay/thinkdays-connections/issue).

## Contributing
Contributions are more than welcome! This repository uses [GitHub flow](https://guides.github.com/introduction/flow/) - with [Commitizen](https://github.com/commitizen/cz-cli#making-your-repo-commitizen-friendly) to enforce semantic commits (`npm install -g commitizen cz-customizable`, `echo '{ "path": "cz-customizable" }' > ~/.czrc`, and then `git cz`- easy to setup!)

**Note: This adds a .czrc file to your home directory, and will overwrite existing commitzen .czrc files.**