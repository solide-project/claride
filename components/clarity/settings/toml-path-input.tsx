import { Input } from "@/components/ui/input"
import { useClarity } from "@/components/clarity/clarity-provider";
import { cn } from "@/lib/utils";

interface TomlPathInputProps extends React.HTMLAttributes<HTMLDivElement> { }

export function TomlPathInput({ className }: TomlPathInputProps) {
    const clarity = useClarity();

    return <Input className={cn("w-[65%]", className)}
        placeholder="Entry Toml"
        value={clarity.tomlPath}
        onChange={(e) => clarity.setTomlPath(e.target.value)} />
}