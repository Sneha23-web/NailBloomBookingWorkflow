import { FormEvent, useMemo, useState } from "react"

type Service = {
  id: string
  name: string
  price: number
  description: string
  detail: string
  image: string
}

type ArtStyle = {
  name: string
  image: string
}

const services: Service[] = [
  {
    id: "plain-gel",
    name: "Plain gel polish",
    price: 499,
    description:
      "A flawless wash of colour with a glossy, chip-resistant finish.",
    detail: "Natural nails",
    image: "/nails/gel-polish.jpg",
  },
  {
    id: "gel-art",
    name: "Gel polish with art",
    price: 599,
    description:
      "Choose any signature art style from the Nail Bloom catalogue.",
    detail: "Most loved",
    image: "/nails/blossom.jpg",
  },
  {
    id: "soft-gel",
    name: "Soft gel nails",
    price: 899,
    description:
      "Lightweight extensions with a comfortable, natural-looking finish.",
    detail: "Lasts 3–4 weeks",
    image: "/nails/soft-gel.jpg",
  },
  {
    id: "polygel",
    name: "Polygel nails",
    price: 799,
    description:
      "Strong, flexible sculpted nails shaped just the way you like.",
    detail: "Strong & flexible",
    image: "/nails/swirls.jpg",
  },
  {
    id: "temp-nail",
    name: "Temp nail",
    price: 699,
    description: "Reusable, easy-wear nails for an instant salon-ready look.",
    detail: "Quick & reusable",
    image: "/nails/press-on.jpg",
  },
]

const shapes = [
  "Round",
  "Squoval",
  "Square",
  "Almond",
  "Coffin",
  "Stiletto",
  "Oval",
]

const artStyles: ArtStyle[] = [
  { name: "Chrome", image: "/nails/chrome.jpg" },
  { name: "Marble", image: "/nails/marble.jpg" },
  { name: "Foil", image: "/nails/foil.jpg" },
  { name: "Dotting", image: "/nails/dotting.jpg" },
  { name: "Blossom gel", image: "/nails/blossom.jpg" },
  { name: "Spider gel", image: "/nails/spider.jpg" },
  { name: "Glitter", image: "/nails/glitter.jpg" },
  { name: "Ombre", image: "/nails/ombre.jpg" },
  { name: "Water droplet", image: "/nails/water-droplet.jpg" },
  { name: "Rhinestone", image: "/nails/rhinestone.jpg" },
  { name: "Animal print", image: "/nails/animal-print.jpg" },
  { name: "Sugar", image: "/nails/sugar.jpg" },
  { name: "Sweater", image: "/nails/sweater.jpg" },
  { name: "French", image: "/nails/french.jpg" },
  { name: "Water decal", image: "/nails/water-decal.jpg" },
  { name: "Cat eye", image: "/nails/cat-eye.jpg" },
  { name: "Swirls", image: "/nails/swirls.jpg" },
  { name: "Pigment", image: "/nails/pigment.jpg" },
  { name: "Aura", image: "/nails/aura.jpg" },
  { name: "Comic", image: "/nails/comic.jpg" },
  { name: "Freehand floral", image: "/nails/floral.jpg" },
]

