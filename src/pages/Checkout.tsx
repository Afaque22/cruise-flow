import {
  ArrowLeft,
  ArrowRight,
  Check,
  CreditCard,
  LockKeyhole,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Ship,
  User,
  Users,
} from "lucide-react";
import {
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { cabins } from "../data/cabins";
import { getCruiseById } from "../services/cruiseService";
import { DateOfBirthPicker } from "../components/checkout/DateOfBirthPicker";

type CheckoutStep = "guest" | "payment" | "review";

interface GuestForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  dateOfBirth: string;
}

interface PaymentForm {
  cardName: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
}

const initialGuest: GuestForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  country: "",
  dateOfBirth: "",
};

const initialPayment: PaymentForm = {
  cardName: "",
  cardNumber: "",
  expiry: "",
  cvv: "",
};

const countries = [
  "Pakistan",
  "United States",
  "Canada",
  "United Kingdom",
  "Australia",
  "Germany",
  "France",
  "United Arab Emirates",
];

function formatDate(value: string): string {
  if (!value) {
    return "Not selected";
  }

  const date = new Date(`${value}T00:00:00`);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function getCabinTypeLabel(type: string): string {
  switch (type) {
    case "interior":
      return "Interior";

    case "oceanview":
      return "Ocean View";

    case "balcony":
      return "Balcony";

    case "suite":
      return "Suite";

    default:
      return type;
  }
}

function formatCardNumber(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 16);

  return digits.replace(/(.{4})/g, "$1 ").trim();
}

function formatExpiry(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 4);

  if (digits.length <= 2) {
    return digits;
  }

  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

function getTaxes(cabinsToPrice: typeof cabins): number {
  const cabinSubtotal = cabinsToPrice.reduce(
    (sum, cabin) => sum + cabin.price,
    0,
  );

  return Math.round(cabinSubtotal * 0.12);
}

function getTotal(cabinsToPrice: typeof cabins): number {
  const cabinSubtotal = cabinsToPrice.reduce(
    (sum, cabin) => sum + cabin.price,
    0,
  );

  return cabinSubtotal + getTaxes(cabinsToPrice);
}

