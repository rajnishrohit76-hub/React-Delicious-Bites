import React from "react";
import { cva } from "class-variance-authority";
import { motion } from "framer-motion"; // Changed to framer-motion as it is usually standard in React projects, but user asked for 'motion' - sticking to standard if motion fails import or use motion/react if preferred. User's prompt used motion/react. I will stick to framer-motion which I know is installed or try motion/react if installed.
// Wait, I installed 'motion'. So I should use 'motion/react' or 'framer-motion'. 
// The user prompt specifically asked for `motion/react`. I installed `motion`.
// Let's use `motion/react` as requested in the Typescript snippet, but typically `framer-motion` is the package name.
// Actually, `motion` package exports `motion` from `framer-motion`.
// I will import from "framer-motion" to be safe as I installed it earlier too, but let's check `package.json` if possible.
// Safest bet: stick to "framer-motion" which acts as the core. The user's code `import { ... } from "motion/react"` implies the new Motion library structure.
// I installed `motion`. Let's use `framer-motion` for compatibility with existing components unless I see `motion` used elsewhere.
// Actually, I'll use `framer-motion` because `card-hover-effect` used it and it works.
// Code adaptation:

import { cn } from "../../lib/utils";

const morphingSquareVariants = cva("flex gap-2 items-center justify-center", {
    variants: {
        messagePlacement: {
            bottom: "flex-col",
            top: "flex-col-reverse",
            right: "flex-row",
            left: "flex-row-reverse",
        },
    },
    defaultVariants: {
        messagePlacement: "bottom",
    },
});

export function MorphingSquare({
    className,
    message,
    messagePlacement = "bottom",
    ...props
}) {
    return (
        <div className={cn(morphingSquareVariants({ messagePlacement }))}>
            <motion.div
                className={cn("w-10 h-10 bg-black dark:bg-white rounded-md", className)}
                animate={{
                    borderRadius: ["6%", "50%", "6%"],
                    rotate: [0, 180, 360],
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                {...props}
            />
            {message && <div className="text-sm font-medium text-muted-foreground">{message}</div>}
        </div>
    );
}
