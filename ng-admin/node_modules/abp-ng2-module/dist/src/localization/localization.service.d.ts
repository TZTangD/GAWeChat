export declare class LocalizationService {
    readonly languages: abp.localization.ILanguageInfo[];
    readonly currentLanguage: abp.localization.ILanguageInfo;
    localize(key: string, sourceName: string): string;
    getSource(sourceName: string): (key: string) => string;
}
