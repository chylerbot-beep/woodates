const { createClient } = supabase;
const _supabase = createClient(
    'https://ilytehukqrkwpupdpkgo.supabase.co',
    'sb_publishable_tNMpLdZaqm0e-El_LP4kKg_fhfj-ARF'
);

// ── ESCAPE ────────────────────────────────────────────────────
function esc(s) {
    return String(s ?? '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
}

// ── TOAST ─────────────────────────────────────────────────────
function showToast(msg, type = 'error') {
    const t = document.getElementById('_app_toast');
    const cols = { error: ['#FEE2E2','#991B1B'], success: ['#D1FAE5','#065F46'], info: ['#EBF3FB','#1D4ED8'] };
    const [bg, color] = cols[type] || cols.error;
    t.style.background = bg; t.style.color = color;
    t.textContent = msg; t.style.opacity = '1';
    clearTimeout(t._hide); t._hide = setTimeout(() => { t.style.opacity = '0'; }, 4000);
}

// ── STATE ─────────────────────────────────────────────────────
let _currentUser = null;
let _isAdmin = false;
let _teamMembers = []; // [{id, name, role, color, visible}]
let _events = [];
let _currentView = 'week'; // agenda | day | 3day | week | month
let _viewDate = new Date(); // anchor date
let _editingEventId = null;
let _editingIsLeave = false;
let _visibleMembers = new Set();
let _miniCalDate = new Date();

// Designer color palette
const DESIGNER_COLORS = ['#C4956A','#7B9E87','#8B7DB5','#D4896A','#5E9EC4','#C47A8B','#6B8FB5','#9E7B6B'];

// ── SINGAPORE PUBLIC HOLIDAYS ─────────────────────────────────
// Source: MOM Singapore official public holidays
const SG_PUBLIC_HOLIDAYS = {
    // 2025
    '2025-01-01': "New Year's Day",
    '2025-01-29': 'Chinese New Year',
    '2025-01-30': 'Chinese New Year',
    '2025-03-31': 'Hari Raya Puasa',
    '2025-04-18': 'Good Friday',
    '2025-05-01': 'Labour Day',
    '2025-05-12': 'Vesak Day',
    '2025-06-06': 'Hari Raya Haji',
    '2025-08-09': 'National Day',
    '2025-10-20': 'Deepavali',
    '2025-12-25': 'Christmas Day',
    // 2026
    '2026-01-01': "New Year's Day",
    '2026-02-17': 'Chinese New Year',
    '2026-02-18': 'Chinese New Year',
    '2026-03-20': 'Hari Raya Puasa',
    '2026-04-03': 'Good Friday',
    '2026-05-01': 'Labour Day',
    '2026-05-31': 'Vesak Day',
    '2026-05-27': 'Hari Raya Haji',
    '2026-08-10': 'National Day',
    '2026-11-09': 'Deepavali',
    '2026-12-25': 'Christmas Day',
    // 2027
    '2027-01-01': "New Year's Day",
    '2027-02-06': 'Chinese New Year',
    '2027-02-07': 'Chinese New Year',
    '2027-03-10': 'Hari Raya Puasa',
    '2027-03-26': 'Good Friday',
    '2027-05-01': 'Labour Day',
    '2027-05-20': 'Vesak Day',
    '2027-05-17': 'Hari Raya Haji',
    '2027-08-09': 'National Day',
    '2027-10-29': 'Deepavali',
    '2027-12-25': 'Christmas Day',
};

function isSgHoliday(dateStr) { return SG_PUBLIC_HOLIDAYS[dateStr] || null; }
function isSunday(date) { return date.getDay() === 0; }

// ── INIT ──────────────────────────────────────────────────────
async function init() {
    try {
        const { data: { session } } = await _supabase.auth.getSession();
        if (!session) { window.location.href = 'index.html'; return; }

        _currentUser = session.user;

        // Get role
        const { data: profile, error: profileErr } = await _supabase
            .from('profiles')
            .select('role, full_name')
            .eq('id', _currentUser.id)
            .single();

        if (profileErr) throw profileErr;

        _isAdmin = profile?.role === 'admin';
        document.getElementById('userDisplay') && (document.getElementById('userDisplay').textContent = profile?.full_name || _currentUser.email);

        await loadTeam();
        setupUI();

        // Default to agenda on mobile
        if (window.innerWidth <= 768) {
            _currentView = 'agenda';
            document.querySelectorAll('.view-btn').forEach(b => b.classList.toggle('active', b.dataset.view === 'agenda'));
        }

        renderMiniCal();
        await loadEvents();
        renderCalendar();
    } catch (err) {
        showToast('Failed to initialise. Please refresh the page.');
    }
}

// ── LOAD TEAM ─────────────────────────────────────────────────
async function loadTeam() {
    try {
        const { data: profiles, error } = await _supabase
            .from('profiles')
            .select('id, full_name, role')
            .order('full_name');

        if (profiles && profiles.length > 0) {
            _teamMembers = profiles.map((p, i) => ({
                id: p.id,
                name: p.full_name || 'Unknown',
                role: p.role === 'admin' ? 'Admin' : 'Interior Designer',
                color: DESIGNER_COLORS[i % DESIGNER_COLORS.length],
                visible: true,
            }));
        } else {
            // Fallback: just show current user
            _teamMembers = [{
                id: _currentUser.id,
                name: document.getElementById('userDisplay').textContent,
                role: _isAdmin ? 'Admin' : 'Interior Designer',
                color: DESIGNER_COLORS[0],
                visible: true,
            }];
        }

        _visibleMembers = new Set(_teamMembers.map(m => m.id));

        // Designers only ever see their own schedule — hide the team toggle sidebar
        if (!_isAdmin) {
            _visibleMembers = new Set([_currentUser.id]);
            document.getElementById('teamSection').style.display = 'none';
        }

        renderTeamList();
    } catch (err) {
        showToast('Failed to load team members.');
        _teamMembers = [{ id: _currentUser.id, name: 'Me', role: 'Interior Designer', color: DESIGNER_COLORS[0], visible: true }];
        _visibleMembers = new Set([_currentUser.id]);
    }
}

function renderTeamList() {
    const list = document.getElementById('teamList');
    list.innerHTML = _teamMembers.map(m => `
        <div class="team-member-item ${_visibleMembers.has(m.id) ? 'active' : ''}" data-id="${esc(m.id)}" data-action="toggleMember" data-id="${esc(m.id)}">
            <div class="team-avatar" style="background:${m.color}">${initials(m.name)}</div>
            <div class="team-member-info">
                <div class="team-member-name">${esc(m.name)}</div>
                <div class="team-member-role">${esc(m.role)}</div>
            </div>
            <div class="team-toggle ${_visibleMembers.has(m.id) ? 'checked' : ''}"></div>
        </div>
    `).join('');
}

function initials(name) {
    return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
}

function toggleMember(id) {
    if (_visibleMembers.has(id)) _visibleMembers.delete(id);
    else _visibleMembers.add(id);
    renderTeamList();
    renderCalendar();
}

// ── LOAD EVENTS ───────────────────────────────────────────────
async function loadEvents() {
    try {
        const { data, error } = await _supabase
            .from('appointments')
            .select('*')
            .order('start_time', { ascending: true });

        if (error) {
            // Table may not exist yet - use empty array
            _events = [];
            return;
        }
        _events = data || [];
    } catch (err) {
        _events = [];
        showToast('Failed to load appointments.');
    }
}

// ── SETUP UI ──────────────────────────────────────────────────
function setupUI() {
    // Mobile sidebar
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    document.getElementById('mobileMenuBtn').addEventListener('click', () => {
        sidebar.classList.toggle('open');
        overlay.classList.toggle('open');
    });
    overlay.addEventListener('click', () => {
        sidebar.classList.remove('open');
        overlay.classList.remove('open');
    });

    // Mobile FAB
    document.getElementById('mobileFab').addEventListener('click', () => openNewModal());

    // View buttons
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            _currentView = btn.dataset.view;
            renderCalendar();
        });
    });

    // Navigation
    document.getElementById('todayBtn').addEventListener('click', () => {
        _viewDate = new Date();
        renderMiniCal();
        renderCalendar();
    });
    document.getElementById('prevBtn').addEventListener('click', () => navigate(-1));
    document.getElementById('nextBtn').addEventListener('click', () => navigate(1));

    // Modal controls
    document.getElementById('addApptBtn').addEventListener('click', () => openNewModal());
    document.getElementById('apptModalClose').addEventListener('click', closeApptModal);
    document.getElementById('apptCancelBtn').addEventListener('click', closeApptModal);
    document.getElementById('leaveCancelBtn').addEventListener('click', closeApptModal);
    document.getElementById('apptModal').addEventListener('click', e => { if (e.target === document.getElementById('apptModal')) closeApptModal(); });
    document.getElementById('apptSaveBtn').addEventListener('click', saveAppointment);
    document.getElementById('leaveSaveBtn').addEventListener('click', saveLeave);
    document.getElementById('apptDeleteBtn').addEventListener('click', deleteEditingEvent);
    document.getElementById('leaveDeleteBtn').addEventListener('click', deleteEditingEvent);

    document.getElementById('detailModalClose').addEventListener('click', () => closeModal('eventDetailModal'));
    document.getElementById('eventDetailModal').addEventListener('click', e => { if (e.target === document.getElementById('eventDetailModal')) closeModal('eventDetailModal'); });
}

