import React, { useEffect, useState } from "react";
import CreateTeamDialog from "./create-team-dialog";
import RegisterDialog from "../common/registration-dialog";
import { useCurrentUser } from "@/lib/utils";
import { RadioGroup, RadioGroupItem } from "../../ui/radio-group";
import { Label } from "../../ui/label";
import type { CompetitionWithDetails, TeamWithFullDetails } from "@/app/types";

const CompetitionDetailsBox = ({
  comp,
  regStatus,
  regTeam,
}: {
  comp: CompetitionWithDetails;
  regStatus: boolean;
  regTeam: TeamWithFullDetails | null | undefined;
}) => {
  const { CurrentUser } = useCurrentUser();

  const [regPrice, setRegPrice] = useState(0);
  const [regPlanId, setRegPlanId] = useState("");
  useEffect(() => {
    setRegPrice(comp?.competitionDetails.regPlans[0]?.price ?? 0);
    setRegPlanId(comp?.competitionDetails.regPlans[0]?.id ?? "");
  }, [comp]);

  //TODO: Add more comp details on the page. I have just added the basic ones

  return (
    <div className="rounded-lg bg-amber-50 p-6 text-neutral-900 shadow-md">
      <div className="flex flex-col items-center">
        <div
          style={{
            backgroundImage: `url(/event_covers/competitions/${comp.competitionDetails.name.replace(" ", "%20")}.jpeg), url(logo.enc)`,
          }}
          className="mb-4 h-40 w-40 rounded-full bg-cover bg-no-repeat"
        ></div>
        <h1 className="mb-2 text-3xl font-bold">
          {comp.competitionDetails.name}
        </h1>
        <p className="mb-4 text-gray-600">
          {comp.competitionDetails.description}
        </p>
        <div className="text-lg">
          <p>
            <strong>Venue:</strong> {comp.competitionDetails.venue}
          </p>
          <p>
            <strong>Starts at:</strong>{" "}
            {comp.competitionDetails.begin_time.toLocaleString()}
          </p>
          <p>
            <strong>Ends at:</strong>{" "}
            {comp.competitionDetails.end_time.toLocaleString()}
          </p>
        </div>
        <div className="mt-6">
          {regStatus ? (
            !regTeam && <CreateTeamDialog competitionId={comp.id} />
          ) : (
            <RegisterDialog
              trigger={
                <button
                  className="w-full rounded-lg bg-blue-500 p-2 text-white hover:bg-blue-200 disabled:bg-blue-50"
                  disabled={CurrentUser?.email === ""}
                >
                  Register now
                </button>
              }
              content={
                <RadioGroup
                  onValueChange={(e) => {
                    setRegPlanId(e.split(" ")[1]!);
                    setRegPrice(parseInt(e.split(" ")[0]!));
                  }}
                  defaultValue={
                    (comp.competitionDetails.regPlans[0]?.price.toString() ??
                      "") +
                    " " +
                    (comp.competitionDetails.regPlans[0]?.id ?? "")
                  }
                >
                  {comp.competitionDetails.regPlans.map((reg) => {
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
              eventId={comp.competitionDetails.id}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CompetitionDetailsBox;
