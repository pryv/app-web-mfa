# app-web-mfa
VueJS app for MFA process activation, deactivation &amp; recovery.

https://pryv.github.io/app-web-mfa

_Prerequisites:_ 
- Node v12+
- Yarn v1+

## How to?

| Task                              | Command                        |
| --------------------------------- | ------------------------------ |
| Install dependencies              | `yarn install`                 |
| Setup dev environment             | `yarn setup`                   |
| Create distribution               | `yarn build`                   |
| Publish distribution              | `yarn upload ${COMMIT_MESSAGE}`|
| Clear distribution                | `yarn clear`                   |
| Run the app locally               | `yarn start`                   |
| Run tests                         | `yarn test`                    |
| Run eslint                        | `yarn lint`                    |

### Publish to github pages

If it is the first time you publish app-web-auth3, be sure to run `yarn setup` once.

Create a distribution with your changes by running `yarn build`.

Then, publish your changes by running `yarn upload ${COMMIT_MESSAGE}`

If you encounter conflicts while publishing, run `yarn clear` to reset the `dist/` folder,
then build and publish again.

## Configuration

The app can be configured by editing the configuration file `/src/config.js` (e.g. _appId, pryvServiceInfoUrl_).

## License

[Revised BSD license](https://github.com/pryv/documents/blob/master/license-bsd-revised.md)
