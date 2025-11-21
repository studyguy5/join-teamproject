/**executes the most importend function at first */
document.addEventListener('DOMContentLoaded', async () => {
  init();
  sectionCheck('summary');
  toDoSummaryEventHandler();
  doneSummaryEventHandler();

  /**loads all Task, Data and Numbers, which are needed to display the summary page correct */
  const data = await getData('task');
  const entries = data ? Object.entries(data) : [];
  tasks.push(...entries);
  deliverDataToSummary(tasks);

  
  /**renders greeting of Users and current Date */
  renderUserInitials();
  updateGreetingAndDate();                 // setzt Greeting + Datum (nur wenn kein Urgent-Datum gefunden)

  /**updates the greeting and date function on certain intervall times to keep it updated */
  setInterval(updateGreetingAndDate, 60 * 1000);
});

/**set the current displayed page on active to show visually which page is opened */
function sectionCheck(idsecTrue) {
  document.getElementById(idsecTrue)?.classList.add('active');
}

const BASe_URL = "https://join-kanban-app-default-rtdb.europe-west1.firebasedatabase.app/";

async function getData(path = '') {
  const response = await fetch(BASe_URL + path + ".json");
  return await response.json();
}

/**for the redirecting to the board page after click on numbers */
function summaryToBoard() { window.location.href = '/board/board.html'; }


/**changes the img if an User hovers over that specific element */
function toDoSummaryEventHandler() {
  const box = document.querySelector('.box-upper-left');
  box?.addEventListener('mouseenter', () => box.querySelector('img')?.setAttribute('src', "../img/icons/summary-pencil-hover.svg"));
  box?.addEventListener('mouseleave', () => box.querySelector('img')?.setAttribute('src', "../img/icons/summary-pencil-default.svg"));
}

function doneSummaryEventHandler() {
  const box = document.querySelector('.box-upper-right');
  box?.addEventListener('mouseenter', () => box.querySelector('img')?.setAttribute('src', "../img/icons/summary-done-icon-hover.svg"));
  box?.addEventListener('mouseleave', () => box.querySelector('img')?.setAttribute('src', "../img/icons/summary-done-icon-default.svg"));
}

/* ---------- NEU: Helper fürs Urgent-Datum ---------- */
let hasUrgentDeadline = false;


/**sets up the format of the date, makes exeptions and gives structure */
function parseDateSmart(input) {
  if (!input || typeof input !== 'string') return null;
  const s = input.trim();

  // dd/mm/yyyy oder dd.mm.yyyy
  let m = s.match(/^(\d{1,2})[\/.](\d{1,2})[\/.](\d{4})$/);
  if (m) {
    const [_, d, mo, y] = m;
    const date = new Date(+y, +mo - 1, +d);
    return isNaN(date) ? null : date;
  }
  // yyyy-mm-dd
  m = s.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
  if (m) {
    const [_, y, mo, d] = m;
    const date = new Date(+y, +mo - 1, +d);
    return isNaN(date) ? null : date;
  }
  // Fallback: Date kann evtl. direkt parsen
  const date = new Date(s);
  return isNaN(date) ? null : date;
}

function startOfDay(d) {
  const x = new Date(d);
  x.setHours(0,0,0,0);
  return x;
}


/**searches for the next available urgent deadline date */
function findNextUrgentDeadline(taskEntries) {
  const today = startOfDay(new Date());
  const urgentDates = [];

  for (const [, t] of taskEntries) {
    if (!t || t.prio !== 'Urgent') continue;
    const due = parseDateSmart(t.DueDate);
    if (!due) continue;
    if (startOfDay(due) >= today) urgentDates.push(due);
  }

  if (!urgentDates.length) return null;
  urgentDates.sort((a,b) => a - b);
  return urgentDates[0];
}

/**puts the format into a readable one for the user */
function formatDateReadable(d, locale = 'en-US') {
  return new Intl.DateTimeFormat(locale, { month: 'long', day: 'numeric', year: 'numeric' }).format(d);
}
/* --------------------------------------------------- */


