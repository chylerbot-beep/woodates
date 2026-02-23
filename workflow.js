const { createClient } = supabase;
    const _supabase = createClient(
      'https://ilytehukqrkwpupdpkgo.supabase.co',
      'sb_publishable_tNMpLdZaqm0e-El_LP4kKg_fhfj-ARF'
    );

    const PHASES = [
      {
        num: 1,
        title: "Onboarding & Setup",
        sub: "Week 1",
        objective: 'Establish communication and manage "The Waiting Period."',
        tasks: [
          { action: "Create Project Group Chat", notes: "Include: ID, Project Manager, Admin (Booking), 3D Designer, & Owners." },
          { action: "Upload Project Files", notes: "Upload Original Layout, Furniture Plan, and Signed Quotation to chat." },
          { action: "Request Mood Board", notes: "Ask owner for reference photos for 3D rendering." },
          { action: "Conduct Onboarding Brief", notes: 'Explain timeline (2 weeks for 3D). Manage expectations on "waiting time."' },
          { action: "Book Material Selections", notes: "Task Admin to book: Vinyl, Tiles, Laminate, Sintered Stone, Glass." }
        ]
      },
      {
        num: 2,
        title: "Design & Owner Purchasing",
        sub: null,
        objective: "Finalize visuals and ensure owner buys critical built-in items.",
        tasks: [
          { action: "3D Rendering", notes: "Send renders to owner (approx. 2 weeks post-signing). Note: If 3D colors are totally wrong, re-render. If slight shade difference, explain to owner." },
          { action: "Owner Shopping List (Priority 1)", notes: "Ensure owner selects: Lights, Fans, Kitchen Appliances (Hob/Hood/Oven), Fridge dimensions." },
          { action: "Owner Shopping List (Priority 2)", notes: "Bathroom Accessories. (Loose furniture like sofas can wait)." }
        ]
      },
      {
        num: 3,
        title: "The First Site Visit",
        sub: "Key Collection",
        objective: "The critical technical run-through. Must be done with Aircon Contractor.",
        tasks: [
          { action: "Aircon Trunking Check", notes: "Decision: Trunking vs. L-Box? Price: Contractor to quote box-up price on the spot.", photoSent: true },
          { action: "Carpentry Placement", notes: "Action: Tape furniture layout on floor for owner visualization.", photoSent: true },
          { action: "Initial Site Measurement", notes: "Carpenter or ID to take fabrication measurements.", photoSent: true },
          { action: "Electrical Walkthrough", notes: "Confirm positions for: Switches, Sockets, Data points, Ceiling lighting points.", photoSent: true },
          { action: "Review: Shower Area", notes: "Confirm Shower Screen position & Kerb position.", photoSent: true },
          { action: "Review: Wet Works", notes: "Cement Base: Fridge/Washing Machine base needed? Entrance: Slope or Drop? (For tiling/vinyl).", photoSent: true },
          { action: "Review: False Ceiling", notes: "Confirm height, curtain pelmet gap size, and cove light distance.", photoSent: true },
          { action: "Review: Hacking", notes: "(If applicable) Mark exactly which wall and extent of hacking.", photoSent: true },
          { action: "Same-Day Summary", notes: "Post Site Visit: Send a text summary of all discussed points and TBC items to Group Chat on the same day." }
        ]
      },
      {
        num: 4,
        title: "Commencement & Pre-Work",
        sub: null,
        objective: 'Finalize costs, collect payment, and prepare for "Dirty Work."',
        tasks: [
          { action: "Finalize Electrical Plan", notes: "Update Electrical/Lighting plan based on site visit. Zoom call to confirm." },
          { action: "Generate Electrical VO", notes: "Create Quotation/VO for Electrical work + any site visit add-ons (e.g., Aircon box-up)." },
          { action: "Billing", notes: "Issue Invoice: 35% Progress Payment + Electrical VO." },
          { action: "Collect Payment", notes: "CRITICAL: Do not start work until payment is received." },
          { action: "Start Work Schedule", notes: 'Confirm start date. Put date in "Set More" (booking system) early so Boss can arrange workers.' }
        ]
      },
      {
        num: 5,
        title: "Execution – Wet Works & Ceiling",
        sub: null,
        objective: "Structural works and forward planning.",
        tasks: [
          { action: "Day 1: Hacking & Electrical Briefing", notes: "ID must go down. Brief workers on what to hack. Confirm positions with Owner." },
          { action: "Site Protection", notes: "Priority 1: Instruct workers to protect house/flooring before any work starts." },
          { action: "Forward Planning (Critical)", notes: "Do not wait for electrical to finish to plan next step.\n1. Book False Ceiling Guy.\n2. Book Tiler (Note: Tiler does not haul tiles; book in-house labor for haulage).\n3. Order and Deliver Tiles." },
          { action: "Electrical Inspection", notes: "Confirm all wiring/points correct before False Ceiling guy comes in." },
          { action: "False Ceiling Inspection", notes: "ID must check false ceiling work (leveling/structure) before Tiler comes in." }
        ]
      },
      {
        num: 6,
        title: 'Carpentry Prep',
        sub: 'The "Fabrication Gap" – approx. 2–3 weeks',
        objective: "Detailed planning while carpentry is being made.",
        tasks: [
          { action: "Re-Measure Site", notes: "Once tiling/ceiling is done, heights change. Do site measurement again for accuracy." },
          { action: "Carpentry Drawings", notes: "Send measurements to drafter (Nancy). Produce drawings (3–5 days). Send to Owner." },
          { action: "On-Site Carpentry Discussion", notes: "Meet owner on-site.\nMust Confirm:\n1. Depth of carpentry.\n2. Exact switch/socket positions inside carpentry (Left/Right/Top/Bottom)." },
          { action: "Laminate Confirmation", notes: "Confirm Laminate codes using 3D renders as a guide." },
          { action: "Fabrication Handover", notes: "Pass confirmed drawings to Carpenter (Daniel/Boss/Self) to start fabrication." },
          { action: "Mid-Reno Coordination", notes: "While waiting for carpentry (2–3 weeks):\n1. Suppliers measure Windows/Shower Screens.\n2. Painter: Sealer & Matex (1st Coat).\n3. Plumber: Run pipings, install storage heater.\n4. Electrician." },
          { action: "Owner Delivery Reminder", notes: "Remind owner to deliver Hob/Hood/Oven/Sinks now so they are ready for carpentry installation." }
        ]
      },
      {
        num: 7,
        title: "Carpentry Installation",
        sub: null,
        objective: "Installation and supervision.",
        tasks: [
          { action: "Installation Day 1", notes: 'ID must be present. Act as "Kepala" (Supervisor) to direct placement and workflow.' },
          { action: "Routine Checks", notes: "Visit site every 2–3 days during installation to catch issues early." },
          { action: "Electrical 2nd Fix", notes: "Once carpentry is up, Electrician returns to install switches/sockets onto the carpentry." }
        ]
      },
      {
        num: 8,
        title: "Countertops & Finishing",
        sub: null,
        objective: "The final push.",
        tasks: [
          { action: "Table Top Measurement", notes: "Arrange stone supplier to measure. Confirm Stone color with owner." },
          { action: "Touch-Up & Painting", notes: "While waiting for stone:\n1. Touch-up Man (Joint lines/carpentry).\n2. Painter (Final Coat)." },
          { action: "Plumbing Finals", notes: "After stone installed: Plumber installs Sink, Tap, Bathroom Accessories, Dishwasher/Washing machine." }
        ]
      },
      {
        num: 9,
        title: "Handover",
        sub: null,
        objective: "Client Inspection and completion.",
        tasks: [
          { action: "Owner Walkthrough", notes: "Invite owner to site. Walk around to identify any final touch-ups needed." },
          { action: "Final Rectification", notes: "Execute touch-ups based on walkthrough." },
          { action: "General Cleaning", notes: "Perform one last round of general cleaning." },
          { action: "Handover", notes: "Official handover of keys and project completion." }
        ]
      }
    ];

    // State
    let state = {};
    let projectId = new URLSearchParams(window.location.search).get('project_id');
    let isReadonly = new URLSearchParams(window.location.search).get('readonly') === 'true';
    let currentUser = null;
    let currentUserIsAdmin = false;
    let currentUserName = '';
    let currentUserId = '';
    let designers = []; // array of {id, name} objects
    let allDesignerProfiles = []; // all profiles with role=designer fetched from DB

    function getKey(pIdx, tIdx) { return `p${pIdx}_t${tIdx}`; }
    function getNoteKey(pIdx) { return `note_p${pIdx}`; }

    async function logout() {
      await _supabase.auth.signOut();
      window.location.href = 'index.html';
    }

    async function init() {
      const { data: { session } } = await _supabase.auth.getSession();
      if (!session) {
        window.location.href = 'index.html';
        return;
      }
      currentUser = session.user;
      document.body.style.display = 'block';
      if (isReadonly) document.body.classList.add('readonly');

      if (projectId) {
        await loadProjectData();
      } else {
        showToast('No project ID found');
        window.location.href = 'index.html';
      }
    }

    async function loadProjectData() {
      const { data: project, error } = await _supabase
        .from('projects')
        .select('*')
        .eq('id', projectId)
        .single();

      if (!project || error) {
        showToast('Project not found.');
        window.location.href = 'index.html';
        return;
      }

      // Ownership check: fetch current user's profile to check role/name
      const { data: profile } = await _supabase
        .from('profiles')
        .select('role, full_name')
        .eq('id', currentUser.id)
        .single();

      const isAdmin = profile && profile.role === 'admin';
      currentUserIsAdmin = isAdmin;
      currentUserName = profile ? (profile.full_name || currentUser.email) : currentUser.email;
      currentUserId   = currentUser.id;
      const isOwner = project.user_id === currentUser.id;

      if (!isOwner && !isAdmin) {
        showToast('You do not have permission to view this project');
        window.location.href = 'index.html';
        return;
      }

      state = project.phase_data || {};
      // Migrate: if designers are plain strings, convert to objects
      const rawDesigners = project.designers || [];
      designers = rawDesigners.map(d =>
        typeof d === 'string' ? { id: d, name: d } : d
      );

      // Auto-add current user if not already in the list
      if (!isReadonly && !designers.find(d => d.id === currentUser.id)) {
        designers.unshift({ id: currentUser.id, name: currentUserName });
      }

      // Fetch all users with designer or admin role for the dropdown
      await loadDesignerProfiles();

      document.getElementById('proj_name').value = project.project_name || '';
      document.getElementById('proj_client').value = project.client_name || '';
      document.getElementById('proj_date').value = project.date_of_signing || '';
      renderDesigners();
      buildUI();
    }

    function triggerSave() {
      if (isReadonly) return;
      const statusEl = document.getElementById('saveStatus');
      statusEl.textContent = 'Unsaved changes…';
      statusEl.style.color = '#BDB5AD';
    }

    async function manualSave() {
      if (isReadonly) return;
      await saveProjectData();
    }

    async function saveProjectData() {
      const pName = document.getElementById('proj_name').value;
      const cName = document.getElementById('proj_client').value;
      const dSign = document.getElementById('proj_date').value;

      // Check if completed
      let totalTasks = PHASES.reduce((acc, p) => acc + p.tasks.length, 0);
      let checkedTasks = 0;
      PHASES.forEach((p, pIdx) => {
        p.tasks.forEach((_, tIdx) => {
          if (state[getKey(pIdx, tIdx)]) checkedTasks++;
        });
      });
      const status = checkedTasks === totalTasks ? 'completed' : 'in_progress';

      let query = _supabase
        .from('projects')
        .update({
          project_name: pName,
          client_name: cName,
          date_of_signing: dSign,
          phase_data: state,
          designers: designers,
          status: status,
          updated_at: new Date().toISOString()
        })
        .eq('id', projectId);

      // For non-admin users, add user_id filter to satisfy RLS policy
      if (!currentUserIsAdmin) {
        query = query.eq('user_id', currentUser.id);
      }

      const { error } = await query;

      const statusEl = document.getElementById('saveStatus');
      if (error) {
        console.error('Save error:', error.message, error.details, error.hint);
        statusEl.textContent = 'Save failed ✗';
        statusEl.style.color = '#B85C5C';
      } else {
        statusEl.textContent = 'Saved ✓';
        statusEl.style.color = '#C4956A';
      }
    }

    function updateProgress() {
      let total = 0, done = 0;
      PHASES.forEach((phase, pIdx) => {
        phase.tasks.forEach((_, tIdx) => {
          total++;
          if (state[getKey(pIdx, tIdx)]) done++;
        });
      });

      const pct = total > 0 ? Math.round((done / total) * 100) : 0;
      document.getElementById('progressFill').style.width = pct + '%';
      document.getElementById('progressPct').textContent = pct + '%';
      document.getElementById('footerChecked').textContent = done;
      document.getElementById('footerTotal').textContent = total;

      PHASES.forEach((phase, pIdx) => {
        const el = document.getElementById(`phase_${pIdx}`);
        if (!el) return;
        const allDone = phase.tasks.every((_, tIdx) => state[getKey(pIdx, tIdx)]);
        el.classList.toggle('completed', allDone);
        const cnt = phase.tasks.filter((_, tIdx) => state[getKey(pIdx, tIdx)]).length;
        const countEl = el.querySelector('.phase-count');
        if (countEl) countEl.textContent = `${cnt} / ${phase.tasks.length}`;
      });
    }

    function formatTimestamp() {
      const now = new Date();
      const date = now.toLocaleDateString('en-SG', { day: '2-digit', month: 'short', year: 'numeric' });
      const time = now.toLocaleTimeString('en-SG', { hour: '2-digit', minute: '2-digit', hour12: true });
      return date + ' / ' + time;
    }

    function renderTickMeta(tsVal, whoVal) {
      if (!tsVal) return '<span class="timestamp-empty">—</span>';
      const who = whoVal ? `<span class="timestamp-who">${whoVal}</span>` : '';
      return `${who}<span class="timestamp-value">${tsVal}</span>`;
    }

    function toggleTask(pIdx, tIdx) {
      if (isReadonly) return;
      const key = getKey(pIdx, tIdx);
      state[key] = !state[key];

      const signKey = `sign_p${pIdx}_t${tIdx}`;
      const whoKey  = `who_p${pIdx}_t${tIdx}`;

      if (state[key]) {
        state[signKey] = formatTimestamp();
        state[whoKey]  = currentUserName;
      } else {
        delete state[signKey];
        delete state[whoKey];
      }

      const row = document.getElementById(`row_${pIdx}_${tIdx}`);
      row.classList.toggle('checked', state[key]);

      const tsEl = row.querySelector('.task-timestamp');
      if (tsEl) {
        tsEl.innerHTML = renderTickMeta(state[signKey], state[whoKey]);
      }

      updateProgress();
      triggerSave();
    }

    function getSubKey(pIdx, tIdx) { return `sub_p${pIdx}_t${tIdx}`; }

    function toggleSubTick(pIdx, tIdx) {
      if (isReadonly) return;
      const key = getSubKey(pIdx, tIdx);
      state[key] = !state[key];

      const subRow = document.getElementById(`subrow_${pIdx}_${tIdx}`);
      const subBox = document.getElementById(`subcb_${pIdx}_${tIdx}`);
      if (subRow) subRow.classList.toggle('sub-checked-row', state[key]);
      if (subBox) subBox.classList.toggle('sub-checked', state[key]);

      triggerSave();
    }

    function togglePhase(pIdx) {
      const el = document.getElementById(`phase_${pIdx}`);
      el.classList.toggle('open');
    }

    function saveNote(pIdx, val) {
      state[getNoteKey(pIdx)] = val;
      triggerSave();
    }

    function buildUI() {
      const container = document.getElementById('phasesContainer');
      container.innerHTML = '';

      PHASES.forEach((phase, pIdx) => {
        const el = document.createElement('div');
        el.className = 'phase';
        el.id = `phase_${pIdx}`;

        // Auto-open first incomplete phase or if all complete open first
        const allDone = phase.tasks.every((_, tIdx) => state[getKey(pIdx, tIdx)]);
        if (!allDone && pIdx === 0) el.classList.add('open');

        const cnt = phase.tasks.filter((_, tIdx) => state[getKey(pIdx, tIdx)]).length;

        el.innerHTML = `
      <div class="phase-header" data-action="togglePhase" data-idx="${pIdx}">
        <div class="phase-number">${phase.num}</div>
        <div class="phase-title-wrap">
          <div class="phase-title">${phase.title}${phase.sub ? ` <small style="font-family:'DM Sans',sans-serif;font-size:0.72rem;font-weight:400;color:var(--warm-mid);">&mdash; ${phase.sub}</small>` : ''}</div>
          <div class="phase-objective">${phase.objective}</div>
        </div>
        <div class="phase-meta">
          <span class="phase-count">${cnt} / ${phase.tasks.length}</span>
          <span class="chevron">▼</span>
        </div>
      </div>
      <div class="phase-body" id="phasebody_${pIdx}">
        ${phase.tasks.map((task, tIdx) => {
          const checked = state[getKey(pIdx, tIdx)] ? 'checked' : '';
          const tsVal  = state[`sign_p${pIdx}_t${tIdx}`] || '';
          const whoVal = state[`who_p${pIdx}_t${tIdx}`]  || '';
          const subChecked = task.photoSent ? !!state[`sub_p${pIdx}_t${tIdx}`] : false;
          const subTick = task.photoSent ? `
            <div class="sub-tick-row${subChecked ? ' sub-checked-row' : ''}" id="subrow_${pIdx}_${tIdx}">
              <div class="sub-checkbox${subChecked ? ' sub-checked' : ''}" id="subcb_${pIdx}_${tIdx}"
                data-action="toggleSubTick" data-pidx="${pIdx}" data-tidx="${tIdx}"></div>
              <span class="sub-tick-label">📸 Photo sent to WhatsApp group</span>
            </div>` : '';
          return `
          <div class="task-row ${checked}" id="row_${pIdx}_${tIdx}">
            <div class="task-checkbox-wrap">
              <div class="task-checkbox" data-action="toggleTask" data-pidx="${pIdx}" data-tidx="${tIdx}"></div>
            </div>
            <div class="task-content">
              <div class="task-action">${task.action}</div>
              <div class="task-notes">${task.notes.replace(/\n/g, '<br>')}</div>
              ${subTick}
            </div>
            <div class="task-timestamp" >
              ${renderTickMeta(tsVal, whoVal)}
            </div>
          </div>`;
        }).join('')}
        <div class="phase-notes-area">
          <label>Phase Notes</label>
          <textarea placeholder="Add site notes, decisions, or follow-ups for this phase…" 
            
            oninput="saveNote(${pIdx}, this.value)">${state[getNoteKey(pIdx)] || ''}</textarea>
        </div>
      </div>
    `;

        if (allDone) el.classList.add('completed');
        container.appendChild(el);
      });

      updateProgress();
    }


    // ── DESIGNER MANAGEMENT ──
    function getInitials(name) {
      return (name || '?').trim().split(/\s+/).map(w => w[0]).join('').substring(0, 2).toUpperCase();
    }

    async function loadDesignerProfiles() {
      // Fetch all profiles with role 'designer' or 'admin'
      const { data, error } = await _supabase
        .from('profiles')
        .select('id, full_name')
        .in('role', ['designer', 'admin'])
        .order('full_name');

      if (!error && data) {
        allDesignerProfiles = data;
      }
      populateDesignerDropdown();
    }

    function populateDesignerDropdown() {
      const sel = document.getElementById('designerSelect');
      if (!sel) return;
      // Clear existing options except placeholder
      sel.innerHTML = '<option value="">— Select a designer to add —</option>';

      const assignedIds = designers.map(d => d.id);
      allDesignerProfiles.forEach(p => {
        // Skip already-assigned designers
        if (assignedIds.includes(p.id)) return;
        const opt = document.createElement('option');
        opt.value = p.id;
        opt.textContent = p.full_name || p.id;
        sel.appendChild(opt);
      });

      // Enable/disable Add button based on selection
      sel.onchange = () => {
        document.getElementById('btnAddDesigner').disabled = !sel.value;
      };
    }

    function renderDesigners() {
      const container = document.getElementById('designerTags');
      const emptyEl   = document.getElementById('designersEmpty');
      if (!container) return;

      Array.from(container.querySelectorAll('.designer-tag')).forEach(el => el.remove());

      if (designers.length === 0) {
        if (emptyEl) emptyEl.style.display = '';
      } else {
        if (emptyEl) emptyEl.style.display = 'none';
        designers.forEach((d, idx) => {
          const isSelf = d.id === currentUserId;
          const tag = document.createElement('span');
          tag.className = 'designer-tag' + (isSelf ? ' is-self' : '');
          tag.innerHTML = `
            <span class="tag-avatar">${getInitials(d.name)}</span>
            <span class="tag-name">
              ${d.name}
              ${isSelf ? '<span class="tag-you">You</span>' : ''}
            </span>
            ${!isReadonly ? `<span class="tag-remove" data-action="removeDesigner" data-idx="${idx}" title="Remove">×</span>` : ''}
          `;
          container.appendChild(tag);
        });
      }

      // Refresh dropdown to exclude newly-added names
      populateDesignerDropdown();
    }

    function addDesignerFromSelect() {
      if (isReadonly) return;
      const sel = document.getElementById('designerSelect');
      const id  = sel.value;
      if (!id) return;
      const profile = allDesignerProfiles.find(p => p.id === id);
      if (!profile) return;
      if (designers.find(d => d.id === id)) return;
      designers.push({ id: profile.id, name: profile.full_name || profile.id });
      sel.value = '';
      document.getElementById('btnAddDesigner').disabled = true;
      renderDesigners();
      triggerSave();
    }

    function removeDesigner(idx) {
      if (isReadonly) return;
      designers.splice(idx, 1);
      renderDesigners();
      triggerSave();
    }

    function resetAll() {
      if (isReadonly) return;
      if (!confirm('Reset all checkboxes and notes? Project name and client info will be kept.')) return;
      state = {};
      buildUI();
      triggerSave();
    }

    // Event Listeners
    document.getElementById('proj_name').addEventListener('input', triggerSave);
    document.getElementById('proj_client').addEventListener('input', triggerSave);
    document.getElementById('proj_date').addEventListener('change', triggerSave);

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
    document.addEventListener('click', function(e) {
        const btn = e.target.closest('[data-action]');
        if (!btn) return;
        e.stopPropagation();
        const action = btn.dataset.action;
        if (action === 'goHome') window.location.href = 'index.html';
        else if (action === 'manualSave') manualSave();
        else if (action === 'resetAll') resetAll();
        else if (action === 'addDesignerFromSelect') addDesignerFromSelect();
        else if (action === 'togglePhase') togglePhase(Number(btn.dataset.idx));
        else if (action === 'toggleSubTick') { e.stopPropagation(); toggleSubTick(Number(btn.dataset.pidx), Number(btn.dataset.tidx)); }
        else if (action === 'toggleTask') toggleTask(Number(btn.dataset.pidx), Number(btn.dataset.tidx));
        else if (action === 'removeDesigner') removeDesigner(Number(btn.dataset.idx));
    });