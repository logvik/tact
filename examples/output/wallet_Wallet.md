# TACT Compilation Report
Contract: Wallet
BOC Size: 1071 bytes

# Types
Total Types: 5

## StateInit
TLB: `_ code:^cell data:^cell = StateInit`
Signature: `StateInit{code:^cell,data:^cell}`

## Context
TLB: `_ bounced:bool sender:address value:int257 raw:^slice = Context`
Signature: `Context{bounced:bool,sender:address,value:int257,raw:^slice}`

## SendParameters
TLB: `_ bounce:bool to:address value:int257 mode:int257 body:Maybe ^cell code:Maybe ^cell data:Maybe ^cell = SendParameters`
Signature: `SendParameters{bounce:bool,to:address,value:int257,mode:int257,body:Maybe ^cell,code:Maybe ^cell,data:Maybe ^cell}`

## Transfer
TLB: `_ seqno:uint32 mode:uint8 to:address amount:coins body:Maybe ^cell = Transfer`
Signature: `Transfer{seqno:uint32,mode:uint8,to:address,amount:coins,body:Maybe ^cell}`

## TransferMessage
TLB: `transfer_message#0000007b signature:^slice transfer:Transfer{seqno:uint32,mode:uint8,to:address,amount:coins,body:Maybe ^cell} = TransferMessage`
Signature: `TransferMessage{signature:^slice,transfer:Transfer{seqno:uint32,mode:uint8,to:address,amount:coins,body:Maybe ^cell}}`

# Get Methods
Total Get Methods: 3

## publicKey

## walletId

## seqno

# Error Codes
2: Stack undeflow
3: Stack overflow
4: Integer overflow
5: Integer out of expected range
6: Invalid opcode
7: Type check error
8: Cell overflow
9: Cell underflow
10: Dictionary error
13: Out of gas error
32: Method ID not found
34: Action is invalid or not supported
37: Not enough TON
38: Not enough extra-currencies
128: Null reference exception
129: Invalid serialization prefix
130: Invalid incoming message
131: Constraints error
132: Access denied
133: Contract stopped
134: Invalid argument
135: Code of a contract was not found
136: Invalid address
137: Masterchain support is not enabled for this contract
17654: Invalid seqno
48401: Invalid signature