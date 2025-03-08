import { Button } from '@/components/ui/button';
import { connect, disconnect, isConnected } from '@stacks/connect';

interface ConnectWalletProps extends React.HTMLAttributes<HTMLButtonElement> {
}

export function ConnectWallet({ }: ConnectWalletProps) {
    const authenticated = isConnected()

    const authenticate = async () => {
        const response = await connect();
        // response contains the user's addresses
        if (response.addresses) {

        }
        console.log(response.addresses)
    }

    const logout = async () => {
        console.log("log")
        disconnect();
    }

    return (
        <Button onClick={() => { (authenticated ? logout : authenticate)() }}>
            {authenticated ? "Logout" : "Connect Wallet"}
        </Button >
    )
}
