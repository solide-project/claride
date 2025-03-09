import { IDESettings } from "@/components/core/components/ide-settings"
import { Title } from "@/components/core/components/title"
import { TomlPathInput } from "@/components/clarinet/settings/toml-path-input"
import { NetworkButton } from "./network"

interface ClarinetSettingsProps extends React.HTMLAttributes<HTMLDivElement> { }

export function ClarinetSettings({ className }: ClarinetSettingsProps) {
    return <IDESettings>
        <div className="flex items-center justify-between">
            <div className="py-2 font-semibold text-grayscale-350">Clarinet Toml Path</div>
            <TomlPathInput />
        </div>
        <div className="flex items-center justify-between">
            <Title text="Networks" />
            <NetworkButton />
        </div>
    </IDESettings>
}