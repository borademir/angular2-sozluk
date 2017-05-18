// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production        : false,
  apiBaseUrl        : 'http://localhost:8080/api/v1/',
  apiBaseUrl_domain : 'http://www.ekcisi.com/api/v1/',
  apiBaseUrl_heroku : 'https://eksici-api.herokuapp.com/api/v1/',
  apiBaseUrl_ip     : 'http://139.162.163.241:8080/api/v1/'
};
