// import React, { useEffect, useMemo, useRef, useState } from "react";
//import Counter from "./Sidebar/counter";
import Practice from "./Sidebar/practice";
// // FoodTracker — single-file React component
// // - Uses Tailwind classes for styling (assumes Tailwind configured)
// // - Persists data to localStorage
// // - Uses an object grouped by YYYY-MM-DD (dateKey) for O(1) group access
// // - Keeps each day's entries sorted by timestamp using binary insertion (log n search + shift)
// // - Maintains a totals map for O(1) daily-calorie queries (DSA optimization)

// export default function FoodTracker() {
//   // --- Types ---
//   // Entry: { id, name, qty, calories, date (YYYY-MM-DD), time (HH:MM), ts }

//   const STORAGE_KEY = "food-tracker-v1";

//   // entriesByDate: { [dateKey]: Entry[] }
//   const [entriesByDate, setEntriesByDate] = useState(() => loadFromStorage());
//   const [totalsByDate, setTotalsByDate] = useState(() => computeTotals(loadFromStorage()));

//   // UI state
//   const [form, setForm] = useState(emptyForm());
//   const [editing, setEditing] = useState(null); // entry id that is being edited
//   const [query, setQuery] = useState("");
//   const searchRef = useRef(null);
//   const [expandedDates, setExpandedDates] = useState({});

//   // Debounce search input
//   useEffect(() => {
//     if (searchRef.current) clearTimeout(searchRef.current);
//     searchRef.current = setTimeout(() => {
//       // triggers re-render because query state already set in input handler
//     }, 250);
//     return () => clearTimeout(searchRef.current);
//   }, [query]);

//   // Persist entriesByDate to localStorage whenever it changes
//   useEffect(() => {
//     try {
//       localStorage.setItem(STORAGE_KEY, JSON.stringify(entriesByDate));
//     } catch (e) {
//       console.error("save failed", e);
//     }
//   }, [entriesByDate]);

//   // Helpers
//   function nowDateKey() {
//     return new Date().toISOString().slice(0, 10); // YYYY-MM-DD
//   }

//   function emptyForm() {
//     const today = nowDateKey();
//     const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//     return { name: "", qty: 1, calories: "", date: today, time };
//   }

//   function loadFromStorage() {
//     try {
//       const raw = localStorage.getItem(STORAGE_KEY);
//       if (!raw) return {};
//       const parsed = JSON.parse(raw);
//       // ensure arrays sorted by ts (in case older data)
//       Object.keys(parsed).forEach(k => {
//         parsed[k].sort((a, b) => a.ts - b.ts);
//       });
//       return parsed;
//     } catch (e) {
//       console.error("load failed", e);
//       return {};
//     }
//   }

//   function computeTotals(obj) {
//     const totals = {};
//     Object.keys(obj || {}).forEach(k => {
//       totals[k] = (obj[k] || []).reduce((s, e) => s + Number(e.calories || 0), 0);
//     });
//     return totals;
//   }

//   // Create a unique id — simple but fine for local usage
//   function uid() {
//     return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
//   }

//   // Binary search to find insertion index for timestamp 'ts' in sorted array arr
//   function binaryInsertIndex(arr, ts) {
//     let lo = 0, hi = arr.length;
//     while (lo < hi) {
//       const mid = (lo + hi) >> 1;
//       if (arr[mid].ts < ts) lo = mid + 1;
//       else hi = mid;
//     }
//     return lo;
//   }

//   // Add entry (maintains sorted order & O(1) totals update)
//   function addEntry({ name, qty, calories, date, time }) {
//     const ts = makeTimestamp(date, time);
//     const entry = { id: uid(), name, qty: Number(qty), calories: Number(calories || 0), date, time, ts };

//     setEntriesByDate(prev => {
//       const day = prev[date] ? [...prev[date]] : [];
//       const idx = binaryInsertIndex(day, ts);
//       day.splice(idx, 0, entry);
//       return { ...prev, [date]: day };
//     });

//     setTotalsByDate(prev => ({ ...prev, [date]: (prev[date] || 0) + entry.calories }));
//   }

//   // Edit entry (find it in its date bucket — may move date)
//   function updateEntry(id, { name, qty, calories, date, time }) {
//     setEntriesByDate(prev => {
//       // find old entry
//       const flat = flatten(prev);
//       const old = flat.find(e => e.id === id);
//       if (!old) return prev;

//       // remove old from its bucket
//       const oldDate = old.date;
//       const newDate = date;
//       const updatedPrev = { ...prev };
//       updatedPrev[oldDate] = (updatedPrev[oldDate] || []).filter(e => e.id !== id);
//       if (updatedPrev[oldDate].length === 0) delete updatedPrev[oldDate];