/**feeds the date from local array into summary to show the numbers correctly */
function deliverDataToSummary(tasks) {
  let todo = tasks.filter(td => td[1].category === 'Todo');
  document.getElementById('todoTask').innerHTML += todo.length;
  let done = tasks.filter(td => td[1].category === 'Done');
  document.getElementById('doneTask').innerHTML += done.length;
  let urgent = tasks.filter(td => td[1].prio === 'Urgent');
  document.getElementById('prioUrgent').innerHTML = urgent.length + `<span>Urgent</span>`;

  document.getElementById('allTaskInBoard').innerHTML = tasks.length;
  let inprogress = tasks.filter(td => td[1].category === 'Inprogress');
  document.getElementById('taskInProgress').innerHTML = inprogress.length;
  let awaitfeedback = tasks.filter(td => td[1].category === 'AwaitFeedback');
  document.getElementById('taskAwaitFeedback').innerHTML = awaitfeedback.length;

  /** New: sets the urgent date (if available) */ 
  const nextUrgent = findNextUrgentDeadline(tasks);
  if (nextUrgent) {
    setUpcomingDate(formatDateReadable(nextUrgent, 'en-US'));
    hasUrgentDeadline = true;
  } else {
    hasUrgentDeadline = false; // UpdateGreeting setzt dann heute
  }
}

/* ===================== USERNAME & INITIALEN ===================== */

/**get the stored User name and return user */
function getStoredUserName() {
  const name = localStorage.getItem('userFullName');
  if (name && name.trim()) return name.trim();
  if (sessionStorage.getItem('guest') === 'true') return 'Guest User';
  return 'User';
}

/**get the Initials from the User name */
function getInitials(fullName) {
  const name = (fullName || '').trim().toLowerCase();
  // Wenn Gast-User, immer "G"!
  if (name === 'guest user' || name === 'guest') {
    return 'G';
  }
  const parts = name.split(/\s+/).filter(Boolean);
  if (!parts.length) return 'US';
  const first = parts[0][0] || '';
  const last = parts.length > 1 ? parts[parts.length - 1][0] : (parts[0][1] || '');
  return (first + last).toUpperCase();
}


/**render the Initials from the User name */
window.renderUserInitials = function renderUserInitials() {
  const fullName = getStoredUserName();
  const initials = getInitials(fullName);
  const el = document.getElementById('userInitials');
  if (el) {
    el.textContent = initials;
    el.setAttribute('title', fullName);
    el.setAttribute('aria-label', fullName);
  }
};

/* ===================== GREETING + HEUTIGES DATUM ===================== */

/**render the greeting of the User */
function computeGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 18) return 'Good afternoon';
  return 'Good evening';
}

function formatTodayDate(locale = 'en-US') {
  const d = new Date();
  return new Intl.DateTimeFormat(locale, { month: 'long', day: 'numeric', year: 'numeric' }).format(d);
}

function setUpcomingDate(text) {
  // 1) Bevorzugte IDs
  const idTargets = [
    '#upcoming-deadline-date',
    '#upcomingDate',
    '#deadlineDate',
    '#summaryUpcomingDate'
  ];
  for (const sel of idTargets) {
    const el = document.querySelector(sel);
    if (el) { el.textContent = text; return true; }
  }
  // 2) Fallback: deine aktuelle Struktur nutzt <p class="date">…</p>
  const el1 = document.querySelector('.box-middle .date');
  if (el1) { el1.textContent = text; return true; }
  const el2 = document.querySelector('.date');
  if (el2) { el2.textContent = text; return true; }

  return false;
}

window.greetingUser = function greetingUser() {
  updateGreetingAndDate();
};


/**updates the greeting and date according to the current Time and current Date */
function updateGreetingAndDate() {
  const fullName = getStoredUserName();
  const greeting = computeGreeting();
  const today = formatTodayDate('en-US');

  const timeEl = document.getElementById('greeting-time');
  const nameEl = document.getElementById('greeting-name');
  if (timeEl) timeEl.textContent = greeting + ',';
  if (nameEl) { nameEl.textContent = fullName; nameEl.classList.remove('d-none'); }

  // Nur heutiges Datum setzen, wenn kein Urgent-Datum angezeigt wird
  if (!hasUrgentDeadline) {
    setUpcomingDate(today);
  }
}