function navigate(dir) {
    if (_currentView === 'day') {
        _viewDate = addDays(_viewDate, dir);
    } else if (_currentView === '3day') {
        _viewDate = addDays(_viewDate, dir * 3);
    } else if (_currentView === 'agenda') {
        _viewDate = addDays(_viewDate, dir * 7);
    } else if (_currentView === 'week') {
        _viewDate = addDays(_viewDate, dir * 7);
    } else {
        _viewDate = new Date(_viewDate.getFullYear(), _viewDate.getMonth() + dir, 1);
    }
    _miniCalDate = new Date(_viewDate);
    renderMiniCal();
    renderCalendar();
}

// ── MINI CAL ──────────────────────────────────────────────────
function renderMiniCal() {
    const cal = document.getElementById('miniCal');
    const year = _miniCalDate.getFullYear();
    const month = _miniCalDate.getMonth();
    const today = new Date();
    const selectedDay = _viewDate;

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    let startDow = firstDay.getDay(); // 0=Sun

    const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    const dayNames = ['S','M','T','W','T','F','S'];

    let cells = '';
    // Previous month fill
    for (let i = 0; i < startDow; i++) {
        const d = new Date(year, month, -startDow + i + 1);
        cells += `<div class="mini-cal-cell other-month">${d.getDate()}</div>`;
    }
    // Current month
    for (let d = 1; d <= lastDay.getDate(); d++) {
        const date = new Date(year, month, d);
        const isToday = sameDay(date, today);
        const isSel = sameDay(date, selectedDay);
        const isSun = isSunday(date);
        const dateStr = toDateStr(date);
        const holiday = isSgHoliday(dateStr);
        const cls = [isToday && !isSel ? 'today' : '', isSel ? 'selected' : '', isSun && !isToday && !isSel ? 'is-sunday' : '', holiday && !isToday && !isSel ? 'is-holiday' : ''].filter(Boolean).join(' ');
        const title = holiday ? ` title="${holiday}"` : '';
        cells += `<div class="mini-cal-cell ${cls}"${title} data-action="miniCalClick" data-date="${dateStr}">${d}</div>`;
    }
    // Fill rest
    const total = startDow + lastDay.getDate();
    const remainder = total % 7 === 0 ? 0 : 7 - (total % 7);
    for (let i = 1; i <= remainder; i++) {
        cells += `<div class="mini-cal-cell other-month">${i}</div>`;
    }

    cal.innerHTML = `
        <div class="mini-cal-header">
            <button class="mini-cal-nav" data-action="miniCalNav" data-dir="-1">&#8249;</button>
            <span class="mini-cal-title">${monthNames[month]} ${year}</span>
            <button class="mini-cal-nav" data-action="miniCalNav" data-dir="1">&#8250;</button>
        </div>
        <div class="mini-cal-grid">
            ${dayNames.map(d => `<div class="mini-cal-day-label">${d}</div>`).join('')}
            ${cells}
        </div>
    `;
}

