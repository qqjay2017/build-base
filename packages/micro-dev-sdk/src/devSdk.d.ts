export default class DevSdk {
    systemId: string;
    prefixPath: string;
    container: HTMLDivElement;
    constructor({ systemId, prefixPath, }: {
        systemId: string;
        prefixPath?: string;
    });
    init(): void;
}
