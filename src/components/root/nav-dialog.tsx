import React from "react";
import { motion } from "motion/react";
import { Inter } from "next/font/google";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { sleep } from "@/lib/utils";
import CustomToast from "@/components/custom-toast";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface Props {
  toggle: boolean;
  setToggle: (toggle: boolean) => void;
}

const inter = Inter({ subsets: ["latin"] });

const NavDialog = ({ toggle, setToggle }: Props) => {
  const router = useRouter();

  const handleSubmit = async (e: FormData) => {
    console.log(e);
    toast.custom((t) => (
      <CustomToast variant="info" metadata={t}>
        Warping to {e.get("location")?.toString()}. Please standby.
      </CustomToast>
    ));
    await sleep(1000);
    router.push(e.get("location")?.toString() ?? "/");
    setToggle(!toggle);
  };

  return (
    <motion.div
      drag
      dragConstraints={{ left: -200, right: 0, top: -200, bottom: 0 }}
      whileTap={{ scale: 1.01 }}
      className={`w-full min-w-[400px] max-w-[600px] rounded-lg border bg-neutral-900 ${inter.className} `}
      initial={{ opacity: 0, translateX: 100 }}
      animate={{ opacity: 1, translateX: 0 }}
      exit={{ opacity: 0, translateX: 100 }}
    >
      <div className="relative flex w-full cursor-grab flex-row items-center justify-start gap-2.5 rounded-t-lg bg-slate-300 p-2.5 shadow-md shadow-neutral-900/[0.2]">
        <div
          className="h-4 w-4 cursor-pointer rounded-full border border-red-600 bg-red-500 shadow-md shadow-neutral-900/[0.2]"
          onClick={() => setToggle(!toggle)}
        ></div>
        <div className="h-4 w-4 rounded-full border border-yellow-500 bg-yellow-500 shadow-md shadow-neutral-900/[0.2]"></div>
        <div className="h-4 w-4 rounded-full border border-emerald-500 bg-emerald-500 shadow-md shadow-neutral-900/[0.2]"></div>
        <div
          className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-sm font-medium text-slate-700`}
        >
          Time Machine Interface
        </div>
      </div>
      <div className="flex h-full max-h-96 flex-col gap-5 overflow-scroll rounded-b-lg bg-slate-200 p-5">
        <div className="px-5 text-sm font-medium text-slate-500">
          Welcome. This wizard will walk you through our experimental time
          travel technology. Please select the appropriate options and submit to
          warp to your destination. Brought to you by Xpecto &apos;25.
        </div>
        <form action={handleSubmit} className="flex w-full flex-col gap-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="name" className="text-slate-700">
              Name
            </Label>
            <Input
              type="text"
              name="name"
              placeholder="Enter traveller's name."
              className="border-slate-300 bg-slate-100 transition-all focus:border-2 focus:border-blue-400"
            />
          </div>
          <div className="mb-2 text-right text-xs font-medium text-slate-600">
            You can also travel anonymously.
          </div>
          <div className="flex items-start gap-2">
            <div className="w-32 shrink-0 text-sm font-medium text-slate-700">
              Select destination
            </div>
            <RadioGroup
              defaultValue="option-one"
              name="location"
              className="grid w-full grid-cols-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="/"
                  id="home"
                  className="focus:ring-2 focus:ring-blue-600"
                />
                <Label htmlFor="/">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>Home</TooltipTrigger>
                      <TooltipContent>
                        <p>Home</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="/about"
                  id="about"
                  className="focus:ring-2 focus:ring-blue-600"
                />
                <Label htmlFor="/about">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>About</TooltipTrigger>
                      <TooltipContent>
                        <p>About</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="/competitions"
                  id="competitions"
                  className="focus:ring-2 focus:ring-blue-600"
                />
                <Label htmlFor="/competitions">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>Competitions</TooltipTrigger>
                      <TooltipContent>
                        <p>Competitions</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="/expos"
                  id="expos"
                  className="focus:ring-2 focus:ring-blue-600"
                />
                <Label htmlFor="/expos">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>Expos</TooltipTrigger>
                      <TooltipContent>
                        <p>Expos</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="/pronites"
                  id="pronites"
                  className="focus:ring-2 focus:ring-blue-600"
                />
                <Label htmlFor="/pronites">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>Pronites</TooltipTrigger>
                      <TooltipContent>
                        <p>Pronites</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="/sponsors"
                  id="sponsors"
                  className="focus:ring-2 focus:ring-blue-600"
                />
                <Label htmlFor="/sponsors">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>Sponsors</TooltipTrigger>
                      <TooltipContent>
                        <p>Sponsors</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Label>
              </div>
            </RadioGroup>
          </div>
          <Button
            type="submit"
            className="mt-5 w-fit bg-gradient-to-b from-blue-500 to-blue-600 px-5 py-2 text-amber-50 shadow-md shadow-neutral-900/[0.3]"
          >
            Submit
          </Button>
        </form>
      </div>
    </motion.div>
  );
};

export default NavDialog;
