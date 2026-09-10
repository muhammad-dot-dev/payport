"use client";
import React from 'react'
import { useRef, useState ,useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/navigation';

/**
 * Dashboard / Profile Settings page
 * Drop this file at: app/dashboard/page.jsx  (Next.js App Router)
 *
 * Fields captured:
 *  - Name, Email, Username
 *  - Profile picture (avatar) + Cover picture (banner) — with live preview
 *  - Razorpay credentials (Key ID + Key Secret, secret masked by default)
 *
 * Wire up `handleSubmit` to your API route (e.g. POST /api/profile) —
 * it currently just logs the payload as a placeholder.
 */



export default function DashboardPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    username: "",
    razorpayKeyId: "",
    razorpayKeySecret: "",
  });

  const { data: session, status } = useSession()
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated" && !session) {
      router.push("/login")
    }
  }, [status, router])

  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [coverFile, setCoverFile] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);

  const [showSecret, setShowSecret] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [errors, setErrors] = useState({});

  const avatarInputRef = useRef(null);
  const coverInputRef = useRef(null);

  function updateField(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  }

  function handleImagePick(e, kind) {
    const file = e.target.files?.[0];
    if (!file) return;
    const previewUrl = URL.createObjectURL(file);
    if (kind === "avatar") {
      setAvatarFile(file);
      setAvatarPreview(previewUrl);
    } else {
      setCoverFile(file);
      setCoverPreview(previewUrl);
    }
    setSaved(false);
  }

  function validate() {
    const next = {};
    if (!form.name.trim()) next.name = "Enter your name.";
    if (!form.email.trim()) next.email = "Enter your email.";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = "Enter a valid email.";
    if (!form.username.trim()) next.username = "Enter a username.";
    else if (!/^[a-zA-Z0-9_]{3,20}$/.test(form.username))
      next.username = "3–20 characters: letters, numbers, underscore.";
    if (form.razorpayKeyId && !form.razorpayKeyId.startsWith("rzp_"))
      next.razorpayKeyId = "Razorpay Key IDs start with rzp_.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    setSaving(true);
    setSaved(false);

    try {
      // Build multipart payload — images plus form fields.
      const payload = new FormData();
      payload.append("name", form.name);
      payload.append("email", form.email);
      payload.append("username", form.username);
      payload.append("razorpayKeyId", form.razorpayKeyId);
      payload.append("razorpayKeySecret", form.razorpayKeySecret);
      if (avatarFile) payload.append("profilePic", avatarFile);
      if (coverFile) payload.append("coverPic", coverFile);

      // TODO: point this at your real API route.
      // const res = await fetch("/api/profile", { method: "POST", body: payload });
      // if (!res.ok) throw new Error("Save failed");

      await new Promise((resolve) => setTimeout(resolve, 900)); // placeholder delay

      setSaved(true);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="min-h-screen bg-white text-white">
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <header className="mb-8 bg-white text-black">
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Profile & payments
          </h1>
          <p className="mt-1 text-sm text-black">
            Update your public profile and connect your Razorpay account.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* ---------- Cover + Avatar ---------- */}
          <section className="overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-blue-950 to-blue-900">
            <div className="relative h-40 w-full bg-gradient-to-b from-blue-950 to-blue-900 sm:h-52">
              {coverPreview ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={coverPreview}
                  alt="Cover preview"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-sm text-blue-300">
                  No cover image yet
                </div>
              )}

              <button
                type="button"
                onClick={() => coverInputRef.current?.click()}
                className="absolute right-3 top-3 rounded-lg bg-blue-950/70 px-3 py-1.5 text-xs font-medium text-white ring-1 ring-white/20 backdrop-blur transition hover:bg-blue-950/90"
              >
                Change cover
              </button>
              <input
                ref={coverInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleImagePick(e, "cover")}
              />

              {/* Avatar overlaps the bottom edge of the cover */}
              <div className="absolute -bottom-10 left-6">
                <div className="relative h-24 w-24 overflow-hidden rounded-full border-4 border-blue-950 bg-blue-700 sm:h-28 sm:w-28">
                  {avatarPreview ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={avatarPreview}
                      alt="Profile picture preview"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-lg font-semibold text-blue-200">
                      {form.name ? form.name.slice(0, 2).toUpperCase() : "?"}
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => avatarInputRef.current?.click()}
                  className="absolute -right-1 -bottom-1 rounded-full bg-white p-1.5 text-blue-950 shadow ring-1 ring-blue-950/10 transition hover:bg-blue-100"
                  aria-label="Change profile picture"
                >
                  <PencilIcon />
                </button>
                <input
                  ref={avatarInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleImagePick(e, "avatar")}
                />
              </div>
            </div>

            {/* Spacer so content below clears the overlapping avatar */}
            <div className="h-14 sm:h-16" />
          </section>

          {/* ---------- Basic info ---------- */}
          <section className="rounded-2xl border border-white/10 bg-gradient-to-b from-blue-950 to-blue-900 p-5 sm:p-6">
            <h2 className="mb-4 text-base font-semibold">Basic information</h2>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Name" error={errors.name}>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  placeholder="Jordan Lee"
                  className={inputClass(!!errors.name)}
                />
              </Field>

              <Field label="Username" error={errors.username}>
                <div className="flex items-center rounded-lg bg-blue-950/60 ring-1 ring-white/10 focus-within:ring-white/40">
                  <span className="pl-3 text-sm text-blue-300">@</span>
                  <input
                    type="text"
                    value={form.username}
                    onChange={(e) => updateField("username", e.target.value)}
                    placeholder="jordanlee"
                    className="w-full bg-transparent px-2 py-2.5 text-sm text-white placeholder:text-blue-300/60 focus:outline-none"
                  />
                </div>
              </Field>

              <Field label="Email" error={errors.email} className="sm:col-span-2">
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  placeholder="jordan@example.com"
                  className={inputClass(!!errors.email)}
                />
              </Field>
            </div>
          </section>

          {/* ---------- Razorpay credentials ---------- */}
          <section className="rounded-2xl border border-white/10 bg-gradient-to-b from-blue-950 to-blue-900 p-5 sm:p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-base font-semibold">Razorpay credentials</h2>
              <span className="rounded-full bg-blue-800/60 px-2.5 py-1 text-xs text-blue-200 ring-1 ring-white/10">
                Kept private
              </span>
            </div>

            <div className="grid gap-4">
              <Field
                label="Key ID"
                error={errors.razorpayKeyId}
                hint="Found in Razorpay Dashboard → Settings → API Keys."
              >
                <input
                  type="text"
                  value={form.razorpayKeyId}
                  onChange={(e) => updateField("razorpayKeyId", e.target.value)}
                  placeholder="rzp_live_xxxxxxxxxxxx"
                  className={inputClass(!!errors.razorpayKeyId) + " font-mono"}
                  autoComplete="off"
                  spellCheck={false}
                />
              </Field>

              <Field label="Key Secret">
                <div className="flex items-center rounded-lg bg-blue-950/60 ring-1 ring-white/10 focus-within:ring-white/40">
                  <input
                    type={showSecret ? "text" : "password"}
                    value={form.razorpayKeySecret}
                    onChange={(e) => updateField("razorpayKeySecret", e.target.value)}
                    placeholder="••••••••••••••••"
                    className="w-full bg-transparent px-3 py-2.5 font-mono text-sm text-white placeholder:text-blue-300/60 focus:outline-none"
                    autoComplete="off"
                    spellCheck={false}
                  />
                  <button
                    type="button"
                    onClick={() => setShowSecret((v) => !v)}
                    className="px-3 text-xs font-medium text-blue-200 hover:text-white"
                  >
                    {showSecret ? "Hide" : "Show"}
                  </button>
                </div>
              </Field>
            </div>
          </section>

          {/* ---------- Actions ---------- */}
          <div className="flex items-center justify-end gap-3">
            {saved && (
              <span className="text-sm text-blue-200">Changes saved.</span>
            )}
            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-blue-800 px-5 py-2.5 text-sm font-semibold text-white transition cursor-pointer hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? "Saving…" : "Save changes"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

function Field({ label, hint, error, className = "", children }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block text-sm font-medium text-blue-100">{label}</span>
      {children}
      {hint && !error && (
        <span className="mt-1 block text-xs text-blue-300">{hint}</span>
      )}
      {error && <span className="mt-1 block text-xs text-red-300">{error}</span>}
    </label>
  );
}

function inputClass(hasError) {
  return [
    "w-full rounded-lg bg-blue-950/60 px-3 py-2.5 text-sm text-white",
    "placeholder:text-blue-300/60 ring-1 focus:outline-none focus:ring-2",
    hasError ? "ring-red-400 focus:ring-red-400" : "ring-white/10 focus:ring-white/40",
  ].join(" ");
}

function PencilIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="h-3.5 w-3.5"
    >
      <path d="M13.586 3.586a2 2 0 1 1 2.828 2.828l-8.5 8.5a2 2 0 0 1-.878.507l-3 .857a.5.5 0 0 1-.618-.618l.857-3a2 2 0 0 1 .507-.878l8.5-8.5Z" />
    </svg>
  );
}
