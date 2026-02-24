const { createClient } = supabase;
    const _supabase = createClient(
        'https://ilytehukqrkwpupdpkgo.supabase.co',
        'sb_publishable_tNMpLdZaqm0e-El_LP4kKg_fhfj-ARF'
    );

    let selectedFile = null;

    // Allowed file types for floor plan uploads (checked client-side as first layer)
    const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'application/pdf'];
    const ALLOWED_EXTENSIONS = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'pdf'];

    function validateFile(file) {
        if (!file) return false;
        if (file.size > 10 * 1024 * 1024) {
            showToast('File too large. Please upload a file under 10MB.');
            return false;
        }
        const ext = file.name.split('.').pop().toLowerCase();
        if (!ALLOWED_MIME_TYPES.includes(file.type) || !ALLOWED_EXTENSIONS.includes(ext)) {
            showToast('Invalid file type. Please upload an image (JPG, PNG, GIF, WEBP) or PDF.');
            return false;
        }
        return true;
    }

    // ── FILE HANDLING ──────────────────────────────────────────────
    function handleFileSelect(e) {
        const file = e.target.files[0];
        if (!file) return;
        if (!validateFile(file)) {
            e.target.value = '';
            return;
        }
        selectedFile = file;
        document.getElementById('fileName').textContent = file.name;
        document.getElementById('filePreview').classList.add('visible');
        document.getElementById('err-floorPlan').classList.remove('visible');
    }

    function removeFile() {
        selectedFile = null;
        document.getElementById('floorPlanFile').value = '';
        document.getElementById('filePreview').classList.remove('visible');
    }

    // Drag & drop
    const uploadArea = document.getElementById('uploadArea');
    uploadArea.addEventListener('dragover', e => { e.preventDefault(); uploadArea.classList.add('drag-over'); });
    uploadArea.addEventListener('dragleave', () => uploadArea.classList.remove('drag-over'));
    uploadArea.addEventListener('drop', e => {
        e.preventDefault();
        uploadArea.classList.remove('drag-over');
        const file = e.dataTransfer.files[0];
        if (file && validateFile(file)) {
            selectedFile = file;
            document.getElementById('fileName').textContent = file.name;
            document.getElementById('filePreview').classList.add('visible');
        }
    });

    // ── CONDITIONAL TOGGLES ────────────────────────────────────────
    function toggleOCS() {
        const val = document.querySelector('input[name="ocs"]:checked')?.value;
        document.getElementById('ocsDetails').classList.toggle('visible', val === 'yes');
    }

    function toggleHackWalls() {
        const val = document.querySelector('input[name="hackWalls"]:checked')?.value;
        document.getElementById('hackWallsDetails').classList.toggle('visible', val === 'yes');
    }

    function toggleRemoveDoors() {
        const val = document.querySelector('input[name="removeDoors"]:checked')?.value;
        document.getElementById('removeDoorsDetails').classList.toggle('visible', val === 'yes');
    }

    function toggleFalseCeiling() {
        const val = document.querySelector('input[name="falseCeiling"]:checked')?.value;
        document.getElementById('falseCeilingDetails').classList.toggle('visible', val === 'yes');
    }

    // ── HELPER ────────────────────────────────────────────────────
    function radio(name) {
        return document.querySelector(`input[name="${name}"]:checked`)?.value || null;
    }

    function val(id) {
        return document.getElementById(id)?.value.trim() || null;
    }

    // ── VALIDATION ────────────────────────────────────────────────
    function validate() {
        let valid = true;

        const fields = [
            { id: 'clientName', errId: 'err-clientName' },
            { id: 'unitType', errId: 'err-unitType' },
        ];

        fields.forEach(({ id, errId }) => {
            const el = document.getElementById(id);
            const err = document.getElementById(errId);
            if (!el.value.trim()) {
                el.classList.add('invalid');
                err.classList.add('visible');
                valid = false;
            } else {
                el.classList.remove('invalid');
                err.classList.remove('visible');
            }
        });

        if (!selectedFile) {
            document.getElementById('err-floorPlan').classList.add('visible');
            valid = false;
        }

        if (!radio('ocs')) {
            document.getElementById('err-ocs').classList.add('visible');
            valid = false;
        } else {
            document.getElementById('err-ocs').classList.remove('visible');
        }

        if (!radio('countertop')) {
            document.getElementById('err-countertop').classList.add('visible');
            valid = false;
        } else {
            document.getElementById('err-countertop').classList.remove('visible');
        }

        if (!radio('wardrobeMaster')) {
            document.getElementById('err-wardrobeMaster').classList.add('visible');
            valid = false;
        } else {
            document.getElementById('err-wardrobeMaster').classList.remove('visible');
        }

        return valid;
    }

    // ── SUBMIT ────────────────────────────────────────────────────
    async function submitQuoteRequest() {
        if (!validate()) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            // Find first error
            const firstErr = document.querySelector('.field-error.visible, input.invalid, select.invalid');
            if (firstErr) firstErr.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
        }

        const btn = document.getElementById('submitBtn');
        btn.disabled = true;
        btn.textContent = 'Submitting...';

        try {
            const { data: { user } } = await _supabase.auth.getUser();
            if (!user) { showToast('Session expired. Please log in again.'); window.location.href = 'index.html'; return; }

            // Upload floor plan to Supabase Storage
            let floorPlanUrl = null;
            if (selectedFile) {
                const ext = selectedFile.name.split('.').pop();
                const path = `floor-plans/${user.id}/${Date.now()}.${ext}`;
                const { data: uploadData, error: uploadErr } = await _supabase
                    .storage
                    .from('ai-quotes')
                    .upload(path, selectedFile, { upsert: false });

                if (uploadErr) throw uploadErr;


                // Use a signed URL (7-day expiry) to protect client floor plans from public access
                const { data: signedData, error: signedErr } = await _supabase
                    .storage
                    .from('ai-quotes')
                    .createSignedUrl(path, 60 * 60 * 24 * 7);
                if (signedErr) throw signedErr;
                floorPlanUrl = signedData.signedUrl;


            }

            // Build answers object
            const answers = {
                unit_type: val('unitType'),
                ocs_opted_out: radio('ocs'),
                flooring_material: radio('ocs') === 'yes' ? val('flooringMaterial') : null,
                flooring_area_sqft: radio('ocs') === 'yes' ? val('flooringArea') : null,
                hack_walls: radio('hackWalls'),
                hack_walls_desc: radio('hackWalls') === 'yes' ? val('hackWallsDesc') : null,
                hack_bifold: radio('hackBifold'),
                remove_doors: radio('removeDoors'),
                remove_doors_desc: radio('removeDoors') === 'yes' ? val('removeDoorsDesc') : null,
                countertop: radio('countertop'),
                backsplash: radio('backsplash'),
                cement_base: radio('cementBase'),
                kerb_master: radio('kerbMaster'),
                kerb_common: radio('kerbCommon'),
                wardrobe_master: radio('wardrobeMaster'),
                wardrobe_bed2: radio('wardrobe2'),
                wardrobe_bed3: radio('wardrobe3'),
                false_ceiling: radio('falseCeiling'),
                ceiling_area_sqft: radio('falseCeiling') === 'yes' ? val('ceilingArea') : null,
                cove_lighting: radio('falseCeiling') === 'yes' ? radio('coveLighting') : null,
                bedroom_doors: radio('bedroomDoors'),
                toilet_doors: radio('toiletDoors'),
                remarks: val('remarks'),
            };

            // Insert into ai_quote_requests table
            const { error: insertErr } = await _supabase
                .from('ai_quote_requests')
                .insert([{
                    user_id: user.id,
                    client_name: val('clientName'),
                    project_address: val('projectAddress'),
                    floor_plan_url: floorPlanUrl,
                    floor_plan_filename: selectedFile?.name || null,
                    answers: answers,
                    status: 'pending',
                }]);

            if (insertErr) throw insertErr;

            document.getElementById('formView').style.display = 'none';
            document.getElementById('successView').classList.add('visible');

        } catch (err) {
            console.error(err);
            showToast('Something went wrong: ' + (err.message || 'Unknown error'));
            btn.disabled = false;
            btn.textContent = 'Submit Quote Request';
        }
    }

    // Auth guard
    async function init() {
        const { data: { session } } = await _supabase.auth.getSession();
        if (!session) { window.location.href = 'index.html'; }
    }

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
    const action = btn.dataset.action;
    if (action === 'removeFile') removeFile();
    else if (action === 'submitQuoteRequest') submitQuoteRequest();
  });