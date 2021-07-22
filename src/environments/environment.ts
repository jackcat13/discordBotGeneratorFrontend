// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  discord_authorization_api: "https://discord.com/api/oauth2/authorize?client_id=867414651503116298&redirect_uri=http%3A%2F%2Flocalhost%3A4200%2Flogin&response_type=code&scope=identify",
  discord_redirect: "http://localhost:4200/login"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
