"use client";

import RegisterDialog from "@/components/(dystopian)/common/registration-dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useCurrentUser } from "@/lib/utils";
import { api } from "@/trpc/react";
import { use, useState } from "react";

const Page = ({ params }: { params: Promise<{ work: string }> }) => {
  const { CurrentUser } = useCurrentUser();

  const workName = use(params).work.replaceAll("%20", " ");
  const { data: work } = api.workshop.getWorkshopByName.useQuery({
    name: workName,
  });
  const { data: plan } = api.event.checkUserRegisteration.useQuery(
    {
      userId: CurrentUser?.id ?? "",
      eventId: work?.workshopDetailsId ?? "",
    },
    {
      enabled: !!CurrentUser && !!work,
    },
  );

  const [regPrice, setRegPrice] = useState(
    work?.workshopDetails.regPlans[0]?.price ?? 0,
  );
  const [regPlanId, setRegPlanId] = useState(
    work?.workshopDetails.regPlans[0]?.id ?? "",
  );
  const regStatus = plan ? true : false;

  const date = work?.workshopDetails.begin_time.getDate();
  const month = work
    ? work.workshopDetails.begin_time.getMonth() + 1
    : undefined; // Months are 0-indexed
  const year = work?.workshopDetails.begin_time.getFullYear();
  const time = work?.workshopDetails.begin_time.toLocaleTimeString();

  const dateEnd = work?.workshopDetails.end_time.getDate();
  const monthEnd = work
    ? work.workshopDetails.end_time.getMonth() + 1
    : undefined; // Months are 0-indexed
  const yearEnd = work?.workshopDetails.end_time.getFullYear();
  const timeEnd = work?.workshopDetails.end_time.toLocaleTimeString();

  //TODO: Add more work details on the page. I have just added the basic ones
  return (
    <>
      {work && (
        <div className="container mx-auto p-6">
          <div className="rounded-lg bg-amber-50 p-6 text-neutral-900 shadow-md">
            <div className="flex flex-col items-center">
              <div
                style={{
                  backgroundImage: `url(/event_covers/workshops/${work.workshopDetails.name.replace(" ", "%20")}.jpeg), url(logo.enc)`,
                }}
                className="mb-4 h-40 w-40 rounded-full bg-cover bg-no-repeat"
              ></div>
              <h1 className="mb-2 text-3xl font-bold">
                {work.workshopDetails.name}
              </h1>
              <p className="mb-4 text-gray-600">
                {work.workshopDetails.description}
              </p>
              <div className="text-lg">
                <p>
                  <strong>Venue:</strong> {work.workshopDetails.venue}
                </p>
                <p>
                  <strong>Starts at:</strong> {date}/{month}/{year} {time}
                </p>
                <p>
                  <strong>Ends at:</strong> {dateEnd}/{monthEnd}/{yearEnd}{" "}
                  {timeEnd}
                </p>
              </div>
              <div className="mt-6">
                {regStatus ? (
                  <button className="w-full rounded-lg bg-green-500 p-2 text-white hover:bg-green-600">
                    Create a team
                  </button>
                ) : (
                  <RegisterDialog
                    trigger={
                      <button className="w-full rounded-lg bg-blue-500 p-2 text-white hover:bg-blue-600">
                        Register now
                      </button>
                    }
                    content={
                      <RadioGroup
                        onValueChange={(e) => {
                          setRegPlanId(e.split(" ")[1]!);
                          setRegPrice(parseInt(e.split(" ")[0]!));
                        }}
                        defaultValue={work.workshopDetails.regPlans[0]?.price.toString()}
                      >
                        {work.workshopDetails.regPlans.map((reg) => {
                          return (
                            <div
                              key={reg.id}
                              className="mb-2 flex items-center gap-2"
                            >
                              <RadioGroupItem
                                value={reg.price.toString() + " " + reg.id}
                                key={reg.id}
                              />
                              <Label
                                htmlFor={reg.id}
                                className="flex w-full flex-col rounded-lg border-2 p-2"
                              >
                                <div>
                                  {reg.name} - ₹{reg.price}
                                </div>
                                <div className="text-sm font-bold text-gray-600">
                                  {/* //TODO: Make labelling as a border wrapper. So that it looks premium */}
                                  {reg.labelling}
                                </div>
                                <div className="text-sm text-gray-600">
                                  {reg.description}
                                </div>
                              </Label>
                            </div>
                          );
                        })}
                      </RadioGroup>
                    }
                    price={regPrice}
                    regPlanId={regPlanId}
                    eventId={work.workshopDetails.id}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Page;
