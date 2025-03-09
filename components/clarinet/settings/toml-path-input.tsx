import { Input } from "@/components/ui/input"
import { useClarinet } from "@/components/clarinet/clarinet-provider";
import { cn } from "@/lib/utils";

interface TomlPathInputProps extends React.HTMLAttributes<HTMLDivElement> { }

export function TomlPathInput({ className }: TomlPathInputProps) {
    const clarinet = useClarinet();

    return <Input className={cn("w-[65%]", className)}
        placeholder="Entry Toml"
        value={clarinet.tomlPath}
        onChange={(e) => clarinet.setTomlPath(e.target.value)} />
}