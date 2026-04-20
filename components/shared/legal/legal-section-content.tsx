import type { LegalSection } from "@/lib/types/firestore";

type Props = {
  section: LegalSection;
  variant: "privacy" | "cookie" | "terms";
};

function renderParagraphs(section: LegalSection) {
  return section.content.map((paragraph, pIdx) => (
    <p key={pIdx} className="text-gray-700 dark:text-white/60 leading-relaxed">
      {paragraph}
    </p>
  ));
}

function renderPrivacyBulletPoints(section: LegalSection) {
  return (
    <>
      {section.beforeText && (
        <p className="text-gray-700 dark:text-white/60 leading-relaxed">
          {section.beforeText}
        </p>
      )}
      <ul className="space-y-2 ml-6">
        {section.bulletPoints.map((point, bIdx) => (
          <li
            key={bIdx}
            className="text-gray-700 dark:text-white/60 flex items-start gap-3"
          >
            <span className="text-primary font-bold mt-1">•</span>
            <span>{point.title || point.right || point.category}</span>
          </li>
        ))}
      </ul>
      {section.afterText && (
        <p className="text-gray-700 dark:text-white/60 leading-relaxed mt-4">
          {section.afterText}
        </p>
      )}
    </>
  );
}

function renderTermsBulletPoints(section: LegalSection) {
  return (
    <>
      {section.beforeText && (
        <p className="text-gray-700 dark:text-white/60 leading-relaxed">
          {section.beforeText}
        </p>
      )}
      <ul className="space-y-2 ml-6">
        {section.bulletPoints.map((point, bIdx) => (
          <li
            key={bIdx}
            className="text-gray-700 dark:text-white/60 flex items-start gap-3"
          >
            <span className="text-primary font-bold mt-1">•</span>
            <span>{point.title || point.right || point.category}</span>
          </li>
        ))}
      </ul>
      {section.afterText && (
        <p className="text-gray-700 dark:text-white/60 leading-relaxed mt-4">
          {section.afterText}
        </p>
      )}
    </>
  );
}

function renderCookieListItemText(section: LegalSection, idx: number): string {
  const item = section.data[idx];
  return (
    item.service ||
    item.desc ||
    item.purpose ||
    item.steps ||
    item.link ||
    item.type
  );
}

