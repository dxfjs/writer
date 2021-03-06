class HandleSeed {
    static instance: HandleSeed;
    private _seed: number = 0;
    constructor() {
    }

    static getInstance(): HandleSeed {
        if (HandleSeed.instance) return HandleSeed.instance;
        HandleSeed.instance = new HandleSeed();
        return HandleSeed.instance;
    }

    public next(): string {
        this._seed++;
        return this._seed.toString(16).toUpperCase();
    }
}

const handle = HandleSeed.getInstance();
Object.freeze(HandleSeed);
export default handle;