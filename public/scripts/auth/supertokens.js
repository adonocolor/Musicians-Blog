supertokens.init({
  appInfo: {
    apiDomain: "http://localhost:3005",
    apiBasePath: "/auth",
    appName: "ado-web-sem-6",
  },
  recipeList: [
    supertokensSession.init({
      tokenTransferMethod: "cookie",
    }),
    supertokensEmailPassword.init(),
  ],
});