function renderCookieVariant(section: LegalSection) {
  switch (section.type) {
    case "text":
      return <>{renderParagraphs(section)}</>;
    case "cookie-types":
      return (
        <div className="space-y-6 z-10">
          {section.cookieTypes.map((cookieType, cIdx) => {
            const isPrimary = cookieType.color === "primary";
            const isChart2 = cookieType.color === "chart-2";
            const textColor = isPrimary
              ? "text-primary"
              : isChart2
                ? "text-chart-2"
                : "text-chart-3";
            const bgColor = isPrimary
              ? "bg-primary/10"
              : isChart2
                ? "bg-chart-2/10"
                : "bg-chart-3/10";
            const borderColor = isPrimary
              ? "border-primary/20"
              : isChart2
                ? "border-chart-2/20"
                : "border-chart-3/20";

            return (
              <div
                key={cIdx}
                className={`${bgColor} border ${borderColor} rounded-xl p-6 space-y-3 z-10`}
              >
                <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
                  {cookieType.title}
                </h3>
                <p className="text-gray-700 dark:text-white/60 leading-relaxed">
                  {cookieType.description}
                </p>
                <ul className="space-y-2 ml-6">
                  {cookieType.data.map((item, itemIdx) => (
                    <li
                      key={itemIdx}
                      className="text-gray-700 dark:text-white/60 flex items-start gap-3"
                    >
                      <span className={`${textColor} font-bold mt-1`}>•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-sm text-gray-600 dark:text-white/50 font-semibold">
                  {cookieType.note}
                </p>
              </div>
            );
          })}
        </div>
      );

    case "duration":
      return (
        <>
          <p className="text-gray-700 dark:text-white/60 leading-relaxed mb-3">
            {section.intro}
          </p>
          <ul className="space-y-3 ml-6">
            {section.data.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="text-primary font-bold mt-1">•</span>
                <div>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {item.type}:
                  </span>
                  <p className="text-gray-700 dark:text-white/60">{item.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </>
      );

    case "third-party":
      return (
        <>
          <p className="text-gray-700 dark:text-white/60 leading-relaxed mb-3">
            {section.intro}
          </p>
          <ul className="space-y-3 ml-6">
            {section.data.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="text-primary font-bold mt-1">•</span>
                <div>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {item.service}
                  </span>
                  <p className="text-gray-700 dark:text-white/60">{item.purpose}</p>
                  <p className="text-sm text-gray-600 dark:text-white/50">
                    {item.privacy}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </>
      );

    case "preferences":
      return (
        <>
          <p className="text-gray-700 dark:text-white/60 leading-relaxed mb-3">
            {section.intro}
          </p>
          <ul className="space-y-2 ml-6">
            {section.data.map((_, idx) => (
              <li
                key={idx}
                className="text-gray-700 dark:text-white/60 flex items-start gap-3"
              >
                <span className="text-primary font-bold mt-1">•</span>
                <span>{renderCookieListItemText(section, idx)}</span>
              </li>
            ))}
          </ul>
          <p className="text-gray-700 dark:text-white/60 leading-relaxed mt-4">
            {section.footer}
          </p>
        </>
      );

    case "browser-controls":
      return (
        <>
          <p className="text-gray-700 dark:text-white/60 leading-relaxed mb-3">
            {section.intro}
          </p>
          <ul className="space-y-3 ml-6">
            {section.data.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="text-primary font-bold mt-1">•</span>
                <div>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {item.browser}:
                  </span>
                  <p className="text-gray-700 dark:text-white/60">{item.steps}</p>
                </div>
              </li>
            ))}
          </ul>
          <p className="text-gray-700 dark:text-white/60 leading-relaxed mt-4">
            {section.note}
          </p>
        </>
      );

    case "dnt":
      return (
        <p className="text-gray-700 dark:text-white/60 leading-relaxed">
          {section.content[0] ?? ""}
        </p>
      );

    case "optout":
      return (
        <>
          <p className="text-gray-700 dark:text-white/60 leading-relaxed mb-3">
            {section.intro}
          </p>
          <ul className="space-y-3 ml-6">
            {section.data.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="text-primary font-bold mt-1">•</span>
                <div>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {item.service}:
                  </span>
                  <p className="text-gray-700 dark:text-white/60 break-all">
                    {item.link}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </>
      );

    case "table":
      return (
        <>
          <p className="text-gray-700 dark:text-white/60 leading-relaxed mb-4">
            {section.intro}
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-primary text-center">
                  <th className="py-3 px-4 font-semibold text-gray-900 dark:text-white">
                    Cookie Name
                  </th>
                  <th className="py-3 px-4 font-semibold text-gray-900 dark:text-white">
                    Type
                  </th>
                  <th className="py-3 px-4 font-semibold text-gray-900 dark:text-white">
                    Duration
                  </th>
                  <th className="py-3 px-4 font-semibold text-gray-900 dark:text-white">
                    Purpose
                  </th>
                </tr>
              </thead>
              <tbody>
                {section.tableData.map((cookie, cIdx) => (
                  <tr key={cIdx} className="border-b border-border text-center">
                    <td className="py-3 px-4 text-gray-900 dark:text-white font-medium">
                      {cookie.name}
                    </td>
                    <td className="py-3 px-4 text-gray-700 dark:text-white/60">
                      {cookie.type}
                    </td>
                    <td className="py-3 px-4 text-gray-700 dark:text-white/60">
                      {cookie.duration}
                    </td>
                    <td className="py-3 px-4 text-gray-700 dark:text-white/60">
                      {cookie.purpose}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      );

    case "security":
      return (
        <>
          <p className="text-gray-700 dark:text-white/60 leading-relaxed mb-3">
            {section.intro}
          </p>
          <ul className="space-y-2 ml-6">
            {section.data.map((_, idx) => (
              <li
                key={idx}
                className="text-gray-700 dark:text-white/60 flex items-start gap-3"
              >
                <span className="text-primary font-bold mt-1">•</span>
                <span>{renderCookieListItemText(section, idx)}</span>
              </li>
            ))}
          </ul>
        </>
      );

    case "updates":
      return (
        <p className="text-gray-700 dark:text-white/60 leading-relaxed">
          {section.content[0] ?? ""}
        </p>
      );

    default:
      return null;
  }
}

function renderPrivacyVariant(section: LegalSection) {
  switch (section.type) {
    case "paragraphs":
      return <>{renderParagraphs(section)}</>;
    case "bulletPoints":
      return renderPrivacyBulletPoints(section);
    case "bulletPointsWithTitles":
      return (
        <>
          {section.beforeText && (
            <p className="text-gray-700 dark:text-white/60 leading-relaxed mt-4">
              {section.beforeText}
            </p>
          )}
          <ul className="space-y-3 ml-6">
            {section.bulletPoints.map((point, bIdx) => (
              <li key={bIdx} className="flex items-start gap-3">
                <span className="text-primary font-bold mt-1">•</span>
                <div>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {point.title || point.right}
                  </span>
                  <p className="text-gray-700 dark:text-white/60">
                    {point.desc || point.purpose}
                  </p>
                </div>
              </li>
            ))}
          </ul>
          {section.afterText && (
            <p className="text-gray-700 dark:text-white/60 leading-relaxed mt-4">
              {section.afterText}
            </p>
          )}
        </>
      );
    case "bulletPointsWithCategory":
      return (
        <>
          {section.beforeText && (
            <p className="text-gray-700 dark:text-white leading-relaxed mb-3">
              {section.beforeText}
            </p>
          )}
          <ul className="space-y-3 ml-6">
            {section.bulletPoints.map((point, bIdx) => (
              <li key={bIdx} className="flex items-start gap-3">
                <span className="text-primary font-bold mt-1">•</span>
                <div>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {point.category}:
                  </span>
                  <p className="text-gray-700 dark:text-white/60">{point.period}</p>
                </div>
              </li>
            ))}
          </ul>
          {section.afterText && (
            <p className="text-gray-700 dark:text-white/60 leading-relaxed mt-4">
              {section.afterText}
            </p>
          )}
        </>
      );
    default:
      return null;
  }
}

function renderTermsVariant(section: LegalSection) {
  switch (section.type) {
    case "paragraphs":
      return <>{renderParagraphs(section)}</>;
    case "bulletPoints":
      return renderTermsBulletPoints(section);
    case "subsections":
      return (
        <div className="space-y-3">
          {section.subsections.map((subsection, sIdx) => (
            <div key={sIdx}>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                {subsection.title}
              </h3>
              <p className="text-gray-700 dark:text-white/60 leading-relaxed">
                {subsection.description}
              </p>
            </div>
          ))}
        </div>
      );
    default:
      return null;
  }
}

export function LegalSectionContent({ section, variant }: Props) {
  if (variant === "cookie") {
    return renderCookieVariant(section);
  }
  if (variant === "terms") {
    return renderTermsVariant(section);
  }
  return renderPrivacyVariant(section);
}
