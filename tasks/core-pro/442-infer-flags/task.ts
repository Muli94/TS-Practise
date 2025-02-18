import { type FeatureFlags } from './legacy-flags.ts';

type FlagsV2<T> = {
  [Key in keyof T as Key extends `${infer First}V2${infer Second}` ? `${First}${Second}` : never]: T[Key];
};

export type ModernFeatureFlags = FlagsV2<FeatureFlags>;

export function getFeatureFlagsV2(flags: FeatureFlags): ModernFeatureFlags {
  const flagsV2 = {} as ModernFeatureFlags;

  Object.keys(flags).map((elem) => {
    if (elem.includes('V2')) {
      const value = flags[elem as keyof FeatureFlags];
      const newKey  = elem.replace('V2', '') as keyof FlagsV2<FeatureFlags>;
      flagsV2[newKey as keyof FlagsV2<FeatureFlags>] = value;
    }
  });

  return flagsV2 as ModernFeatureFlags;
}
