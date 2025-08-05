import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"
import { cn } from "@/lib/utils"

interface SeparatorProps extends React.ComponentProps<typeof SeparatorPrimitive.Root> {
  thickness?: string // e.g., "1px", "2px"
  length?: string    // optional override for length
  color?: string     // optional color override
}

function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  thickness,
  length,
  color,
  ...props
}: SeparatorProps) {
  const isHorizontal = orientation === "horizontal"

  return (
    <SeparatorPrimitive.Root
      data-slot="separator-root"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        color ? color : "bg-border bg-black/20",
        isHorizontal
          ? [
            thickness ? `h-[${thickness}]` : "h-[2px]",
            length ? `w-[${length}]` : "w-full"
          ]
          : [
            thickness ? `w-[${thickness}]` : "w-[2px]",
            length ? `h-[${length}]` : "h-full"
          ],
        className
      )}
      {...props}
    />
  )
}

export { Separator }
