supertokens.init({
  appInfo: {
    apiDomain: 'https://ado-web-sem-6.onrender.com',
    apiBasePath: '/api/auth',
    appName: '10ch',
  },
  recipeList: [supertokensSession.init(), supertokensThirdParty.init()],
});
