import React from "react";
import {
  IM_Fell_Double_Pica,
  IM_Fell_Double_Pica_SC,
  Jacquard_24,
} from "next/font/google";
import Image from "next/image";

const jacquard = Jacquard_24({ weight: "400", subsets: ["latin"] });
const imfell = IM_Fell_Double_Pica({ weight: "400", subsets: ["latin"] });
const imfellsc = IM_Fell_Double_Pica_SC({ weight: "400", subsets: ["latin"] });

const page = () => {
  return (
    <div className="mx-4 py-4 text-neutral-900 md:mx-9 md:gap-6 lg:ml-12 lg:mr-10 xl:grid xl:grid-cols-2">
      <div>
        <div className={`${jacquard.className} relative py-1 text-center`}>
          <div className="bg-neutral-900/[0.9] px-5 py-1 text-xl leading-7 tracking-wide text-amber-100/[0.9] shadow-md shadow-neutral-900/[0.3] sm:mb-5 sm:py-2.5 sm:text-2xl xl:mb-0">
            Something fancy your way comes - Auditorium at 6pm
          </div>
        </div>
        <div className={`${imfell.className}my-2 text-center md:my-3 lg:my-4`}>
          <span
            className={`text-4xl md:text-5xl lg:text-7xl ${imfellsc.className}`}
          >
            IIT Mandi organises week-long fest, attracts thousands
          </span>
        </div>
        <div className="flex items-stretch gap-2.5">
          <div className="hidden min-w-52 items-center border-2 border-neutral-900 md:block"></div>
          <div>
            <p className="text-justify text-base sm:text-lg md:mx-3 md:text-xl">
              What began as an ordinary celebration of innovation became the
              most extraordinary event in history. Xpecto 2025, IIT Mandi&apos;s
              annual tech fest, promised to dazzle with futuristic ideas and
              cutting-edge creations. But what unfolded over those fateful days
              transcended human comprehension. <br />
              <br />
              On the first day, attendees gathered with anticipation under the
              theme quot;Time Glitch.quot; Little did they know how eerily
              prophetic that title would become. By the evening, reports began
              to surface: clocks on campus skipped seconds, reversed hours, and
              some even stopped altogether. A faint hum reverberated across the
              grounds, growing louder with each passing moment.
            </p>
          </div>
        </div>
        <div className="hidden md:block">
          <p className="my-3 text-justify text-xl">
            It all started during the keynote presentation, where a team of
            students unveiled their project—a time-distortion simulation
            designed to model theoretical time loops. As the audience leaned in
            with awe, the screen flickered, and a blinding flash engulfed the
            hall. When the light subsided, something was unmistakably different.
            &quot;We looked at our watches, and they were spinning
            backward,&quot; one attendee reported. &quot;The campus Wi-Fi
            displayed timestamps from decades ago, and no one could send a
            message beyond the perimeter.&quot;
            <br />
            By the second day, the festival grounds were unrecognizable. Some
            described seeing duplicate versions of themselves wandering
            aimlessly. Others claimed they encountered future or past versions
            of friends. One group reported being unable to leave the Messier
            Marathon arena, trapped in what they called a &quot;time loop&quot;
            where the stars in the sky rearranged themselves in infinite
            combinations.
          </p>
        </div>
      </div>
      <div className="md:flex-col">
        <Image
          src={`https://res.cloudinary.com/diqdg481x/image/upload/v1737737277/iit-mandi-img_kbkhed.png`}
          width={400}
          height={400}
          alt={"College Image"}
          className="size-56 w-full border-[3px] border-black object-cover md:h-[25rem]"
        />
        <div className="mt-3 flex flex-col-reverse md:flex-row">
          <p className="mr-4 w-full text-justify text-lg md:text-xl">
            The most harrowing tale came from FrostHack participants, who
            claimed that every time they solved a problem, the challenge
            reappeared with slight variations. “It was as if the competition was
            alive, adapting to keep us there,” one coder recalled. <br />
            <br /> In Robowars, the battles escalated beyond control. Robots
            that were programmed to fight according to commands began moving
            autonomously, seemingly evolving strategies beyond their design. “It
            was like they were no longer bound by our reality,” said an engineer
            who watched in stunned silence as her bot rebuilt itself mid-battle.
            <br />
            Even mundane spaces weren’t spared. In the food court, plates filled
            and emptied themselves repeatedly. Attendees reported hearing
            whispers in languages they didn’t recognize, as though the air
            itself was filled with fragments of different timelines converging
            at once.
          </p>

          <div className="mx-auto w-4/5 flex-col items-center">
            <div className={`${jacquard.className} relative mb-2 text-center`}>
              <div className="bg-neutral-900/[0.9] px-5 py-1 text-xl leading-7 tracking-wide text-amber-100/[0.9] shadow-md shadow-neutral-900/[0.3] sm:mb-5 sm:py-2.5 sm:text-2xl xl:mb-0">
                Upcoming Program
              </div>
            </div>
            <Image
              src={`https://res.cloudinary.com/diqdg481x/image/upload/v1737737278/road-img_e43dxk.png`}
              width={300}
              height={300}
              alt={"Road Image"}
              className="w-full border-[1px] border-black"
            />
            <p className="mt-2 text-justify text-lg italic leading-[21px] md:text-xl">
              Years later, Xpecto 2025 remains an enigma, its story retold as
              both a cautionary tale and a testament to human ingenuity. Was it
              an accident? Or was it a glimpse into what happens when humanity
              pushes the boundaries of innovation too far?
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
