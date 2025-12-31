import * as React from "react";

import { cn } from "../lib/utils";

const CustomAlert = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => <div ref={ref} role="alert" className={cn("relative w-full rounded-lg border p-4", className)} {...props} />);
CustomAlert.displayName = "CustomAlert";

const CustomAlertDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(({ className, ...props }, ref) => <div ref={ref} className={cn("text-sm", className)} {...props} />);
CustomAlertDescription.displayName = "CustomAlertDescription";

export { CustomAlert, CustomAlertDescription };
