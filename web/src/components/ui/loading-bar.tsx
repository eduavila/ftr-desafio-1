import * as Progress from "@radix-ui/react-progress";

export default function LoadingBar() {
  return (
    <Progress.Root className="relative w-full h-1 overflow-hidden bg-gray-200 outside-top px-2">
      <Progress.Indicator
        className="absolute h-full w-1/3 bg-blue-base animate-slide"
      />
    </Progress.Root>
  );
}