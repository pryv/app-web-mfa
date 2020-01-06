# app-web-mfa
VueJS app for MFA process activation, deactivation &amp; recovery.

https://pryv.github.io/app-web-mfa

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


### Configure for a use with NGINX

We present here an example of Nginx configuration for using app-web-mfa within a Pryv.io installation.

```
# Static Web: /nginx/conf/site-443-mfa.conf
server {
  listen               443;
  server_name          mfa.pryv.me;
  access_log           /app/log/mfa.access.log;
  ssl                  on;
  client_max_body_size 5M;

  location /mfa/ {
      proxy_pass        https://pryv.github.io/app-web-mfa/;
      proxy_set_header  Host 'pryv.github.io';
  }
}
```

## License

[Revised BSD license](https://github.com/pryv/documents/blob/master/license-bsd-revised.md)
