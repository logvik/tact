import { Address, Cell, toNano } from "ton-core";
import { enabledMaterchain } from "../config/features";
import { CompilerContext } from "../context";
import { ASTExpression, throwError } from "../grammar/ast";
import { printTypeRef, TypeRef } from "./types";

function reduceInt(ast: ASTExpression): bigint {
    if (ast.kind === 'number') {
        return ast.value;
    } else if (ast.kind === 'op_binary') {
        let l = reduceInt(ast.left);
        let r = reduceInt(ast.right);
        if (ast.op === '+') {
            return l + r;
        } else if (ast.op === '-') {
            return l - r;
        } else if (ast.op === '*') {
            return l * r;
        } else if (ast.op === '/') {
            return l / r;
        } else if (ast.op === '%') {
            return l % r;
        }
    } else if (ast.kind === 'op_unary') {
        if (ast.op === '-') {
            return -reduceInt(ast.right);
        } else if (ast.op === '+') {
            return reduceInt(ast.right);
        }
    } else if (ast.kind === 'op_static_call') {
        if (ast.name === 'ton') {
            if (ast.args.length === 1) {
                return BigInt(toNano(reduceString(ast.args[0])).toString(10));
            }
        }
        if (ast.name ==='pow') {
            if (ast.args.length === 2) {
                return reduceInt(ast.args[0]) ** reduceInt(ast.args[1]);
            }
        }
    }
    throwError('Cannot reduce expression to a constant integer', ast.ref);
}

function reduceBool(ast: ASTExpression): boolean {
    if (ast.kind === 'boolean') {
        return ast.value;
    }
    if (ast.kind === 'op_unary') {
        if (ast.op === '!') {
            return !reduceBool(ast.right);
        }
    }
    if (ast.kind === 'op_binary') {
        if (ast.op === '&&') {
            return reduceBool(ast.left) && reduceBool(ast.right);
        } else if (ast.op === '||') {
            return reduceBool(ast.left) || reduceBool(ast.right);
        }
        // TODO: More cases
    }

    throwError('Cannot reduce expression to a constant boolean', ast.ref);
}

function reduceString(ast: ASTExpression): string {
    if (ast.kind === 'string') {
        return ast.value;
    }
    throwError('Cannot reduce expression to a constant string', ast.ref);
}

function reduceAddress(ast: ASTExpression, ctx: CompilerContext): Address {
    if (ast.kind === 'op_static_call') {
        if (ast.name === 'address') {
            if (ast.args.length === 1) {
                const str = reduceString(ast.args[0]);
                let address = Address.parse(str);
                if (address.workChain !== 0 && address.workChain !== -1) {
                    throwError(`Address ${str} invalid address`, ast.ref);
                }
                if (!enabledMaterchain(ctx)) {
                    if (address.workChain !== 0) {
                        throwError(`Address ${str} from masterchain are not enabled for this contract`, ast.ref);
                    }
                }
                return address;
            }
        }
    }
    throwError('Cannot reduce expression to a constant Address', ast.ref);
}

function reduceCell(ast: ASTExpression, ctx: CompilerContext): Cell {
    if (ast.kind === 'op_static_call') {
        if (ast.name === 'cell') {
            if (ast.args.length === 1) {
                const str = reduceString(ast.args[0]);
                let c: Cell;
                try {
                    c = Cell.fromBase64(str);
                } catch (e) {
                    throwError(`Invalid cell ${str}`, ast.ref);
                }
                return c;
            }
        }
    }
    throwError('Cannot reduce expression to a constant Address', ast.ref);
}

export function resolveConstantValue(type: TypeRef, ast: ASTExpression, ctx: CompilerContext) {

    if (type.kind !== 'ref') {
        throwError(`Expected constant value, got ${printTypeRef(type)}`, ast.ref);
    }

    // Handle optional
    if (type.optional) {
        if (ast.kind === 'null') {
            return null;
        }
    }

    // Handle int
    if (type.name === 'Int') {
        return reduceInt(ast);
    }

    // Handle bool
    if (type.name === 'Bool') {
        return reduceBool(ast);
    }

    // Handle string
    if (type.name === 'String') {
        return reduceString(ast);
    }

    // Handle Address
    if (type.name === 'Address') {
        return reduceAddress(ast, ctx);
    }

    // Handle Cell
    if (type.name === 'Cell') {
        return reduceCell(ast, ctx);
    }

    throwError(`Expected constant value, got ${printTypeRef(type)}`, ast.ref);
}