//       // build new entry and insert into newDate bucket
//       const ts = makeTimestamp(date, time);
//       const newEntry = { id, name, qty: Number(qty), calories: Number(calories || 0), date, time, ts };
//       const bucket = updatedPrev[newDate] ? [...updatedPrev[newDate]] : [];
//       const idx = binaryInsertIndex(bucket, ts);
//       bucket.splice(idx, 0, newEntry);
//       updatedPrev[newDate] = bucket;

//       // Update totals
//       setTotalsByDate(prevTotals => {
//         const t = { ...prevTotals };
//         t[oldDate] = (t[oldDate] || 0) - Number(old.calories || 0);
//         if (t[oldDate] <= 0) delete t[oldDate];
//         t[newDate] = (t[newDate] || 0) + Number(newEntry.calories || 0);
//         return t;
//       });

//       return updatedPrev;
//     });
//   }

//   function removeEntry(id) {
//     setEntriesByDate(prev => {
//       const flat = flatten(prev);
//       const old = flat.find(e => e.id === id);
//       if (!old) return prev;
//       const updated = { ...prev };
//       updated[old.date] = updated[old.date].filter(e => e.id !== id);
//       if (updated[old.date].length === 0) delete updated[old.date];

//       // update totals
//       setTotalsByDate(prevTotals => {
//         const t = { ...prevTotals };
//         t[old.date] = (t[old.date] || 0) - Number(old.calories || 0);
//         if (t[old.date] <= 0) delete t[old.date];
//         return t;
//       });

//       return updated;
//     });
//   }

//   // Utility: flatten to array
//   function flatten(obj) {
//     return Object.values(obj).flat();
//   }

//   function makeTimestamp(date, time) {
//     // date: YYYY-MM-DD, time: HH:MM
//     const dt = new Date(date + "T" + (time || "00:00") + ":00");
//     return dt.getTime();
//   }

//   // Filtered/Sorted date keys (descending by date)
//   const visibleDates = useMemo(() => {
//     const keys = Object.keys(entriesByDate).sort((a, b) => b.localeCompare(a));
//     if (!query) return keys;
//     const q = query.trim().toLowerCase();
//     return keys.filter(k => (entriesByDate[k] || []).some(e => e.name.toLowerCase().includes(q)));
//   }, [entriesByDate, query]);

//   // Today's total
//   const todayKey = nowDateKey();
//   const todayTotal = totalsByDate[todayKey] || 0;

//   // Export CSV
//   function exportCSV() {
//     const rows = ["date,time,name,qty,calories"];
//     const flat = flatten(entriesByDate).sort((a, b) => a.ts - b.ts);
//     flat.forEach(e => rows.push([e.date, e.time, escapeCsv(e.name), e.qty, e.calories].join(',')));
//     const csv = rows.join('\n');
//     const blob = new Blob([csv], { type: 'text/csv' });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = 'food-log.csv';
//     a.click();
//     URL.revokeObjectURL(url);
//   }

//   function escapeCsv(s) {
//     if (s == null) return '';
//     if (s.includes(',') || s.includes('\n') || s.includes('"')) return '"' + s.replace(/"/g, '""') + '"';
//     return s;
//   }

//   // --- Form submit handler ---
//   function onSubmit(e) {
//     e.preventDefault();
//     if (!form.name) return alert('Enter a food name');
//     if (editing) {
//       updateEntry(editing, form);
//       setEditing(null);
//     } else {
//       addEntry(form);
//     }
//     setForm(emptyForm());
//   }

//   function startEdit(entry) {
//     setEditing(entry.id);
//     setForm({ name: entry.name, qty: entry.qty, calories: entry.calories, date: entry.date, time: entry.time });
//   }

//   // Quick helper to push all local branches? (not relevant here) — left intentionally blank

//   return (
//     <div className="p-4 mx-auto max-w-6xl">
//       <header className="flex items-center justify-between mb-6">
//         <h1 className="text-2xl font-bold">Food Tracker — React + DSA</h1>
//         <div className="flex gap-3 items-center">
//           <div className="text-sm">Today: <strong>{todayTotal} kcal</strong></div>
//           <button onClick={exportCSV} className="px-3 py-1 rounded shadow-sm bg-slate-100">Export CSV</button>
//         </div>
//       </header>

