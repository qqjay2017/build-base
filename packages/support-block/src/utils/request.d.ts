export declare module artListModel {
    interface Datum {
        id: number;
        createdId?: any;
        createdName?: any;
        createdDatetime?: any;
        modiId?: any;
        modiName?: any;
        modiDatetime?: any;
        tenantId?: any;
        busCode?: any;
        delFlag?: any;
        categoryId?: any;
        channel?: any;
        title: string;
        summary?: any;
        content?: any;
        sortNum?: any;
        platformCode?: any;
        systemId?: any;
        status?: any;
        path: string;
    }
    interface RootObject {
        code: number;
        message: string;
        data: Datum[];
        validErrors?: any;
    }
}
export declare const getArtList: (baseURL: string, data: any) => Promise<artListModel.Datum[]>;
