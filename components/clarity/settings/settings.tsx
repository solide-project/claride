import { IDESettings } from "@/components/core/components/ide-settings"
import { Title } from "@/components/core/components/title"
import { TomlPathInput } from "@/components/clarity/settings/toml-path-input"
import { NetworkButton } from "./network"

interface ClaritySettingsProps extends React.HTMLAttributes<HTMLDivElement> { }

export function ClaritySettings({ className }: ClaritySettingsProps) {
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