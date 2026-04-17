"use client";
import { Clock, Mail, Phone } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import Link from "next/link";
import { track } from "@/lib/analytics/tracker";
import { TRACKING_EVENTS } from "@/lib/constants/general";
import { useContactsColumn } from "@/hooks/use-contacts-column";
import { ContactsColumnSkeleton } from "@/components/shared/tenant-skeletons";

export default function ContactsColumn() {
  const column = useContactsColumn();

  if (!column.isReady) {
    return <ContactsColumnSkeleton />;
  }

  const { tenant, phoneHref, emailHref, contactRows } = column;

  return (
    <Card className="border-0 shadow-lg overflow-hidden max-w-md z-10">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div>
            <CardTitle className="text-xl">Contact Information</CardTitle>
            <CardDescription>
              Reach out to us through any of these channels
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="sm:px-6 space-y-6">
        {contactRows.map((item) => {
          const IconComponent = item.icon;
          return (
            <div
              key={item.id}
              className="group flex items-start sm:p-4 rounded-xl hover:bg-gray-50 transition-colors duration-200"
            >
              <div
                className={`hidden mr-4 sm:flex size-12 items-center justify-center rounded-full bg-linear-to-br ${item.bgFrom} ${item.bgTo} ${item.bgHoverFrom} ${item.bgHoverTo} transition-colors`}
              >
                <IconComponent className={`size-6 ${item.iconColor}`} />
              </div>
              <div className="flex-1">
                <p className="font-bold text-gray-900 dark:text-white mb-1">
                  {item.title}
                </p>
                <p className="text-primary font-semibold mb-1">
                  {item.content}
                </p>
                <p className="text-sm text-gray-600 dark:text-white/60">
                  {item.detail}
                </p>
              </div>
            </div>
          );
        })}

        {/* Opening Hours */}
        <div className="group flex items-start sm:p-4 rounded-xl hover:bg-gray-50 transition-colors duration-200">
          <div className="hidden mr-4 sm:flex size-12 items-center justify-center rounded-full bg-linear-to-br from-[#FFF9E6] to-[#FFF3CC] group-hover:from-[#FFF3CC] group-hover:to-[#FFF9E6] transition-colors">
            <Clock className="h-6 w-6 text-[#F9A825]" />
          </div>
          <div className="flex-1">
            <p className="font-bold text-gray-900 dark:text-white mb-1">
              Opening Hours
            </p>
            <div className="space-y-2 text-sm">
              {tenant.openingHours.map((item, index) => {
                const isClosed = item.closed;
                const hoursDisplay = isClosed
                  ? "Closed"
                  : `${item.open} – ${item.close}`;
                const dayLabel =
                  item.day.charAt(0).toUpperCase() + item.day.slice(1);
                return (
                  <div
                    key={index}
                    className={
                      isClosed
                        ? "flex justify-between items-center pt-2 border-t"
                        : "flex justify-between items-center"
                    }
                  >
                    <span className="text-gray-600 dark:text-white/60">
                      {dayLabel}
                    </span>
                    <span
                      className={`font-medium ${isClosed ? "text-red-600" : "text-gray-900 dark:text-white/60"}`}
                    >
                      {hoursDisplay}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="pt-4 border-t">
          <div className="flex flex-col gap-3">
            <Button className="w-full justify-center" variant="default" asChild>
              <Link
                href={phoneHref}
                onClick={() => {
                  track(TRACKING_EVENTS.phoneContactClick, phoneHref);
                }}
              >
                <Phone className="mr-2 h-4 w-4" />
                Call Now
              </Link>
            </Button>
            <Button className="w-full justify-center" variant="outline" asChild>
              <Link
                href={emailHref}
                onClick={() => {
                  track(TRACKING_EVENTS.emailClick, emailHref);
                }}
              >
                <Mail className="mr-2 h-4 w-4" />
                Send Email
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
