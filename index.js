const { createClient } = supabase;
        const _supabase = createClient(
            'https://ilytehukqrkwpupdpkgo.supabase.co',
            'sb_publishable_tNMpLdZaqm0e-El_LP4kKg_fhfj-ARF'
        );

        // XSS protection: escape all user-sourced strings before inserting into innerHTML
        function esc(s) {
            return String(s ?? '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
        }

        // Username → email resolution is handled server-side via the resolve-user-email Edge Function

        const loginOverlay = document.getElementById('loginOverlay');
        const mainContent = document.getElementById('mainContent');
        const loginForm = document.getElementById('loginForm');
        const loginError = document.getElementById('loginError');
        const userNameEl = document.getElementById('userName');
        const userRoleEl = document.getElementById('userRole');
        const projectsListEl = document.getElementById('projectsList');
        const logoutBtn = document.getElementById('logoutBtn');

        // Brute-force protection: track failed attempts
        let _loginAttempts = 0;
        let _loginLockedUntil = 0;

        async function init() {
            const { data: { session } } = await _supabase.auth.getSession();

            if (!session) {
                showLogin();
                return;
            }

            hideLogin();
            loadUserData(session.user);
        }

        function showLogin() {
            loginOverlay.style.display = 'flex';
            mainContent.style.display = 'flex'; // Visible but blurred behind overlay
            document.body.style.overflow = 'hidden';
        }

        function hideLogin() {
            loginOverlay.style.display = 'none';
            mainContent.style.display = 'flex';
            document.body.style.overflow = 'auto';
        }

        // ── TOOL CARD DEFINITIONS ─────────────────────────────
        // To reorder cards, change the array order here — not the HTML.
        // 'adminOnly: true' cards are hidden until admin role is confirmed.
        const TOOL_ORDER = [
          {
            id: 'scheduleCard',
            href: 'schedule.html',
            icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><line x1="8" y1="14" x2="8" y2="14"/><line x1="12" y1="14" x2="12" y2="14"/><line x1="16" y1="14" x2="16" y2="14"/></svg>`,
            title: 'Schedule',
            desc: 'View the full team calendar, manage appointments, and track upcoming client visits.',
          },
          {
            id: 'leadsCard',
            href: 'leads.html',
            adminOnly: true,
            icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/></svg>`,
            title: 'Leads',
            desc: 'Pipeline, progression tracking, and lead management. Admin only.',
          },
          {
            id: 'workflowCard',
            href: '#',
            dataAction: 'createAndOpenProject',
            icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>`,
            title: 'PM Project Checklist',
            desc: 'Track project progress from onboarding to handover. Manage technical site visits and documentation protocols.',
          },
          {
            id: 'quoteCard',
            href: 'quote-tool.html',
            icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>`,
            title: 'Generate a Quote',
            desc: 'Generate professional BTO and resale renovation quotations with real-time pricing and Excel export.',
          },
          {
            id: 'helpQuoteCard',
            href: 'help-me-quote.html',
            icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z"/><path d="M12 8v4l3 3"/></svg>`,
            title: 'Help Me Quote',
            desc: 'Upload a floor plan and answer intake questions.',
          },
          {
            id: 'adminCard',
            href: 'admin.html',
            adminOnly: true,
            icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
            title: 'Admin Dashboard',
            desc: 'Overview of all designer projects, status tracking, and global management controls.',
          },
        ];

        function renderToolCards(isAdmin) {
          const grid = document.getElementById('toolGrid');
          grid.innerHTML = TOOL_ORDER
            .filter(t => !t.adminOnly || isAdmin)
            .map(t => `
              <a href="${t.href}" class="card" id="${t.id}"${t.dataAction ? ` data-action="${t.dataAction}" data-args="${t.dataArgs||''}"` : ''}>
                <div class="card-icon">${t.icon}</div>
                <h3>${t.title}</h3>
                <p>${t.desc}</p>
              </a>`)
            .join('');
        }

        async function loadUserData(user) {
            const { data: profile } = await _supabase
                .from('profiles')
                .select('*')
                .eq('id', user.id)
                .single();

            const isAdmin = profile?.role === 'admin';
            if (profile) {
                userNameEl.textContent = profile.full_name;
                userRoleEl.textContent = isAdmin ? 'Administrator' : 'Designer';
            }
            renderToolCards(isAdmin);

            fetchProjects(user.id);
            fetchQuotes(user.id);
            fetchAiQuotes(user.id);
        }

        async function fetchProjects(userId) {
            const { data: projects, error } = await _supabase
                .from('projects')
                .select('*, profiles(full_name)')
                .eq('user_id', userId)
                .order('updated_at', { ascending: false });

            if (error) {
                projectsListEl.innerHTML = '<div class="no-projects">Error loading projects.</div>';
                return;
            }

            if (!projects || projects.length === 0) {
                projectsListEl.innerHTML = '';
                return;
            }

            projectsListEl.innerHTML = projects.map(p => {
                const date = new Date(p.updated_at).toLocaleDateString('en-SG', {
                    day: '2-digit',
                    month: 'short'
                });
                const status = p.status || 'in_progress';
                const designerName = p.profiles?.full_name ?? '—';
                return `
                    <div class="project-row" id="project-row-${esc(p.id)}">
                        <div style="font-weight: 500;">${esc(p.project_name) || 'Untitled Project'}</div>
                        <div>${esc(p.client_name) || '—'}</div>
                        <div><span class="status-badge status-${esc(status)}">${esc(status.replace('_', ' '))}</span></div>
                        <div style="font-size: 0.8rem; color: #9E9590;">${date}</div>
                        <div style="font-size: 0.85rem; color: var(--accent); font-weight: 600;">${esc(designerName)}</div>
                        <div style="display:flex; align-items:center; gap:8px;">
                            <a href="workflow.html?project_id=${esc(p.id)}" class="btn-open">Open</a>
                            <button class="btn-delete" data-action="deleteProject" data-id="${esc(p.id)}">Delete</button>
                        </div>
                    </div>
                `;
            }).join('');
        }

        async function deleteProject(projectId) {
            showConfirm('Delete this project? This cannot be undone.', async () => {
                try {
                    const { error } = await _supabase
                        .from('projects')
                        .delete()
                        .eq('id', projectId);
                    if (error) throw error;
                    document.getElementById(`project-row-${projectId}`)?.remove();
                    const remaining = document.querySelectorAll('#projectsList .project-row');
                    if (remaining.length === 0) projectsListEl.innerHTML = '';
                } catch (err) {
                    showToast('Error deleting project.');
                }
            });
        }

        async function fetchQuotes(userId) {
            const quotesListEl = document.getElementById('quotesList');
            const { data: quotes, error } = await _supabase
                .from('quotes')
                .select('*')
                .eq('user_id', userId)
                .order('created_at', { ascending: false });

            if (error) {
                quotesListEl.innerHTML = '';
                return;
            }

            if (!quotes || quotes.length === 0) {
                quotesListEl.innerHTML = '';
                return;
            }

            quotesListEl.innerHTML = quotes.map(q => {
                const date = new Date(q.created_at).toLocaleDateString('en-SG', {
                    day: '2-digit', month: 'short', year: 'numeric'
                });
                const total = q.total != null
                    ? '$' + Number(q.total).toLocaleString('en-SG', { minimumFractionDigits: 2 })
                    : '—';
                return `
                    <div class="project-row quote-row" id="quote-row-${esc(q.id)}">
                        <div style="font-weight:600; color:var(--accent); font-size:0.85rem;">${esc(q.quote_number) || '—'}</div>
                        <div style="font-weight:500;">${esc(q.client_name) || '—'}</div>
                        <div style="font-size:0.85rem; color:#9E9590;">${esc(q.address) || '—'}</div>
                        <div style="font-weight:600;">${total}</div>
                        <div style="font-size:0.8rem; color:#9E9590;">${date}</div>
                        <div style="display:flex; align-items:center; gap:8px;">
                            <a href="quote-tool.html?quote_id=${esc(q.id)}" class="btn-open">Open</a>
                            <button class="btn-delete" data-action="deleteQuote" data-id="${esc(q.id)}">Delete</button>
                        </div>
                    </div>
                `;
            }).join('');
        }

        async function deleteQuote(quoteId) {
            showConfirm('Delete this quote? This cannot be undone.', async () => {
                try {
                    const { error } = await _supabase.from('quotes').delete().eq('id', quoteId);
                    if (error) throw error;
                    document.getElementById(`quote-row-${quoteId}`)?.remove();
                    const remaining = document.querySelectorAll('#quotesList .quote-row');
                    if (remaining.length === 0) document.getElementById('quotesList').innerHTML = '';
                } catch (err) {
                    showToast('Error deleting quote.');
                }
            });
        }

        async function fetchAiQuotes(userId) {
            const listEl = document.getElementById('aiQuotesList');
            const { data: requests, error } = await _supabase
                .from('ai_quote_requests')
                .select('*')
                .eq('user_id', userId)
                .order('created_at', { ascending: false });

            if (error || !requests || requests.length === 0) {
                listEl.innerHTML = '';
                return;
            }

            listEl.innerHTML = requests.map(r => {
                const date = new Date(r.created_at).toLocaleDateString('en-SG', { day: '2-digit', month: 'short', year: 'numeric' });
                const status = r.status || 'pending';
                const filename = r.floor_plan_filename || 'Floor Plan';
                const floorPlanLink = r.floor_plan_url
                    ? `<a href="${esc(r.floor_plan_url)}" target="_blank" style="color:var(--accent);font-weight:600;font-size:0.85rem;">${esc(filename)}</a>`
                    : `<span style="color:#9E9590;">${esc(filename)}</span>`;

                return `
                    <div class="project-row ai-quote-row" id="aiq-row-${esc(r.id)}">
                        <div style="font-weight:500;">${esc(r.client_name) || '—'}</div>
                        <div>${floorPlanLink}</div>
                        <div style="font-size:0.8rem;color:#9E9590;">${date}</div>
                        <div><span class="status-badge status-${esc(status)}">${esc(status)}</span></div>
                        <div>
                            <button class="btn-delete" data-action="deleteAiQuote" data-id="${esc(r.id)}">Delete</button>
                        </div>
                    </div>
                `;
            }).join('');
        }

        async function deleteAiQuote(id) {
            showConfirm('Delete this AI quote request? This cannot be undone.', async () => {
                try {
                    const { error } = await _supabase.from('ai_quote_requests').delete().eq('id', id);
                    if (error) throw error;
                    document.getElementById(`aiq-row-${id}`)?.remove();
                    const remaining = document.querySelectorAll('[id^="aiq-row-"]');
                    if (remaining.length === 0) document.getElementById('aiQuotesList').innerHTML = '';
                } catch (err) {
                    showToast('Error deleting request.');
                }
            });
        }

        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            loginError.style.display = 'none';

            // Brute-force protection: lock for 30s after 5 failed attempts
            if (Date.now() < _loginLockedUntil) {
                const secsLeft = Math.ceil((_loginLockedUntil - Date.now()) / 1000);
                loginError.textContent = `Too many attempts. Try again in ${secsLeft}s.`;
                loginError.style.display = 'block';
                return;
            }

            const username = document.getElementById('username').value.toLowerCase().trim();
            const password = document.getElementById('password').value;
            const signInBtn = document.getElementById('signInBtn');

            signInBtn.disabled = true;
            signInBtn.textContent = 'Signing in…';

            try {
                // Resolve username → email via Edge Function (map stays server-side, never in browser)
                const res = await fetch(
                    'https://ilytehukqrkwpupdpkgo.supabase.co/functions/v1/resolve-user-email',
                    {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ username }),
                    }
                );
                const json = await res.json();

                if (!res.ok || !json.email) {
                    throw new Error('invalid');
                }

                const { error } = await _supabase.auth.signInWithPassword({ email: json.email, password });

                if (error) throw new Error('invalid');

                _loginAttempts = 0;
                init();

            } catch {
                _loginAttempts++;
                signInBtn.disabled = false;
                signInBtn.textContent = 'Sign In';

                if (_loginAttempts >= 5) {
                    _loginLockedUntil = Date.now() + 30_000;
                    _loginAttempts = 0;
                    loginError.textContent = 'Too many failed attempts. Locked for 30 seconds.';
                } else {
                    loginError.textContent = 'Incorrect username or password.';
                }
                loginError.style.display = 'block';
                return;
            }

            signInBtn.disabled = false;
            signInBtn.textContent = 'Sign In';
        });

        async function createAndOpenProject(e) {
            if (e) e.preventDefault();
            const { data: { user } } = await _supabase.auth.getUser();
            if (!user) { showLogin(); return; }
            const { data, error } = await _supabase
                .from('projects')
                .insert([{ user_id: user.id, project_name: 'New Project', status: 'in_progress', phase_data: {} }])
                .select()
                .single();
            if (data) {
                window.location.href = `workflow.html?project_id=${data.id}`;
            } else {
                showToast('Error creating project: ' + (error?.message || 'Unknown error'));
            }
        }

        logoutBtn.addEventListener('click', async () => {
            await _supabase.auth.signOut();
            location.reload();
        });

        // Password eye toggle
        document.getElementById('togglePassword').addEventListener('click', function() {
            const input = document.getElementById('password');
            const isHidden = input.type === 'password';
            input.type = isHidden ? 'text' : 'password';
            document.getElementById('eyeIcon').innerHTML = isHidden
                ? '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/>'
                : '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>';
        });

        init();

