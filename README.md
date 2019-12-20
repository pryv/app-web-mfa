# app-web-mfa
VueJS app for MFA process activation, deactivation &amp; recovery

## How to?

| Task                              | Command                        |
| --------------------------------- | ------------------------------ |
| Install dependencies              | `yarn install`                 |
| Create distribution               | `yarn build`                   |
| Run the app locally               | `yarn start`                   |
| Run tests                         | `yarn test`                    |
| Run eslint                        | `yarn lint`                    |

### Publish to github pages

If it is the first time you publish app-web-auth3, be sure to run `yarn setup` once.

Create a distribution with your changes by running `yarn build`.

Then, publish your changes by running `yarn upload ${COMMIT_MESSAGE}`

If you encounter conflicts while publishing, run `yarn clear` to reset the `dist/` folder,
then build and publish again.
