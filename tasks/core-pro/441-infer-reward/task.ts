export type RewardRadar<T> = T extends `${string}⚡️[${infer Base}]⚡️${string}` ? Base : null;