function ArrowIcon({ direction = "right" }: { direction?: "left" | "right" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={`size-4 ${direction === "left" ? "rotate-180" : ""}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M5 12h14M14 7l5 5-5 5" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="size-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
    >
      <path d="m5 12 4 4L19 6" />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="size-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M8.6 3.8 10.8 8 8.9 9.9a15 15 0 0 0 5.2 5.2l1.9-1.9 4.2 2.2v3.1a1.8 1.8 0 0 1-1.8 1.8A14.7 14.7 0 0 1 3.7 5.6a1.8 1.8 0 0 1 1.8-1.8h3.1Z" />
    </svg>
  )
}

function Sparkle({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="currentColor"
    >
      <path d="M12 1c.7 7.2 3.8 10.3 11 11-7.2.7-10.3 3.8-11 11C11.3 15.8 8.2 12.7 1 12 8.2 11.3 11.3 8.2 12 1Z" />
    </svg>
  )
}

function NailShape({ shape, active }: { shape: string active: boolean }) {
  const shapeClass: Record<string, string> = {
    Round: "rounded-t-full rounded-b-[45%]",
    Squoval: "rounded-t-[45%] rounded-b-xl",
    Square: "rounded-t-md rounded-b-lg",
    Almond: "rounded-[55%_55%_42%_42%]",
    Coffin:
      "[clip-path:polygon(28%_0,72%_0,88%_45%,78%_100%,22%_100%,12%_45%)]",
    Stiletto: "[clip-path:polygon(50%_0,82%_58%,72%_100%,28%_100%,18%_58%)]",
    Oval: "rounded-[50%]",
  }

  return (
    <span
      className={`block h-12 w-7 border transition ${shapeClass[shape]} ${
        active
          ? "border-[#8a4b31] bg-[#f2c9c0]"
          : "border-[#caa695] bg-[#fae8e3]"
      }`}
    />
  )
}

export default function App() {
  const [step, setStep] = useState(1)
  const [serviceId, setServiceId] = useState("gel-art")
  const [shape, setShape] = useState("Almond")
  const [art, setArt] = useState("Blossom gel")
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [notes, setNotes] = useState("")
  const [confirmed, setConfirmed] = useState(false)
  const [error, setError] = useState("")

  const selectedService = useMemo(
    () => services.find((service) => service.id === serviceId) ?? services[0],
    [serviceId],
  )
  const needsArt = serviceId === "gel-art"
  const selectedArt = artStyles.find((style) => style.name === art)
  const today = new Date().toISOString().split("T")[0]

  function nextStep() {
    setError("")
    setStep((current) => Math.min(3, current + 1))
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  function previousStep() {
    setError("")
    setStep((current) => Math.max(1, current - 1))
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  function submitBooking(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!name.trim() || !phone.trim() || !date || !time) {
      setError("Please complete your name, phone, date and preferred time.")
      return
    }
    setError("")
    setConfirmed(true)
  }

  const message = encodeURIComponent(
    `Hi Nail Bloom! I would like to book:\n\nService: ${selectedService.name} (₹${selectedService.price})\nShape: ${shape}${
      needsArt ? `\nNail art: ${art}` : ""
    }\nDate: ${date}\nTime: ${time}\nName: ${name}\nPhone: ${phone}${
      notes ? `\nNotes: ${notes}` : ""
    }`,
  )

  return (
    <main className="min-h-screen overflow-hidden bg-[#fffaf7] text-[#4d2d25]">
      <header className="relative z-20 border-b border-[#eadbd2] bg-[#fffaf7]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1180px] items-center justify-between px-5 py-4 lg:px-8">
          <a
            href="#"
            className="flex items-center gap-3"
            aria-label="Nail Bloom home"
          >
            <img
              src="/nail-bloom-logo.jpg"
              alt="Nail Bloom by Sneha Deolay"
              className="size-14 rounded-full border border-[#c79b63] object-cover shadow-[0_4px_14px_rgba(121,72,42,0.16)]"
            />
            <span>
              <span className="font-display block text-[1.45rem] font-semibold leading-none text-[#6b3928]">
                Nail Bloom
              </span>
              <span className="mt-1 block text-[9px] font-semibold uppercase tracking-[0.28em] text-[#9f786b]">
                By Sneha Deolay
              </span>
            </span>
          </a>
          <a
            href="tel:+919359662347"
            className="hidden items-center gap-2 rounded-full border border-[#dec8bb] px-4 py-2.5 text-sm font-semibold transition hover:border-[#a9664b] hover:bg-white sm:flex"
          >
            <PhoneIcon />
            93596 62347
          </a>
        </div>
      </header>

      <section className="relative border-b border-[#eadbd2]">
        <div className="hero-orb hero-orb-one" />
        <div className="hero-orb hero-orb-two" />
        <div className="relative mx-auto grid max-w-[1180px] gap-10 px-5 py-12 lg:grid-cols-[1fr_0.82fr] lg:px-8 lg:py-16">
          <div className="max-w-2xl">
            <div className="mb-5 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.24em] text-[#a46a4d]">
              <Sparkle className="size-3" /> Your nails, your moment
            </div>
            <h1 className="font-display text-5xl font-semibold leading-[1.04] tracking-[-0.035em] text-[#633524] sm:text-6xl lg:text-[4.35rem]">
              Let your nails
              <span className="block font-medium italic text-[#a96057]">
                bloom beautifully.
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-[#755c53] sm:text-lg">
              Choose your service, discover a design from our signature
              catalogue, and request your appointment in a few simple steps.
            </p>
          </div>
          <div className="relative hidden min-h-64 place-items-center lg:grid">
            <div className="absolute size-72 rounded-full bg-[#efd6cb]/60 blur-3xl" />
            <div className="relative rounded-full border border-[#d9b77b]/70 bg-white/60 p-2 shadow-[0_30px_70px_rgba(124,70,55,0.2)] backdrop-blur">
              <img
                src="/nail-bloom-logo.jpg"
                alt="Nail Bloom by Sneha Deolay official logo"
                className="size-64 rounded-full object-cover"
              />
            </div>
            <Sparkle className="absolute left-8 top-5 size-8 text-[#b9914f]" />
            <Sparkle className="absolute bottom-7 right-5 size-5 text-[#d3a778]" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1180px] px-5 py-10 lg:px-8 lg:py-14">
        <nav aria-label="Booking progress" className="mb-10">
          <ol className="mx-auto flex max-w-2xl items-start">
            {[
              ["1", "Choose service"],
              ["2", "Make it yours"],
              ["3", "Book your slot"],
            ].map(([number, label], index) => {
              const complete = step > index + 1
              const active = step === index + 1
              return (
                <li
                  key={number}
                  className="relative flex flex-1 flex-col items-center"
                >
                  {index > 0 && (
                    <span
                      className={`absolute right-1/2 top-4 h-px w-full ${
                        step > index ? "bg-[#a15e45]" : "bg-[#dfcec5]"
                      }`}
                    />
                  )}
                  <span
                    className={`relative z-10 grid size-8 place-items-center rounded-full border text-xs font-bold transition ${
                      complete || active
                        ? "border-[#8d4d35] bg-[#8d4d35] text-white"
                        : "border-[#d9c5bb] bg-[#fffaf7] text-[#a98b7d]"
                    }`}
                  >
                    {complete ? <CheckIcon /> : number}
                  </span>
                  <span
                    className={`mt-2 text-center text-xs font-semibold ${
                      active ? "text-[#633524]" : "text-[#a98b7d]"
                    }`}
                  >
                    {label}
                  </span>
                </li>
              )
            })}
          </ol>
        </nav>

        <div className="grid items-start gap-8 lg:grid-cols-[1fr_320px]">
          <div>
            {step === 1 && (
              <section aria-labelledby="service-heading" className="animate-in">
                <p className="eyebrow">Step one</p>
                <h2 id="service-heading" className="section-title">
                  Choose your service
                </h2>
                <p className="section-copy">
                  Every appointment includes careful prep, shaping and a
                  salon-perfect finish.
                </p>
                <div className="mt-7 grid gap-4 sm:grid-cols-2">
                  {services.map((service, index) => {
                    const selected = serviceId === service.id
                    return (
                      <button
                        key={service.id}
                        type="button"
                        aria-pressed={selected}
                        onClick={() => setServiceId(service.id)}
                        className={`group relative overflow-hidden rounded-3xl border bg-white p-4 text-left transition duration-300 ${
                          selected
                            ? "border-[#9d5a42] shadow-[0_16px_40px_rgba(111,62,45,0.12)]"
                            : "border-[#eadbd2] hover:-translate-y-0.5 hover:border-[#caa695] hover:shadow-lg"
                        } ${index === 1 ? "sm:row-span-2" : ""}`}
                      >
                        <div
                          className={`flex gap-4 ${
                            index === 1 ? "sm:flex-col" : ""
                          }`}
                        >
                          <img
                            src={service.image}
                            alt=""
                            className={`shrink-0 rounded-2xl object-cover ${
                              index === 1 ? "h-36 w-full sm:h-44" : "size-24"
                            }`}
                          />
                          <div className="min-w-0 flex-1 py-1">
                            <div className="mb-2 flex items-start justify-between gap-3">
                              <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#aa775e]">
                                {service.detail}
                              </span>
                              <span
                                className={`grid size-5 shrink-0 place-items-center rounded-full border ${
                                  selected
                                    ? "border-[#8d4d35] bg-[#8d4d35] text-white"
                                    : "border-[#d7c2b7] text-transparent"
                                }`}
                              >
                                <CheckIcon />
                              </span>
                            </div>
                            <h3 className="text-lg font-bold text-[#593327]">
                              {service.name}
                            </h3>
                            <p className="mt-1 text-sm leading-5 text-[#816b62]">
                              {service.description}
                            </p>
                            <p className="mt-3 font-display text-2xl text-[#8d4d35]">
                              ₹{service.price}
                            </p>
                          </div>
                        </div>
                      </button>
                    )
                  })}
                </div>
                <div className="mt-8 flex justify-end">
                  <button
                    type="button"
                    onClick={nextStep}
                    className="primary-button"
                  >
                    Personalise my look <ArrowIcon />
                  </button>
                </div>
              </section>
            )}

            {step === 2 && (
              <section
                aria-labelledby="personalise-heading"
                className="animate-in"
              >
                <p className="eyebrow">Step two</p>
                <h2 id="personalise-heading" className="section-title">
                  Make it yours
                </h2>
                <p className="section-copy">
                  Pick a silhouette
                  {needsArt
                    ? " and a signature art style from Sneha’s catalogue"
                    : ""}
                  .
                </p>

                <div className="mt-8">
                  <div className="mb-4 flex items-end justify-between">
                    <div>
                      <h3 className="text-lg font-bold">Choose your shape</h3>
                      <p className="mt-1 text-sm text-[#8a7167]">
                        We’ll refine the final shape during prep.
                      </p>
                    </div>
                    <span className="hidden text-xs font-bold uppercase tracking-[0.18em] text-[#a46a4d] sm:block">
                      {shape} selected
                    </span>
                  </div>
                  <div className="grid grid-cols-4 gap-2 sm:grid-cols-7">
                    {shapes.map((item) => (
                      <button
                        key={item}
                        type="button"
                        aria-pressed={shape === item}
                        onClick={() => setShape(item)}
                        className={`flex min-h-24 flex-col items-center justify-center gap-2 rounded-2xl border px-2 py-3 text-xs font-semibold transition ${
                          shape === item
                            ? "border-[#9d5a42] bg-[#fff2ed] text-[#6f3c2b] shadow-sm"
                            : "border-[#eadbd2] bg-white text-[#816b62] hover:border-[#caa695]"
                        }`}
                      >
                        <NailShape shape={item} active={shape === item} />
                        {item}
                      </button>
                    ))}
                  </div>
                </div>

                {needsArt && (
                  <div className="mt-10">
                    <div className="mb-4 flex items-end justify-between">
                      <div>
                        <h3 className="text-lg font-bold">
                          Choose your nail art
                        </h3>
                        <p className="mt-1 text-sm text-[#8a7167]">
                          All designs are hand-finished and uniquely yours.
                        </p>
                      </div>
                      <span className="hidden text-xs font-bold uppercase tracking-[0.18em] text-[#a46a4d] sm:block">
                        {artStyles.length} styles
                      </span>
                    </div>
                    <div className="catalog-scroll grid max-h-[500px] grid-cols-2 gap-3 overflow-y-auto pr-2 sm:grid-cols-3 md:grid-cols-4">
                      {artStyles.map((style) => (
                        <button
                          key={style.name}
                          type="button"
                          aria-pressed={art === style.name}
                          onClick={() => setArt(style.name)}
                          className={`group overflow-hidden rounded-2xl border bg-white text-left transition ${
                            art === style.name
                              ? "border-[#9d5a42] shadow-[0_10px_24px_rgba(111,62,45,0.12)]"
                              : "border-[#eadbd2] hover:border-[#caa695]"
                          }`}
                        >
                          <div className="relative aspect-[1.15] overflow-hidden bg-[#f7efeb]">
                            <img
                              src={style.image}
                              alt={`${style.name} nail art from the Nail Bloom catalogue`}
                              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                            />
                            {art === style.name && (
                              <span className="absolute right-2 top-2 grid size-6 place-items-center rounded-full bg-[#8d4d35] text-white shadow">
                                <CheckIcon />
                              </span>
                            )}
                          </div>
                          <span className="block px-3 py-2.5 text-sm font-semibold text-[#5e382c]">
                            {style.name}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {!needsArt && (
                  <div className="mt-8 flex items-center gap-4 rounded-2xl border border-[#eadbd2] bg-[#fff4ef] p-4">
                    <Sparkle className="size-8 shrink-0 text-[#bd8a55]" />
                    <p className="text-sm leading-6 text-[#795d53]">
                      You’ve chosen{" "}
                      <strong className="text-[#5d3427]">
                        {selectedService.name}
                      </strong>
                      . Want one of the catalogue designs instead? Select “Gel
                      polish with art” from the previous step.
                    </p>
                  </div>
                )}

                <div className="mt-8 flex items-center justify-between gap-4">
                  <button
                    type="button"
                    onClick={previousStep}
                    className="secondary-button"
                  >
                    <ArrowIcon direction="left" /> Back
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    className="primary-button"
                  >
                    Choose my slot <ArrowIcon />
                  </button>
                </div>
              </section>
            )}

            {step === 3 && !confirmed && (
              <section aria-labelledby="booking-heading" className="animate-in">
                <p className="eyebrow">Final step</p>
                <h2 id="booking-heading" className="section-title">
                  When shall we bloom?
                </h2>
                <p className="section-copy">
                  Share your preferred appointment details and we’ll confirm
                  availability with you.
                </p>

                <form
                  onSubmit={submitBooking}
                  className="mt-8 grid gap-5 sm:grid-cols-2"
                  noValidate
                >
                  <label className="field">
                    <span>Your name</span>
                    <input
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      placeholder="Enter your full name"
                    />
                  </label>
                  <label className="field">
                    <span>Phone number</span>
                    <input
                      value={phone}
                      onChange={(event) => setPhone(event.target.value)}
                      placeholder="Your WhatsApp number"
                      inputMode="tel"
                    />
                  </label>
                  <label className="field">
                    <span>Preferred date</span>
                    <input
                      type="date"
                      min={today}
                      value={date}
                      onChange={(event) => setDate(event.target.value)}
                    />
                  </label>
                  <label className="field">
                    <span>Preferred time</span>
                    <select
                      value={time}
                      onChange={(event) => setTime(event.target.value)}
                    >
                      <option value="">Select a time</option>
                      <option>10:00 AM</option>
                      <option>11:30 AM</option>
                      <option>1:00 PM</option>
                      <option>2:30 PM</option>
                      <option>4:00 PM</option>
                      <option>5:30 PM</option>
                      <option>7:00 PM</option>
                    </select>
                  </label>
                  <label className="field sm:col-span-2">
                    <span>
                      Anything we should know? <em>Optional</em>
                    </span>
                    <textarea
                      value={notes}
                      onChange={(event) => setNotes(event.target.value)}
                      placeholder="Colour preference, occasion, removal needed..."
                      rows={4}
                    />
                  </label>
                  {error && (
                    <p
                      role="alert"
                      className="sm:col-span-2 rounded-xl border border-[#d99b8b] bg-[#fff0ec] px-4 py-3 text-sm text-[#8e4333]"
                    >
                      {error}
                    </p>
                  )}
                  <div className="mt-1 flex items-center justify-between gap-4 sm:col-span-2">
                    <button
                      type="button"
                      onClick={previousStep}
                      className="secondary-button"
                    >
                      <ArrowIcon direction="left" /> Back
                    </button>
                    <button type="submit" className="primary-button">
                      Review request <ArrowIcon />
                    </button>
                  </div>
                </form>
              </section>
            )}

            {step === 3 && confirmed && (
              <section className="animate-in rounded-[2rem] border border-[#e5d2c8] bg-white p-7 text-center shadow-[0_24px_70px_rgba(94,52,39,0.1)] sm:p-12">
                <span className="mx-auto grid size-16 place-items-center rounded-full bg-[#f4ddd5] text-[#8d4d35]">
                  <Sparkle className="size-8" />
                </span>
                <p className="eyebrow mt-6">Your look is ready</p>
                <h2 className="font-display mt-2 text-4xl text-[#633524] sm:text-5xl">
                  A beautiful choice, {name.split(" ")[0]}.
                </h2>
                <p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-[#80685f]">
                  Send your request on WhatsApp and Sneha will confirm your
                  slot. Your appointment is not reserved until you receive a
                  confirmation.
                </p>
                <div className="mx-auto mt-7 grid max-w-md gap-2 rounded-2xl bg-[#fff6f2] p-5 text-left text-sm">
                  <div className="flex justify-between gap-4">
                    <span className="text-[#9b7f73]">Service</span>
                    <strong>{selectedService.name}</strong>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-[#9b7f73]">Style</span>
                    <strong>
                      {shape}
                      {needsArt ? ` · ${art}` : ""}
                    </strong>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-[#9b7f73]">Preferred slot</span>
                    <strong>
                      {date} · {time}
                    </strong>
                  </div>
                </div>
                <a
                  href={`https://wa.me/919359662347?text=${message}`}
                  target="_blank"
                  rel="noreferrer"
                  className="primary-button mx-auto mt-7 w-fit"
                >
                  Send on WhatsApp <ArrowIcon />
                </a>
                <button
                  type="button"
                  className="mt-5 block w-full text-sm font-semibold text-[#8d4d35] underline decoration-[#d6b7a9] underline-offset-4"
                  onClick={() => setConfirmed(false)}
                >
                  Edit my details
                </button>
              </section>
            )}
          </div>

          <aside className="sticky top-6 hidden overflow-hidden rounded-[1.7rem] border border-[#e5d4ca] bg-white shadow-[0_20px_60px_rgba(90,49,35,0.09)] lg:block">
            <div className="relative h-40 overflow-hidden">
              <img
                src={
                  needsArt && selectedArt
                    ? selectedArt.image
                    : selectedService.image
                }
                alt=""
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#4d2d25]/65 to-transparent" />
              <div className="absolute bottom-4 left-5 text-white">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
                  Your selection
                </span>
                <p className="font-display mt-1 text-2xl">
                  {selectedService.name}
                </p>
              </div>
            </div>
            <div className="p-5">
              <div className="space-y-3 border-b border-[#eee1da] pb-5 text-sm">
                <div className="flex justify-between gap-4">
                  <span className="text-[#9a8075]">Service</span>
                  <span className="text-right font-semibold">
                    {selectedService.name}
                  </span>
                </div>
                {step >= 2 && (
                  <>
                    <div className="flex justify-between gap-4">
                      <span className="text-[#9a8075]">Shape</span>
                      <span className="font-semibold">{shape}</span>
                    </div>
                    {needsArt && (
                      <div className="flex justify-between gap-4">
                        <span className="text-[#9a8075]">Nail art</span>
                        <span className="font-semibold">{art}</span>
                      </div>
                    )}
                  </>
                )}
              </div>
              <div className="flex items-end justify-between pt-5">
                <span className="text-sm text-[#9a8075]">Total</span>
                <span className="font-display text-3xl text-[#8d4d35]">
                  ₹{selectedService.price}
                </span>
              </div>
              <p className="mt-2 text-[11px] leading-4 text-[#aa9287]">
                Final price may vary only if you request additional custom work.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <footer className="border-t border-[#eadbd2] bg-[#f8e8e2]">
        <div className="mx-auto flex max-w-[1180px] flex-col items-center justify-between gap-4 px-5 py-7 text-center sm:flex-row sm:text-left lg:px-8">
          <div>
            <p className="font-display text-2xl text-[#75402d]">Nail Bloom</p>
            <p className="mt-1 text-xs font-medium uppercase tracking-[0.18em] text-[#9f786b]">
              Studio by Sneha Deolay
            </p>
          </div>
          <a
            href="tel:+919359662347"
            className="flex items-center gap-2 text-sm font-bold text-[#75402d]"
          >
            <PhoneIcon /> 93596 62347
          </a>
        </div>
      </footer>
    </main>
  )
}
