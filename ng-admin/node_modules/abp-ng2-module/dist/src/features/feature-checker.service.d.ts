export declare class FeatureCheckerService {
    get(featureName: string): abp.features.IFeature;
    getValue(featureName: string): string;
    isEnabled(featureName: string): boolean;
}
