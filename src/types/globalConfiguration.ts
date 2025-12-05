export interface GlobalConfiguration {
    name: string;
    enabled: boolean;
    id: number;
    trapDoor: boolean;
    valueDataType: string;
}

export interface GetConfigurationsResponse {
    globalConfiguration: GlobalConfiguration[];
}
