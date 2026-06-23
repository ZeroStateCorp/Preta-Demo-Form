"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Check, ChevronDown, Loader2, Search } from "lucide-react";

const industryTypes = [
  "Digital / Creative Agency",
  "Software Product / SaaS Company",
  "E-commerce / D2C",
  "BFSI",
  "Enterprise IT Services / Systems Integrator",
  "Healthcare / Healthtech",
  "Media & Entertainment",
  "Other",
];

const companySizes = ["50–200", "200–1000", "1000–5000", "5000 Above"];

const complianceOptions = [
  "SOC 2",
  "ISO 27001",
  "GDPR",
  "HIPAA",
  "PCI DSS",
  "None currently",
  "Not sure",
  "Other",
];

const webAppOptions = ["Yes", "No", "Not sure"];

const workflowToolOptions = ["Figma", "React", "Jira", "Linear", "Notion", "Other"];

const startTimelineOptions = ["Immediately", "Within 2 weeks", "Within a month", "Not sure yet"];

type LocationOption = { name: string; isoCode: string };

const fieldStyles =
  "w-full rounded-lg border border-zinc-700/60 bg-[#1E2732] px-4 py-2.5 text-base sm:text-sm text-zinc-200 outline-none transition focus:border-[#3FFB00]/60 focus:ring-1 focus:ring-[#3FFB00]/40";

const inputStyles = `${fieldStyles} placeholder-zinc-500`;

