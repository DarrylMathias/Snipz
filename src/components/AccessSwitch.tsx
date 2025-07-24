"use client";

import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

type VisibilityToggleProps = {
  isPublic: boolean;
  onToggle: (value: boolean) => void;
};

const AccessSwitch: React.FC<VisibilityToggleProps> = ({
  isPublic,
  onToggle,
}) => {
  return (
    <div className="flex items-center gap-4">
      <Label htmlFor="visibility" className="text-sm font-medium">
        {isPublic ? "🌐 Public" : "🔒 Private"}
      </Label>
      <Switch
        id="visibility"
        checked={isPublic}
        onCheckedChange={onToggle}
      />
    </div>
  );
};

export default AccessSwitch;
