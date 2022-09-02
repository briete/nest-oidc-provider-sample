import { Configuration } from 'oidc-provider';

export const configuration: Configuration = {
  interactions: {
    url(ctx, interaction) {
      return `/interaction/${interaction.uid}`;
    },
  },
  features: {
    deviceFlow: { enabled: false },
    revocation: { enabled: true },
  },
};