function miniCalNav(dir) {
    _miniCalDate = new Date(_miniCalDate.getFullYear(), _miniCalDate.getMonth() + dir, 1);
    renderMiniCal();
}

function miniCalClick(dateStr) {
    _viewDate = new Date(dateStr + 'T12:00:00');
    _miniCalDate = new Date(_viewDate);
    renderMiniCal();
    renderCalendar();
}

// ── RENDER CALENDAR ───────────────────────────────────────────
function renderCalendar() {
    const area = document.getElementById('calendarArea');
    updateCalTitle();

    if (_currentView === 'week') renderWeek(area);
    else if (_currentView === 'day') renderDay(area);
    else if (_currentView === '3day') render3Day(area);
    else if (_currentView === 'agenda') renderAgenda(area);
    else renderMonth(area);
}

function updateCalTitle() {
    const title = document.getElementById('calTitle');
    const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    const dayNames = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

    if (_currentView === 'day') {
        title.textContent = `${dayNames[_viewDate.getDay()]}, ${monthNames[_viewDate.getMonth()]} ${_viewDate.getDate()}, ${_viewDate.getFullYear()}`;
    } else if (_currentView === '3day') {
        const end3 = addDays(_viewDate, 2);
        title.textContent = `${monthNames[_viewDate.getMonth()]} ${_viewDate.getDate()} – ${end3.getDate()}, ${_viewDate.getFullYear()}`;
    } else if (_currentView === 'agenda') {
        title.textContent = `${monthNames[_viewDate.getMonth()]} ${_viewDate.getFullYear()}`;
    } else if (_currentView === 'week') {
        const wstart = weekStart(_viewDate);
        const wend = addDays(wstart, 6);
        if (wstart.getMonth() === wend.getMonth()) {
            title.textContent = `${monthNames[wstart.getMonth()]} ${wstart.getDate()} – ${wend.getDate()}, ${wend.getFullYear()}`;
        } else {
            title.textContent = `${monthNames[wstart.getMonth()]} ${wstart.getDate()} – ${monthNames[wend.getMonth()]} ${wend.getDate()}, ${wend.getFullYear()}`;
        }
    } else {
        title.textContent = `${monthNames[_viewDate.getMonth()]} ${_viewDate.getFullYear()}`;
    }
}

// ── WEEK VIEW ─────────────────────────────────────────────────
function renderWeek(area) {
    const wstart = weekStart(_viewDate);
    const days = Array.from({length:7}, (_, i) => addDays(wstart, i));
    const today = new Date();
    const hours = Array.from({length:24}, (_, i) => i);

    const dayHeaders = days.map((d, i) => {
        const isToday = sameDay(d, today);
        const isSun = isSunday(d);
        const dateStr = toDateStr(d);
        const holiday = isSgHoliday(dateStr);
        const names = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
        const cls = [isToday ? 'is-today' : '', isSun ? 'is-sunday' : '', holiday ? 'is-holiday' : ''].filter(Boolean).join(' ');
        return `
            <div class="week-header-day ${cls}" data-date="${dateStr}">
                <div class="week-header-day-label">${names[d.getDay()]}</div>
                <div class="week-header-day-num">${d.getDate()}</div>
                ${holiday ? `<span class="holiday-badge" title="${holiday}">${holiday}</span>` : ''}
            </div>
        `;
    }).join('');

    const timeSlots = hours.map(h => {
        const label = h === 0 ? '' : (h < 12 ? `${h} AM` : h === 12 ? '12 PM' : `${h-12} PM`);
        return `<div class="time-slot-label">${label}</div>`;
    }).join('');

    const dayCols = days.map((d, di) => {
        const dateStr = toDateStr(d);
        const isSun = isSunday(d);
        const holiday = isSgHoliday(dateStr);
        const dayEvents = getVisibleEventsForDate(dateStr);
        const hourRows = hours.map(h => `<div class="hour-row" data-date="${dateStr}" data-hour="${h}" data-action="handleCellClick" data-date="${dateStr}" data-hour="${h}"></div>`).join('');
        const eventBlocks = dayEvents.map(ev => renderEventBlock(ev)).join('');
        const cls = [isSun ? 'is-sunday' : '', holiday ? 'is-holiday' : ''].filter(Boolean).join(' ');
        return `
            <div class="day-col ${cls}" data-date="${dateStr}">
                ${hourRows}
                ${eventBlocks}
            </div>
        `;
    }).join('');

    // Current time line
    const nowLine = sameDay(today, _viewDate) || days.some(d => sameDay(d, today))
        ? renderCurrentTimeLine(days, today) : '';

    area.innerHTML = `
        <div class="week-grid">
            <div class="week-header-row">
                <div class="week-header-time"></div>
                ${dayHeaders}
            </div>
            <div class="week-body" id="weekBody">
                <div class="time-col">${timeSlots}</div>
                ${dayCols}
                ${nowLine}
            </div>
        </div>
    `;

    scrollToWorkingHours(area);
}

function renderCurrentTimeLine(days, today) {
    const dayIndex = days.findIndex(d => sameDay(d, today));
    if (dayIndex === -1) return '';
    const now = new Date();
    const pct = (now.getHours() * 60 + now.getMinutes()) / (24 * 60) * 100;
    // position inside weekBody: 60px time col + dayIndex * col width
    return `<div class="current-time-line" style="top:${pct}%;"></div>`;
}

