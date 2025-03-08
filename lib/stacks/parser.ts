import { AbiParameter } from "../stacks/abi"
import { Cl, isClarityAbiPrimitive } from "@stacks/transactions"

export const fromNative = () => {

}

/**
 * Convert to native type for calling contract
 * @param value
 * @param input
 * @returns
 */
export const toNative = (value: any = "", input: AbiParameter) => {
    let data: any = value.toString()
    if (isClarityAbiPrimitive(input.type)) {
        switch (input.type) {
            case 'principal':
                data = Cl.address(value)
                break
            case 'int128':
                data = Cl.int(value)
                break
            case 'bool':
                data = Cl.bool(value.toString() === 'true')
                break
        }
    }

    console.log(value, input, data)
    return data
}