//       <main className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <section className="md:col-span-1 p-4 rounded-lg shadow-sm bg-white">
//           <h2 className="font-semibold mb-3">Add / Edit meal</h2>
//           <form onSubmit={onSubmit} className="space-y-2">
//             <div>
//               <label className="block text-xs">Food name</label>
//               <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="w-full p-2 border rounded" />
//             </div>
//             <div className="flex gap-2">
//               <div className="flex-1">
//                 <label className="block text-xs">Qty</label>
//                 <input type="number" min="1" value={form.qty} onChange={e => setForm(f => ({ ...f, qty: e.target.value }))} className="w-full p-2 border rounded" />
//               </div>
//               <div className="flex-1">
//                 <label className="block text-xs">Calories</label>
//                 <input type="number" min="0" value={form.calories} onChange={e => setForm(f => ({ ...f, calories: e.target.value }))} className="w-full p-2 border rounded" />
//               </div>
//             </div>
//             <div className="flex gap-2">
//               <div className="flex-1">
//                 <label className="block text-xs">Date</label>
//                 <input type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} className="w-full p-2 border rounded" />
//               </div>
//               <div className="flex-1">
//                 <label className="block text-xs">Time</label>
//                 <input type="time" value={toTimeInput(form.time)} onChange={e => setForm(f => ({ ...f, time: e.target.value }))} className="w-full p-2 border rounded" />
//               </div>
//             </div>

//             <div className="flex gap-2">
//               <button type="submit" className="flex-1 px-3 py-2 bg-blue-600 text-white rounded">
//                 {editing ? 'Save changes' : 'Add meal'}
//               </button>
//               <button type="button" onClick={() => { setForm(emptyForm()); setEditing(null); }} className="px-3 py-2 border rounded">Reset</button>
//             </div>
//           </form>

//           <div className="mt-4">
//             <label className="block text-xs">Search</label>
//             <input placeholder="search food name" value={query} onChange={e => setQuery(e.target.value)} className="w-full p-2 border rounded" />
//           </div>

//         </section>

//         <section className="md:col-span-2 p-4 rounded-lg shadow-sm bg-white">
//           <h2 className="font-semibold mb-3">History</h2>

//           {visibleDates.length === 0 ? (
//             <div className="text-sm text-slate-500">No records yet.</div>
//           ) : (
//             <div className="space-y-4">
//               {visibleDates.map(dateKey => (
//                 <div key={dateKey} className="border rounded p-3">
//                   <div className="flex items-center justify-between mb-2">
//                     <div>
//                       <button onClick={() => setExpandedDates(prev => ({ ...prev, [dateKey]: !prev[dateKey] }))} className="font-medium text-left">
//                         {formatDateDisplay(dateKey)}
//                       </button>
//                       <div className="text-xs text-slate-500">Total: {totalsByDate[dateKey] || 0} kcal</div>
//                     </div>
//                     <div className="text-sm text-slate-600">{(entriesByDate[dateKey] || []).length} items</div>
//                   </div>

//                   {expandedDates[dateKey] !== false && (
//                     <div className="space-y-2">
//                       {(entriesByDate[dateKey] || []).map(entry => (
//                         <div key={entry.id} className="flex items-center justify-between p-2 border rounded">
//                           <div>
//                             <div className="font-medium">{entry.name} <span className="text-xs text-slate-500">x{entry.qty}</span></div>
//                             <div className="text-xs text-slate-500">{entry.time} • {entry.calories} kcal</div>
//                           </div>
//                           <div className="flex gap-2">
//                             <button onClick={() => startEdit(entry)} className="px-2 py-1 text-sm border rounded">Edit</button>
//                             <button onClick={() => {
//                               if (confirm('Delete this entry?')) removeEntry(entry.id);
//                             }} className="px-2 py-1 text-sm border rounded">Delete</button>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           )}
//         </section>
//       </main>

//       <footer className="mt-6 text-xs text-slate-500">Tip: entries are grouped by date (object with date keys for O(1) access), each day's list is kept sorted with binary insert to keep insert/search efficient.</footer>
//     </div>
//   );
// }

// // --- Small helpers not inside component (keeps component code focused) ---
// function formatDateDisplay(yyyyMMdd) {
//   const d = new Date(yyyyMMdd + 'T00:00:00');
//   return d.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
// }

// function toTimeInput(timeStr) {
//   // timeStr might be '8:05 AM' or '08:05' — normalize to 'HH:MM' for input
//   if (!timeStr) return '00:00';
//   if (/\d{2}:\d{2}/.test(timeStr)) return timeStr;
//   const d = new Date('1970-01-01 ' + timeStr);
//   const hh = String(d.getHours()).padStart(2, '0');
//   const mm = String(d.getMinutes()).padStart(2, '0');
//   return `${hh}:${mm}`;
// }


function App() {
  return (

  //   <div style={{ padding: 20 }}>
  //     <h1>Multiple Counters</h1>
  //     <Counter title="Apples" />
  //     <Counter title="Oranges" />
  //     <Counter title="Bananas" />
  //   </div>
  <>
  <Practice />
  
  </>
  );
}
export default App;