// ── DAY VIEW ──────────────────────────────────────────────────
function renderDay(area) {
    const today = new Date();
    const dateStr = toDateStr(_viewDate);
    const hours = Array.from({length:24}, (_, i) => i);
    const dayEvents = getVisibleEventsForDate(dateStr);

    const timeSlots = hours.map(h => {
        const label = h === 0 ? '' : (h < 12 ? `${h} AM` : h === 12 ? '12 PM' : `${h-12} PM`);
        return `<div class="time-slot-label">${label}</div>`;
    }).join('');

    const hourRows = hours.map(h => `<div class="hour-row" data-date="${dateStr}" data-hour="${h}" data-action="handleCellClick" data-date="${dateStr}" data-hour="${h}"></div>`).join('');
    const eventBlocks = dayEvents.map(ev => renderEventBlock(ev)).join('');

    area.innerHTML = `
        <div class="week-grid">
            <div class="week-body" style="grid-template-columns:60px 1fr;">
                <div class="time-col">${timeSlots}</div>
                <div class="day-col" data-date="${dateStr}" style="position:relative;">
                    ${hourRows}
                    ${eventBlocks}
                    ${sameDay(_viewDate, today) ? `<div class="current-time-line"></div>` : ''}
                </div>
            </div>
        </div>
    `;

    if (sameDay(_viewDate, today)) {
        const pct = (today.getHours() * 60 + today.getMinutes()) / (24 * 60) * 100;
        area.querySelector('.current-time-line').style.top = pct + '%';
    }

    scrollToWorkingHours(area);
}

// ── 3-DAY VIEW ────────────────────────────────────────────────
function render3Day(area) {
    const today = new Date();
    const days = Array.from({length:3}, (_, i) => addDays(_viewDate, i));
    const hours = Array.from({length:24}, (_, i) => i);
    const names = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

    const dayHeaders = days.map(d => {
        const isToday = sameDay(d, today);
        const isSun = isSunday(d);
        const dateStr = toDateStr(d);
        const holiday = isSgHoliday(dateStr);
        const cls = [isToday ? 'is-today' : '', isSun ? 'is-sunday' : '', holiday ? 'is-holiday' : ''].filter(Boolean).join(' ');
        return `<div class="week-header-day ${cls}" data-date="${dateStr}">
            <div class="week-header-day-label">${names[d.getDay()]}</div>
            <div class="week-header-day-num">${d.getDate()}</div>
            ${holiday ? `<span class="holiday-badge">${holiday}</span>` : ''}
        </div>`;
    }).join('');

    const timeSlots = hours.map(h => {
        const label = h === 0 ? '' : (h < 12 ? `${h} AM` : h === 12 ? '12 PM' : `${h-12} PM`);
        return `<div class="time-slot-label">${label}</div>`;
    }).join('');

    const dayCols = days.map(d => {
        const dateStr = toDateStr(d);
        const isSun = isSunday(d);
        const holiday = isSgHoliday(dateStr);
        const cls = [isSun ? 'is-sunday' : '', holiday ? 'is-holiday' : ''].filter(Boolean).join(' ');
        const dayEvents = getVisibleEventsForDate(dateStr);
        const hourRows = hours.map(h => `<div class="hour-row" data-date="${dateStr}" data-hour="${h}" data-action="handleCellClick" data-date="${dateStr}" data-hour="${h}"></div>`).join('');
        const eventBlocks = dayEvents.map(ev => renderEventBlock(ev)).join('');
        return `<div class="day-col ${cls}" data-date="${dateStr}">${hourRows}${eventBlocks}</div>`;
    }).join('');

    area.innerHTML = `
        <div class="week-grid">
            <div class="week-header-row" style="grid-template-columns:60px repeat(3,1fr);">
                <div class="week-header-time"></div>${dayHeaders}
            </div>
            <div class="week-body" style="grid-template-columns:60px repeat(3,1fr);" id="weekBody">
                <div class="time-col">${timeSlots}</div>${dayCols}
            </div>
        </div>`;
    scrollToWorkingHours(area);
}

// ── AGENDA VIEW ───────────────────────────────────────────────
function renderAgenda(area) {
    const today = new Date();
    const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const dayNames = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    const days = Array.from({length:30}, (_, i) => addDays(_viewDate, i));

    const groups = days.map(d => {
        const dateStr = toDateStr(d);
        const evs = getVisibleEventsForDate(dateStr);
        const isToday = sameDay(d, today);
        const isSun = isSunday(d);
        const holiday = isSgHoliday(dateStr);
        const headerCls = [isToday ? 'is-today' : '', isSun ? 'is-sunday' : '', holiday ? 'is-holiday' : ''].filter(Boolean).join(' ');

        const evRows = evs.map(ev => {
            const m = getMember(ev.assignee_id);
            const color = m?.color || '#C4956A';
            const isLeave = ev.event_type === 'leave';
            const timeLabel = isLeave && ev.start_time === '00:00' ? '🌴 All day'
                : formatTime(ev.start_time) + ' – ' + formatTime(ev.end_time);
            const sub = [m?.name, ev.client_name, ev.location].filter(Boolean).join(' · ');
            return `<div class="agenda-event-row" data-action="showEventDetail" data-id="${esc(ev.id)}">
                <div class="agenda-event-time">${esc(timeLabel)}</div>
                <div class="agenda-event-color-bar" style="background:${color};${isLeave?'border:1.5px dashed '+color+';background:'+color+'30;':''}"></div>
                <div class="agenda-event-info">
                    <div class="agenda-event-title">${esc(ev.title)}</div>
                    ${sub ? `<div class="agenda-event-sub">${esc(sub)}</div>` : ''}
                </div>
            </div>`;
        }).join('');

        const holidayTag = holiday ? `<div class="agenda-holiday-tag">🇸🇬 ${holiday}</div>` : '';

        return `<div class="agenda-day-group">
            <div class="agenda-day-header ${headerCls}" data-action="openNewModal" data-date="${dateStr}">
                <div class="agenda-day-num">${d.getDate()}</div>
                <div class="agenda-day-info">
                    <div class="agenda-day-name">${dayNames[d.getDay()]}</div>
                    <div class="agenda-day-month">${monthNames[d.getMonth()]} ${d.getFullYear()}</div>
                </div>
            </div>
            <div class="agenda-events">
                ${holidayTag}
                ${evRows || '<div class="agenda-empty-day">No appointments</div>'}
            </div>
        </div>`;
    }).join('');

    area.innerHTML = `<div class="agenda-view">${groups}</div>`;
    setTimeout(() => {
        const todayEl = area.querySelector('.agenda-day-header.is-today');
        if (todayEl) todayEl.scrollIntoView({ block: 'start', behavior: 'smooth' });
    }, 50);
}

