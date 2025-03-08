import {
    ClarityAbiType,
    ClarityAbiTypeTuple,
    ClarityValue,
    cvToString,
    deserializeCV,
    encodeAbiClarityValue,
    isClarityAbiOptional,
    isClarityAbiTuple,
    noneCV,
    someCV,
    tupleCV,
} from '@stacks/transactions';

export const getTuple = (type?: ClarityAbiType): ClarityAbiTypeTuple['tuple'] | undefined => {
    if (!type) return;
    const isTuple = isClarityAbiTuple(type);
    if (isTuple) return type?.tuple;
    const isOptional = isClarityAbiOptional(type);
    if (isOptional && isClarityAbiTuple(type?.optional)) return type?.optional?.tuple;
};