export declare class AbpSessionService {
    readonly userId: number | undefined;
    readonly tenantId: number | undefined;
    readonly impersonatorUserId: number | undefined;
    readonly impersonatorTenantId: number | undefined;
    readonly multiTenancySide: abp.multiTenancy.sides;
}