// ── MONTH VIEW ────────────────────────────────────────────────
function renderMonth(area) {
    const year = _viewDate.getFullYear();
    const month = _viewDate.getMonth();
    const today = new Date();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDow = firstDay.getDay();
    const dayNames = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

    let cells = '';
    for (let i = 0; i < startDow; i++) {
        const d = new Date(year, month, -startDow + i + 1);
        cells += renderMonthCell(d, true, today);
    }
    for (let d = 1; d <= lastDay.getDate(); d++) {
        cells += renderMonthCell(new Date(year, month, d), false, today);
    }
    const total = startDow + lastDay.getDate();
    const remainder = total % 7 === 0 ? 0 : 7 - (total % 7);
    for (let i = 1; i <= remainder; i++) {
        cells += renderMonthCell(new Date(year, month + 1, i), true, today);
    }

    area.innerHTML = `
        <div class="month-grid">
            <div class="month-header-row">
                ${dayNames.map(d => `<div class="month-day-label">${d}</div>`).join('')}
            </div>
            <div class="month-body">${cells}</div>
        </div>
    `;
}

function renderMonthCell(date, otherMonth, today) {
    const dateStr = toDateStr(date);
    const isToday = sameDay(date, today);
    const isSun = isSunday(date);
    const holiday = isSgHoliday(dateStr);
    const evs = getVisibleEventsForDate(dateStr);
    const maxShow = 3;
    const pills = evs.slice(0, maxShow).map(ev => {
        const m = getMember(ev.assignee_id);
        return `<span class="month-event-pill" style="background:${m?.color||'#C4956A'}22;color:${m?.color||'#C4956A'};" data-action="showEventDetail" data-id="${esc(ev.id)}">${esc(ev.title)}</span>`;
    }).join('');
    const more = evs.length > maxShow ? `<div class="month-more">+${evs.length - maxShow} more</div>` : '';
    const cls = [otherMonth ? 'other-month' : '', isToday ? 'today' : '', isSun ? 'is-sunday' : '', holiday ? 'is-holiday' : ''].filter(Boolean).join(' ');
    return `
        <div class="month-cell ${cls}" data-action="handleMonthCellClick" data-date="${dateStr}">
            <div class="month-cell-num">${date.getDate()}</div>
            ${holiday ? `<span class="month-holiday-label">🇸🇬 ${holiday}</span>` : ''}
            ${pills}
            ${more}
        </div>
    `;
}

function handleMonthCellClick(dateStr) {
    _viewDate = new Date(dateStr + 'T12:00:00');
    _currentView = window.innerWidth <= 768 ? 'agenda' : 'day';
    document.querySelectorAll('.view-btn').forEach(b => b.classList.toggle('active', b.dataset.view === _currentView));
    renderCalendar();
}

// ── EVENT RENDERING ───────────────────────────────────────────
function renderEventBlock(ev) {
    const m = getMember(ev.assignee_id);
    const color = m?.color || '#C4956A';
    const isLeave = ev.event_type === 'leave';

    let top, height;
    if (isLeave && ev.start_time === '00:00') {
        // All-day leave — span full column as a banner at top
        top = 0; height = 100;
    } else {
        const [startH, startM] = (ev.start_time || '00:00').split(':').map(Number);
        const [endH, endM] = (ev.end_time || '23:59').split(':').map(Number);
        top = (startH * 60 + startM) / (24 * 60) * 100;
        height = Math.max(((endH * 60 + endM) - (startH * 60 + startM)) / (24 * 60) * 100, 2);
    }

    const timeLabel = isLeave && ev.start_time === '00:00'
        ? '🌴 All day'
        : formatTime(ev.start_time) + ' – ' + formatTime(ev.end_time);

    const leaveStyle = isLeave
        ? `border-style:dashed;border-width:1.5px;border-color:${color};background:${color}15;`
        : `border-left:3px solid ${color};background:${color}22;`;

    return `
        <button class="event-block${isLeave ? ' is-leave' : ''}"
            style="top:${top}%;height:${height}%;${leaveStyle}color:${color};"
            data-action="showEventDetail" data-id="${esc(ev.id)}">
            <span class="event-time-label">${esc(timeLabel)}</span>
            <span class="event-title-label">${esc(ev.title)}</span>
            ${!isLeave && ev.client_name ? `<span class="event-client-label">${esc(ev.client_name)}</span>` : ''}
        </button>
    `;
}

function getVisibleEventsForDate(dateStr) {
    return _events.filter(ev => {
        if (!_visibleMembers.has(ev.assignee_id)) return false;
        if (ev.date === dateStr) return true;
        // Multi-day leave spans: include if dateStr falls between date and leave_end_date
        if (ev.event_type === 'leave' && ev.leave_end_date && ev.leave_end_date > ev.date) {
            return dateStr >= ev.date && dateStr <= ev.leave_end_date;
        }
        return false;
    });
}

function getMember(id) {
    return _teamMembers.find(m => m.id === id);
}

// ── SCROLL ────────────────────────────────────────────────────
function scrollToWorkingHours(area) {
    setTimeout(() => {
        const scrollTo = (8 / 24) * area.querySelector('.week-body, .day-col')?.scrollHeight || 0;
        area.scrollTop = scrollTo;
    }, 50);
}

