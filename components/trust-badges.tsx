import { Badge } from "@/components/ui/badge";
import { UI_TEXT } from "@/lib/constants";

export const TrustBadges = () => (
  <div className="flex flex-wrap gap-3">
    {UI_TEXT.trustBadges.map((badge) => (
      <Badge key={badge}>{badge}</Badge>
    ))}
  </div>
);
