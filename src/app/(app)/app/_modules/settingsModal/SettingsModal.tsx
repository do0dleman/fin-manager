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
import { Monitor, Moon, Settings, Sun } from "lucide-react";
import useSettingsStore, {
  type AppThemeType,
} from "~/app/(app)/_store/settings_store";

function SettingsModal(props: { OpenButton: JSX.Element }) {
  const { OpenButton } = props;
  const [open, setOpen] = useState(false);

  const { theme, setTheme } = useSettingsStore();
  console.log("theme: ");
  console.log(theme);

  function HandleSettingsSelectChange(e: AppThemeType) {
    setTheme(e);
  }

  function pretifySelectValue(val: string) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
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
              defaultValue={theme}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue
                  placeholder={
                    <span className="flex items-center gap-2 text-lg">
                      {pretifySelectValue(theme)}
                    </span>
                  }
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="system">
                  <span className="flex items-center gap-2 text-lg">
                    <Monitor />
                    System
                  </span>
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