// ── CELL CLICK (create appt) ──────────────────────────────────
function handleCellClick(e, dateStr, hour) {
    // Both admins and designers can create appointments (designers default to themselves)
    const startH = String(hour).padStart(2,'0');
    const endH = String(Math.min(hour + 1, 23)).padStart(2,'0');
    openApptModal(null, dateStr, `${startH}:00`, `${endH}:00`);
}
// ── SHOW EVENT DETAIL ─────────────────────────────────────────
function showEventDetail(id) {
    const ev = _events.find(e => e.id === id);
    if (!ev) return;
    const m = getMember(ev.assignee_id);
    const color = m?.color || '#C4956A';

    document.getElementById('detailColorBar').style.background = color;
    document.getElementById('detailTitle').textContent = ev.title;
    document.getElementById('detailDesigner').textContent = m?.name || 'Unassigned';

    // Date/time display — leaves show date range, appointments show time
    if (ev.event_type === 'leave') {
        const startFmt = formatDateLong(ev.date);
        const endFmt = ev.leave_end_date && ev.leave_end_date !== ev.date ? ' → ' + formatDateLong(ev.leave_end_date) : '';
        const timeFmt = (ev.start_time && ev.start_time !== '00:00') ? '  ·  ' + formatTime(ev.start_time) + ' – ' + formatTime(ev.end_time) : '';
        document.getElementById('detailDateTime').textContent = startFmt + endFmt + timeFmt;
    } else {
        document.getElementById('detailDateTime').textContent = formatDateLong(ev.date) + '  ·  ' + formatTime(ev.start_time) + ' – ' + formatTime(ev.end_time);
    }

    const clientRow = document.getElementById('detailClientRow');
    if (ev.client_name) { document.getElementById('detailClient').textContent = ev.client_name; clientRow.style.display = 'flex'; }
    else clientRow.style.display = 'none';

    const locRow = document.getElementById('detailLocationRow');
    if (ev.location) { document.getElementById('detailLocation').textContent = ev.location; locRow.style.display = 'flex'; }
    else locRow.style.display = 'none';

    const statusEl = document.getElementById('detailStatus');
    const statusChipClass = { confirmed: 'chip-confirmed', pending: 'chip-pending', cancelled: 'chip-cancelled' }[ev.status] || 'chip-confirmed';
    statusEl.innerHTML = `<span class="status-chip ${statusChipClass}">${esc(ev.status || 'confirmed')}</span>`;

    const notesRow = document.getElementById('detailNotesRow');
    if (ev.notes) { notesRow.textContent = ev.notes; notesRow.style.display = 'block'; }
    else notesRow.style.display = 'none';

    const actions = document.getElementById('detailActions');
    const canEdit = _isAdmin || ev.assignee_id === _currentUser.id;
    if (canEdit) {
        actions.style.display = 'flex';
        document.getElementById('detailEditBtn').onclick = () => { closeModal('eventDetailModal'); openApptModal(id); };
        document.getElementById('detailDeleteBtn').onclick = () => deleteEvent(id);
    } else {
        actions.style.display = 'none';
    }

    openModal('eventDetailModal');
}

// ── MODAL TAB SWITCHING ───────────────────────────────────────
function switchModalTab(tab) {
    document.getElementById('tabAppt').classList.toggle('active', tab === 'appt');
    document.getElementById('tabLeave').classList.toggle('active', tab === 'leave');
    document.getElementById('panelAppt').classList.toggle('active', tab === 'appt');
    document.getElementById('panelLeave').classList.toggle('active', tab === 'leave');
}

function selectLeaveType(el) {
    document.querySelectorAll('.leave-type-chip').forEach(c => c.classList.remove('selected'));
    el.classList.add('selected');
}

function toggleLeaveTimes(cb) {
    document.getElementById('leaveTimesRow').style.display = cb.checked ? 'block' : 'none';
}

// Open the modal fresh (from + New button) — show tabs
function openNewModal(prefillDate) {
    _editingEventId = null;
    _editingIsLeave = false;
    document.getElementById('modalTabs').style.display = 'flex';
    switchModalTab('appt');

    // Reset appointment form
    document.getElementById('apptTitle').value = '';
    document.getElementById('apptClient').value = '';
    document.getElementById('apptDate').value = prefillDate || toDateStr(new Date());
    document.getElementById('apptStart').value = '09:00';
    document.getElementById('apptEnd').value = '10:00';
    document.getElementById('apptLocation').value = '';
    document.getElementById('apptNotes').value = '';
    document.getElementById('apptStatus').value = 'confirmed';
    document.getElementById('apptDeleteBtn').style.display = 'none';
    document.getElementById('apptSaveBtn').textContent = 'Save Appointment';

    // Reset leave form
    document.getElementById('leaveStart').value = prefillDate || toDateStr(new Date());
    document.getElementById('leaveEnd').value = prefillDate || toDateStr(new Date());
    document.getElementById('leaveNotes').value = '';
    document.getElementById('leaveHasTimes').checked = false;
    document.getElementById('leaveTimesRow').style.display = 'none';
    document.getElementById('leaveDeleteBtn').style.display = 'none';
    document.getElementById('leaveSaveBtn').textContent = 'Save Leave';
    document.querySelectorAll('.leave-type-chip').forEach((c,i) => c.classList.toggle('selected', i === 0));

    // Populate assignee dropdowns
    _populateAssigneeDropdowns();
    openModal('apptModal');
}

function _populateAssigneeDropdowns(apptAssigneeId, leaveAssigneeId) {
    const assignableMembers = _isAdmin ? _teamMembers : _teamMembers.filter(m => m.id === _currentUser.id);
    const makeOptions = (selectedId) => assignableMembers.map(m =>
        `<option value="${esc(m.id)}" ${m.id === (selectedId || _currentUser.id) ? 'selected' : ''}>${esc(m.name)}</option>`
    ).join('');
    document.getElementById('apptAssignee').innerHTML = makeOptions(apptAssigneeId);
    document.getElementById('apptAssignee').disabled = !_isAdmin && assignableMembers.length <= 1;
    document.getElementById('leaveAssignee').innerHTML = makeOptions(leaveAssigneeId);
    document.getElementById('leaveAssignee').disabled = !_isAdmin && assignableMembers.length <= 1;
}

// ── OPEN / CLOSE MODALS ───────────────────────────────────────
function openModal(id) { document.getElementById(id).classList.add('open'); }
function closeModal(id) { document.getElementById(id).classList.remove('open'); }

