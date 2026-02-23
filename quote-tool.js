// Fallback to jsDelivr if cdnjs fails
        if (typeof XLSXStyle === 'undefined') {
            const script = document.createElement('script');
            script.src = "https://cdn.jsdelivr.net/npm/xlsx-js-style@1.2.0/dist/xlsx.bundle.js";
            document.head.appendChild(script);
        }

// Fallback to unpkg if jsDelivr also fails
        setTimeout(() => {
            if (typeof XLSXStyle === 'undefined') {
                const script = document.createElement('script');
                script.src = "https://unpkg.com/xlsx-js-style@1.2.0/dist/xlsx.bundle.js";
                document.head.appendChild(script);
            }
        }, 1000); // Wait a bit for the previous fallback to load

// Expose _sb and currentUserId globally so quote save functions can use them
  let _sb, _currentUserId;
  (async function() {
    const { createClient } = supabase;
    _sb = createClient('https://ilytehukqrkwpupdpkgo.supabase.co','sb_publishable_tNMpLdZaqm0e-El_LP4kKg_fhfj-ARF');
    const { data: { session } } = await _sb.auth.getSession();
    if (!session) { document.getElementById('auth-checking').style.display='none'; document.getElementById('access-denied').style.display='flex'; return; }
    const { data: profile } = await _sb.from('profiles').select('role').eq('id', session.user.id).single();
    if (!profile || profile.role !== 'admin') { document.getElementById('auth-checking').style.display='none'; document.getElementById('access-denied').style.display='flex'; return; }
    _currentUserId = session.user.id;
    document.getElementById('auth-checking').style.display = 'none';
  })();

