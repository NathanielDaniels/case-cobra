"use client";
import LoginModal from "@/components/LoginModal";
import { cn } from "@/lib/utils";
import { Configuration } from "@prisma/client";
import Phone from "@/components/Phone";
import { useEffect, useState } from "react";
import Confetti from "react-dom-confetti";
import { COLORS, MODELS } from "@/validators/option-validator";
import { Check } from "lucide-react";
const DesignPreview = ({ configuration }: { configuration: Configuration }) => {
  const config = {
    // angle: 90,
    spread: 90,
    // startVelocity: 40,
    elementCount: 200,
    // dragFriction: 0.12,
    // duration: 3000,
    // stagger: 3,
    // width: "10px",
    // height: "10px",
    // perspective: "500px",
    colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"],
  };

  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);

  useEffect(() => setShowConfetti(true));

  const { color, model, finish, material } = configuration;

  const tw = COLORS.find(
    (supportedColor) => supportedColor.value === color
  )?.tw;

  const { label: modelLabel } = MODELS.options.find(
    ({ value }) => value === model
  )!;
  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none select-none absolute inset-0 overflow-hidden flex justify-center"
      >
        <Confetti active={showConfetti} config={config} />
      </div>
      {/* <LoginModal isOpen={isLoginModalOpen} setIsOpen={setIsLoginModalOpen} /> */}
      <div className="mt-20 flex flex-col items-center md:grid text-sm sm:grid-cols-12 sm:grid-rows-1 sm:gap-x-6 md:gap-x-8 lg:gap-x-12">
        <div className="md:col-span-4 lg:col-span-3 md:row-span-2 md:row-end-2">
          <Phone
            className={cn(`bg-${tw}`, "max-w-[150px] md:max-w-full")}
            imgSrc={configuration.croppedImageUrl!}
          />
        </div>
        <div className="mt-6 sm:col-span-9 sm:mt-0 md:row-end-1">
          <h3 className="text-3xl font-bold tracking-tight text-gray-900">
            Your {modelLabel} Case
          </h3>
          <div className="mt-3 flex item-center gap-1.5 text-base">
            <Check className="h-4 w-4 text-green-500" />
            In stock and ready to ship
          </div>
        </div>

        <div className="sm:col-span-12 md:col-span-9 text-base">
          <div className="grid grid-cols-1 gap-y-8 border-b border-gray-200 py-8 sm:grid-cols-2 sm:gap-x-6 sm:py-6 md:py-10">
            <div>
              <p className="font-medium text-zinc-950">Highlights</p>
              <ol className="mt-3 text-zinc-700 list-disc list-inside">
                <li>Wireless charging compatible</li>
                <li>Made from recycled materials</li>
                <li>5 year print warranty</li>
              </ol>
            </div>
            <div>
              <p className="font-medium text-zinc-950">Materials</p>
              <ol className="mt-3 text-zinc-700 list-disc list-inside">
                <li>High-quality {material} material</li>
                <li>Scratch & fingerprint resistant {finish} finish</li>
                {/* <li>Color: {color}</li> */}
              </ol>
            </div>
          </div>
          <div className="mt-8">
            <div className="bg-gray-50 p-6 sm:rounded-lg sm:p-8">
              <div className="flow-root"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DesignPreview;
