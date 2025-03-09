import { Button } from '@/components/ui/button';
import { connect, disconnect, getLocalStorage, isConnected } from '@stacks/connect';
import { useEffect, useState } from 'react';

interface ConnectWalletProps extends React.HTMLAttributes<HTMLButtonElement> {
}

export function ConnectWallet({ }: ConnectWalletProps) {
    const [userAddress, setUserAddress] = useState("") 

    const loadUser = () => {
        const userData = getLocalStorage()
        setUserAddress(userData?.addresses.stx.pop()?.address || "")
    }

    const mask = (address: string): string => {
        if (!address) return "";
        if (address.length < 10) return address;
        return `${address.slice(0, 6)}...${address.slice(-3)}`;
    }

    useEffect(() => {
        loadUser()
    }, [])

    const authenticate = async () => {
        await connect()
        loadUser()
    }

    const logout = async () => {
        setUserAddress("")
        disconnect()
    }

    return (
        <Button onClick={() => { (userAddress ? logout : authenticate)() }}>
            {userAddress ? mask(userAddress) : "Connect Wallet"}
        </Button >
    )
}
