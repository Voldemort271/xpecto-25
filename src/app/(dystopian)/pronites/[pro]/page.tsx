"use client";

import RegisterDialog from "@/components/(dystopian)/common/registration-dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useCurrentUser } from "@/lib/utils";
import { api } from "@/trpc/react";
import { use, useEffect, useState } from "react";

const Page = ({ params }: { params: Promise<{ pro: string }> }) => {
  const { CurrentUser } = useCurrentUser();

  const proSlug = use(params).pro;
  const { data: pro } = api.pronite.getProniteBySlug.useQuery({
    slug: proSlug,
  });
  const { data: plan } = api.event.checkUserRegisteration.useQuery(
    {
      userId: CurrentUser?.id ?? "",
      eventId: pro?.proniteDetailsId ?? "",
    },  
    {
      enabled: !!CurrentUser && !!pro,
    },
  );

  const [regPrice, setRegPrice] = useState(
    pro?.proniteDetails.regPlans[0]?.price ?? 0,
  );

  useEffect(() => {
      setRegPrice(pro?.proniteDetails.regPlans[0]?.price ?? 0);
      setRegPlanId(pro?.proniteDetails.regPlans[0]?.id ?? "");
    }, [pro]);

  const [regPlanId, setRegPlanId] = useState(
    pro?.proniteDetails.regPlans[0]?.id ?? "",
  );
  const regStatus = plan ? true : false;

  const date = pro?.proniteDetails.begin_time.getDate();
  const month = pro
    ? pro.proniteDetails.begin_time.getMonth() + 1
    : undefined; // Months are 0-indexed
  const year = pro?.proniteDetails.begin_time.getFullYear();
  const time = pro?.proniteDetails.begin_time.toLocaleTimeString();

  const dateEnd = pro?.proniteDetails.end_time.getDate();
  const monthEnd = pro
    ? pro.proniteDetails.end_time.getMonth() + 1
    : undefined; // Months are 0-indexed
  const yearEnd = pro?.proniteDetails.end_time.getFullYear();
  const timeEnd = pro?.proniteDetails.end_time.toLocaleTimeString();

  //TODO: Add more expo details on the page. I have just added the basic ones
  return (
    <>
      {pro && (
        <div className="container mx-auto p-6">
          <div className="rounded-lg bg-amber-50 p-6 text-neutral-900 shadow-md">
            <div className="flex flex-col items-center">
              <div
                style={{
                  backgroundImage: `url(/event_covers/pronites/${pro.proniteDetails.slug}.jpeg), url(logo.enc)`,
                }}
                className="mb-4 h-40 w-40 rounded-full bg-cover bg-no-repeat"
              ></div>
              <h1 className="mb-2 text-3xl font-bold">
                {pro.proniteDetails.name}
              </h1>
              <p className="mb-4 text-gray-600">
                {pro.proniteDetails.description}
              </p>
              <div className="text-lg">
                <p>
                  <strong>Venue:</strong> {pro.proniteDetails.venue}
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
                  <></>
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
                        defaultValue={pro.proniteDetails.regPlans[0]?.price.toString()}
                      >
                        {pro.proniteDetails.regPlans.map((reg:any) => {
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
                    eventId={pro.proniteDetails.id}
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