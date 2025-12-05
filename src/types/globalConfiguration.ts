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

export interface GetConfigurationByNameResponse {
    'virtual-card-reordering-limit'?: boolean;
    value?: string;
    id?: number;
    description?: string;
    trapDoor?: boolean;
    valueDataType?: string;
}

export interface UpdateConfigurationRequest {
    enabled: boolean;
}

export interface UpdateConfigurationResponse {
    id?: string;
    resourceId?: number;
    changes?: {
        enabled?: boolean;
    };
}