function openApptModal(editId = null, prefillDate = null, prefillStart = null, prefillEnd = null) {
    if (!editId) { openNewModal(prefillDate); return; }

    _editingEventId = editId;
    const ev = _events.find(e => e.id === editId);
    if (!ev) return;

    _editingIsLeave = ev.event_type === 'leave';

    // Hide tabs when editing existing
    document.getElementById('modalTabs').style.display = 'none';

    if (_editingIsLeave) {
        switchModalTab('leave');
        // Fill leave form
        const chip = [...document.querySelectorAll('.leave-type-chip')].find(c => c.dataset.type === ev.title);
        document.querySelectorAll('.leave-type-chip').forEach(c => c.classList.remove('selected'));
        if (chip) chip.classList.add('selected');
        else document.querySelectorAll('.leave-type-chip')[0].classList.add('selected');

        document.getElementById('leaveStart').value = ev.date;
        document.getElementById('leaveEnd').value = ev.leave_end_date || ev.date;
        document.getElementById('leaveNotes').value = ev.notes || '';
        const hasTimes = !!(ev.start_time && ev.end_time);
        document.getElementById('leaveHasTimes').checked = hasTimes;
        document.getElementById('leaveTimesRow').style.display = hasTimes ? 'block' : 'none';
        if (hasTimes) {
            document.getElementById('leaveStartTime').value = ev.start_time;
            document.getElementById('leaveEndTime').value = ev.end_time;
        }
        document.getElementById('leaveDeleteBtn').style.display = 'inline-block';
        document.getElementById('leaveSaveBtn').textContent = 'Update Leave';
    } else {
        switchModalTab('appt');
        document.getElementById('apptTitle').value = ev.title || '';
        document.getElementById('apptClient').value = ev.client_name || '';
        document.getElementById('apptDate').value = ev.date || prefillDate || toDateStr(new Date());
        document.getElementById('apptStart').value = ev.start_time || prefillStart || '09:00';
        document.getElementById('apptEnd').value = ev.end_time || prefillEnd || '10:00';
        document.getElementById('apptLocation').value = ev.location || '';
        document.getElementById('apptNotes').value = ev.notes || '';
        document.getElementById('apptStatus').value = ev.status || 'confirmed';
        document.getElementById('apptDeleteBtn').style.display = 'inline-block';
        document.getElementById('apptSaveBtn').textContent = 'Update Appointment';
    }

    _populateAssigneeDropdowns(ev.assignee_id, ev.assignee_id);
    openModal('apptModal');
}

function closeApptModal() {
    closeModal('apptModal');
    _editingEventId = null;
    _editingIsLeave = false;
}

// ── SAVE APPOINTMENT ──────────────────────────────────────────
async function saveAppointment() {
    const title = document.getElementById('apptTitle').value.trim();
    const date = document.getElementById('apptDate').value;
    const start = document.getElementById('apptStart').value;
    const end = document.getElementById('apptEnd').value;
    const assigneeId = document.getElementById('apptAssignee').value;

    // Security: non-admins can only save for themselves
    if (!_isAdmin && assigneeId !== _currentUser.id) {
        showToast('You can only create appointments for yourself.'); return;
    }
    if (!_isAdmin && _editingEventId) {
        const existing = _events.find(e => e.id === _editingEventId);
        if (existing && existing.assignee_id !== _currentUser.id) {
            showToast('You can only edit your own appointments.'); return;
        }
    }

    if (!title || !date || !start || !end || !assigneeId) {
        showToast('Please fill in all required fields.'); return;
    }
    if (start >= end) { showToast('End time must be after start time.'); return; }

    const payload = {
        title,
        event_type: 'appointment',
        client_name: document.getElementById('apptClient').value.trim() || null,
        date,
        start_time: start,
        end_time: end,
        assignee_id: assigneeId,
        location: document.getElementById('apptLocation').value.trim() || null,
        notes: document.getElementById('apptNotes').value.trim() || null,
        status: document.getElementById('apptStatus').value,
    };

    const btn = document.getElementById('apptSaveBtn');
    btn.disabled = true; btn.textContent = 'Saving…';

    try {
        let error;
        if (_editingEventId) {
            ({ error } = await _supabase.from('appointments').update(payload).eq('id', _editingEventId));
        } else {
            ({ error } = await _supabase.from('appointments').insert([payload]));
        }

        if (error) {
            showToast('Error saving: ' + (error.code === '42P01' ? 'Appointments table not set up yet.' : error.message));
            return;
        }

        showToast(_editingEventId ? 'Appointment updated.' : 'Appointment added.', 'success');
        closeApptModal();
        await loadEvents();
        renderCalendar();
    } catch (err) {
        showToast('Error saving appointment: ' + (err.message || 'Unknown error'));
    } finally {
        btn.disabled = false; btn.textContent = _editingEventId ? 'Update Appointment' : 'Save Appointment';
    }
}

// ── SAVE LEAVE ────────────────────────────────────────────────
async function saveLeave() {
    const leaveType = document.querySelector('.leave-type-chip.selected')?.dataset.type || 'Annual Leave';
    const startDate = document.getElementById('leaveStart').value;
    const endDate = document.getElementById('leaveEnd').value;
    const assigneeId = document.getElementById('leaveAssignee').value;
    const hasTimes = document.getElementById('leaveHasTimes').checked;
    const startTime = hasTimes ? document.getElementById('leaveStartTime').value : null;
    const endTime = hasTimes ? document.getElementById('leaveEndTime').value : null;

    if (!_isAdmin && assigneeId !== _currentUser.id) {
        showToast('You can only create leave for yourself.'); return;
    }
    if (!startDate || !endDate || !assigneeId) {
        showToast('Please fill in all required fields.'); return;
    }
    if (endDate < startDate) { showToast('End date must be on or after start date.'); return; }
    if (hasTimes && startTime >= endTime) { showToast('End time must be after start time.'); return; }

    const btn = document.getElementById('leaveSaveBtn');
    btn.disabled = true; btn.textContent = 'Saving…';

    // For multi-day leave, insert one row per day
    const days = [];
    let cur = new Date(startDate + 'T12:00:00');
    const end = new Date(endDate + 'T12:00:00');
    while (cur <= end) { days.push(toDateStr(cur)); cur = addDays(cur, 1); }

    const rows = days.map(d => ({
        title: leaveType,
        event_type: 'leave',
        date: d,
        leave_end_date: endDate,
        start_time: startTime || '00:00',
        end_time: endTime || '23:59',
        assignee_id: assigneeId,
        notes: document.getElementById('leaveNotes').value.trim() || null,
        status: 'confirmed',
        client_name: null,
        location: null,
    }));

    let error;
    try {
        if (_editingEventId) {
            // Delete old rows for this leave group then re-insert
            const oldEv = _events.find(e => e.id === _editingEventId);
            if (oldEv) {
                await _supabase.from('appointments').delete().eq('id', _editingEventId);
            }
            ({ error } = await _supabase.from('appointments').insert(rows));
        } else {
            ({ error } = await _supabase.from('appointments').insert(rows));
        }

        if (error) throw error;

        showToast('Leave saved.', 'success');
        closeApptModal();
        await loadEvents();
        renderCalendar();
    } catch (err) {
        showToast('Error saving leave: ' + (err.message || 'Unknown error'));
    } finally {
        btn.disabled = false; btn.textContent = 'Save Leave';
    }
}

