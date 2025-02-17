import { 
    Cell,
    Slice, 
    Address, 
    Builder, 
    beginCell, 
    ComputeError, 
    TupleItem, 
    TupleReader, 
    Dictionary, 
    contractAddress, 
    ContractProvider, 
    Sender, 
    Contract, 
    ContractABI, 
    TupleBuilder,
    DictionaryValue
} from 'ton-core';

export type StateInit = {
    $$type: 'StateInit';
    code: Cell;
    data: Cell;
}

export function storeStateInit(src: StateInit) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeRef(src.code);
        b_0.storeRef(src.data);
    };
}

export function loadStateInit(slice: Slice) {
    let sc_0 = slice;
    let _code = sc_0.loadRef();
    let _data = sc_0.loadRef();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadTupleStateInit(source: TupleReader) {
    let _code = source.readCell();
    let _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function storeTupleStateInit(source: StateInit) {
    let builder = new TupleBuilder();
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserStateInit(): DictionaryValue<StateInit> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeStateInit(src)).endCell());
        },
        parse: (src) => {
            return loadStateInit(src.loadRef().beginParse());
        }
    }
}

export type Context = {
    $$type: 'Context';
    bounced: boolean;
    sender: Address;
    value: bigint;
    raw: Cell;
}

export function storeContext(src: Context) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounced);
        b_0.storeAddress(src.sender);
        b_0.storeInt(src.value, 257);
        b_0.storeRef(src.raw);
    };
}

export function loadContext(slice: Slice) {
    let sc_0 = slice;
    let _bounced = sc_0.loadBit();
    let _sender = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _raw = sc_0.loadRef();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function loadTupleContext(source: TupleReader) {
    let _bounced = source.readBoolean();
    let _sender = source.readAddress();
    let _value = source.readBigNumber();
    let _raw = source.readCell();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function storeTupleContext(source: Context) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounced);
    builder.writeAddress(source.sender);
    builder.writeNumber(source.value);
    builder.writeSlice(source.raw);
    return builder.build();
}

function dictValueParserContext(): DictionaryValue<Context> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeContext(src)).endCell());
        },
        parse: (src) => {
            return loadContext(src.loadRef().beginParse());
        }
    }
}

export type SendParameters = {
    $$type: 'SendParameters';
    bounce: boolean;
    to: Address;
    value: bigint;
    mode: bigint;
    body: Cell | null;
    code: Cell | null;
    data: Cell | null;
}

export function storeSendParameters(src: SendParameters) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounce);
        b_0.storeAddress(src.to);
        b_0.storeInt(src.value, 257);
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        if (src.code !== null && src.code !== undefined) { b_0.storeBit(true).storeRef(src.code); } else { b_0.storeBit(false); }
        if (src.data !== null && src.data !== undefined) { b_0.storeBit(true).storeRef(src.data); } else { b_0.storeBit(false); }
    };
}

export function loadSendParameters(slice: Slice) {
    let sc_0 = slice;
    let _bounce = sc_0.loadBit();
    let _to = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _mode = sc_0.loadIntBig(257);
    let _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _code = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _data = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function loadTupleSendParameters(source: TupleReader) {
    let _bounce = source.readBoolean();
    let _to = source.readAddress();
    let _value = source.readBigNumber();
    let _mode = source.readBigNumber();
    let _body = source.readCellOpt();
    let _code = source.readCellOpt();
    let _data = source.readCellOpt();
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function storeTupleSendParameters(source: SendParameters) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounce);
    builder.writeAddress(source.to);
    builder.writeNumber(source.value);
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserSendParameters(): DictionaryValue<SendParameters> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSendParameters(src)).endCell());
        },
        parse: (src) => {
            return loadSendParameters(src.loadRef().beginParse());
        }
    }
}

 type IntrinsicsTester_init_args = {
    $$type: 'IntrinsicsTester_init_args';
}

function initIntrinsicsTester_init_args(src: IntrinsicsTester_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
    };
}

async function IntrinsicsTester_init() {
    const __code = Cell.fromBase64('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');
    const __system = Cell.fromBase64('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');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initIntrinsicsTester_init_args({ $$type: 'IntrinsicsTester_init_args' })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const IntrinsicsTester_errors: { [key: number]: { message: string } } = {
    2: { message: `Stack undeflow` },
    3: { message: `Stack overflow` },
    4: { message: `Integer overflow` },
    5: { message: `Integer out of expected range` },
    6: { message: `Invalid opcode` },
    7: { message: `Type check error` },
    8: { message: `Cell overflow` },
    9: { message: `Cell underflow` },
    10: { message: `Dictionary error` },
    13: { message: `Out of gas error` },
    32: { message: `Method ID not found` },
    34: { message: `Action is invalid or not supported` },
    37: { message: `Not enough TON` },
    38: { message: `Not enough extra-currencies` },
    128: { message: `Null reference exception` },
    129: { message: `Invalid serialization prefix` },
    130: { message: `Invalid incoming message` },
    131: { message: `Constraints error` },
    132: { message: `Access denied` },
    133: { message: `Contract stopped` },
    134: { message: `Invalid argument` },
    135: { message: `Code of a contract was not found` },
    136: { message: `Invalid address` },
    137: { message: `Masterchain support is not enabled for this contract` },
}

export class IntrinsicsTester implements Contract {
    
    static async init() {
        return await IntrinsicsTester_init();
    }
    
    static async fromInit() {
        const init = await IntrinsicsTester_init();
        const address = contractAddress(0, init);
        return new IntrinsicsTester(address, init);
    }
    
    static fromAddress(address: Address) {
        return new IntrinsicsTester(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        errors: IntrinsicsTester_errors
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: 'Deploy') {
        
        let body: Cell | null = null;
        if (message === 'Deploy') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getGetTons(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('getTons', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getGetTons2(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('getTons2', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getGetString(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('getString', builder.build())).stack;
        let result = source.readString();
        return result;
    }
    
    async getGetString2(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('getString2', builder.build())).stack;
        let result = source.readString();
        return result;
    }
    
    async getGetAddress(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('getAddress', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
    async getGetAddress2(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('getAddress2', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
    async getGetCell(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('getCell', builder.build())).stack;
        let result = source.readCell();
        return result;
    }
    
    async getGetCell2(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('getCell2', builder.build())).stack;
        let result = source.readCell();
        return result;
    }
    
    async getGetPow(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('getPow', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getGetPow2(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('getPow2', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
}