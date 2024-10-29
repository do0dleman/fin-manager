import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/app/_components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/app/_components/ui/select";

import { useState } from "react";
import { Moon, Settings, Sun } from "lucide-react";
import useSettingsStore, {
  type AppThemeType,
} from "~/app/(app)/_store/settings_store";

function SettingsModal(props: { OpenButton: JSX.Element }) {
  const { OpenButton } = props;
  const [open, setOpen] = useState(false);

  const { theme, setTheme } = useSettingsStore();

  function HandleSettingsSelectChange(e: AppThemeType) {
    setTheme(e);
  }

  function perifySelectValue(val: string) {
    const icon = document.body.classList.contains("dark") ? <Moon /> : <Sun />;
    return (
      <span className="flex items-center gap-2 text-lg">
        {icon}
        {String(val).charAt(0).toUpperCase() + String(val).slice(1)}
      </span>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{OpenButton}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="mb-4 flex items-center gap-2">
            <Settings /> Settings
          </DialogTitle>
          <div className="flex items-center gap-2">
            App Theme:
            <Select
              onValueChange={HandleSettingsSelectChange}
              defaultValue="system"
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue
                  placeholder={perifySelectValue(theme)}
                  defaultValue={theme}
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="system">
                  {perifySelectValue("system")}
                </SelectItem>
                <SelectItem value="dark">
                  <span className="flex items-center gap-2 text-lg">
                    <Moon />
                    Dark
                  </span>
                </SelectItem>
                <SelectItem value="light">
                  <span className="flex items-center gap-2 text-lg">
                    <Sun /> Light
                  </span>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default SettingsModal;
