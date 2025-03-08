import { IDESettings } from "@/components/core/components/ide-settings"
import { Title } from "@/components/core/components/title"
import { TomlPathInput } from "@/components/clarinet/settings/toml-path-input"

interface ClarinetSettingsProps extends React.HTMLAttributes<HTMLDivElement> { }

export function ClarinetSettings({ className }: ClarinetSettingsProps) {
    return <IDESettings>
        <Title text="Clarinet Toml Path" />
        <TomlPathInput />
    </IDESettings>
}