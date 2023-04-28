import ThirdParty from 'supertokens-node/recipe/thirdparty';
import Session from 'supertokens-node/recipe/session';
import Dashboard from 'supertokens-node/recipe/dashboard';

export const appInfo = {
  appName: 'brawlpedia',
  apiDomain: 'https://gravitacia.onrender.com',
  websiteDomain: 'https://gravitacia.onrender.com',
  apiBasePath: '/api/auth',
  websiteBasePath: '/auth',
};

export const connectionUri =
  'https://dev-374afd21e52711edae38099579cc48fa-ap-southeast-1.aws.supertokens.io:3571';
export const apiKey = 'Dw8ZGk23-XQSNrNKMW56MM3LaMfE9F';

export const recipeList = [
  ThirdParty.init({
    signInAndUpFeature: {
      providers: [
        ThirdParty.Google({
          clientId:
            '733237118716-qrssie9emullb1qovtt8md7a2q1gg04r.apps.googleusercontent.com',
          clientSecret: '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',
        }),
      ],
    },
  }),
  Session.init(),
  Dashboard.init(),
];