function SuccessIcon() {
  return (
    <svg width="53" height="53" viewBox="0 0 53 53" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M0 26.298C0 11.774 11.774 0 26.298 0C40.822 0 52.596 11.774 52.596 26.298C52.596 40.822 40.822 52.596 26.298 52.596C11.774 52.596 0 40.822 0 26.298Z"
        fill="url(#paint0_linear_5209_4117)"
      />
      <path
        d="M26.2979 0.329102C40.6402 0.329102 52.2675 11.9555 52.2676 26.2979C52.2676 40.6403 40.6403 52.2676 26.2979 52.2676C11.9555 52.2675 0.329102 40.6402 0.329102 26.2979C0.329187 11.9555 11.9555 0.329187 26.2979 0.329102Z"
        stroke="#56D915"
        strokeOpacity="0.2"
        strokeWidth="0.65745"
      />
      <g clipPath="url(#clip0_5209_4117)">
        <path
          d="M36.2181 21.3006C36.7959 21.8784 36.7959 22.8168 36.2181 23.3946L24.384 35.2288C23.8061 35.8066 22.8677 35.8066 22.2899 35.2288L16.3728 29.3117C15.795 28.7339 15.795 27.7955 16.3728 27.2176C16.9507 26.6398 17.8891 26.6398 18.4669 27.2176L23.3392 32.0853L34.1286 21.3006C34.7064 20.7227 35.6449 20.7227 36.2227 21.3006H36.2181Z"
          fill="#56D915"
        />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_5209_4117"
          x1="0"
          y1="0"
          x2="52.596"
          y2="52.596"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#1B331F" />
          <stop offset="1" stopColor="#0F1C12" />
        </linearGradient>
        <clipPath id="clip0_5209_4117">
          <path d="M15.9434 16.4297H36.653V40.0979H15.9434V16.4297Z" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

function Label({ children, optional }: { children: React.ReactNode; optional?: boolean }) {
  return (
    <label className="mb-2 block text-sm text-zinc-200">
      {children}{" "}
      {!optional && <span className="text-red-500">*</span>}
    </label>
  );
}

function TextField({
  label,
  name,
  placeholder,
  type = "text",
  required = true,
}: {
  label: string;
  name: string;
  placeholder: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <Label>{label}</Label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        className={inputStyles}
      />
    </div>
  );
}

function CustomSelect({
  label,
  name,
  value,
  onChange,
  options,
  placeholder = "Select an option",
  searchable = false,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder?: string;
  searchable?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  const filteredOptions = query
    ? options.filter((o) => o.toLowerCase().includes(query.toLowerCase()))
    : options;
  const visibleOptions = searchable ? filteredOptions.slice(0, 100) : filteredOptions;

  return (
    <div ref={containerRef} className="relative">
      <Label>{label}</Label>
      <input type="hidden" name={name} value={value} />
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`${fieldStyles} flex items-center justify-between gap-2 text-left`}
      >
        <span className={`truncate ${value ? "" : "text-zinc-500"}`}>{value || placeholder}</span>
        <ChevronDown
          className={`h-4 w-4 flex-shrink-0 text-zinc-500 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="absolute z-20 mt-2 w-full overflow-hidden rounded-lg border border-zinc-700/60 bg-[#171b21] shadow-2xl">
          {searchable && (
            <div className="border-b border-zinc-700/60 p-2">
              <div className="relative">
                <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-zinc-500" />
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search..."
                  className="w-full rounded-md bg-[#1E2732] py-2 pl-8 pr-3 text-base sm:text-sm text-zinc-200 placeholder-zinc-500 outline-none"
                />
              </div>
            </div>
          )}
          <div className="max-h-60 overflow-y-auto p-1.5">
            {visibleOptions.map((option) => {
              const isSelected = option === value;
              const isOther = option === "Other";
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => {
                    onChange(option);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center gap-2 rounded-md px-3 py-2.5 text-left text-sm transition ${
                    isSelected
                      ? "bg-[#3FFB00]/10 text-[#3FFB00]"
                      : isOther
                        ? "text-[#3FFB00] hover:bg-white/5"
                        : "text-zinc-200 hover:bg-white/5"
                  }`}
                >
                  {isSelected ? (
                    <Check className="h-4 w-4 flex-shrink-0" />
                  ) : (
                    <span className="w-4 flex-shrink-0" />
                  )}
                  {option}
                </button>
              );
            })}
            {visibleOptions.length === 0 && (
              <p className="px-3 py-2 text-sm text-zinc-500">No results</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function MultiSelect({
  label,
  name,
  selected,
  onChange,
  options,
  optional,
}: {
  label: string;
  name: string;
  selected: string[];
  onChange: (value: string[]) => void;
  options: string[];
  optional?: boolean;
}) {
  const toggle = (option: string) => {
    if (selected.includes(option)) {
      onChange(selected.filter((s) => s !== option));
    } else {
      onChange([...selected, option]);
    }
  };

  return (
    <div>
      <Label optional={optional}>{label}</Label>
      <input type="hidden" name={name} value={JSON.stringify(selected)} />
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const isSelected = selected.includes(option);
          return (
            <button
              key={option}
              type="button"
              onClick={() => toggle(option)}
              className={`rounded-lg border px-3 py-2 text-sm transition ${
                isSelected
                  ? "border-[#3FFB00]/60 bg-[#3FFB00]/10 text-[#3FFB00]"
                  : "border-zinc-700/60 bg-[#1E2732] text-zinc-300 hover:border-zinc-600 hover:text-zinc-200"
              }`}
            >
              {isSelected && <Check className="mr-1.5 inline-block h-3.5 w-3.5" />}
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function SingleSelectPills({
  label,
  name,
  value,
  onChange,
  options,
  optional,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  optional?: boolean;
}) {
  return (
    <div>
      <Label optional={optional}>{label}</Label>
      <input type="hidden" name={name} value={value} />
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const isSelected = option === value;
          return (
            <button
              key={option}
              type="button"
              onClick={() => onChange(option)}
              className={`rounded-lg border px-4 py-2 text-sm transition ${
                isSelected
                  ? "border-[#3FFB00]/60 bg-[#3FFB00]/10 text-[#3FFB00]"
                  : "border-zinc-700/60 bg-[#1E2732] text-zinc-300 hover:border-zinc-600 hover:text-zinc-200"
              }`}
            >
              {isSelected && <Check className="mr-1.5 inline-block h-3.5 w-3.5" />}
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function Home() {
  const [industryType, setIndustryType] = useState("");
  const [companySize, setCompanySize] = useState("");
  const [country, setCountry] = useState("");
  const [complianceFrameworks, setComplianceFrameworks] = useState<string[]>([]);
  const [webApp, setWebApp] = useState("");
  const [workflowTools, setWorkflowTools] = useState<string[]>([]);
  const [startTimeline, setStartTimeline] = useState("");
  const [otherIndustry, setOtherIndustry] = useState("");
  const [otherCompliance, setOtherCompliance] = useState("");
  const [otherWorkflowTool, setOtherWorkflowTool] = useState("");
  const [hasExistingTools, setHasExistingTools] = useState("");
  const [existingToolsDetail, setExistingToolsDetail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const [countries, setCountries] = useState<LocationOption[]>([]);

  useEffect(() => {
    fetch("/api/countries")
      .then((res) => res.json())
      .then(setCountries);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError("");

    if (!companySize) {
      setSubmitError("Please select a company size.");
      return;
    }
    if (!webApp) {
      setSubmitError("Please answer whether this is a website or web app.");
      return;
    }
    if (workflowTools.length === 0) {
      setSubmitError("Please select at least one workflow tool.");
      return;
    }

    setSubmitting(true);

    try {
      const data = new FormData(e.currentTarget);
      const res = await fetch(`${process.env.NEXT_PUBLIC_SUPERADMIN_URL}/api/demo-requests`, {
        method: "POST",
        body: data,
      });
      const result = await res.json();

      if (!res.ok || !result.success) {
        setSubmitError(result.error || "Something went wrong. Please try again.");
        setSubmitting(false);
        return;
      }

      setSubmitted(true);
    } catch {
      setSubmitError("Could not reach the server. Please check your connection and try again.");
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-[#26272b] p-4 sm:p-8">
        <div className="flex min-h-[calc(100vh-2rem)] w-full max-w-xl flex-col items-center justify-center rounded-2xl border border-white/5 bg-[#0F141A] p-6 text-center shadow-2xl sm:min-h-[calc(100vh-4rem)] sm:p-10">
          <div className="relative flex items-center justify-center">
            <div className="absolute h-20 w-20 rounded-full bg-[#3FFB00]/20 blur-2xl" />
            <SuccessIcon />
          </div>
          <h1 className="mt-6 text-2xl font-bold text-white">Request submitted</h1>
          <p className="mt-3 text-base font-medium text-[#3FFB00]">
            Thank you for your interest in preta.
          </p>
          <p className="mt-2 max-w-sm text-sm text-zinc-400">
            Your request is submitted &amp; under review, updates will be shared via the
            email address provided.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#26272b] p-4 sm:p-8">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl rounded-2xl border border-white/5 bg-[#0F141A] p-6 shadow-2xl sm:p-10"
      >
        {/* Header */}
        <div className="flex items-start gap-3 pb-6 sm:gap-4">
          <div className="flex flex-shrink-0 flex-col items-center gap-1">
            <Image
              src="/image.png"
              alt="Preta logo"
              width={64}
              height={53}
              className="h-auto w-12 sm:w-16"
            />
          </div>
          <div className="h-12 w-px flex-shrink-0 self-center bg-zinc-700/60" />
          <div>
            <h1 className="text-lg font-bold text-white sm:text-xl">Pilot Registration</h1>
            <p className="mt-1 text-sm text-zinc-400">
              Onboarding Form
            </p>
          </div>
        </div>

        <div className="border-t border-zinc-800" />

        {/* Section 1 — Company information */}
        <h2 className="mb-4 mt-6 text-sm font-semibold text-[#3FFB00]">
          1. Company information
        </h2>
        <div className="flex flex-col gap-4">
          <TextField label="Company name" name="companyName" placeholder="Enter company name" />
          <TextField label="Website" name="website" placeholder="https://example.com" type="url" />

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-3">
              <CustomSelect
                label="Industry type"
                name="industryType"
                value={industryType}
                onChange={(v) => { setIndustryType(v); if (v !== "Other") setOtherIndustry(""); }}
                options={industryTypes}
                placeholder="Select industry"
              />
              {industryType === "Other" && (
                <input
                  type="text"
                  name="otherIndustry"
                  value={otherIndustry}
                  onChange={(e) => setOtherIndustry(e.target.value)}
                  placeholder="Please specify your industry"
                  required
                  className={inputStyles}
                />
              )}
            </div>
            <CustomSelect
              label="Company size"
              name="companySize"
              value={companySize}
              onChange={setCompanySize}
              options={companySizes}
              placeholder="Select size"
            />
          </div>

          <CustomSelect
            label="Country"
            name="country"
            value={country}
            onChange={setCountry}
            options={countries.map((c) => c.name)}
            placeholder="Select country"
            searchable
          />
        </div>

        {/* Section 2 — Your information */}
        <h2 className="mb-4 mt-8 text-sm font-semibold text-[#3FFB00]">
          2. Your information
        </h2>
        <div className="flex flex-col gap-4">
          <TextField
            label="Your name & your role"
            name="nameAndRole"
            placeholder="e.g. Jane Doe, Head of Product"
          />
          <TextField
            label="Email address"
            name="email"
            type="email"
            placeholder="Enter your email"
          />
          <TextField
            label="Who is your Engineering lead for this pilot?"
            name="engineeringLead"
            placeholder="Full name and email"
          />
          <TextField
            label="Who is your Compliance lead for this pilot?"
            name="complianceLead"
            placeholder="Full name and email"
          />
        </div>

        {/* Section 3 — Pilot details */}
        <h2 className="mb-4 mt-8 text-sm font-semibold text-[#3FFB00]">
          3. Pilot details
        </h2>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <MultiSelect
              label="Compliance frameworks you currently follow"
              name="complianceFrameworks"
              selected={complianceFrameworks}
              onChange={(v) => { setComplianceFrameworks(v); if (!v.includes("Other")) setOtherCompliance(""); }}
              options={complianceOptions}
              optional
            />
            {complianceFrameworks.includes("Other") && (
              <input
                type="text"
                name="otherCompliance"
                value={otherCompliance}
                onChange={(e) => setOtherCompliance(e.target.value)}
                placeholder="Please specify the compliance framework"
                required
                className={inputStyles}
              />
            )}
          </div>

          <div>
            <Label>
              Briefly describe the feature or product area you are bringing into the pilot, and
              where users will encounter it
            </Label>
            <textarea
              name="featureDescription"
              placeholder="e.g. checkout flow, onboarding screen, pricing page"
              required
              rows={3}
              className={`${fieldStyles} placeholder-zinc-500 resize-none`}
            />
          </div>

          <SingleSelectPills
            label="Is this feature something your users will interact with on a website or web app?"
            name="webApp"
            value={webApp}
            onChange={setWebApp}
            options={webAppOptions}
          />

          <div className="flex flex-col gap-3">
            <MultiSelect
              label="Which tools are part of your design to development workflow?"
              name="workflowTools"
              selected={workflowTools}
              onChange={(v) => { setWorkflowTools(v); if (!v.includes("Other")) setOtherWorkflowTool(""); }}
              options={workflowToolOptions}
            />
            {workflowTools.includes("Other") && (
              <input
                type="text"
                name="otherWorkflowTool"
                value={otherWorkflowTool}
                onChange={(e) => setOtherWorkflowTool(e.target.value)}
                placeholder="Please specify the tool"
                required
                className={inputStyles}
              />
            )}
          </div>

          <div>
            <Label>What outcome would make this pilot a success for your team by Day 90?</Label>
            <textarea
              name="successOutcome"
              placeholder="Describe your success criteria"
              required
              rows={4}
              className={`${fieldStyles} placeholder-zinc-500 resize-none`}
            />
          </div>

          <SingleSelectPills
            label="How soon are you looking to start?"
            name="startTimeline"
            value={startTimeline}
            onChange={setStartTimeline}
            options={startTimelineOptions}
            optional
          />

          <div className="flex flex-col gap-3">
            <SingleSelectPills
              label="Are there any tools currently used by your team to validate product decisions or user experiences? If yes, please specify"
              name="hasExistingTools"
              value={hasExistingTools}
              onChange={(v) => { setHasExistingTools(v); if (v !== "Yes") setExistingToolsDetail(""); }}
              options={["Yes", "No"]}
            />
            {hasExistingTools === "Yes" && (
              <textarea
                name="existingToolsDetail"
                value={existingToolsDetail}
                onChange={(e) => setExistingToolsDetail(e.target.value)}
                placeholder="e.g. Hotjar, FullStory, UserTesting"
                required
                rows={3}
                className={`${fieldStyles} placeholder-zinc-500 resize-none`}
              />
            )}
          </div>
        </div>

        {/* Submit */}
        <div className="mt-8 border-t border-zinc-800 pt-6">
          {submitError && (
            <p className="mb-4 text-center text-sm text-red-400">{submitError}</p>
          )}
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={submitting}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#3FFB00] px-16 py-3 text-sm font-semibold text-black transition hover:bg-[#3FFB00]/85 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
              {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
              {submitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
