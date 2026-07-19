import { AlertTriangle, Phone } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { EMERGENCY_SERVICES_CONTACTS_PAGE } from "@/lib/constants/general";

export default function EmergencyContact() {
  return (
    <Card className="shadow-lg border-0 ">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex size-12 items-center justify-center rounded-full bg-linear-to-br from-red-100 to-red-200">
            <AlertTriangle className="size-6 text-red-600" />
          </div>
          <div>
            <CardTitle className="text-xl text-red-800">
              Emergency Contact
            </CardTitle>
            <CardDescription className="text-red-600">
              For urgent medical assistance
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="rounded-lg bg-muted px-4 py-3 text-sm font-medium text-foreground">
          For emergency services, call 999 or 111.
        </p>
        {EMERGENCY_SERVICES_CONTACTS_PAGE.map((service, index) => (
          <div
            key={index}
            className={`p-4 rounded-xl bg-linear-to-r ${service.bgFrom} ${service.bgTo} border ${service.border}`}
          >
            <div className="flex items-start gap-4">
              <div
                className={`flex size-12 items-center justify-center rounded-full bg-linear-to-br ${service.badgeBg} ${service.badgeTo} shadow-md shrink-0`}
              >
                <Phone className="size-6 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span
                    className={`text-sm font-semibold  ${service.labelColor} uppercase tracking-wide`}
                  >
                    {service.label}
                  </span>
                  <a
                    href={`tel:${service.number}`}
                    className={`text-2xl font-black underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${service.numberColor}`}
                    aria-label={`Call ${service.number} for ${service.label.toLowerCase()} help`}
                  >
                    {service.number}
                  </a>
                </div>
                <p className="hidden sm:block text-sm text-gray-700 mb-2">
                  {service.description}
                </p>
                <p className="hidden sm:block text-xs text-gray-600">
                  {service.detail}
                </p>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
