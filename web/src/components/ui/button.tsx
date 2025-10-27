import { Slot } from "@radix-ui/react-slot";
import { type ComponentProps } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const buttonVariants = tv({
  base: "rounded-lg disabled:opacity-50 disabled:pointer-events-none aria-disabled:opacity-50 aria-disabled:pointer-events-none enabled:cursor-pointer",
  
  variants: {
    variant:{
      default: 'bg-gray-200 border border-gray-200 text-gray-500 rounded-sm flex hover:border-blue-base',
      primary: 'bg-blue-base text-white hover:bg-blue-dark font-medium py-3 text-md rounded-lg shadow-md transition ',
    },
    size: {
      default: "px-3 py-2",
      icon: "p-2",
      "icon-sm": "p-2",
    },
  },

  defaultVariants: {
    size: "default",
  },
});

type ButtonProps = ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

export function Button({ size, className, variant, asChild, ...props }: ButtonProps) {
  const Component = asChild ? Slot : "button";
  
  return (
    <Component className={buttonVariants({ size, className, variant })} {...props} />
  );
}