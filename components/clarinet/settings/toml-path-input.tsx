import { Input } from "@/components/ui/input"
import { useClarinet } from "@/components/clarinet/clarinet-provider";

interface TomlPathInputProps extends React.HTMLAttributes<HTMLDivElement> { }

export function TomlPathInput({ className }: TomlPathInputProps) {
    const clarinet = useClarinet();

    return <Input className={className}
        placeholder="Entry Toml"
        value={clarinet.tomlPath}
        onChange={(e) => clarinet.setTomlPath(e.target.value)} />
}