// ── DELETE ────────────────────────────────────────────────────
async function deleteEvent(id) {
    showConfirm('Delete this appointment? This cannot be undone.', async () => {
        try {
            const { error } = await _supabase.from('appointments').delete().eq('id', id);
            if (error) throw error;
            showToast('Appointment deleted.', 'success');
            closeModal('eventDetailModal');
            await loadEvents();
            renderCalendar();
        } catch (err) {
            showToast('Error deleting appointment: ' + (err.message || 'Unknown error'));
        }
    });
}

async function deleteEditingEvent() {
    if (!_editingEventId) return;
    const idToDelete = _editingEventId;
    closeApptModal();
    deleteEvent(idToDelete);
}

// ── DATE HELPERS ──────────────────────────────────────────────
function toDateStr(d) {
    const y = d.getFullYear();
    const m = String(d.getMonth()+1).padStart(2,'0');
    const day = String(d.getDate()).padStart(2,'0');
    return `${y}-${m}-${day}`;
}

function addDays(d, n) {
    const r = new Date(d);
    r.setDate(r.getDate() + n);
    return r;
}

function sameDay(a, b) {
    return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function weekStart(d) {
    const r = new Date(d);
    r.setDate(r.getDate() - r.getDay());
    return r;
}

function formatTime(t) {
    if (!t) return '';
    const [h, m] = t.split(':').map(Number);
    const ampm = h < 12 ? 'AM' : 'PM';
    const hr = h % 12 || 12;
    return `${hr}:${String(m).padStart(2,'0')} ${ampm}`;
}

function formatDateLong(dateStr) {
    if (!dateStr) return '';
    const d = new Date(dateStr + 'T12:00:00');
    return d.toLocaleDateString('en-SG', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}

// ── START ─────────────────────────────────────────────────────
init();

    // Event delegation - replaces all onclick attributes
    document.addEventListener('click', function(e) {
        const btn = e.target.closest('[data-action]');
        if (!btn) return;
        const action = btn.dataset.action;
        if (action === 'switchModalTab') switchModalTab(btn.dataset.tab);
        else if (action === 'selectLeaveType') selectLeaveType(btn);
        else if (action === 'miniCalNav') miniCalNav(Number(btn.dataset.dir));
        else if (action === 'miniCalClick') miniCalClick(btn.dataset.date);
        else if (action === 'toggleMember') toggleMember(btn.dataset.id);
        else if (action === 'handleCellClick') handleCellClick(e, btn.dataset.date, Number(btn.dataset.hour));
        else if (action === 'showEventDetail') { e.stopPropagation(); showEventDetail(btn.dataset.id); }
        else if (action === 'openNewModal') openNewModal(btn.dataset.date);
        else if (action === 'handleMonthCellClick') handleMonthCellClick(btn.dataset.date);
    });
// ── Confirm Modal ─────────────────────────────────────────────
function showConfirm(message, onConfirm) {
  let overlay = document.getElementById('_confirm_overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = '_confirm_overlay';
    overlay.style.cssText = 'position:fixed;inset:0;z-index:99998;background:rgba(0,0,0,0.45);display:flex;align-items:center;justify-content:center;padding:16px;';
    overlay.innerHTML = `
      <div style="background:#fff;border-radius:12px;padding:28px 28px 20px;max-width:380px;width:100%;box-shadow:0 8px 32px rgba(0,0,0,0.18);font-family:DM Sans,sans-serif;">
        <p id="_confirm_msg" style="margin:0 0 20px;font-size:0.95rem;color:#3D2B1F;line-height:1.5;font-weight:500;"></p>
        <div style="display:flex;gap:10px;justify-content:flex-end;">
          <button id="_confirm_cancel" style="padding:9px 18px;border:1px solid #D6C5B8;border-radius:8px;background:#fff;font-family:DM Sans,sans-serif;font-size:0.85rem;font-weight:600;color:#6B5B4E;cursor:pointer;">Cancel</button>
          <button id="_confirm_ok" style="padding:9px 18px;border:none;border-radius:8px;background:#C0392B;font-family:DM Sans,sans-serif;font-size:0.85rem;font-weight:600;color:#fff;cursor:pointer;">Confirm</button>
        </div>
      </div>`;
    document.body.appendChild(overlay);
    overlay.addEventListener('click', e => { if (e.target === overlay) overlay.style.display = 'none'; });
    document.getElementById('_confirm_cancel').addEventListener('click', () => { overlay.style.display = 'none'; });
  }
  document.getElementById('_confirm_msg').textContent = message;
  overlay.style.display = 'flex';
  const okBtn = document.getElementById('_confirm_ok');
  const newOk = okBtn.cloneNode(true);
  okBtn.parentNode.replaceChild(newOk, okBtn);
  newOk.addEventListener('click', () => { overlay.style.display = 'none'; onConfirm(); });
}