// ── Toast notification ──────────────────────────────
function showToast(msg, type='error') {
  let t = document.getElementById('_app_toast');
  if(!t) {
    t = document.createElement('div');
    t.id = '_app_toast';
    t.style.cssText = 'position:fixed;bottom:24px;left:50%;transform:translateX(-50%);z-index:99999;padding:12px 24px;border-radius:8px;font-family:DM Sans,sans-serif;font-size:0.85rem;font-weight:600;box-shadow:0 4px 20px rgba(0,0,0,0.15);transition:opacity 0.4s;pointer-events:none';
    document.body.appendChild(t);
  }
  const cols = {error:['#FEE2E2','#991B1B'], success:['#D1FAE5','#065F46'], info:['#EBF3FB','#1D4ED8']};
  const [bg, color] = cols[type]||cols.error;
  t.style.background=bg; t.style.color=color;
  t.textContent=msg; t.style.opacity='1';
  clearTimeout(t._hide); t._hide=setTimeout(()=>{ t.style.opacity='0'; },4000);
}


        // Event delegation - replaces all onclick attributes
        document.addEventListener('click', async function(e) {
            const btn = e.target.closest('[data-action]');
            if (!btn) return;
            const action = btn.dataset.action;
            const id = btn.dataset.id || null;
            if (action === 'deleteProject') deleteProject(id);
            else if (action === 'deleteQuote') deleteQuote(id);
            else if (action === 'deleteAiQuote') deleteAiQuote(id);
            else if (action === 'createAndOpenProject') createAndOpenProject(e);
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
