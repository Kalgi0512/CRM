// SettingsPage.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  UserCog,
  Key,
  Bell,
  Sun,
  Cog,
  Code,
  CreditCard,
  ShieldOff,
  List,
  X,
  Copy,
  RefreshCw,
} from "lucide-react";

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.05 } } };
const fadeUp = { hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0, transition: { duration: 0.3 } } };

function generateApiKey() {
  // simple random key — replace with secure generation on server
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  return Array.from({ length: 32 }).map(() => chars[Math.floor(Math.random() * chars.length)]).join("");
}

export default function SettingsPage() {
  const [modalType, setModalType] = useState(""); // "", "profile","security","notifications","theme","prefs","api","billing","privacy","logs"
  const [showModal, setShowModal] = useState(false);

  // Local mock states
  const [profile, setProfile] = useState({ name: "Marlon Welimaluwa", email: "you@company.com" });
  const [notifications, setNotifications] = useState({ email: true, push: false });
  const [theme, setTheme] = useState("system");
  const [prefs, setPrefs] = useState({ language: "English", timezone: "UTC+05:30", currency: "USD" });
  const [apiKey, setApiKey] = useState(generateApiKey());
  const [billing, setBilling] = useState({ plan: "Pro", nextBilling: "2025-09-01", cardLast4: "4242" });
  const [logs] = useState([
    { id: 1, when: "Aug 12, 2025 — 10:12", what: "Signed in", who: "You", ip: "198.51.100.1" },
    { id: 2, when: "Aug 10, 2025 — 08:03", what: "Changed password", who: "You", ip: "198.51.100.1" },
    { id: 3, when: "Jul 21, 2025 — 15:20", what: "API key generated", who: "You", ip: "203.0.113.45" },
  ]);

  // animation helpers
  const openModal = (type) => {
    setModalType(type);
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
    setModalType("");
  };

  // API key helpers
  const handleGenerateKey = () => setApiKey(generateApiKey());
  const handleCopyKey = async () => {
    try {
      await navigator.clipboard.writeText(apiKey);
      alert("API key copied to clipboard");
    } catch (e) {
      alert("Unable to copy. Select and copy manually.");
    }
  };

  // download mock data
  const handleDownloadData = () => {
    const data = {
      profile,
      prefs,
      notifications,
      billing,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `my-data-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  // delete account
  const handleDeleteAccount = () => {
    const ok = window.confirm("Are you sure you want to permanently delete your account? This cannot be undone.");
    if (ok) {
      // replace with real API call
      alert("Account deletion requested (mock). Redirect to goodbye page / logout.");
      // e.g. logout, clear auth, redirect...
    }
  };

  // small card definitions
  const topCards = [
    { id: "profile", title: "Profile", icon: <UserCog className="w-6 h-6 text-indigo-600" />, desc: "Edit your personal info" },
    { id: "security", title: "Security", icon: <Key className="w-6 h-6 text-amber-600" />, desc: "Password & 2FA" },
    { id: "notifications", title: "Notifications", icon: <Bell className="w-6 h-6 text-emerald-600" />, desc: "Email & push prefs" },
    { id: "theme", title: "Theme", icon: <Sun className="w-6 h-6 text-yellow-600" />, desc: "Light / dark / system" },
  ];

  const featureCards = [
    { id: "prefs", title: "Preferences", icon: <Cog className="w-6 h-6 text-slate-700" />, desc: "Language, timezone, currency" },
    { id: "api", title: "API & Integrations", icon: <Code className="w-6 h-6 text-sky-600" />, desc: "Manage API keys & webhooks" },
    { id: "billing", title: "Billing", icon: <CreditCard className="w-6 h-6 text-purple-600" />, desc: "Plan & payment history" },
    { id: "privacy", title: "Privacy", icon: <ShieldOff className="w-6 h-6 text-rose-600" />, desc: "Download or delete data" },
    { id: "logs", title: "Audit Logs", icon: <List className="w-6 h-6 text-slate-600" />, desc: "Recent activity & security" },
  ];

  return (
    <div className="p-6 md:p-8">
      <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
        {/* Header */}
        <motion.div variants={fadeUp}>
          <h1 className="text-3xl font-extrabold text-slate-900">Settings Hub</h1>
          <p className="text-slate-500 mt-1">Personalize your account, integrations, billing and privacy.</p>
        </motion.div>

        {/* Top quick cards */}
        <motion.div variants={fadeUp} className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {topCards.map((c) => (
            <motion.button
              key={c.id}
              onClick={() => openModal(c.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition flex flex-col items-center gap-2 border border-slate-100"
            >
              <div className="p-3 rounded-lg bg-gradient-to-br from-white to-slate-50">{c.icon}</div>
              <div className="text-sm font-medium text-slate-800">{c.title}</div>
              <div className="text-xs text-slate-400">{c.desc}</div>
            </motion.button>
          ))}
        </motion.div>

        {/* Feature cards row */}
        <motion.div variants={fadeUp} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {featureCards.map((c) => (
            <motion.button
              key={c.id}
              onClick={() => openModal(c.id)}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white rounded-xl p-3 shadow-sm hover:shadow-md transition flex items-center gap-3 border border-slate-100"
            >
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-slate-50 to-white flex items-center justify-center">
                {c.icon}
              </div>
              <div className="text-left">
                <div className="text-sm font-semibold text-slate-800">{c.title}</div>
                <div className="text-xs text-slate-400">{c.desc}</div>
              </div>
            </motion.button>
          ))}
        </motion.div>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.98, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.98, y: 10 }}
              className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl p-6 border border-slate-100 relative"
            >
              {/* Close X */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 p-1 rounded-full hover:bg-slate-100 transition"
                aria-label="Close"
              >
                <X className="w-5 h-5 text-slate-600" />
              </button>

              {/* MODAL CONTENT SWITCH */}
              {/* PROFILE */}
              {modalType === "profile" && (
                <>
                  <h2 className="text-xl font-semibold mb-2">Profile</h2>
                  <p className="text-sm text-slate-500 mb-4">Update your name and contact info.</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <input value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} className="border rounded-lg p-2" />
                    <input value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} className="border rounded-lg p-2" />
                  </div>

                  <div className="flex justify-end gap-2 mt-4">
                    <button onClick={closeModal} className="px-4 py-2 bg-slate-100 rounded-md">Cancel</button>
                    <button onClick={() => { alert("Profile saved (mock)"); closeModal(); }} className="px-4 py-2 bg-emerald-600 text-white rounded-md">Save</button>
                  </div>
                </>
              )}

              {/* SECURITY */}
              {modalType === "security" && (
                <>
                  <h2 className="text-xl font-semibold mb-2">Security</h2>
                  <p className="text-sm text-slate-500 mb-4">Change your password and enable 2FA.</p>

                  <div className="space-y-3">
                    <input type="password" placeholder="Current password" className="w-full border rounded-lg p-2" />
                    <input type="password" placeholder="New password" className="w-full border rounded-lg p-2" />
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium">Two-Factor Authentication</div>
                        <div className="text-xs text-slate-400">Add an extra layer of security</div>
                      </div>
                      <label className="inline-flex items-center gap-2">
                        <input type="checkbox" defaultChecked />
                        <span className="text-sm text-slate-500">Enabled</span>
                      </label>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 mt-4">
                    <button onClick={closeModal} className="px-4 py-2 bg-slate-100 rounded-md">Cancel</button>
                    <button onClick={() => { alert("Security settings saved (mock)"); closeModal(); }} className="px-4 py-2 bg-emerald-600 text-white rounded-md">Save</button>
                  </div>
                </>
              )}

              {/* NOTIFICATIONS */}
              {modalType === "notifications" && (
                <>
                  <h2 className="text-xl font-semibold mb-2">Notifications</h2>
                  <p className="text-sm text-slate-500 mb-4">Control how we send you updates.</p>

                  <div className="space-y-3">
                    <label className="flex justify-between items-center">
                      <div>
                        <div className="font-medium">Email alerts</div>
                        <div className="text-xs text-slate-400">Important updates by email</div>
                      </div>
                      <input type="checkbox" checked={notifications.email} onChange={() => setNotifications((p) => ({ ...p, email: !p.email }))} />
                    </label>

                    <label className="flex justify-between items-center">
                      <div>
                        <div className="font-medium">Push notifications</div>
                        <div className="text-xs text-slate-400">Browser & mobile push</div>
                      </div>
                      <input type="checkbox" checked={notifications.push} onChange={() => setNotifications((p) => ({ ...p, push: !p.push }))} />
                    </label>
                  </div>

                  <div className="flex justify-end gap-2 mt-4">
                    <button onClick={closeModal} className="px-4 py-2 bg-slate-100 rounded-md">Cancel</button>
                    <button onClick={() => { alert("Notification preferences saved (mock)"); closeModal(); }} className="px-4 py-2 bg-emerald-600 text-white rounded-md">Save</button>
                  </div>
                </>
              )}

              {/* THEME */}
              {modalType === "theme" && (
                <>
                  <h2 className="text-xl font-semibold mb-2">Theme</h2>
                  <p className="text-sm text-slate-500 mb-4">Choose your preferred appearance.</p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <button onClick={() => setTheme("light")} className={`p-3 rounded-lg border ${theme === "light" ? "border-emerald-500" : "border-slate-100"}`}>Light</button>
                    <button onClick={() => setTheme("dark")} className={`p-3 rounded-lg border ${theme === "dark" ? "border-emerald-500" : "border-slate-100"}`}>Dark</button>
                    <button onClick={() => setTheme("system")} className={`p-3 rounded-lg border ${theme === "system" ? "border-emerald-500" : "border-slate-100"}`}>System</button>
                  </div>

                  <div className="flex justify-end gap-2 mt-4">
                    <button onClick={closeModal} className="px-4 py-2 bg-slate-100 rounded-md">Cancel</button>
                    <button onClick={() => { alert(`Theme set to ${theme} (mock)`); closeModal(); }} className="px-4 py-2 bg-emerald-600 text-white rounded-md">Apply</button>
                  </div>
                </>
              )}

              {/* PREFERENCES */}
              {modalType === "prefs" && (
                <>
                  <h2 className="text-xl font-semibold mb-2">Preferences</h2>
                  <p className="text-sm text-slate-500 mb-4">Language, timezone and currency.</p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <select value={prefs.language} onChange={(e) => setPrefs((p) => ({ ...p, language: e.target.value }))} className="border rounded-lg p-2">
                      <option>English</option>
                      <option>Español</option>
                      <option>Français</option>
                    </select>
                    <select value={prefs.timezone} onChange={(e) => setPrefs((p) => ({ ...p, timezone: e.target.value }))} className="border rounded-lg p-2">
                      <option>UTC+05:30</option>
                      <option>UTC+00:00</option>
                      <option>UTC-07:00</option>
                    </select>
                    <select value={prefs.currency} onChange={(e) => setPrefs((p) => ({ ...p, currency: e.target.value }))} className="border rounded-lg p-2">
                      <option>USD</option>
                      <option>AED</option>
                      <option>LKR</option>
                    </select>
                  </div>

                  <div className="flex justify-end gap-2 mt-4">
                    <button onClick={closeModal} className="px-4 py-2 bg-slate-100 rounded-md">Cancel</button>
                    <button onClick={() => { alert("Preferences saved (mock)"); closeModal(); }} className="px-4 py-2 bg-emerald-600 text-white rounded-md">Save</button>
                  </div>
                </>
              )}

              {/* API & INTEGRATIONS */}
              {modalType === "api" && (
                <>
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-xl font-semibold mb-1">API & Integrations</h2>
                      <p className="text-sm text-slate-500">Manage API keys and webhooks.</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button onClick={handleGenerateKey} className="px-3 py-2 rounded-md bg-slate-100 text-slate-700 flex items-center gap-2">
                        <RefreshCw className="w-4 h-4" /> Regenerate
                      </button>
                      <button onClick={handleCopyKey} className="px-3 py-2 rounded-md bg-slate-100 text-slate-700 flex items-center gap-2">
                        <Copy className="w-4 h-4" /> Copy
                      </button>
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="text-xs text-slate-500">Your API key</label>
                    <div className="mt-2 flex items-center gap-3">
                      <code className="flex-1 bg-slate-50 p-3 rounded-lg text-xs break-all border border-slate-100">{apiKey}</code>
                    </div>

                    <div className="mt-4">
                      <label className="text-xs text-slate-500">Webhooks</label>
                      <div className="mt-2 space-y-2 text-sm">
                        <div className="flex items-center justify-between p-3 rounded-lg border border-slate-100">
                          <div>
                            <div className="font-medium">Order Hook</div>
                            <div className="text-xs text-slate-400">https://example.com/webhook/orders</div>
                          </div>
                          <div>
                            <input type="checkbox" defaultChecked />
                          </div>
                        </div>

                        <div className="flex items-center justify-between p-3 rounded-lg border border-slate-100">
                          <div>
                            <div className="font-medium">Leads Hook</div>
                            <div className="text-xs text-slate-400">https://example.com/webhook/leads</div>
                          </div>
                          <div>
                            <input type="checkbox" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* BILLING */}
              {modalType === "billing" && (
                <>
                  <h2 className="text-xl font-semibold mb-2">Billing & Subscription</h2>
                  <p className="text-sm text-slate-500 mb-4">Manage your plan, billing date and payment method.</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="p-3 rounded-lg border border-slate-100">
                      <div className="text-sm text-slate-400">Current plan</div>
                      <div className="font-medium text-slate-800">{billing.plan}</div>
                      <div className="text-xs text-slate-400">Next billing: {billing.nextBilling}</div>
                    </div>

                    <div className="p-3 rounded-lg border border-slate-100">
                      <div className="text-sm text-slate-400">Payment method</div>
                      <div className="font-medium text-slate-800">•••• •••• •••• {billing.cardLast4}</div>
                      <div className="text-xs text-slate-400">Update card via Billing Portal (mock)</div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 mt-4">
                    <button onClick={closeModal} className="px-4 py-2 bg-slate-100 rounded-md">Cancel</button>
                    <button onClick={() => { alert("Open billing portal (mock)"); closeModal(); }} className="px-4 py-2 bg-indigo-600 text-white rounded-md">Open Billing</button>
                  </div>
                </>
              )}

              {/* PRIVACY */}
              {modalType === "privacy" && (
                <>
                  <h2 className="text-xl font-semibold mb-2">Data & Privacy</h2>
                  <p className="text-sm text-slate-500 mb-4">Download your data or request deletion.</p>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-lg border border-slate-100">
                      <div>
                        <div className="font-medium">Download your data</div>
                        <div className="text-xs text-slate-400">Get a copy of your account data (JSON)</div>
                      </div>
                      <button onClick={handleDownloadData} className="px-3 py-2 rounded-md bg-slate-100">Download</button>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-lg border border-rose-50 bg-rose-50/30">
                      <div>
                        <div className="font-medium text-rose-700">Delete account</div>
                        <div className="text-xs text-rose-600">Permanent removal (GDPR)</div>
                      </div>
                      <button onClick={handleDeleteAccount} className="px-3 py-2 rounded-md bg-rose-600 text-white">Delete</button>
                    </div>
                  </div>
                </>
              )}

              {/* AUDIT LOGS */}
              {modalType === "logs" && (
                <>
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-xl font-semibold mb-1">Audit Logs</h2>
                      <p className="text-sm text-slate-500">Recent account activity for security and monitoring.</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => alert("Export logs (mock)")} className="px-3 py-2 rounded-md bg-slate-100">Export</button>
                    </div>
                  </div>

                  <div className="mt-4 space-y-2 max-h-64 overflow-auto pr-2">
                    {logs.map((l) => (
                      <div key={l.id} className="p-3 rounded-lg border border-slate-100 bg-white">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-slate-800">{l.what}</div>
                            <div className="text-xs text-slate-400">{l.when} • {l.who}</div>
                          </div>
                          <div className="text-xs text-slate-400">{l.ip}</div>
                        </div>
                      </div>
                    ))}
                    {logs.length === 0 && <div className="text-sm text-slate-400">No logs available</div>}
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
