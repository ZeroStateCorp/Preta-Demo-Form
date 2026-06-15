"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { User, Mail, Building2, Check, ChevronDown, Info, Search, Upload, Loader2 } from "lucide-react";

const industries = [
  "eCommerce / Internet retail",
  "Software / SaaS",
  "Media / Publishers",
  "Digital marketing / Agency",
  "Travel / Hotels / Hospitality",
  "Banking / Fintech / Insurance",
  "Non-government / Charity",
  "Entertainment",
  "Business consulting",
  "Healthcare / Bio",
  "Education / Training",
  "Telecom",
  "Manufacturing / B2B",
  "Legal / Law Firms",
  "Logistics / Supply Chain",
  "Gaming / Interactive Media",
  "Research / Scientific Organisations",
  "Agriculture / AgriTech",
  "Energy & utilities",
  "Aerospace & defence",
  "Real estate",
  "Automotive",
  "Consumer packaged good & distribution",
  "Other",
];

const companySizes = ["1-50", "50-200", "200-500", "500-2000", "2000+"];

type LocationOption = { name: string; isoCode: string };

const fieldStyles =
  "w-full rounded-lg border border-zinc-700/60 bg-[#1E2732] px-4 py-2.5 text-base sm:text-sm text-zinc-200 outline-none transition focus:border-[#3FFB00]/60 focus:ring-1 focus:ring-[#3FFB00]/40";

const inputStyles = `${fieldStyles} pr-10 placeholder-zinc-500`;

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

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="mb-2 block text-sm text-zinc-200">
      {children} <span className="text-red-500">*</span>
    </label>
  );
}

function TextField({
  label,
  name,
  placeholder,
  type = "text",
  icon: Icon,
}: {
  label: string;
  name: string;
  placeholder: string;
  type?: string;
  icon: typeof User;
}) {
  return (
    <div>
      <Label>{label}</Label>
      <div className="relative">
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          required
          className={inputStyles}
        />
        <Icon className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
      </div>
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
    ? options.filter((option) => option.toLowerCase().includes(query.toLowerCase()))
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

export default function Home() {
  const [industry, setIndustry] = useState("");
  const [otherIndustry, setOtherIndustry] = useState("");
  const [companySize, setCompanySize] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [fileName, setFileName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const [countries, setCountries] = useState<LocationOption[]>([]);
  const [stateOptions, setStateOptions] = useState<LocationOption[]>([]);
  const [cityOptions, setCityOptions] = useState<string[]>([]);
  const [countryIso, setCountryIso] = useState("");

  useEffect(() => {
    fetch("/api/countries")
      .then((res) => res.json())
      .then(setCountries);
  }, []);

  const handleCountryChange = (nextCountry: string) => {
    setCountry(nextCountry);
    setState("");
    setCity("");
    setStateOptions([]);
    setCityOptions([]);

    const iso = countries.find((c) => c.name === nextCountry)?.isoCode ?? "";
    setCountryIso(iso);
    if (!iso) return;
    fetch(`/api/states?country=${iso}`)
      .then((res) => res.json())
      .then(setStateOptions);
  };

  const handleStateChange = (nextState: string) => {
    setState(nextState);
    setCity("");
    setCityOptions([]);

    const iso = stateOptions.find((s) => s.name === nextState)?.isoCode ?? "";
    if (!iso) return;
    fetch(`/api/cities?country=${countryIso}&state=${iso}`)
      .then((res) => res.json())
      .then(setCityOptions);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError("");
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
            administrator email provided.
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
            <h1 className="text-lg font-bold text-white sm:text-xl">Company registration</h1>
            <p className="mt-1 text-sm text-zinc-400">
              Complete the information below to request access.
            </p>
          </div>
        </div>

        <div className="border-t border-zinc-800" />

        {/* Section 1 */}
        <h2 className="mb-4 mt-6 text-sm font-semibold text-[#3FFB00]">
          1.Administration information
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <TextField label="Admin full name" name="adminName" placeholder="Enter name" icon={User} />
          <TextField
            label="Admin email"
            name="adminEmail"
            type="email"
            placeholder="Enter email"
            icon={Mail}
          />
        </div>

        <div className="mt-4 flex gap-3 rounded-lg border border-zinc-800 bg-[#1E2732] p-4">
          <Info className="h-5 w-5 flex-shrink-0 text-[#3FFB00]" />
          <div>
            <p className="text-sm font-semibold text-white">Administrator email</p>
            <p className="mt-1 text-xs leading-relaxed text-zinc-400">
              The email address provided here will be used for workspace access, approval
              updates, &amp; future notifications.
            </p>
          </div>
        </div>

        {/* Section 2 */}
        <h2 className="mb-4 mt-8 text-sm font-semibold text-[#3FFB00]">2. Company information</h2>
        <div className="flex flex-col gap-4">
          <TextField
            label="Company name"
            name="companyName"
            placeholder="Enter company"
            icon={Building2}
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <CustomSelect
              label="Industry"
              name="industry"
              value={industry}
              onChange={setIndustry}
              options={industries}
              placeholder="Select industry"
            />
            <CustomSelect
              label="Company size"
              name="companySize"
              value={companySize}
              onChange={setCompanySize}
              options={companySizes}
              placeholder="Select company size"
            />
          </div>

          {industry === "Other" && (
            <div>
              <label className="mb-2 block text-sm text-zinc-200">
                Please specify your industry <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="otherIndustry"
                value={otherIndustry}
                onChange={(e) => setOtherIndustry(e.target.value)}
                placeholder="Enter your industry"
                required
                className={inputStyles}
              />
            </div>
          )}

          <div className="grid gap-4 sm:grid-cols-2">
            <CustomSelect
              label="Country"
              name="country"
              value={country}
              onChange={handleCountryChange}
              options={countries.map((c) => c.name)}
              placeholder="Select country"
              searchable
            />
            <CustomSelect
              label="State"
              name="state"
              value={state}
              onChange={handleStateChange}
              options={stateOptions.map((s) => s.name)}
              placeholder={country ? "Select state" : "Select country first"}
              searchable
            />
          </div>

          <CustomSelect
            label="City"
            name="city"
            value={city}
            onChange={setCity}
            options={cityOptions}
            placeholder={state ? "Select city" : "Select state first"}
            searchable
          />
        </div>

        {/* Section 3 */}
        <h2 className="mb-4 mt-8 text-sm font-semibold text-[#3FFB00]">3. Company logo</h2>
        <div className="flex items-center gap-3 rounded-lg border border-zinc-700/60 bg-[#1E2732] p-2">
          <label className="flex flex-shrink-0 cursor-pointer items-center gap-2 rounded-md bg-zinc-700/60 px-3 py-2 text-sm font-medium text-zinc-200 transition hover:bg-zinc-700">
            <Upload className="h-4 w-4" />
            Choose file
            <input
              type="file"
              name="companyLogo"
              accept="image/*"
              className="hidden"
              onChange={(e) => setFileName(e.target.files?.[0]?.name ?? "")}
            />
          </label>
          <span className="min-w-0 flex-1 truncate text-sm text-zinc-500">
            {fileName || "No chosen file"}
          </span>
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
