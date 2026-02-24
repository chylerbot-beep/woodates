const { createClient } = supabase;
        const _supabase = createClient(
            'https://ilytehukqrkwpupdpkgo.supabase.co',
            'sb_publishable_tNMpLdZaqm0e-El_LP4kKg_fhfj-ARF'
        );

        // XSS protection: escape all user-sourced strings before inserting into innerHTML
        function esc(s) {
            return String(s ?? '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
        }

        const projectsBody = document.getElementById('projectsBody');

        async function init() {
            try {
                const { data: { session } } = await _supabase.auth.getSession();
                if (!session) {
                    window.location.href = 'index.html';
                    return;
                }

                // Check admin role
                const { data: profile, error: profileErr } = await _supabase
                    .from('profiles')
                    .select('role')
                    .eq('id', session.user.id)
                    .single();

                if (profileErr || !profile || profile.role !== 'admin') {
                    window.location.href = 'index.html';
                    return;
                }

                document.body.style.display = 'flex';
                fetchAllProjects();
                fetchCompletedQuotes();
                fetchAiQuoteRequests();
            } catch (err) {
                showToast('Failed to initialise. Please refresh the page.');
            }
        }

        async function fetchAllProjects() {
            try {
                const { data: projects, error } = await _supabase
                    .from('projects')
                    .select('*, profiles(full_name)')
                    .order('updated_at', { ascending: false });

                const cards = document.getElementById('projectsCards');

                if (error) throw error;

                if (!projects || projects.length === 0) {
                    projectsBody.innerHTML = '<tr><td colspan="6" class="no-data">No projects found.</td></tr>';
                    cards.innerHTML = '<div class="m-empty">No projects found.</div>';
                    return;
                }

            projectsBody.innerHTML = projects.map(p => {
                const date = new Date(p.updated_at).toLocaleDateString('en-SG', { day: '2-digit', month: 'short', year: 'numeric' });
                const status = p.status || 'in_progress';
                const designerName = p.profiles ? p.profiles.full_name : 'Unknown';
                return `
                    <tr>
                        <td class="designer-name">${esc(designerName)}</td>
                        <td class="project-name">${esc(p.project_name) || 'Untitled'}</td>
                        <td>${esc(p.client_name) || '&mdash;'}</td>
                        <td><span class="status-badge status-${esc(status)}">${esc(status.replace('_', ' '))}</span></td>
                        <td>${date}</td>
                        <td style="display:flex;gap:8px;align-items:center;">
                            <a href="workflow.html?project_id=${esc(p.id)}&readonly=true" class="btn-view">View Only</a>
                            <button class="btn-delete" data-action="deleteProject" data-id="${esc(p.id)}" data-label="${esc(p.project_name || 'this project')}">Delete</button>
                        </td>
                    </tr>
                `;
            }).join('');

            cards.innerHTML = '<div class="card-list">' + projects.map(p => {
                const date = new Date(p.updated_at).toLocaleDateString('en-SG', { day: '2-digit', month: 'short', year: 'numeric' });
                const status = p.status || 'in_progress';
                const designerName = p.profiles ? p.profiles.full_name : 'Unknown';
                return `
                    <div class="m-card">
                        <div class="m-card-header">
                            <div>
                                <div class="m-card-title">${esc(p.project_name || 'Untitled')}</div>
                                <div class="m-card-sub">${esc(designerName)}</div>
                            </div>
                            <span class="status-badge status-${esc(status)}">${esc(status.replace('_', ' '))}</span>
                        </div>
                        <div class="m-card-meta">
                            <div class="m-meta-item">
                                <span class="m-meta-label">Client</span>
                                <span class="m-meta-value">${esc(p.client_name || '—')}</span>
                            </div>
                            <div class="m-meta-item">
                                <span class="m-meta-label">Updated</span>
                                <span class="m-meta-value">${date}</span>
                            </div>
                        </div>
                        <div class="m-card-actions">
                            <a href="workflow.html?project_id=${esc(p.id)}&readonly=true" class="btn-view">View Only</a>
                            <button class="btn-delete" data-action="deleteProject" data-id="${esc(p.id)}" data-label="${esc(p.project_name || 'this project')}">Delete</button>
                        </div>
                    </div>
                `;
            }).join('') + '</div>';
            } catch (err) {
                const cards = document.getElementById('projectsCards');
                projectsBody.innerHTML = '<tr><td colspan="6" class="no-data">Failed to load projects.</td></tr>';
                cards.innerHTML = '<div class="m-empty">Failed to load projects.</div>';
                showToast('Error loading projects: ' + (err.message || 'Unknown error'));
            }
        }

        // ── COMPLETED QUOTES ──────────────────────────────────────────────
        async function fetchCompletedQuotes() {
            const body = document.getElementById('completedQuotesBody');
            const cards = document.getElementById('completedQuotesCards');
            try {
            const { data: quotes, error } = await _supabase
                .from('quotes')
                .select('*, profiles(full_name)')
                .eq('status', 'completed')
                .order('created_at', { ascending: false });

            if (error) throw error;

            if (!quotes || quotes.length === 0) {
                body.innerHTML = '<tr><td colspan="7" class="no-data">No quotes yet.</td></tr>';
                cards.innerHTML = '<div class="m-empty">No quotes yet.</div>';
                return;
            }

            body.innerHTML = quotes.map(q => {
                const date = new Date(q.created_at).toLocaleDateString('en-SG', { day: '2-digit', month: 'short', year: 'numeric' });
                const designer = q.profiles?.full_name || 'Unknown';
                const total = q.total_amount != null
                    ? '$' + Number(q.total_amount).toLocaleString('en-SG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                    : '—';
                return `
                    <tr>
                        <td class="designer-name">${esc(designer)}</td>
                        <td style="font-weight:600;">${esc(q.quote_number || q.id?.slice(0,8) || '—')}</td>
                        <td>${esc(q.client_name || '—')}</td>
                        <td style="font-size:0.85rem;color:#6B5B4E;">${esc(q.address || '—')}</td>
                        <td style="font-weight:700;color:var(--accent);">${total}</td>
                        <td style="font-size:0.82rem;color:#9E9590;">${date}</td>
                        <td><button class="btn-delete" data-action="deleteQuote" data-id="${esc(q.id)}" data-label="${esc(q.quote_number || q.client_name || 'this quote')}">Delete</button></td>
                    </tr>
                `;
            }).join('');

            cards.innerHTML = '<div class="card-list">' + quotes.map(q => {
                const date = new Date(q.created_at).toLocaleDateString('en-SG', { day: '2-digit', month: 'short', year: 'numeric' });
                const designer = q.profiles?.full_name || 'Unknown';
                const total = q.total_amount != null
                    ? '$' + Number(q.total_amount).toLocaleString('en-SG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                    : '—';
                return `
                    <div class="m-card">
                        <div class="m-card-header">
                            <div>
                                <div class="m-card-title">${esc(q.quote_number || q.id?.slice(0,8) || 'Quote')}</div>
                                <div class="m-card-sub">${esc(designer)}</div>
                            </div>
                            <span style="font-weight:700;color:var(--accent);font-size:0.95rem;">${total}</span>
                        </div>
                        <div class="m-card-meta">
                            <div class="m-meta-item">
                                <span class="m-meta-label">Client</span>
                                <span class="m-meta-value">${esc(q.client_name || '—')}</span>
                            </div>
                            <div class="m-meta-item">
                                <span class="m-meta-label">Date</span>
                                <span class="m-meta-value">${date}</span>
                            </div>
                            <div class="m-meta-item" style="grid-column:1/-1;">
                                <span class="m-meta-label">Address</span>
                                <span class="m-meta-value">${esc(q.address || '—')}</span>
                            </div>
                        </div>
                        <div class="m-card-actions">
                            <button class="btn-delete" data-action="deleteQuote" data-id="${esc(q.id)}" data-label="${esc(q.quote_number || q.client_name || 'this quote')}">Delete</button>
                        </div>
                    </div>
                `;
            }).join('') + '</div>';
            } catch (err) {
                body.innerHTML = '<tr><td colspan="7" class="no-data">Failed to load quotes.</td></tr>';
                cards.innerHTML = '<div class="m-empty">Failed to load quotes.</div>';
                showToast('Error loading quotes: ' + (err.message || 'Unknown error'));
            }
        }

        // ── AI QUOTE REQUESTS ─────────────────────────────────────────────
        let currentRequestId = null;

        async function fetchAiQuoteRequests() {
            const body = document.getElementById('aiQuotesBody');
            const cards = document.getElementById('aiQuotesCards');
            try {
            const { data: requests, error } = await _supabase
                .from('ai_quote_requests')
                .select('*, profiles(full_name)')
                .order('created_at', { ascending: false });

            if (error) throw error;

            if (!requests || requests.length === 0) {
                body.innerHTML = '<tr><td colspan="6" class="no-data">No quotes yet.</td></tr>';
                cards.innerHTML = '<div class="m-empty">No quotes yet.</div>';
                return;
            }

            body.innerHTML = requests.map(r => {
                const date = new Date(r.created_at).toLocaleDateString('en-SG', { day: '2-digit', month: 'short', year: 'numeric' });
                const status = r.status || 'pending';
                const designer = r.profiles?.full_name || 'Unknown';
                const floorPlanCell = r.floor_plan_url
                    ? `<a href="${esc(r.floor_plan_url)}" target="_blank" class="btn-dl" style="font-size:0.75rem;padding:4px 10px;">⬇ Download</a>`
                    : '<span style="color:#9E9590;font-size:0.85rem;">—</span>';
                return `
                    <tr id="aiq-admin-${esc(r.id)}">
                        <td class="designer-name">${esc(designer)}</td>
                        <td style="font-weight:500;">${esc(r.client_name) || '—'}</td>
                        <td>${floorPlanCell}</td>
                        <td style="font-size:0.82rem;color:#9E9590;">${date}</td>
                        <td><span class="status-badge status-${esc(status)}">${esc(status)}</span></td>
                        <td style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;">
                            <button class="btn-dl" style="font-size:0.75rem;padding:5px 10px;" data-action="openModal" data-id="${esc(r.id)}">View Answers</button>
                            ${status !== 'completed' ? `<button class="btn-complete" style="font-size:0.75rem;padding:5px 10px;" data-action="markComplete" data-id="${esc(r.id)}">✓ Complete</button>` : ''}
                            <button class="btn-delete" data-action="deleteHelpMeQuote" data-id="${esc(r.id)}" data-label="${esc(r.client_name || 'this request')}">Delete</button>
                        </td>
                    </tr>
                `;
            }).join('');

            cards.innerHTML = '<div class="card-list">' + requests.map(r => {
                const date = new Date(r.created_at).toLocaleDateString('en-SG', { day: '2-digit', month: 'short', year: 'numeric' });
                const status = r.status || 'pending';
                const designer = r.profiles?.full_name || 'Unknown';
                return `
                    <div class="m-card">
                        <div class="m-card-header">
                            <div>
                                <div class="m-card-title">${esc(r.client_name || 'Unknown Client')}</div>
                                <div class="m-card-sub">${esc(designer)}</div>
                            </div>
                            <span class="status-badge status-${esc(status)}">${esc(status)}</span>
                        </div>
                        <div class="m-card-meta">
                            <div class="m-meta-item">
                                <span class="m-meta-label">Submitted</span>
                                <span class="m-meta-value">${date}</span>
                            </div>
                            <div class="m-meta-item">
                                <span class="m-meta-label">Floor Plan</span>
                                <span class="m-meta-value">${r.floor_plan_url ? '✓ Attached' : '—'}</span>
                            </div>
                        </div>
                        <div class="m-card-actions">
                            <button class="btn-dl" data-action="openModal" data-id="${esc(r.id)}">View Answers</button>
                            ${r.floor_plan_url ? `<a href="${esc(r.floor_plan_url)}" target="_blank" class="btn-dl">⬇ Floor Plan</a>` : ''}
                            ${status !== 'completed' ? `<button class="btn-complete" data-action="markComplete" data-id="${esc(r.id)}">✓ Complete</button>` : ''}
                            <button class="btn-delete" data-action="deleteHelpMeQuote" data-id="${esc(r.id)}" data-label="${esc(r.client_name || 'this request')}">Delete</button>
                        </div>
                    </div>
                `;
            }).join('') + '</div>';
            } catch (err) {
                body.innerHTML = '<tr><td colspan="6" class="no-data">Failed to load requests.</td></tr>';
                cards.innerHTML = '<div class="m-empty">Failed to load requests.</div>';
                showToast('Error loading AI quote requests: ' + (err.message || 'Unknown error'));
            }
        }

        function openModal(id) {
            currentRequestId = id;
            // Fetch the request data
            _supabase.from('ai_quote_requests').select('*').eq('id', id).single().then(({ data: r }) => {
                if (!r) return;
                document.getElementById('modalClientName').textContent = `${r.client_name || 'Client'} — Intake Answers`;

                const a = r.answers || {};
                const fields = [
                    ['Unit Type', a.unit_type],
                    ['OCS Opted Out', a.ocs_opted_out],
                    ['Flooring Material', a.flooring_material],
                    ['Flooring Area', a.flooring_area_sqft ? a.flooring_area_sqft + ' sqft' : null],
                    ['Hack Walls', a.hack_walls],
                    ['Hack Walls Detail', a.hack_walls_desc],
                    ['Hack Bi-fold', a.hack_bifold],
                    ['Remove Doors', a.remove_doors],
                    ['Remove Doors Detail', a.remove_doors_desc],
                    ['Countertop', a.countertop],
                    ['Backsplash', a.backsplash],
                    ['Cement Base', a.cement_base],
                    ['Kerb Master Bath', a.kerb_master],
                    ['Kerb Common Bath', a.kerb_common],
                    ['Wardrobe Master', a.wardrobe_master],
                    ['Wardrobe Bed 2', a.wardrobe_bed2],
                    ['Wardrobe Bed 3', a.wardrobe_bed3],
                    ['False Ceiling', a.false_ceiling],
                    ['Ceiling Area', a.ceiling_area_sqft ? a.ceiling_area_sqft + ' sqft' : null],
                    ['Cove Lighting', a.cove_lighting],
                    ['Bedroom Doors', a.bedroom_doors],
                    ['Toilet Doors', a.toilet_doors],
                ];

                document.getElementById('answerGrid').innerHTML = fields
                    .filter(([, v]) => v != null && v !== '')
                    .map(([label, val]) => `
                        <div class="answer-item">
                            <label>${esc(label)}</label>
                            <p>${esc(String(val))}</p>
                        </div>
                    `).join('');

                const remarksEl = document.getElementById('answerRemarks');
                if (a.remarks) {
                    document.getElementById('remarksText').textContent = a.remarks;
                    remarksEl.style.display = 'block';
                } else {
                    remarksEl.style.display = 'none';
                }

                const floorLink = document.getElementById('modalFloorPlanLink');
                if (r.floor_plan_url) {
                    floorLink.href = r.floor_plan_url;
                    floorLink.style.display = 'inline-block';
                } else {
                    floorLink.style.display = 'none';
                }

                document.getElementById('modalCompleteBtn').onclick = () => markComplete(r.id);
                document.getElementById('modalCompleteBtn').style.display = r.status === 'completed' ? 'none' : 'inline-block';

                document.getElementById('answersModal').classList.add('open');
            });
        }

        function closeModal() {
            document.getElementById('answersModal').classList.remove('open');
            currentRequestId = null;
        }

        // Close modal on backdrop click
        document.getElementById('answersModal').addEventListener('click', function(e) {
            if (e.target === this) closeModal();
        });

        async function markComplete(id) {
            const targetId = id || currentRequestId;
            if (!targetId) return;
            showConfirm('Mark this AI quote request as complete? The designer will see it as completed.', async () => {
                const { error } = await _supabase
                    .from('ai_quote_requests')
                    .update({ status: 'completed' })
                    .eq('id', targetId);

                if (error) { showToast('Error updating status.'); return; }

                fetchAiQuoteRequests();
                closeModal();
            });
        }

        // ── DELETE FUNCTIONS ──────────────────────────────────────────────
        async function deleteProject(id, label) {
            showConfirm(`Delete project "${label}"? This cannot be undone.`, async () => {
                try {
                    const { error } = await _supabase.from('projects').delete().eq('id', id);
                    if (error) throw error;
                    showToast('Project deleted.', 'success');
                    fetchAllProjects();
                } catch (err) {
                    showToast('Error deleting project: ' + (err.message || 'Unknown error'));
                }
            });
        }

        async function deleteQuote(id, label) {
            showConfirm(`Delete quote "${label}"? This cannot be undone.`, async () => {
                try {
                    const { error } = await _supabase.from('quotes').delete().eq('id', id);
                    if (error) throw error;
                    showToast('Quote deleted.', 'success');
                    fetchCompletedQuotes();
                } catch (err) {
                    showToast('Error deleting quote: ' + (err.message || 'Unknown error'));
                }
            });
        }

        async function deleteHelpMeQuote(id, label) {
            showConfirm(`Delete Help Me Quote request from "${label}"? This cannot be undone.`, async () => {
                try {
                    const { error } = await _supabase.from('ai_quote_requests').delete().eq('id', id);
                    if (error) throw error;
                    showToast('Request deleted.', 'success');
                    fetchAiQuoteRequests();
                } catch (err) {
                    showToast('Error deleting request: ' + (err.message || 'Unknown error'));
                }
            });
        }

        init();

        // Event delegation - replaces all onclick attributes
        document.addEventListener('click', function(e) {
            const btn = e.target.closest('[data-action]');
            if (!btn) return;
            const action = btn.dataset.action;
            const id = btn.dataset.id || null;
            const label = btn.dataset.label || '';
            if (action === 'closeModal') closeModal();
            else if (action === 'markComplete') markComplete(id);
            else if (action === 'openModal') openModal(id);
            else if (action === 'deleteProject') deleteProject(id, label);
            else if (action === 'deleteQuote') deleteQuote(id, label);
            else if (action === 'deleteHelpMeQuote') deleteHelpMeQuote(id, label);
        });

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