const DATABASE = [
            // ALUMINIUM, WINDOW AND GLASS WORKS
            { code: "WIN-01", category: "ALUMINIUM, WINDOW AND GLASS WORKS", name: "Shower Screen 1fix 1 swing", description: "Supply and install 1 full fixed panel and 1 full swing door for shower screen ([DIMENSIONS])", unit: "pcs", displayUnit: "pcs", unitCost: 750 },
            { code: "WIN-02", category: "ALUMINIUM, WINDOW AND GLASS WORKS", name: "Shower Screen 2 fix 2 slide", description: "Supply and install full height 2 fix 2 slide shower screen for common bath ([DIMENSIONS])", unit: "pcs", displayUnit: "pcs", unitCost: 750 },
            { code: "WIN-04", category: "ALUMINIUM, WINDOW AND GLASS WORKS", name: "Frosted Glass Sliding Door (Bathroom)", description: "Supply and install frosted glass sliding door with aluminium frame for bathroom ([DIMENSIONS])", unit: "pcs", displayUnit: "pcs", unitCost: 1050 },
            { code: "WIN-05", category: "ALUMINIUM, WINDOW AND GLASS WORKS", name: "Fixed Panel Shower Screen (Low)", description: "Supply and install full height fixed panel shower screen up to 900mm W x 900mm H", unit: "pcs", displayUnit: "pcs", unitCost: 300 },
            { code: "WIN-03", category: "ALUMINIUM, WINDOW AND GLASS WORKS", name: "Service Yard Window", description: "Supply and install 3 way sliding window at service yard ([DIMENSIONS])", unit: "pfr", displayUnit: "ft", unitCost: 100 },
            // CARPENTRY - BATHROOM
            { code: "BAT-01", category: "CARPENTRY - BATHROOM", name: "Laminated Door", description: "Supply and install laminated door for common bath in selected laminate finish, c/w lever handle ([DIMENSIONS])", unit: "pcs", displayUnit: "pcs", unitCost: 500 },
            { code: "BAT-02", category: "CARPENTRY - BATHROOM", name: "Vanity Cabinet", description: "Supply and install floating vanity cabinet with integrated sink ([DIMENSIONS])", unit: "pc", displayUnit: "pc", unitCost: 0 },
            // CARPENTRY - C1 BEDROOM
            { code: "C1BED1", category: "CARPENTRY - C1 BEDROOM", name: "Wardrobe Casement (Bedroom 2)", description: "Design, fabricate and install casement wardrobe for bedroom 2 in selected laminate finish ([DIMENSIONS])", unit: "pfr", displayUnit: "ft", unitCost: 300 },
            { code: "C1BED2", category: "CARPENTRY - C1 BEDROOM", name: "Wardrobe Slide (Bedroom 2)", description: "Design, fabricate and install sliding door wardrobe for bedroom 2 in selected laminate finish ([DIMENSIONS])", unit: "pfr", displayUnit: "ft", unitCost: 350 },
            { code: "C1BED3", category: "CARPENTRY - C1 BEDROOM", name: "Headboard Laminate (Bedroom 2)", description: "Design, fabricate and install headboard for bedroom 2 in selected laminate finish ([DIMENSIONS])", unit: "psf", displayUnit: "sf", unitCost: 30 },
            { code: "C1BED4", category: "CARPENTRY - C1 BEDROOM", name: "Headboard PVC (Bedroom 2)", description: "Design, fabricate and install headboard for bedroom 2 in pvc/fabric cushion finish ([DIMENSIONS])", unit: "psf", displayUnit: "sf", unitCost: 40 },
            { code: "C1BED5", category: "CARPENTRY - C1 BEDROOM", name: "Bedside Table (Bedroom 2)", description: "Design, fabricate and install bedside table for bedroom 2 with drawer ([DIMENSIONS])", unit: "set", displayUnit: "set", unitCost: 350 },
            { code: "C1BED13", category: "CARPENTRY - C1 BEDROOM", name: "Study Desk with Drawer (Bedroom 2)", description: "Design, fabricate and install study desk c/w drawer in selected laminate finish ([DIMENSIONS])", unit: "pfr", displayUnit: "ft", unitCost: 175 },
            { code: "C1BED7", category: "CARPENTRY - C1 BEDROOM", name: "Bed Single (Bedroom 2)", description: "Bed box of Single-sized mattress in selected laminate finish", unit: "set", displayUnit: "set", unitCost: 1200 },
            { code: "C1BED8", category: "CARPENTRY - C1 BEDROOM", name: "Bed Single with Storage (Bedroom 2)", description: "Bed box of Single-sized mattress (with Storage) in selected laminate finish", unit: "set", displayUnit: "set", unitCost: 1400 },
            { code: "C1BED9", category: "CARPENTRY - C1 BEDROOM", name: "Bed Queen (Bedroom 2)", description: "Bed box Queen-sized mattress in selected laminate finish", unit: "set", displayUnit: "set", unitCost: 1400 },
            { code: "C1BED10", category: "CARPENTRY - C1 BEDROOM", name: "Bed Queen with Storage (Bedroom 2)", description: "Bed box Queen-sized mattress (with Storage) in selected laminate finish", unit: "set", displayUnit: "set", unitCost: 1500 },
            { code: "C1BED11", category: "CARPENTRY - C1 BEDROOM", name: "Bed King (Bedroom 2)", description: "Bed box King-sized mattress in selected laminate finish", unit: "set", displayUnit: "set", unitCost: 1500 },
            { code: "C1BED12", category: "CARPENTRY - C1 BEDROOM", name: "Bed King with Storage (Bedroom 2)", description: "Bed box King-sized mattress (with Storage) in selected laminate finish", unit: "set", displayUnit: "set", unitCost: 1600 },
            // CARPENTRY - C2 BEDROOM
            { code: "C2BED1", category: "CARPENTRY - C2 BEDROOM", name: "Wardrobe Casement (Bedroom 3)", description: "Design, fabricate and install casement wardrobe for bedroom 3 in selected laminate finish ([DIMENSIONS])", unit: "pfr", displayUnit: "ft", unitCost: 300 },
            { code: "C2BED2", category: "CARPENTRY - C2 BEDROOM", name: "Wardrobe Slide (Bedroom 3)", description: "Design, fabricate and install sliding door wardrobe for bedroom 3 in selected laminate finish ([DIMENSIONS])", unit: "pfr", displayUnit: "ft", unitCost: 350 },
            { code: "C2BED3", category: "CARPENTRY - C2 BEDROOM", name: "Headboard Laminate (Bedroom 3)", description: "Design, fabricate and install headboard for bedroom 3 in selected laminate finish ([DIMENSIONS])", unit: "psf", displayUnit: "sf", unitCost: 30 },
            { code: "C2BED4", category: "CARPENTRY - C2 BEDROOM", name: "Headboard PVC (Bedroom 3)", description: "Design, fabricate and install headboard for bedroom 3 in pvc/fabric cushion finish ([DIMENSIONS])", unit: "psf", displayUnit: "sf", unitCost: 40 },
            { code: "C2BED5", category: "CARPENTRY - C2 BEDROOM", name: "Bedside Table (Bedroom 3)", description: "Design, fabricate and install bedside table for bedroom 3 with drawer ([DIMENSIONS])", unit: "set", displayUnit: "set", unitCost: 350 },
            { code: "C2BED13", category: "CARPENTRY - C2 BEDROOM", name: "Study Desk with Drawer (Bedroom 3)", description: "Design, fabricate and install study desk c/w drawer in selected laminate finish ([DIMENSIONS])", unit: "pfr", displayUnit: "ft", unitCost: 175 },
            { code: "C2BED7", category: "CARPENTRY - C2 BEDROOM", name: "Bed Single (Bedroom 3)", description: "Bed box of Single-sized mattress in selected laminate finish", unit: "set", displayUnit: "set", unitCost: 1200 },
            { code: "C2BED8", category: "CARPENTRY - C2 BEDROOM", name: "Bed Single with Storage (Bedroom 3)", description: "Bed box of Single-sized mattress (with Storage) in selected laminate finish", unit: "set", displayUnit: "set", unitCost: 1400 },
            { code: "C2BED9", category: "CARPENTRY - C2 BEDROOM", name: "Bed Queen (Bedroom 3)", description: "Bed box Queen-sized mattress in selected laminate finish", unit: "set", displayUnit: "set", unitCost: 1400 },
            { code: "C2BED10", category: "CARPENTRY - C2 BEDROOM", name: "Bed Queen with Storage (Bedroom 3)", description: "Bed box Queen-sized mattress (with Storage) in selected laminate finish", unit: "set", displayUnit: "set", unitCost: 1500 },
            { code: "C2BED11", category: "CARPENTRY - C2 BEDROOM", name: "Bed King (Bedroom 3)", description: "Bed box King-sized mattress in selected laminate finish", unit: "set", displayUnit: "set", unitCost: 1500 },
            { code: "C2BED12", category: "CARPENTRY - C2 BEDROOM", name: "Bed King with Storage (Bedroom 3)", description: "Bed box King-sized mattress (with Storage) in selected laminate finish", unit: "set", displayUnit: "set", unitCost: 1600 },
            // CARPENTRY - FOYER & LIVING ROOM
            { code: "E-CARP", category: "CARPENTRY - FOYER & LIVING ROOM", name: "Shoe Cabinet Half Height", description: "Design, fabricate and install shoe cabinet with casement doors half height in selected laminate finish ([DIMENSIONS])", unit: "pfr", displayUnit: "ft", unitCost: 180 },
            { code: "FOY-02", category: "CARPENTRY - FOYER & LIVING ROOM", name: "Shoe Cabinet Full Height", description: "Design, fabricate and install shoe cabinet with casement doors full height in selected laminate finish ([DIMENSIONS])", unit: "pfr", displayUnit: "ft", unitCost: 300 },
            { code: "FOY-03", category: "CARPENTRY - FOYER & LIVING ROOM", name: "Settee with Storage", description: "Design, fabricate and install settee with storage in selected laminate finish ([DIMENSIONS])", unit: "pfr", displayUnit: "ft", unitCost: 180 },
            { code: "FOY-04", category: "CARPENTRY - FOYER & LIVING ROOM", name: "Household Shelter / DB Panel", description: "Design, fabricate and install full height panel concealing household shelter / DB box c/w tic tac mechanism door in selected laminate finish ([DIMENSIONS])", unit: "pfr", displayUnit: "ft", unitCost: 300 },
            { code: "F-LIV", category: "CARPENTRY - FOYER & LIVING ROOM", name: "Feature Wall (1 side)", description: "Design, fabricate and install feature wall (1 side) in selected laminate finish ([DIMENSIONS])", unit: "psf", displayUnit: "sf", unitCost: 30 },
            { code: "LIV-02", category: "CARPENTRY - FOYER & LIVING ROOM", name: "Feature Wall (2 sides)", description: "Design, fabricate and install feature wall (2 sides) in selected laminate finish ([DIMENSIONS])", unit: "psf", displayUnit: "sf", unitCost: 55 },
            { code: "LIV-03", category: "CARPENTRY - FOYER & LIVING ROOM", name: "TV Console", description: "Design, fabricate and install TV console with drawers in selected laminate finish ([DIMENSIONS])", unit: "pfr", displayUnit: "ft", unitCost: 180 },
            { code: "LIV-04", category: "CARPENTRY - FOYER & LIVING ROOM", name: "TV Console 2-Tier", description: "Design, fabricate and install TV console with drawers (2 tier) in selected laminate finish ([DIMENSIONS])", unit: "pfr", displayUnit: "ft", unitCost: 200 },
            { code: "LIV-06", category: "CARPENTRY - FOYER & LIVING ROOM", name: "Plasterboard Arch", description: "Provide labor and materials to frame and finish a plasterboard archway ([DIMENSIONS])", unit: "pfr", displayUnit: "ft", unitCost: 50 },
            // CARPENTRY - KITCHEN & SERVICE YARD
            { code: "KIT-02", category: "CARPENTRY - KITCHEN & SERVICE YARD", name: "Bottom Cabinet - Kitchen", description: "Design, fabricate and install kitchen bottom cabinet in selected laminate finish ([DIMENSIONS])", unit: "pfr", displayUnit: "ft", unitCost: 150 },

            { code: "G-KIT", category: "CARPENTRY - KITCHEN & SERVICE YARD", name: "Top Cabinet", description: "Design, fabricate and install kitchen top cabinet in selected laminate finish ([DIMENSIONS])", unit: "pfr", displayUnit: "ft", unitCost: 150 },
            { code: "KIT-03", category: "CARPENTRY - KITCHEN & SERVICE YARD", name: "Tall Boy", description: "Design, fabricate and install kitchen tall boy set in selected laminate finish ([DIMENSIONS])", unit: "pfr", displayUnit: "ft", unitCost: 450 },
            { code: "KIT-04", category: "CARPENTRY - KITCHEN & SERVICE YARD", name: "Fridge Cabinet", description: "Design, fabricate and install fridge top cabinet c/w side panel in selected laminate finish ([DIMENSIONS])", unit: "pfr", displayUnit: "ft", unitCost: 250 },
            { code: "KIT-05", category: "CARPENTRY - KITCHEN & SERVICE YARD", name: "Island / Bar Counter", description: "Design, fabricate and install Island unit / Bar counter c/w swing door (2 side exposed) ([DIMENSIONS])", unit: "pfr", displayUnit: "ft", unitCost: 250 },
            { code: "KIT-06", category: "CARPENTRY - KITCHEN & SERVICE YARD", name: "Sintered Stone Top", description: "Supply and install Melmer/Aurastone/LianHin sintered stone table top, single profile ([DIMENSIONS])", unit: "pfr", displayUnit: "ft", unitCost: 150 },
            { code: "KIT-07", category: "CARPENTRY - KITCHEN & SERVICE YARD", name: "Sintered Stone Backsplash", description: "Supply and install sintered stone backsplash for kitchen bottom cabinet ([DIMENSIONS])", unit: "pfr", displayUnit: "ft", unitCost: 150 },
            { code: "KIT-14", category: "CARPENTRY - KITCHEN & SERVICE YARD", name: "Quartz Top", description: "Supply and install Aurastone classic series single profile quartz table top ([DIMENSIONS])", unit: "pfr", displayUnit: "ft", unitCost: 125 },
            { code: "KIT-10", category: "CARPENTRY - KITCHEN & SERVICE YARD", name: "Stainless Steel Top", description: "Supply and install stainless steel table top 4mm thk ([DIMENSIONS])", unit: "pfr", displayUnit: "ft", unitCost: 200 },
            { code: "KIT-11", category: "CARPENTRY - KITCHEN & SERVICE YARD", name: "Stainless Steel Backsplash", description: "Supply and install stainless steel backsplash 1mm thk ([DIMENSIONS])", unit: "pfr", displayUnit: "ft", unitCost: 155 },
            { code: "KIT-08", category: "CARPENTRY - KITCHEN & SERVICE YARD", name: "Blum Aventos Lift-Up", description: "Blum HK Aventos Lift up system", unit: "set", displayUnit: "set", unitCost: 150 },
            { code: "KIT-09", category: "CARPENTRY - KITCHEN & SERVICE YARD", name: "Bottom Cabinet - Service Yard", description: "Design, fabricate and install service yard bottom cabinet in selected laminate finish ([DIMENSIONS])", unit: "pfr", displayUnit: "ft", unitCost: 150 },
            { code: "KIT-12", category: "CARPENTRY - KITCHEN & SERVICE YARD", name: "Dry Pantry - Half Height", description: "Design, fabricate and install dry pantry half height cabinet with laminated top in selected laminate finish ([DIMENSIONS])", unit: "pfr", displayUnit: "ft", unitCost: 150 },
            { code: "KIT-13", category: "CARPENTRY - KITCHEN & SERVICE YARD", name: "Dry Pantry - Full Height", description: "Design, fabricate and install dry pantry full height cabinet in selected laminate finish ([DIMENSIONS])", unit: "pfr", displayUnit: "ft", unitCost: 300 },
            // CARPENTRY - MASTER BEDROOM
            { code: "MBED1", category: "CARPENTRY - MASTER BEDROOM", name: "Wardrobe Casement (Master Bedroom)", description: "Design, fabricate and install master bedroom casement wardrobe in selected laminate finish ([DIMENSIONS])", unit: "pfr", displayUnit: "ft", unitCost: 300 },
            { code: "MBED2", category: "CARPENTRY - MASTER BEDROOM", name: "Wardrobe Sliding (Master Bedroom)", description: "Design, fabricate and install master bedroom sliding door wardrobe in selected laminate finish ([DIMENSIONS])", unit: "pfr", displayUnit: "ft", unitCost: 350 },
            { code: "MBED3", category: "CARPENTRY - MASTER BEDROOM", name: "Headboard Laminate (Master Bedroom)", description: "Design, fabricate and install master bedroom headboard in selected laminate finish ([DIMENSIONS])", unit: "psf", displayUnit: "sf", unitCost: 30 },
            { code: "MBED4", category: "CARPENTRY - MASTER BEDROOM", name: "Headboard PVC (Master Bedroom)", description: "Design, fabricate and install master bedroom headboard in pvc/fabric cushion finish ([DIMENSIONS])", unit: "psf", displayUnit: "sf", unitCost: 40 },
            { code: "MBED5", category: "CARPENTRY - MASTER BEDROOM", name: "Bedside Table (Master Bedroom)", description: "Design, fabricate and install master bedroom bedside table with drawer ([DIMENSIONS])", unit: "set", displayUnit: "set", unitCost: 350 },
            { code: "MBED13", category: "CARPENTRY - MASTER BEDROOM", name: "Study Desk with Drawer (Master Bedroom)", description: "Design, fabricate and install study desk c/w drawer in selected laminate finish ([DIMENSIONS])", unit: "pfr", displayUnit: "ft", unitCost: 175 },
            { code: "MBED7", category: "CARPENTRY - MASTER BEDROOM", name: "Bed Single (Master Bedroom)", description: "Bed box of Single-sized mattress in selected laminate finish", unit: "set", displayUnit: "set", unitCost: 1200 },
            { code: "MBED8", category: "CARPENTRY - MASTER BEDROOM", name: "Bed Single with Storage (Master Bedroom)", description: "Bed box of Single-sized mattress (with Storage) in selected laminate finish", unit: "set", displayUnit: "set", unitCost: 1400 },
            { code: "MBED9", category: "CARPENTRY - MASTER BEDROOM", name: "Bed Queen (Master Bedroom)", description: "Bed box Queen-sized mattress in selected laminate finish", unit: "set", displayUnit: "set", unitCost: 1400 },
            { code: "MBED10", category: "CARPENTRY - MASTER BEDROOM", name: "Bed Queen with Storage (Master Bedroom)", description: "Bed box Queen-sized mattress (with Storage) in selected laminate finish", unit: "set", displayUnit: "set", unitCost: 1500 },
            { code: "MBED11", category: "CARPENTRY - MASTER BEDROOM", name: "Bed King (Master Bedroom)", description: "Bed box King-sized mattress in selected laminate finish", unit: "set", displayUnit: "set", unitCost: 1500 },
            { code: "MBED12", category: "CARPENTRY - MASTER BEDROOM", name: "Bed King with Storage (Master Bedroom)", description: "Bed box King-sized mattress (with Storage) in selected laminate finish", unit: "set", displayUnit: "set", unitCost: 1600 },
            // DEMOLITION
            { code: "DEMO-01", category: "DEMOLITION", name: "Hack Wall", description: "Supply labour & tools to hack bedroom wall ([DIMENSIONS])", unit: "pfr", displayUnit: "ft", unitCost: 65 },
            { code: "DEMO-02", category: "DEMOLITION", name: "Hack Tiles", description: "Supply labour to hack wall/floor tiles ([DIMENSIONS])", unit: "sqft", displayUnit: "sqft", unitCost: 3.5 },
            { code: "DEMO-03", category: "DEMOLITION", name: "Remove Door Frame", description: "Supply labour & tools to remove door frame ([DIMENSIONS])", unit: "nos", displayUnit: "nos", unitCost: 150 },
            { code: "DEMO-04", category: "DEMOLITION", name: "Hack Bi-fold Door & Window", description: "Supply material & labour to hack service yard bi-fold door & 2 windows", unit: "nos", displayUnit: "nos", unitCost: 350 },
            { code: "DEMO-07", category: "DEMOLITION", name: "Remove Door", description: "Supply labour & tools to remove existing door", unit: "nos", displayUnit: "nos", unitCost: 75 },
            { code: "DEMO-08", category: "DEMOLITION", name: "Remove Door & Door Frame", description: "Supply labour & tools to remove existing door and door frame", unit: "nos", displayUnit: "nos", unitCost: 150 },
            { code: "DEMO-06", category: "DEMOLITION", name: "Touch Up Walls & Ceiling (Post-Hacking)", description: "Supply labour and material to touch up walls & ceiling after hacking ([DIMENSIONS])", unit: "pfr", displayUnit: "ft", unitCost: 50 },
            // ELECTRICAL
            { code: "ELE-01", category: "ELECTRICAL", name: "Light Point (supply)", description: "Supply new lighting point", unit: "nos", displayUnit: "nos", unitCost: 45 },
            { code: "ELE-02", category: "ELECTRICAL", name: "Install Light", description: "Installation of lighting", unit: "nos", displayUnit: "nos", unitCost: 15 },
            { code: "ELE-03", category: "ELECTRICAL", name: "Track Light (1m)", description: "Installation of track light (1m)", unit: "nos", displayUnit: "nos", unitCost: 30 },
            { code: "ELE-04", category: "ELECTRICAL", name: "LED Driver Point", description: "Supply new LED and driver point", unit: "nos", displayUnit: "nos", unitCost: 50 },
            { code: "ELE-05", category: "ELECTRICAL", name: "LED Strip Install (up to 5m)", description: "Installation of LED light strip (up to 5m)", unit: "nos", displayUnit: "nos", unitCost: 60 },
            { code: "ELE-06", category: "ELECTRICAL", name: "Fan Point (supply)", description: "Supply new fan point", unit: "nos", displayUnit: "nos", unitCost: 55 },
            { code: "ELE-07", category: "ELECTRICAL", name: "Install Fan", description: "Installation of fan", unit: "nos", displayUnit: "nos", unitCost: 55 },
            { code: "ELE-08", category: "ELECTRICAL", name: "13A Single Power Point", description: "Supply and labour 13A x 1 power point", unit: "nos", displayUnit: "nos", unitCost: 80 },
            { code: "ELE-09", category: "ELECTRICAL", name: "13A Double Power Point", description: "Supply and labour 13A x 2 power point", unit: "nos", displayUnit: "nos", unitCost: 85 },
            { code: "ELE-10", category: "ELECTRICAL", name: "Data Point (CAT6E)", description: "Supply and labour CAT6E data point", unit: "nos", displayUnit: "nos", unitCost: 150 },
            { code: "ELE-11", category: "ELECTRICAL", name: "Hood/Hob/Oven Point (20A)", description: "Supply and labour hood/hob/oven point (20A)", unit: "nos", displayUnit: "nos", unitCost: 120 },
            { code: "ELE-PKG", category: "ELECTRICAL", name: "4Rm BTO Electrical Package", description: "Install 12x surface light, install 4x fans, supply 5x concealed sockets, supply hob/hood/oven point, install kitchen LED light", unit: "ls", displayUnit: "ls", unitCost: 1538 },
            // FALSE CEILING & PARTITION
            { code: "FAL-02", category: "FALSE CEILING & PARTITION", name: "False Ceiling", description: "Supply labour and material to construct false ceiling ([DIMENSIONS])", unit: "sqft", displayUnit: "sqft", unitCost: 5 },
            { code: "FAL-04", category: "FALSE CEILING & PARTITION", name: "Curtain Pelmet", description: "Supply labour and material to construct curtain pelmet ([DIMENSIONS])", unit: "pfr", displayUnit: "ft", unitCost: 30 },

            { code: "FAL-01", category: "FALSE CEILING & PARTITION", name: "Partition Wall (Plasterboard)", description: "Supply labour and material to construct plasterboard partition wall", unit: "nos", displayUnit: "nos", unitCost: 1200 },
            { code: "FAL-03", category: "FALSE CEILING & PARTITION", name: "Hollow Block Wall", description: "Supply material & labour to construct full height hollow block wall ([DIMENSIONS])", unit: "pfr", displayUnit: "ft", unitCost: 164 },
            // MASONRY - COMMON BATHROOM
            { code: "MAS-07", category: "MASONRY - COMMON BATHROOM", name: "Shower Drop / Kerb / Slope", description: "Supply material & labour to construct shower drop/kerb/slope for common bathroom", unit: "nos", displayUnit: "nos", unitCost: 200 },
            // MASONRY - KITCHEN & SERVICE YARD
            { code: "MAS-01", category: "MASONRY - KITCHEN & SERVICE YARD", name: "Kitchen Cabinet Cement Base", description: "Supply material & labour to construct kitchen cabinet cement mortar base ([DIMENSIONS])", unit: "pfr", displayUnit: "ft", unitCost: 50 },
            // MASONRY - LIVING ROOM & BEDROOM
            { code: "MAS-08", category: "MASONRY - LIVING ROOM & BEDROOM", name: "Seal Door Opening (Hollow Block)", description: "Supply material & labour to seal up existing door opening using hollow block", unit: "nos", displayUnit: "nos", unitCost: 500 },
            { code: "MAS-03", category: "MASONRY - LIVING ROOM & BEDROOM", name: "Cement Screed Floor", description: "Supply material & labour to lay cement screeding for living, foyer, hallway and 3 bedrooms ([DIMENSIONS])", unit: "sqft", displayUnit: "sqft", unitCost: 5 },
            { code: "MAS-05", category: "MASONRY - LIVING ROOM & BEDROOM", name: "Self-Leveling Compound", description: "Supply material & labour to apply self-leveling compound for living, foyer, hallway and 3 bedrooms ([DIMENSIONS])", unit: "sqft", displayUnit: "sqft", unitCost: 2 },
            // MASONRY - MASTER BATHROOM
            { code: "MAS-02", category: "MASONRY - MASTER BATHROOM", name: "Shower Drop / Kerb / Slope", description: "Supply material & labour to construct shower drop/kerb/slope for master bathroom", unit: "nos", displayUnit: "nos", unitCost: 200 },
            // MISC
            { code: "MIS-01", category: "MISC", name: "Stainless Steel Dish Rack", description: "Stainless steel dish rack & pvc cutlery tray", unit: "set", displayUnit: "set", unitCost: 0 },
            { code: "MIS-02", category: "MISC", name: "Platform (Mid Height) with Storage", description: "Supply and install platform with storage (Mid Height) in selected laminate finish ([DIMENSIONS])", unit: "psf", displayUnit: "sf", unitCost: 38 },
            { code: "MIS-05", category: "MISC", name: "Platform (Low Height) with Storage", description: "Supply and install platform with storage (Low Height) in selected laminate finish ([DIMENSIONS])", unit: "psf", displayUnit: "sf", unitCost: 32 },
            { code: "MIS-03", category: "MISC", name: "Paint Walls", description: "Supply labour to paint walls with Nippon Paint Vinilex 5000 (3 colours)", unit: "ls", displayUnit: "ls", unitCost: 1400 },
            { code: "MIS-04", category: "MISC", name: "Paint Ceiling", description: "Supply labour to paint ceiling with Nippon Paint Matex white", unit: "ls", displayUnit: "ls", unitCost: 300 },
            { code: "MIS-06", category: "MISC", name: "Paint Sealer", description: "Supply labour to paint water base sealer", unit: "ls", displayUnit: "ls", unitCost: 300 },
            { code: "MIS-07", category: "MISC", name: "3 Bedroom Laminated Doors", description: "Supply and install 3 bedroom laminated doors in selected laminate finish", unit: "ls", displayUnit: "ls", unitCost: 1350 },
            { code: "MIS-08", category: "MISC", name: "2 Toilet Slide & Swing Doors", description: "Supply and install 2 toilet slide and swing doors in selected aluminium frame and acrylic/phenolic insert", unit: "ls", displayUnit: "ls", unitCost: 900 },
            { code: "MIS-09", category: "MISC", name: "Rounded Corner", description: "Top up for 1x rounded corner without storage", unit: "nos", displayUnit: "nos", unitCost: 200 },
            { code: "MIS-10", category: "MISC", name: "Extra Drawer", description: "One extra drawer with PIO soft closing drawer runner", unit: "nos", displayUnit: "nos", unitCost: 80 },
            // PLUMBING
            { code: "PLU-01", category: "PLUMBING", name: "Install Kitchen Sink & Tap", description: "Supply labour to install 01 nos of kitchen sink & tap", unit: "nos", displayUnit: "nos", unitCost: 150 },
            { code: "PLU-02", category: "PLUMBING", name: "Install Bathroom Sink & Tap", description: "Supply labour to install bathroom sink & tap", unit: "nos", displayUnit: "nos", unitCost: 100 },
            { code: "PLU-03", category: "PLUMBING", name: "Install Shower Set", description: "Supply labour to install bathroom shower set (exposed)", unit: "nos", displayUnit: "nos", unitCost: 100 },
            { code: "PLU-04", category: "PLUMBING", name: "Install Bathroom Accessories", description: "Supply labour to install bathroom accessories (soap holder, towel rack, hooks, toilet paper holder, etc)", unit: "nos", displayUnit: "nos", unitCost: 50 },
            { code: "PLU-05", category: "PLUMBING", name: "Install WC", description: "Supply labour to install standard WC", unit: "nos", displayUnit: "nos", unitCost: 150 },
            { code: "PLU-06", category: "PLUMBING", name: "Install Storage Heater", description: "Supply labour to install storage heater", unit: "nos", displayUnit: "nos", unitCost: 200 },
            { code: "PLU-07", category: "PLUMBING", name: "Install Water Bidet", description: "Supply labour to install water bidet", unit: "nos", displayUnit: "nos", unitCost: 50 },
            // TILING & VINYL
            { code: "TIL-02", category: "TILING & VINYL", name: "Homogenous Floor Tiles", description: "Supply material & labour to lay homogenous floor tiles 600mm x 600mm c/w grouting ([DIMENSIONS])", unit: "sqft", displayUnit: "sqft", unitCost: 7.5 },
            { code: "TIL-01", category: "TILING & VINYL", name: "LVT Vinyl Flooring", description: "Supply material & labour to lay 5mm LVT floor vinyl c/w PVC skirting ([DIMENSIONS])", unit: "sqft", displayUnit: "sqft", unitCost: 6 },
        ];

        const PRELIMS = [
            { desc: "Protection works during renovation period", amount: 300 },
            { desc: "3× disposal service and debris haulage", amount: 300 },
            { desc: "General cleaning after every major works", amount: 300 },
            { desc: "HDB hacking permit", amount: "Inclusive" },
            { desc: "Project management & site supervision", amount: "Inclusive" },
            { desc: "24-month warranty with guaranteed after-sales service on workmanship", amount: "Inclusive" },
            { desc: "Daily site photo updates shared via OneDrive link", amount: "Inclusive" },
            { desc: "3D renderings (2 revisions), 2D carpentry drawing, electrical drawing", amount: "Inclusive" },
        ];

        const TABS = [
            { label: "🔨 Demolition", id: "demo", categories: ["DEMOLITION"] },
            { label: "🚿 Plumbing", id: "plumbing", categories: ["PLUMBING"] },
            { label: "🧱 Masonry", id: "masonry", categories: ["MASONRY - COMMON BATHROOM", "MASONRY - KITCHEN & SERVICE YARD", "MASONRY - LIVING ROOM & BEDROOM", "MASONRY - MASTER BATHROOM"] },
            { label: "🪵 Carpentry", id: "carpentry", categories: ["CARPENTRY - BATHROOM", "CARPENTRY - C1 BEDROOM", "CARPENTRY - C2 BEDROOM", "CARPENTRY - FOYER & LIVING ROOM", "CARPENTRY - KITCHEN & SERVICE YARD", "CARPENTRY - MASTER BEDROOM"] },
            { label: "💡 Electrical", id: "electrical", categories: ["ELECTRICAL"] },
            { label: "🏠 Ceiling & Walls", id: "ceiling", categories: ["FALSE CEILING & PARTITION"] },
            { label: "🪟 Glass & Aluminium", id: "aluminium", categories: ["ALUMINIUM, WINDOW AND GLASS WORKS"] },
            { label: "🎨 Misc & Doors", id: "misc", categories: ["MISC", "TILING & VINYL"] }
        ];

        // App State
        let state = {
            client: {
                name: "",

                address: "",
                flatType: "4-Room HDB"
            },
            selections: {}, // { code: rawValue }
            activeTab: "demo",
            gstEnabled: true,
            quoteId: `WDB-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
            quoteDate: new Date().toLocaleDateString('en-SG', { day: '2-digit', month: 'long', year: 'numeric' })
        };

        // Logic Functions
        function convertUnit(item, rawInput) {
            if (!rawInput || rawInput === 0) return 0;
            if (item.unit === 'pfr') {
                return Math.ceil(parseFloat(rawInput) / 304.8);
            }
            if (item.unit === 'psfr') {
                // mm length × 600mm depth → sqft (rounded up to 1 decimal)
                const sqft = (parseFloat(rawInput) * 600) / (304.8 * 304.8);
                return Math.ceil(sqft * 10) / 10;
            }
            return parseFloat(rawInput);
        }

        function calcLineTotal(item, rawInput) {
            if (item.unitCost === null || !rawInput) return 0;
            const converted = convertUnit(item, rawInput);
            return converted * item.unitCost;
        }

        function buildDescription(item, rawInput) {
            const converted = convertUnit(item, rawInput);
            let dimText;
            if (item.unit === 'psfr') {
                dimText = rawInput ? `${converted} sqft` : '---';
            } else {
                dimText = rawInput ? `${converted}${item.displayUnit}` : '---';
            }
            return item.description.replace('[DIMENSIONS]', dimText);
        }

        // UI Rendering
        function initTabs() {
            const container = document.getElementById('category-tabs');
            container.innerHTML = `
        <div style="display:flex; flex-wrap:wrap; gap:0.75rem; width:100%;">
            ${TABS.map(tab => `
            <button class="tab-btn ${state.activeTab === tab.id ? 'active' : ''}" data-action="setActiveTab" data-tab="${tab.id}">
                ${tab.label}
            </button>
            `).join('')}
        </div>
        <div style="width:100%; padding-top:0.5rem;">
            <button data-action="loadBTOPreset" style="
                padding: 0.75rem 1.75rem;
                background: var(--accent);
                border: none;
                color: white;
                border-radius: 6px;
                cursor: pointer;
                font-weight: 700;
                font-family: inherit;
                font-size: 0.9rem;
                letter-spacing: 0.02em;
                box-shadow: 0 2px 8px rgba(196,149,106,0.35);
                display: inline-flex;
                align-items: center;
                gap: 0.5rem;
            " onmouseover="this.style.opacity='0.85'"
               onmouseout="this.style.opacity='1'">
                ⭐ Load 4-Room BTO Package — $32,888
            </button>
        </div>
    `;
        }

        function setActiveTab(tabId) {
            state.activeTab = tabId;
            initTabs();
            renderItemList();
        }

        function renderItemList() {
            const container = document.getElementById('item-list');
            const activeTab = TABS.find(t => t.id === state.activeTab);
            const items = DATABASE.filter(item => activeTab.categories.includes(item.category));

            if (items.length === 0) {
                container.innerHTML = '<div class="text-center p-8">No items found in this category.</div>';
                return;
            }

            container.innerHTML = items.map(item => {
                const value = state.selections[item.code] || "";
                const subtotal = calcLineTotal(item, value);
                const isSelected = value > 0;

                return `
            <div class="item-card ${isSelected ? 'selected' : ''}" id="card-${item.code}">
                <div class="item-info">
                    <h3>${item.name}</h3>
                    <div class="item-desc">${item.description.replace('([DIMENSIONS])', '')}</div>
                    <div class="item-price-info">
                        $${item.unitCost === null ? 'TBC' : item.unitCost} / ${item.displayUnit}
                    </div>
                </div>
                <div class="item-input-group">
                    <div class="input-with-unit">
                        <input type="number" 
                               placeholder="0" 
                               value="${value}" 
                               oninput="updateSelection('${item.code}', this.value)">
                        <span class="input-unit">${item.unit === 'pfr' || item.unit === 'psfr' ? 'mm' : item.displayUnit}</span>
                    </div>
                    ${item.unit === 'pfr' ? '<div class="pfr-hint">Entered in mm, converts to ft</div>' : ''}
                    ${item.unit === 'psfr' ? '<div class="pfr-hint">Entered in mm (length), converts to sqft</div>' : ''}
                    <div class="item-subtotal" id="subtotal-${item.code}">
                        ${subtotal > 0 ? '$' + subtotal.toLocaleString() : ''}
                    </div>
                </div>
            </div>
        `;
            }).join('');
        }

        function updateSelection(code, value) {
            const val = parseFloat(value);
            if (!isNaN(val) && val > 0) {
                state.selections[code] = val;
            } else {
                delete state.selections[code];
            }

            _hasUnsavedChanges = true; // mark unsaved so auto-save and beforeunload can react

            // Update individual card and subtotal
            const item = DATABASE.find(i => i.code === code);
            const subtotalEl = document.getElementById(`subtotal-${code}`);
            const cardEl = document.getElementById(`card-${code}`);

            if (subtotalEl) {
                const subtotal = calcLineTotal(item, val);
                subtotalEl.innerText = subtotal > 0 ? '$' + subtotal.toLocaleString() : '';
            }

            if (cardEl) {
                if (val > 0) cardEl.classList.add('selected');
                else cardEl.classList.remove('selected');
            }

            updateSummary();
        }

        function updateSummary() {
            const summaryList = document.getElementById('sidebar-summary-list');

            let subtotal = 0;
            const totalsByCategory = {};

            // Fixed Prelims (A)
            subtotal += PRELIMS.reduce((sum, p) => sum + (typeof p.amount === 'number' ? p.amount : 0), 0);

            // Selected Items
            Object.keys(state.selections).forEach(code => {
                const item = DATABASE.find(i => i.code === code);
                const lineVal = state.selections[code];
                const lineTotal = calcLineTotal(item, lineVal);
                subtotal += lineTotal;

                // Group by friendly tab for summary
                const tab = TABS.find(t => t.categories.includes(item.category));
                if (tab) {
                    totalsByCategory[tab.label] = (totalsByCategory[tab.label] || 0) + lineTotal;
                }
            });

            // Render summary list
            let summaryHTML = `
        <div class="summary-item" style="font-weight:600;">
            <span>A. Preliminaries</span>
            <span>$900.00</span>
        </div>
    `;

            Object.entries(totalsByCategory).forEach(([label, total]) => {
                summaryHTML += `
            <div class="summary-item">
                <span>${label.split(' ').slice(1).join(' ')}</span>
                <span>$${total.toLocaleString()}</span>
            </div>
        `;
            });

            summaryList.innerHTML = summaryHTML;

            const gst = state.gstEnabled ? subtotal * 0.09 : 0;
            const total = subtotal + gst;

            document.getElementById('sidebar-subtotal').innerText = '$' + subtotal.toLocaleString(undefined, { minimumFractionDigits: 2 });
            document.getElementById('sidebar-gst').innerText = '$' + gst.toLocaleString(undefined, { minimumFractionDigits: 2 });
            document.getElementById('sidebar-total').innerText = '$' + total.toLocaleString(undefined, { minimumFractionDigits: 2 });
            const mobileAmt = document.getElementById('mobile-total-amount');
            if (mobileAmt) mobileAmt.innerText = '$' + total.toLocaleString(undefined, { minimumFractionDigits: 2 });
        }

        function generateQuoteHTML() {
            const sections = [];

            // Section A: Prelims
            let sectionA = `
        <tr class="section-header"><td colspan="3">A. PRELIMINARIES & GENERAL WORKS</td></tr>
    `;
            PRELIMS.forEach((p, i) => {
                sectionA += `
            <tr>
                <td>A${i + 1}</td>
                <td>${p.desc}</td>
                <td style="text-align:right;">${typeof p.amount === 'number' ? '$' + p.amount : p.amount}</td>
            </tr>
        `;
            });
            sections.push(sectionA);

            // Filter used categories
            const categoriesWithItems = TABS.filter(tab => {
                return DATABASE.some(item => tab.categories.includes(item.category) && state.selections[item.code]);
            });

            categoriesWithItems.forEach((tab, index) => {
                const char = String.fromCharCode(66 + index); // B, C, D...
                let sectionHTML = `<tr class="section-header"><td colspan="3">${char}. ${tab.label.split(' ').slice(1).join(' ').toUpperCase()}</td></tr>`;

                let subCount = 1;
                let tabTotal = 0;

                DATABASE.filter(item => tab.categories.includes(item.category) && state.selections[item.code]).forEach(item => {
                    const val = state.selections[item.code];
                    const lineTotal = calcLineTotal(item, val);
                    tabTotal += lineTotal;

                    sectionHTML += `
                <tr>
                    <td>${char}${subCount++}</td>
                    <td>${buildDescription(item, val)}</td>
                    <td style="text-align:right;">$${lineTotal.toLocaleString()}</td>
                </tr>
            `;
                });

                sectionHTML += `
            <tr style="font-weight:600;">
                <td colspan="2" style="text-align:right;">Section ${char} Subtotal:</td>
                <td style="text-align:right;">$${tabTotal.toLocaleString()}</td>
            </tr>
        `;
                sections.push(sectionHTML);
            });

            const subtotal = parseFloat(document.getElementById('sidebar-subtotal').innerText.replace(/[$,]/g, ''));
            const gst = state.gstEnabled ? subtotal * 0.09 : 0;
            const grandTotal = subtotal + gst;

            return `
        <div class="quote-header">
            <div class="company-info">
                <h1>WOODATES DESIGN & BUILD</h1>
                <p>UEN: 202452323H</p>
                <p>Singapore</p>
            </div>
            <div style="text-align:right">
                <p><strong>Quote No:</strong> ${state.quoteId}</p>
                <p><strong>Date:</strong> ${state.quoteDate}</p>
            </div>
        </div>

        <div class="client-info">
            <h2>Quotation For:</h2>
            <p><strong>${state.client.name}</strong></p>
            <p>${state.client.address}</p>
            <p><strong>Flat Type:</strong> ${state.client.flatType}</p>
        </div>

        <table class="quote-table">
            <thead>
                <tr>
                    <th style="width:60px">S/N</th>
                    <th>Description of Works</th>
                    <th style="width:120px; text-align:right;">Amount (SGD)</th>
                </tr>
            </thead>
            <tbody>
                ${sections.join('')}
            </tbody>
        </table>

        <div class="grand-total-box">
            <div style="font-size: 0.9rem; font-weight: 500; color: #666;">Subtotal: $${subtotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
            <div style="font-size: 0.9rem; font-weight: 500; color: #666;">${state.gstEnabled ? `GST (9%): $${gst.toLocaleString(undefined, { minimumFractionDigits: 2 })}` : 'GST: Not applicable'}</div>
            <div style="margin-top: 0.5rem;">Grand Total: $${grandTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
        </div>

        <div class="terms-grid">
            <div>
                <h4 style="margin-bottom:0.5rem; text-decoration:underline;">PAYMENT TERMS (Standard 5-Stage Schedule)</h4>
                <ol>
                    <li>15% - Upon confirmation & signing of quotation</li>
                    <li>35% - Upon commencement of hacking & masonry</li>
                    <li>20% - Upon completion of masonry & measurement of carpentry</li>
                    <li>25% - Upon delivery & installation of carpentry</li>
                    <li>5% - Upon completion of all rectified works & handover</li>
                </ol>
                <div style="margin-top:1rem; padding:0.5rem; background:#f9f9f9; border:1px dashed #ccc;">
                    <strong>PAYMENT INFO:</strong><br>
                    PayNow UEN: 202452323H<br>
                    Bank Transfer: UOB 7283004787 (WOODATES DESIGN & BUILD)
                </div>
            </div>
            <div>
                <h4 style="margin-bottom:0.5rem; text-decoration:underline;">TERMS & CONDITIONS</h4>
                <ul style="padding-left:1rem;">
                    <li>Price is based on site measurements and scope of work stated.</li>
                    <li>Any additional work requested will be charged accordingly.</li>
                    <li>Wooden items/Laminates may have natural color variations.</li>
                    <li>Woodates is not liable for structural defects not caused by us.</li>
                    <li>Valid for 30 days from date of issue.</li>
                    <li>Electrical appliance installations (specialized) not included unless stated.</li>
                    <li>Permit fees are inclusive for HDB flats.</li>
                    <li>24-month warranty on workmanship starts from handover date.</li>
                </ul>
            </div>
        </div>

        <div class="signature-block">
            <p>I hereby confirm and accept this quotation and agree to the terms stated.</p>
            <div class="flex" style="margin-top:2rem; gap:4rem;">
                <div style="flex:1; border-top:1px solid #000; padding-top:0.5rem;">Signature / Date</div>
                <div style="flex:1; border-top:1px solid #000; padding-top:0.5rem;">Name / IC Number</div>
            </div>
        </div>
    `;
        }

        function toggleGST(enabled) {
            state.gstEnabled = enabled;
            // Sync both desktop and mobile toggles
            ['gst-toggle', 'gst-toggle-mobile'].forEach(id => {
                const el = document.getElementById(id);
                if (el) el.checked = enabled;
            });
            [['gst-toggle-track', 'gst-track-mobile'], ['gst-toggle-thumb', 'gst-thumb-mobile']].forEach(([d, m]) => {
                const dEl = document.getElementById(d);
                const mEl = document.getElementById(m);
                const isTrack = d.includes('track');
                if (dEl) dEl.style.background = enabled ? '#C4956A' : '#4B5563';
                if (mEl) mEl.style.background = enabled ? '#C4956A' : '#4B5563';
                if (!isTrack) {
                    if (dEl) dEl.style.transform = enabled ? 'translateX(16px)' : 'translateX(0px)';
                    if (mEl) mEl.style.transform = enabled ? 'translateX(14px)' : 'translateX(0px)';
                }
            });
            updateSummary();
        }

        function loadBTOPreset() {
            if (!confirm("Load the standard 4-Room BTO $32,888 package?\n\nThis will replace all current selections.")) return;

            state.selections = {
                // MASONRY
                "MAS-03": 700,       // Cement Screed Floor 700sqft = $3,500
                // TILING
                "TIL-02": 780,       // Homogenous Floor Tiles 780sqft = $5,850

                // PLUMBING
                "PLU-01": 1,         // Kitchen Sink & Tap x1 = $150
                "PLU-02": 2,         // Bathroom Sink & Tap x2 = $200
                "PLU-03": 2,         // Shower Set x2 = $200
                "PLU-04": 2,         // Bathroom Accessories x2 = $100
                "PLU-06": 1,         // Storage Heater x1 = $200
                "PLU-07": 2,         // Water Bidet x2 = $100

                // CARPENTRY - KITCHEN
                "KIT-02": 4500,      // Bottom Cabinet 4500mm → 15ft = $2,250
                "KIT-06": 4500,      // Sintered Stone Top 4500mm → 15ft = $2,250
                "G-KIT": 4500,       // Top Cabinet 4500mm → 15ft = $2,250
                "KIT-04": 900,       // Fridge Cabinet 900mm → 3ft = $750

                // CARPENTRY - MASTER BEDROOM
                "MBED1": 3300,       // Wardrobe Casement 3300mm → 11ft = $3,300

                // CARPENTRY - BEDROOM 2
                "C1BED1": 1700,      // Wardrobe Casement 1700mm → 6ft = $1,800

                // CARPENTRY - BEDROOM 3
                "C2BED1": 1700,      // Wardrobe Casement 1700mm → 6ft = $1,800

                // ALUMINIUM
                "WIN-01": 1,         // Shower Screen Master Bath (1fix 1swing) = $750
                "WIN-02": 1,         // Shower Screen Common Bath (2fix 2slide) = $750

                // MISC
                "MIS-03": 1,         // Paint Walls (3 colours) = $1,400
                "MIS-04": 1,         // Paint Ceiling = $300
                "MIS-06": 1,         // Paint Sealer = $300
                "MIS-07": 1,         // 3 Bedroom Laminated Doors = $1,350
                "MIS-08": 1,         // 2 Toilet Slide & Swing Doors = $900

                // ELECTRICAL
                "ELE-PKG": 1,        // 4Rm BTO Electrical Package = $1,538
            };
            // Verified total: $900 prelims + $31,988 items = $32,888

            state.activeTab = "demo";
            initTabs();
            renderItemList();
            updateSummary();
        }


        function downloadExcel() {
            // Download Excel
            try {
                // Use xlsx-js-style (supports cell.s styling). Falls back to XLSX if needed.
                const XL = (typeof XLSXStyle !== 'undefined') ? XLSXStyle : (typeof XLSX !== 'undefined' ? XLSX : null);

                if (!XL) {
                    showToast('Excel library is still loading. Please wait a few seconds and try again.');
                    return;
                }



                // ── Border & style definitions matching original template ─────────
                const thin = { style: "thin", color: { rgb: "000000" } };
                const medium = { style: "medium", color: { rgb: "000000" } };

                const thinAll = { top: thin, bottom: thin, left: thin, right: thin };
                const headerBorder = { top: medium, bottom: medium, left: medium, right: medium };

                const sz12 = { sz: 12, name: "Calibri" };
                const sz12b = { sz: 12, bold: true, name: "Calibri" };
                const sz11 = { sz: 11, name: "Calibri" };
                const sz11b = { sz: 11, bold: true, name: "Calibri" };
                const sz10 = { sz: 10, name: "Calibri" };
                const sz9 = { sz: 9, name: "Calibri", color: { rgb: "555555" } };

                const ctrAlign = { horizontal: "center", vertical: "center", wrapText: true };
                const leftWrap = { horizontal: "left", vertical: "center", wrapText: true };
                const rightAlign = { horizontal: "right", vertical: "center" };

                const currency = '$#,##0.00';
                const noFill = { patternType: "none" };

                // ── Reusable cell builders ────────────────────────────────────────
                // Standard body row cell: thin all-side border, sz12, left-wrap
                function bc(v, extra = {}) {
                    return {
                        v: v === null || v === undefined ? '' : v,
                        t: typeof v === 'number' ? 'n' : 's',
                        s: Object.assign({
                            font: extra.font || sz12,
                            fill: extra.fill || noFill,
                            alignment: extra.align || leftWrap,
                            border: extra.border || thinAll,
                            numFmt: extra.numFmt || (typeof v === 'number' ? currency : '')
                        }, extra.s || {})
                    };
                }
                // Empty bordered cell (for spacer rows)
                function ec() { return bc(''); }
                // Right-aligned amount cell
                function ac(v) {
                    if (v === null || v === undefined || v === '') return bc('', { align: rightAlign });
                    if (typeof v === 'string') return bc(v, { align: rightAlign });
                    return bc(v, { align: rightAlign, numFmt: currency });
                }
                // Section header row (letter + bold title, no amount)
                function sectionRow(letter, title) {
                    return [
                        bc(letter, { font: sz12b, align: ctrAlign }),
                        bc(title, { font: sz12b }),
                        ec()
                    ];
                }
                // Sub-section label row (no letter, bold)
                function subRow(title) {
                    return [ec(), bc(title, { font: sz12b }), ec()];
                }
                // Item row
                function itemRow(num, desc, amount) {
                    return [
                        bc(String(num), { align: ctrAlign }),
                        bc(desc),
                        ac(amount)
                    ];
                }
                // Spacer row with thin borders on all 3 cells
                function spacer() {
                    return [ec(), ec(), ec()];
                }

                // ── Build rows array ──────────────────────────────────────────────
                const wb = XL.utils.book_new();
                const rows = [];
                const merges = [];

                function addMerge(sr, sc, er, ec) {
                    merges.push({ s: { r: sr, c: sc }, e: { r: er, c: ec } });
                }

                // ── LETTERHEAD (rows 0-6) ─────────────────────────────────────────
                // Matches image: company name, address, license, project block, quote ref, date, attention
                const lhFont = { sz: 11, bold: true, name: "Calibri" };
                const lhFontNorm = { sz: 10, name: "Calibri" };
                function lhRow(a, b, c) {
                    return [
                        { v: a || '', t: 's', s: { font: lhFont, alignment: leftWrap, border: { left: thin }, numFmt: '' } },
                        { v: b || '', t: 's', s: { font: lhFontNorm, alignment: leftWrap, numFmt: '' } },
                        { v: c || '', t: 's', s: { font: lhFontNorm, alignment: { horizontal: "right", vertical: "center" }, border: { right: thin }, numFmt: '' } }
                    ];
                }
                rows.push(lhRow('WOODATES DESIGN BUILD PTE LTD (202452323H)'));
                addMerge(rows.length - 1, 0, rows.length - 1, 1);
                rows.push(lhRow('ADDRESS: 1 SOON LEE ST #02-64 PIONEER CENTRE S627605'));
                addMerge(rows.length - 1, 0, rows.length - 1, 1);
                rows.push(lhRow('HDB LICENSE NO: HB-01-5551C GENERAL BUILDER CLASS 2 LICENSE'));
                addMerge(rows.length - 1, 0, rows.length - 1, 1);
                rows.push(lhRow('PROJECT : PROPOSED RENOVATION WORKS AT  ' + (state.client.address || '')));
                addMerge(rows.length - 1, 0, rows.length - 1, 1);
                rows.push(lhRow('QUOTE REF :'));
                addMerge(rows.length - 1, 0, rows.length - 1, 1);
                rows.push(lhRow('DATE :  ' + state.quoteDate, '', 'Quote No: ' + state.quoteId));
                addMerge(rows.length - 1, 0, rows.length - 1, 1);
                rows.push(lhRow('ATTENTION :  ' + (state.client.name || '')));
                addMerge(rows.length - 1, 0, rows.length - 1, 1);
                rows.push(lhRow('FLAT TYPE :  ' + (state.client.flatType || '')));
                addMerge(rows.length - 1, 0, rows.length - 1, 1);

                // ── COLUMN HEADERS (row 8) ────────────────────────────────────────
                rows.push([
                    { v: 'ITEM', t: 's', s: { font: sz12b, alignment: ctrAlign, border: headerBorder, numFmt: '' } },
                    { v: 'DESCRIPTION', t: 's', s: { font: sz12b, alignment: ctrAlign, border: { top: medium, bottom: medium, left: thin, right: thin }, numFmt: '' } },
                    { v: 'AMOUNT (SGD)', t: 's', s: { font: sz12b, alignment: rightAlign, border: { top: medium, bottom: medium, left: thin, right: medium }, numFmt: '' } }
                ]);

                // ── SECTION A: PRELIMS ────────────────────────────────────────────
                rows.push(spacer());
                rows.push(sectionRow('A', 'PRELIMS & GENERAL'));
                let prelimTotal = 0;
                PRELIMS.forEach((p, i) => {
                    const isNum = typeof p.amount === 'number';
                    if (isNum) prelimTotal += p.amount;
                    rows.push(itemRow(i + 1, p.desc, isNum ? p.amount : p.amount));
                });
                rows.push(spacer());

                // ── SECTIONS B+: selected items ───────────────────────────────────
                let grandSubtotal = prelimTotal;
                const usedTabs = TABS.filter(tab =>
                    DATABASE.some(item => tab.categories.includes(item.category) && state.selections[item.code])
                );

                usedTabs.forEach((tab, idx) => {
                    const letter = String.fromCharCode(66 + idx); // B, C, D…
                    const tabLabel = tab.label.split(' ').slice(1).join(' ').toUpperCase();
                    rows.push(sectionRow(letter, tabLabel));

                    let tabTotal = 0;
                    let subCount = 1;
                    DATABASE
                        .filter(item => tab.categories.includes(item.category) && state.selections[item.code])
                        .forEach(item => {
                            const val = state.selections[item.code];
                            const lineTotal = calcLineTotal(item, val);
                            tabTotal += lineTotal;
                            rows.push(itemRow(subCount++, buildDescription(item, val), lineTotal));
                        });

                    grandSubtotal += tabTotal;
                    rows.push(spacer());
                });

                // ── TOTALS ────────────────────────────────────────────────────────
                const gst = state.gstEnabled ? grandSubtotal * 0.09 : 0;
                const grandTotal = grandSubtotal + gst;

                rows.push([
                    ec(),
                    bc('SUBTOTAL', { font: sz12b, align: rightAlign }),
                    ac(grandSubtotal)
                ]);
                rows.push([
                    ec(),
                    bc(state.gstEnabled ? 'GST (9%)' : 'GST (Not applicable)', { align: rightAlign }),
                    ac(gst)
                ]);
                rows.push([
                    ec(),
                    bc('GRAND TOTAL (SGD)', { font: sz12b, align: rightAlign }),
                    bc(grandTotal, { font: sz12b, align: rightAlign, numFmt: currency })
                ]);

                rows.push(spacer());
                rows.push(spacer());

                // ── PAYMENT METHODS ───────────────────────────────────────────────
                rows.push([bc('PAYMENT METHODS:', { font: sz12b }), ec(), ec()]);
                addMerge(rows.length - 1, 0, rows.length - 1, 2);
                rows.push([ec(), bc('Paynow to UEN 202452323H'), ec()]);
                addMerge(rows.length - 1, 1, rows.length - 1, 2);
                rows.push([ec(), bc('Bank transfer to UOB 7283004787 (WOODATES DESIGN & BUILD)'), ec()]);
                addMerge(rows.length - 1, 1, rows.length - 1, 2);
                rows.push(spacer());

                // ── PAYMENT TERMS ─────────────────────────────────────────────────
                rows.push([bc('PAYMENT TERMS', { font: sz12b }), ec(), ec()]);
                addMerge(rows.length - 1, 0, rows.length - 1, 2);
                const payTerms = [
                    '15% of the total contracted sum will be collected upon confirmation & signing of this quotation',
                    '35% of the total contracted sum will be collected upon commencement of hacking & masonry',
                    '20% of the total contracted sum will be collected upon completion of masonry & measurement of carpentry',
                    '25% of the total contracted sum will be collected upon delivery & installation of carpentry',
                    '5% of the total contracted sum will be collected upon completion of all rectified works & handover'
                ];
                payTerms.forEach((t, i) => {
                    rows.push([bc(String(i + 1), { align: ctrAlign }), bc(t), ec()]);
                    addMerge(rows.length - 1, 1, rows.length - 1, 2);
                });
                rows.push(spacer());

                // ── TERMS & CONDITIONS ────────────────────────────────────────────
                rows.push([bc('TERMS AND CONDITIONS', { font: sz12b }), ec(), ec()]);
                addMerge(rows.length - 1, 0, rows.length - 1, 2);
                const tcs = [
                    'This quote is valid for 1 month.',
                    'Any additional Works or variation of Works that are requested after the signing of this agreement will be agreed upon separately.',
                    'Failing to make the payment which stipulated time/agreement, Woodates Design & Build reserves the right to cease all works.',
                    'PE fees are not included for hacking of walls. (if needed).',
                    'This Agreement should be construed in accordance with the laws of Singapore.',
                    'While every reasonable endeavour will be made by Woodates Design & Build to complete the Renovation Works by the stipulated Target Completion Date, we shall not be liable for any delays caused by circumstances beyond our reasonable control.',
                    'You agree to allow our contractors, agents, assigns and representatives to have access to the Unit at all reasonable times for the purpose of carrying out the Renovation Works.',
                    'The signed agreement constitutes a binding contract.',
                    'The client may request in writing to add or delete from the agreed scope of works.',
                    'Defects & other damages caused by third party, which is beyond the control of Woodates Design & Build will not be covered under the warranty.'
                ];
                tcs.forEach((t, i) => {
                    rows.push([bc(String(i + 1), { align: ctrAlign }), bc(t), ec()]);
                    addMerge(rows.length - 1, 1, rows.length - 1, 2);
                });
                rows.push(spacer());
                rows.push(spacer());

                // ── SIGNATURE ─────────────────────────────────────────────────────
                rows.push([bc('I, hereby confirm and accept this quotation.'), ec(), ec()]);
                addMerge(rows.length - 1, 0, rows.length - 1, 2);
                rows.push(spacer());
                rows.push(spacer());
                rows.push([bc('Name:'), ec(), ec()]); addMerge(rows.length - 1, 0, rows.length - 1, 2);
                rows.push([bc('IC:'), ec(), ec()]); addMerge(rows.length - 1, 0, rows.length - 1, 2);
                rows.push([bc('Date:'), ec(), ec()]); addMerge(rows.length - 1, 0, rows.length - 1, 2);

                // ── BUILD WORKSHEET ───────────────────────────────────────────────
                const ws = XL.utils.aoa_to_sheet(rows);
                ws['!merges'] = merges;

                // Exact column widths from original template
                ws['!cols'] = [
                    { wch: 8.00 },   // A: ITEM (increased slightly)
                    { wch: 80.16 },   // B: DESCRIPTION
                    { wch: 25.00 }    // C: AMOUNT (increased for Quote No compatibility)
                ];

                // Row heights: letterhead rows ~14.5pt, header row 16pt, data rows 14.5pt
                ws['!rows'] = rows.map((_, i) => {
                    if (i === 8) return { hpt: 16 };   // column header
                    if (i < 8) return { hpt: 14.5 };  // letterhead
                    return { hpt: 14.5 };
                });

                XL.utils.book_append_sheet(wb, ws, 'Quotation');

                const filename = `Woodates_Quote_${state.quoteId}_${(state.client.name || 'Client').replace(/\s+/g, '_')}.xlsx`;
                XL.writeFile(wb, filename, { bookType: 'xlsx' });
            } catch (err) {
                console.error('Excel export error:', err);
                showToast('Could not generate Excel file: ' + err.message);
            }
        }

        // Navigation
        function goToStep(n) {
            if (n === 2) {
                // Validation for step 1
                const form = document.getElementById('client-form');
                if (!form.checkValidity()) {
                    form.reportValidity();
                    return;
                }
                state.client = {
                    name: document.getElementById('clientName').value,
                    address: document.getElementById('projectAddress').value,
                    flatType: document.getElementById('flatType').value
                };
            }

            if (n === 3) {
                document.getElementById('printable-quote').innerHTML = generateQuoteHTML();
                // Auto-save quote to Supabase when previewing
                saveQuoteToSupabase();
            }

            // Update UI
            document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
            document.getElementById(`view-${n}`) ? document.getElementById(`view-${n}`).classList.add('active') : document.getElementById(`step-${n}`).classList.add('active');

            document.querySelectorAll('.step').forEach((s, idx) => {
                s.classList.remove('active', 'done');
                if (idx + 1 < n) s.classList.add('done');
                if (idx + 1 === n) s.classList.add('active');
            });

            window.scrollTo(0, 0);
        }

        // ── Save quote to Supabase ─────────────────────────────
        let _quoteSavedId = null; // track the DB row id for updates
        let _hasUnsavedChanges = false; // track unsaved state for beforeunload warning

        // Retry helper: retries an async fn up to `retries` times with exponential backoff
        async function withRetry(fn, retries = 3) {
            for (let i = 0; i < retries; i++) {
                try { return await fn(); }
                catch (err) {
                    if (i === retries - 1) throw err;
                    await new Promise(r => setTimeout(r, 800 * (i + 1)));
                }
            }
        }

        async function saveQuoteToSupabase({ silent = false } = {}) {
            if (!_sb || !_currentUserId) return; // auth not ready
            if (!silent) showSaveStatus('Saving…', 'saving');
            try {
                // Calculate current total
                let subtotal = PRELIMS.reduce((s,p) => s + (typeof p.amount==='number' ? p.amount : 0), 0);
                Object.keys(state.selections).forEach(code => {
                    const item = DATABASE.find(i => i.code === code);
                    if (item) subtotal += calcLineTotal(item, state.selections[code]);
                });
                const gst = state.gstEnabled ? subtotal * 0.09 : 0;
                const total = subtotal + gst;

                const payload = {
                    user_id: _currentUserId,
                    quote_number: state.quoteId,
                    client_name: state.client.name || '',
                    address: state.client.address || '',
                    flat_type: state.client.flatType || '',
                    selections: state.selections,
                    gst_enabled: state.gstEnabled,
                    subtotal: subtotal,
                    gst: gst,
                    total: total,
                    quote_date: state.quoteDate,
                    updated_at: new Date().toISOString(),
                };

                let result;
                await withRetry(async () => {
                    if (_quoteSavedId) {
                        // Update existing record
                        result = await _sb.from('quotes').update(payload).eq('id', _quoteSavedId).select().single();
                    } else {
                        // Insert new record
                        result = await _sb.from('quotes').insert([payload]).select().single();
                        if (result.data) _quoteSavedId = result.data.id;
                    }
                    if (result.error) throw result.error;
                });

                _hasUnsavedChanges = false;
                if (!silent) showSaveStatus('Quote saved to portal ✓', 'success');
            } catch(err) {
                console.error('Quote save error:', err);
                if (!silent) showSaveStatus('Save failed — check connection', 'error');
            }
        }

        // Auto-save every 60 seconds if there's an active quote with selections
        setInterval(async () => {
            if (_hasUnsavedChanges && _quoteSavedId && Object.keys(state.selections).length > 0) {
                await saveQuoteToSupabase({ silent: true });
            }
        }, 60_000);

        // Warn before closing tab if there are unsaved changes
        window.addEventListener('beforeunload', (e) => {
            if (_hasUnsavedChanges) {
                e.preventDefault();
                e.returnValue = '';
            }
        });

        function showSaveStatus(msg, type) {
            let el = document.getElementById('_quote_save_status');
            if (!el) {
                el = document.createElement('div');
                el.id = '_quote_save_status';
                el.style.cssText = 'position:fixed;bottom:20px;right:20px;z-index:9999;padding:10px 18px;border-radius:8px;font-size:0.78rem;font-family:DM Sans,sans-serif;font-weight:600;box-shadow:0 4px 20px rgba(0,0,0,0.12);transition:opacity 0.4s;display:flex;align-items:center;gap:8px;';
                document.body.appendChild(el);
            }
            const styles = {
                success: { bg:'#D1FAE5', color:'#065F46', border:'#6EE7B7' },
                error:   { bg:'#FEE2E2', color:'#991B1B', border:'#FCA5A5' },
                saving:  { bg:'#FEF3C7', color:'#92400E', border:'#FCD34D' },
            };
            const s = styles[type] || styles.saving;
            el.style.background = s.bg; el.style.color = s.color; el.style.border = `1px solid ${s.border}`;
            el.textContent = msg; el.style.opacity = '1';
            if (type !== 'saving') { clearTimeout(el._t); el._t = setTimeout(()=>{ el.style.opacity='0'; }, 3500); }
        }

        function resetQuote() {
            if (confirm("Are you sure you want to clear all selections and start over?")) {
                state.selections = {};
                updateSelection(); // trigger refresh
                updateSummary();
                renderItemList();
                goToStep(1);
            }
        }

        // Form interceptor
        document.getElementById('client-form').onsubmit = (e) => {
            e.preventDefault();
            goToStep(2);
        };

        // ── Load quote from Supabase if quote_id in URL ──────
        async function loadQuoteFromSupabase() {
            const params = new URLSearchParams(window.location.search);
            const qid = params.get('quote_id');
            if (!qid || !_sb) return false;

            try {
                // Security: also filter by user_id so a designer cannot load another designer's quote by guessing the UUID
                const { data, error } = await _sb.from('quotes').select('*').eq('id', qid).eq('user_id', _currentUserId).single();
                if (error || !data) return false;

                _quoteSavedId = data.id;
                state.quoteId = data.quote_number || state.quoteId;
                state.quoteDate = data.quote_date || state.quoteDate;
                state.client = {
                    name: data.client_name || '',
                    address: data.address || '',
                    flatType: data.flat_type || '4-Room HDB',
                };
                state.selections = data.selections || {};
                state.gstEnabled = data.gst_enabled !== undefined ? data.gst_enabled : true;

                // Pre-fill step 1 fields
                document.getElementById('clientName').value = state.client.name;
                document.getElementById('projectAddress').value = state.client.address;
                document.getElementById('flatType').value = state.client.flatType;

                // Re-render step 2 with loaded selections
                renderItemList();
                toggleGST(state.gstEnabled);
                updateSummary();

                showSaveStatus('Quote loaded from portal ✓', 'success');
                return true;
            } catch(err) {
                console.error('Quote load error:', err);
                return false;
            }
        }

        // Start App
        initTabs();
        renderItemList();
        updateSummary();

        // Load from Supabase if opened via quote_id URL param
        // Wait briefly for _sb to be initialised by the auth block
        setTimeout(async () => { await loadQuoteFromSupabase(); }, 800);
    
// ── Toast notification (replaces alert) ──
function showToast(msg, type='error') {
  let t = document.getElementById('_app_toast');
  if(!t) {
    t = document.createElement('div');
    t.id = '_app_toast';
    t.style.cssText = 'position:fixed;bottom:24px;left:50%;transform:translateX(-50%);z-index:99999;padding:12px 24px;border-radius:8px;font-family:DM Sans,sans-serif;font-size:0.85rem;font-weight:600;box-shadow:0 4px 20px rgba(0,0,0,0.15);transition:opacity 0.4s;pointer-events:none';
    document.body.appendChild(t);
  }
  const colors = {error:'#FEE2E2:#991B1B', success:'#D1FAE5:#065F46', info:'#EBF3FB:#1D4ED8'};
  const [bg, color] = (colors[type]||colors.error).split(':');
  t.style.background = bg; t.style.color = color;
  t.textContent = msg; t.style.opacity = '1';
  clearTimeout(t._hide); t._hide = setTimeout(()=>{ t.style.opacity='0'; }, 4000);
}

    
    // Event delegation - replaces all onclick attributes
    document.addEventListener('click', function(e) {
        const btn = e.target.closest('[data-action]');
        if (!btn) return;
        const action = btn.dataset.action;
        if (action === 'goToStep') goToStep(Number(btn.dataset.step));
        else if (action === 'printPage') window.print();
        else if (action === 'downloadExcel') downloadExcel();
        else if (action === 'saveQuoteToSupabase') saveQuoteToSupabase();
        else if (action === 'resetQuote') resetQuote();
        else if (action === 'loadBTOPreset') loadBTOPreset();
        else if (action === 'setActiveTab') setActiveTab(btn.dataset.tab);
    });