function StepIndicator({ currentStep }: { currentStep: CheckoutStep }) {
  const steps = [
    {
      id: "guest" as const,
      number: "01",
      label: "Guest details",
    },
    {
      id: "payment" as const,
      number: "02",
      label: "Payment",
    },
    {
      id: "review" as const,
      number: "03",
      label: "Review",
    },
  ];

  const currentIndex = steps.findIndex((step) => step.id === currentStep);

  return (
    <div className="flex items-center">
      {steps.map((step, index) => {
        const completed = index < currentIndex;
        const active = index === currentIndex;

        return (
          <div key={step.id} className="flex items-center">
            <div className="flex items-center gap-2">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition ${
                  completed
                    ? "bg-emerald-500 text-white"
                    : active
                      ? "bg-slate-950 text-white"
                      : "bg-slate-100 text-slate-400"
                }`}
              >
                {completed ? <Check size={14} /> : step.number}
              </div>

              <span
                className={`hidden text-xs font-semibold sm:block ${
                  active || completed ? "text-slate-800" : "text-slate-400"
                }`}
              >
                {step.label}
              </span>
            </div>

            {index < steps.length - 1 && (
              <div className="mx-3 h-px w-8 bg-slate-200 sm:mx-5 sm:w-12" />
            )}
          </div>
        );
      })}
    </div>
  );
}

function InputField({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  icon,
  required = true,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: string;
  icon?: ReactNode;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-semibold text-slate-600">
        {label}

        {required && <span className="ml-1 text-red-400">*</span>}
      </span>

      <div className="relative">
        {icon && (
          <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
            {icon}
          </span>
        )}

        <input
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          required={required}
          className={`h-12 w-full rounded-xl border border-slate-200 bg-white text-sm text-slate-900 outline-none transition placeholder:text-slate-300 focus:border-slate-400 focus:ring-4 focus:ring-slate-100 ${
            icon ? "pl-11 pr-4" : "px-4"
          }`}
        />
      </div>
    </label>
  );
}

function BookingSummary({
  cruise,
  selectedCabins,
  selectedDate,
}: {
  cruise: NonNullable<ReturnType<typeof getCruiseById>>;
  selectedCabins: (typeof cabins)[number][];
  selectedDate: string;
}) {
  const cabinSubtotal = selectedCabins.reduce(
    (sum, cabin) => sum + cabin.price,
    0,
  );

  const taxes = getTaxes(selectedCabins);
  const total = getTotal(selectedCabins);

  return (
    <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
            Your trip
          </p>

          <h2 className="mt-1 text-lg font-bold text-slate-950">
            {cruise.name}
          </h2>

          <p className="mt-1 text-sm text-slate-500">{cruise.ship.name}</p>
        </div>

        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100">
          <Ship size={18} className="text-slate-600" />
        </div>
      </div>

      <div className="mt-5 overflow-hidden rounded-2xl bg-slate-50">
        <img
          src={cruise.image}
          alt={cruise.name}
          decoding="async"
          className="h-36 w-full object-cover"
        />
      </div>

      <div className="mt-5 space-y-4">
        <div className="flex items-start gap-3">
          <MapPin size={16} className="mt-0.5 shrink-0 text-slate-400" />

          <div>
            <p className="text-xs text-slate-400">Departure</p>

            <p className="mt-0.5 text-sm font-semibold text-slate-800">
              {cruise.departurePort}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Ship size={16} className="mt-0.5 shrink-0 text-slate-400" />

          <div>
            <p className="text-xs text-slate-400">Sailing</p>

            <p className="mt-0.5 text-sm font-semibold text-slate-800">
              {formatDate(selectedDate)}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Users size={16} className="mt-0.5 shrink-0 text-slate-400" />

          <div className="min-w-0 flex-1">
            <p className="text-xs text-slate-400">Cabins</p>

            <div className="mt-2 space-y-2">
              {selectedCabins.map((cabin) => (
                <div
                  key={cabin.id}
                  className="flex items-center justify-between gap-3 rounded-xl bg-slate-50 px-3 py-2.5"
                >
                  <div>
                    <p className="text-sm font-semibold text-slate-800">
                      {cabin.number}
                    </p>

                    <p className="mt-0.5 text-xs text-slate-500">
                      {getCabinTypeLabel(cabin.type)} · Deck {cabin.deck}
                    </p>
                  </div>

                  <p className="shrink-0 text-sm font-semibold text-slate-800">
                    ${cabin.price.toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="my-5 h-px bg-slate-100" />

      <div className="space-y-3 text-sm">
        <div className="flex justify-between gap-4">
          <span className="text-slate-500">
            {selectedCabins.length === 1
              ? "Cabin"
              : `Cabins (${selectedCabins.length})`}
          </span>

          <span className="font-medium text-slate-800">
            ${cabinSubtotal.toLocaleString()}
          </span>
        </div>

        <div className="flex justify-between gap-4">
          <span className="text-slate-500">Taxes & fees</span>

          <span className="font-medium text-slate-800">
            ${taxes.toLocaleString()}
          </span>
        </div>

        <div className="my-3 h-px bg-slate-100" />

        <div className="flex items-end justify-between gap-4">
          <span className="font-semibold text-slate-800">Total</span>

          <span className="text-2xl font-bold text-slate-950">
            ${total.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}

function GuestDetails({
  guest,
  setGuest,
  onContinue,
}: {
  guest: GuestForm;
  setGuest: Dispatch<SetStateAction<GuestForm>>;
  onContinue: () => void;
}) {
  const updateGuest = (field: keyof GuestForm, value: string) => {
    setGuest((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const canContinue = Boolean(
    guest.firstName.trim() &&
    guest.lastName.trim() &&
    guest.email.trim() &&
    guest.phone.trim() &&
    guest.country.trim() &&
    guest.dateOfBirth.trim(),
  );

  return (
    <section className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
          Step 1
        </p>

        <h2 className="mt-1 text-xl font-bold text-slate-950">Guest details</h2>

        <p className="mt-1 text-sm text-slate-500">
          Enter the details of the primary guest for this booking.
        </p>
      </div>

      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <InputField
          label="First name"
          value={guest.firstName}
          onChange={(value) => updateGuest("firstName", value)}
          placeholder="John"
          icon={<User size={16} />}
        />

        <InputField
          label="Last name"
          value={guest.lastName}
          onChange={(value) => updateGuest("lastName", value)}
          placeholder="Smith"
        />

        <InputField
          label="Email address"
          value={guest.email}
          onChange={(value) => updateGuest("email", value)}
          placeholder="john@example.com"
          type="email"
          icon={<Mail size={16} />}
        />

        <InputField
          label="Phone number"
          value={guest.phone}
          onChange={(value) => updateGuest("phone", value)}
          placeholder="+1 555 123 4567"
          type="tel"
          icon={<Phone size={16} />}
        />

        <label className="block">
          <span className="mb-2 block text-xs font-semibold text-slate-600">
            Country
            <span className="ml-1 text-red-400">*</span>
          </span>

          <select
            value={guest.country}
            onChange={(event) => updateGuest("country", event.target.value)}
            className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-800 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
          >
            <option value="">Select country</option>

            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </label>

        <DateOfBirthPicker
          label="Date of birth"
          value={guest.dateOfBirth}
          onChange={(value) => updateGuest("dateOfBirth", value)}
        />
      </div>

      <div className="mt-6 flex items-start gap-3 rounded-2xl bg-slate-50 p-4">
        <ShieldCheck size={18} className="mt-0.5 shrink-0 text-slate-500" />

        <p className="text-xs leading-5 text-slate-500">
          Your information is used only to prepare this booking and will not be
          submitted to a real cruise operator in this demo.
        </p>
      </div>

      <div className="mt-7 flex justify-end">
        <button
          type="button"
          disabled={!canContinue}
          onClick={onContinue}
          className="flex h-12 items-center gap-2 rounded-xl bg-slate-950 px-6 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
        >
          Continue to payment
          <ArrowRight size={17} />
        </button>
      </div>
    </section>
  );
}

function PaymentForm({
  payment,
  setPayment,
  onBack,
  onContinue,
}: {
  payment: PaymentForm;
  setPayment: Dispatch<SetStateAction<PaymentForm>>;
  onBack: () => void;
  onContinue: () => void;
}) {
  const updatePayment = (field: keyof PaymentForm, value: string) => {
    setPayment((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const canContinue = Boolean(
    payment.cardName.trim() &&
    payment.cardNumber.replace(/\s/g, "").length === 16 &&
    /^\d{2}\/\d{2}$/.test(payment.expiry) &&
    /^\d{3}$/.test(payment.cvv),
  );

  return (
    <section className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
          Step 2
        </p>

        <h2 className="mt-1 text-xl font-bold text-slate-950">Payment</h2>

        <p className="mt-1 text-sm text-slate-500">
          Enter payment details to continue.
        </p>
      </div>

      <div className="mt-7 rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm">
            <CreditCard size={18} className="text-slate-600" />
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-800">Card payment</p>

            <p className="text-xs text-slate-400">
              Visa, Mastercard or American Express
            </p>
          </div>

          <div className="ml-auto hidden items-center gap-2 text-xs text-slate-400 sm:flex">
            <LockKeyhole size={14} />
            Secure
          </div>
        </div>
      </div>

      <div className="mt-7 space-y-5">
        <InputField
          label="Name on card"
          value={payment.cardName}
          onChange={(value) => updatePayment("cardName", value)}
          placeholder="John Smith"
        />

        <InputField
          label="Card number"
          value={payment.cardNumber}
          onChange={(value) =>
            updatePayment("cardNumber", formatCardNumber(value))
          }
          placeholder="1234 5678 9012 3456"
          icon={<CreditCard size={16} />}
        />

        <div className="grid gap-5 sm:grid-cols-2">
          <InputField
            label="Expiry date"
            value={payment.expiry}
            onChange={(value) => updatePayment("expiry", formatExpiry(value))}
            placeholder="MM/YY"
          />

          <InputField
            label="Security code"
            value={payment.cvv}
            onChange={(value) =>
              updatePayment("cvv", value.replace(/\D/g, "").slice(0, 3))
            }
            placeholder="123"
            type="password"
          />
        </div>
      </div>

      <div className="mt-6 flex items-start gap-3 rounded-2xl bg-slate-50 p-4">
        <LockKeyhole size={17} className="mt-0.5 shrink-0 text-slate-500" />

        <p className="text-xs leading-5 text-slate-500">
          This is a frontend assessment. No payment is processed and no card
          details are sent to a payment provider.
        </p>
      </div>

      <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
        <button
          type="button"
          onClick={onBack}
          className="flex h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
        >
          <ArrowLeft size={16} />
          Back
        </button>

        <button
          type="button"
          disabled={!canContinue}
          onClick={onContinue}
          className="flex h-12 items-center justify-center gap-2 rounded-xl bg-slate-950 px-6 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
        >
          Review booking
          <ArrowRight size={17} />
        </button>
      </div>
    </section>
  );
}

function BookingReview({
  cruise,
  selectedCabins,
  selectedDate,
  guest,
  onBack,
  onConfirm,
}: {
  cruise: NonNullable<ReturnType<typeof getCruiseById>>;
  selectedCabins: (typeof cabins)[number][];
  selectedDate: string;
  guest: GuestForm;
  onBack: () => void;
  onConfirm: () => void;
}) {
  const cabinSubtotal = selectedCabins.reduce(
    (sum, cabin) => sum + cabin.price,
    0,
  );

  const taxes = getTaxes(selectedCabins);

  const total = getTotal(selectedCabins);

  return (
    <section className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
          Step 3
        </p>

        <h2 className="mt-1 text-xl font-bold text-slate-950">
          Review your booking
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Check the details before confirming your reservation.
        </p>
      </div>

      <div className="mt-7 space-y-5">
        <ReviewSection title="Guest" icon={<User size={16} />}>
          <div className="grid gap-3 sm:grid-cols-2">
            <ReviewItem
              label="Name"
              value={`${guest.firstName} ${guest.lastName}`}
            />

            <ReviewItem label="Email" value={guest.email} />

            <ReviewItem label="Phone" value={guest.phone} />

            <ReviewItem label="Country" value={guest.country} />

            <ReviewItem
              label="Date of birth"
              value={formatDate(guest.dateOfBirth)}
            />
          </div>
        </ReviewSection>

        <ReviewSection title="Cruise" icon={<Ship size={16} />}>
          <div className="grid gap-3 sm:grid-cols-2">
            <ReviewItem label="Cruise" value={cruise.name} />

            <ReviewItem label="Ship" value={cruise.ship.name} />

            <ReviewItem label="Departure" value={cruise.departurePort} />

            <ReviewItem label="Sailing date" value={formatDate(selectedDate)} />
          </div>
        </ReviewSection>

        <ReviewSection
          title={
            selectedCabins.length === 1
              ? "Cabin"
              : `Cabins (${selectedCabins.length})`
          }
          icon={<Users size={16} />}
        >
          <div className="space-y-3">
            {selectedCabins.map((cabin) => (
              <div key={cabin.id} className="rounded-xl bg-slate-50 p-4">
                <div className="grid gap-3 sm:grid-cols-2">
                  <ReviewItem label="Cabin" value={cabin.number} />

                  <ReviewItem label="Deck" value={`Deck ${cabin.deck}`} />

                  <ReviewItem
                    label="Category"
                    value={getCabinTypeLabel(cabin.type)}
                  />

                  <ReviewItem
                    label="Capacity"
                    value={`Up to ${cabin.sleeps} guests`}
                  />

                  <ReviewItem
                    label="Price"
                    value={`$${cabin.price.toLocaleString()}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </ReviewSection>

        <div className="rounded-2xl bg-slate-50 p-5">
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-500">
                {selectedCabins.length === 1
                  ? "Cabin"
                  : `Cabins (${selectedCabins.length})`}
              </span>

              <span className="font-medium text-slate-800">
                ${cabinSubtotal.toLocaleString()}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-500">Taxes & fees</span>

              <span className="font-medium text-slate-800">
                ${taxes.toLocaleString()}
              </span>
            </div>

            <div className="h-px bg-slate-200" />

            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-800">Total</span>

              <span className="text-xl font-bold text-slate-950">
                ${total.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-start gap-3 rounded-2xl border border-emerald-100 bg-emerald-50 p-4">
        <ShieldCheck size={18} className="mt-0.5 shrink-0 text-emerald-600" />

        <p className="text-xs leading-5 text-emerald-800">
          By confirming, you acknowledge that this is a demo booking. No real
          reservation or payment will be created.
        </p>
      </div>

      <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
        <button
          type="button"
          onClick={onBack}
          className="flex h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
        >
          <ArrowLeft size={16} />
          Back to payment
        </button>

        <button
          type="button"
          onClick={onConfirm}
          className="flex h-12 items-center justify-center gap-2 rounded-xl bg-slate-950 px-6 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Confirm booking
          <Check size={17} />
        </button>
      </div>
    </section>
  );
}

function ReviewSection({
  title,
  icon,
  children,
}: {
  title: string;
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 p-4 sm:p-5">
      <div className="mb-4 flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
          {icon}
        </span>

        <h3 className="text-sm font-bold text-slate-900">{title}</h3>
      </div>

      {children}
    </div>
  );
}

function ReviewItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p className="mt-1 break-words text-sm font-medium text-slate-800">
        {value}
      </p>
    </div>
  );
}

export function Checkout() {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const cruiseId = searchParams.get("cruiseId") ?? "";

  const fallbackCabinId = searchParams.get("cabinId") ?? "";

  const selectedDate = searchParams.get("date") ?? "";

  const cruise = getCruiseById(cruiseId);

  const getStoredCabinIds = (): string[] => {
    try {
      const stored = sessionStorage.getItem("cruiseflow-selected-cabins");

      if (!stored) {
        return [];
      }

      const parsed: unknown = JSON.parse(stored);

      if (!Array.isArray(parsed)) {
        return [];
      }

      return parsed.filter((id): id is string => typeof id === "string");
    } catch {
      return [];
    }
  };

  const storedCabinIds = getStoredCabinIds();

  const selectedCabinIds =
    storedCabinIds.length > 0
      ? storedCabinIds
      : fallbackCabinId
        ? [fallbackCabinId]
        : [];

  const selectedCabins = cabins.filter(
    (cabin) =>
      cabin.cruiseId === cruiseId && selectedCabinIds.includes(cabin.id),
  );

  const [step, setStep] = useState<CheckoutStep>("guest");

  const [guest, setGuest] = useState<GuestForm>(initialGuest);

  const [payment, setPayment] = useState<PaymentForm>(initialPayment);

  if (!cruise || selectedCabins.length === 0) {
    return (
      <div className="min-h-screen bg-[#f7f8fa]">

        <main className="mx-auto flex min-h-[70vh] max-w-[1440px] items-center justify-center px-5 py-16">
          <div className="max-w-md text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">
              <Ship size={24} className="text-slate-500" />
            </div>

            <h1 className="mt-5 text-2xl font-bold text-slate-950">
              Booking details unavailable
            </h1>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              We could not find the cruise or cabin associated with this
              booking.
            </p>

            <Link
              to="/search"
              className="mt-6 inline-flex h-11 items-center gap-2 rounded-xl bg-slate-950 px-5 text-sm font-semibold text-white"
            >
              <ArrowLeft size={16} />
              Back to cruises
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const handleConfirm = () => {
    sessionStorage.setItem("cruiseflow-booking-guest", JSON.stringify(guest));

    sessionStorage.setItem(
      "cruiseflow-booking-cabins",
      JSON.stringify(selectedCabins.map((cabin) => cabin.id)),
    );

    const firstCabin = selectedCabins[0];

    navigate(
      `/booking-confirmation?cruiseId=${encodeURIComponent(
        cruise.id,
      )}&date=${encodeURIComponent(selectedDate)}&cabinId=${encodeURIComponent(
        firstCabin.id,
      )}`,
      {
        replace: true,
      },
    );
  };

  return (
    <div className="min-h-screen bg-[#f7f8fa]">

      <main className="mx-auto max-w-[1440px] px-5 py-8 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-5 border-b border-slate-200 pb-7 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <Link
              to={`/cruises/${cruise.id}/cabin?date=${encodeURIComponent(
                selectedDate,
              )}`}
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-950"
            >
              <ArrowLeft size={16} />
              Back to cabin selection
            </Link>

            <h1 className="mt-5 text-3xl font-bold tracking-tight text-slate-950">
              Complete your booking
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Review your trip and provide the required details.
            </p>
          </div>

          <StepIndicator currentStep={step} />
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
          <div>
            {step === "guest" && (
              <GuestDetails
                guest={guest}
                setGuest={setGuest}
                onContinue={() => setStep("payment")}
              />
            )}

            {step === "payment" && (
              <PaymentForm
                payment={payment}
                setPayment={setPayment}
                onBack={() => setStep("guest")}
                onContinue={() => setStep("review")}
              />
            )}

            {step === "review" && (
              <BookingReview
                cruise={cruise}
                selectedCabins={selectedCabins}
                selectedDate={selectedDate}
                guest={guest}
                onBack={() => setStep("payment")}
                onConfirm={handleConfirm}
              />
            )}
          </div>

          <aside className="xl:sticky xl:top-[96px] xl:self-start">
            <BookingSummary
              cruise={cruise}
              selectedCabins={selectedCabins}
              selectedDate={selectedDate}
            />

            <div className="mt-4 flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4">
              <ShieldCheck
                size={18}
                className="mt-0.5 shrink-0 text-emerald-600"
              />

              <div>
                <p className="text-sm font-semibold text-slate-800">
                  Secure checkout
                </p>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Your booking details are handled locally in this assessment
                  demo.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
