// ── SUPABASE ADMIN AUTH GUARD ──
(async function() {
  const { createClient } = supabase;
  const _supabase = createClient(
    'https://ilytehukqrkwpupdpkgo.supabase.co',
    'sb_publishable_tNMpLdZaqm0e-El_LP4kKg_fhfj-ARF'
  );

  const authChecking = document.getElementById('auth-checking');
  const accessDenied = document.getElementById('access-denied');

  try {
    const { data: { session } } = await _supabase.auth.getSession();
    if (!session) {
      authChecking.style.display = 'none';
      accessDenied.style.display = 'flex';
      return;
    }
    const { data: profile } = await _supabase
      .from('profiles')
      .select('role, full_name')
      .eq('id', session.user.id)
      .single();

    if (!profile || profile.role !== 'admin') {
      authChecking.style.display = 'none';
      accessDenied.style.display = 'flex';
      return;
    }

    authChecking.style.display = 'none';
    document.body.style.display = 'block';
  } catch(e) {
    authChecking.style.display = 'none';
    accessDenied.style.display = 'flex';
  }
})();

// ── DATA ──
const CHYLER_DATA = [{"Date":"01 Jan 2026","Number":2,"Source":"Ad","Phone":91910069,"Type":"Current","Name":"Rose","Responsive?":"NO","GC created":null,"PM":null,"1st meet":null,"2D":null,"Quotation":null,"2nd meet":null,"Revised 2D":null,"Revised Quotation":null,"Site visit":null,"Comments":null,"1st Deposit":null,"2nd Deposit":null,"FINAL STATUS":"LAPSED","stage":"New Lead"},{"Date":"02 Jan 2026","Number":3,"Source":"Ad","Phone":85991413,"Type":"BTO","Name":"Mark","Responsive?":"NO","GC created":null,"PM":null,"1st meet":null,"2D":null,"Quotation":null,"2nd meet":null,"Revised 2D":null,"Revised Quotation":null,"Site visit":null,"Comments":null,"1st Deposit":null,"2nd Deposit":null,"FINAL STATUS":"LAPSED","stage":"New Lead"},{"Date":"04 Jan 2026","Number":5,"Source":"Ad","Phone":96886932,"Type":"Condo","Name":"YQ","Responsive?":"NO","GC created":null,"PM":null,"1st meet":null,"2D":null,"Quotation":null,"2nd meet":null,"Revised 2D":null,"Revised Quotation":null,"Site visit":null,"Comments":"Customer don\u2019t want to provide correct floor plan","1st Deposit":null,"2nd Deposit":null,"FINAL STATUS":"LAPSED","stage":"New Lead"},{"Date":"04 Jan 2026","Number":6,"Source":"Ad","Phone":90119256,"Type":"BTO","Name":"SiMin","Responsive?":"NO","GC created":null,"PM":null,"1st meet":null,"2D":null,"Quotation":null,"2nd meet":null,"Revised 2D":null,"Revised Quotation":null,"Site visit":null,"Comments":"Customer wants 3D render before deposit","1st Deposit":null,"2nd Deposit":null,"FINAL STATUS":"LAPSED","stage":"New Lead"},{"Date":"05 Jan 2026","Number":8,"Source":"Ad","Phone":81185205,"Type":"BTO","Name":"Kasim","Responsive?":"YES","GC created":"YES","PM":"XUEQI","1st meet":"YES","2D":"YES","Quotation":"YES","2nd meet":"YES","Revised 2D":"YES","Revised Quotation":"YES","Site visit":"NO","Comments":null,"1st Deposit":"YES","2nd Deposit":null,"FINAL STATUS":"SIGNED","stage":"1st Deposit"},{"Date":"05 Jan 2026","Number":9,"Source":"Ad","Phone":92370923,"Type":"Resale","Name":"Hana","Responsive?":"NO","GC created":"YES","PM":"BOSS CHONG","1st meet":"NO","2D":null,"Quotation":null,"2nd meet":null,"Revised 2D":null,"Revised Quotation":null,"Site visit":null,"Comments":"Customer change of renovation plans","1st Deposit":null,"2nd Deposit":null,"FINAL STATUS":"LAPSED","stage":"GC Created"},{"Date":"06 Jan 2026","Number":10,"Source":"Ad","Phone":87920605,"Type":"BTO","Name":"WaWa","Responsive?":"YES","GC created":"YES","PM":"QUEENIE","1st meet":"YES","2D":"YES","Quotation":null,"2nd meet":null,"Revised 2D":null,"Revised Quotation":null,"Site visit":null,"Comments":"Customer not responsive after preliminary call","1st Deposit":null,"2nd Deposit":null,"FINAL STATUS":"LAPSED","stage":"2D"},{"Date":"06 Jan 2026","Number":11,"Source":"Ad","Phone":88625848,"Type":"BTO","Name":"Yun Wen","Responsive?":"YES","GC created":"YES","PM":"XUEQI","1st meet":"YES","2D":"YES","Quotation":"YES","2nd meet":null,"Revised 2D":null,"Revised Quotation":null,"Site visit":null,"Comments":"Customer moved to competitor","1st Deposit":null,"2nd Deposit":null,"FINAL STATUS":"LAPSED","stage":"Quotation"},{"Date":"08 Jan 2026","Number":12,"Source":"Ad","Phone":96874495,"Type":"BTO","Name":"Aletheia","Responsive?":"NO","GC created":null,"PM":null,"1st meet":null,"2D":null,"Quotation":null,"2nd meet":null,"Revised 2D":null,"Revised Quotation":null,"Site visit":null,"Comments":"Customer key collection Q1 2027","1st Deposit":null,"2nd Deposit":null,"FINAL STATUS":"LONG KEY COLLECTION","stage":"New Lead"},{"Date":"08 Jan 2026","Number":13,"Source":"Ad","Phone":87211980,"Type":"BTO","Name":"Lucas","Responsive?":"NO","GC created":null,"PM":null,"1st meet":null,"2D":null,"Quotation":null,"2nd meet":null,"Revised 2D":null,"Revised Quotation":null,"Site visit":null,"Comments":"Customer key collection Q1 2028","1st Deposit":null,"2nd Deposit":null,"FINAL STATUS":"LONG KEY COLLECTION","stage":"New Lead"},{"Date":"09 Jan 2026","Number":14,"Source":"Ad","Phone":87884799,"Type":"BTO","Name":"Jacky","Responsive?":"NO","GC created":null,"PM":null,"1st meet":null,"2D":null,"Quotation":null,"2nd meet":null,"Revised 2D":null,"Revised Quotation":null,"Site visit":null,"Comments":null,"1st Deposit":null,"2nd Deposit":null,"FINAL STATUS":"LAPSED","stage":"New Lead"},{"Date":"07 Jan 2026","Number":15,"Source":"Ad","Phone":93890756,"Type":"BTO","Name":"MingWei","Responsive?":"NO","GC created":"YES","PM":"XUEQI","1st meet":"YES","2D":"YES","Quotation":"YES","2nd meet":null,"Revised 2D":null,"Revised Quotation":null,"Site visit":null,"Comments":"Customer moved to competitor","1st Deposit":null,"2nd Deposit":null,"FINAL STATUS":"LAPSED","stage":"Quotation"},{"Date":"09 Jan 2026","Number":16,"Source":"Ad","Phone":91019940,"Type":"BTO","Name":"Arliana","Responsive?":"NO","GC created":null,"PM":null,"1st meet":null,"2D":null,"Quotation":null,"2nd meet":null,"Revised 2D":null,"Revised Quotation":null,"Site visit":null,"Comments":"Min Spend < $5k","1st Deposit":null,"2nd Deposit":null,"FINAL STATUS":"LAPSED","stage":"New Lead"},{"Date":"11 Jan 2026","Number":17,"Source":"Ad","Phone":87675695,"Type":"BTO","Name":"Ameera","Responsive?":"NO","GC created":null,"PM":null,"1st meet":null,"2D":null,"Quotation":null,"2nd meet":null,"Revised 2D":null,"Revised Quotation":null,"Site visit":null,"Comments":"Customer key collection Q4 2027","1st Deposit":null,"2nd Deposit":null,"FINAL STATUS":"LONG KEY COLLECTION","stage":"New Lead"},{"Date":"10 Jan 2026","Number":18,"Source":"Ad","Phone":90886770,"Type":"BTO","Name":"Alan Lau","Responsive?":"YES","GC created":"YES","PM":"PENGFEI","1st meet":"YES","2D":"YES","Quotation":"YES","2nd meet":"YES","Revised 2D":"YES","Revised Quotation":"YES","Site visit":null,"Comments":null,"1st Deposit":null,"2nd Deposit":null,"FINAL STATUS":"ACTIVE","stage":"Revised Quotation"},{"Date":"11 Jan 2026","Number":19,"Source":"Ad","Phone":81630703,"Type":"Resale","Name":"Mel","Responsive?":"NO","GC created":null,"PM":null,"1st meet":null,"2D":null,"Quotation":null,"2nd meet":null,"Revised 2D":null,"Revised Quotation":null,"Site visit":null,"Comments":null,"1st Deposit":null,"2nd Deposit":null,"FINAL STATUS":"LAPSED","stage":"New Lead"},{"Date":"12 Jan 2026","Number":20,"Source":"Ad","Phone":97231378,"Type":"BTO","Name":"Joanne","Responsive?":"NO","GC created":null,"PM":null,"1st meet":null,"2D":null,"Quotation":null,"2nd meet":null,"Revised 2D":null,"Revised Quotation":null,"Site visit":null,"Comments":"Customer key collection Q4 2026","1st Deposit":null,"2nd Deposit":null,"FINAL STATUS":"LONG KEY COLLECTION","stage":"New Lead"},{"Date":"09 Jan 2026","Number":21,"Source":"Ad","Phone":81803560,"Type":"BTO","Name":"Fun","Responsive?":"NO","GC created":null,"PM":null,"1st meet":null,"2D":null,"Quotation":null,"2nd meet":null,"Revised 2D":null,"Revised Quotation":null,"Site visit":null,"Comments":"Customer key collection Q2 2027","1st Deposit":null,"2nd Deposit":null,"FINAL STATUS":"LONG KEY COLLECTION","stage":"New Lead"},{"Date":"12 Jan 2026","Number":22,"Source":"Ad","Phone":97938763,"Type":"BTO","Name":"Adrian","Responsive?":"YES","GC created":"YES","PM":"QUEENIE","1st meet":"YES","2D":"YES","Quotation":"YES","2nd meet":null,"Revised 2D":null,"Revised Quotation":null,"Site visit":null,"Comments":null,"1st Deposit":null,"2nd Deposit":null,"FINAL STATUS":"SIGNED","stage":"Quotation"},{"Date":"12 Jan 2026","Number":23,"Source":"Ad","Phone":86535024,"Type":"BTO","Name":"Jasmine","Responsive?":"NO","GC created":null,"PM":null,"1st meet":null,"2D":null,"Quotation":null,"2nd meet":null,"Revised 2D":null,"Revised Quotation":null,"Site visit":null,"Comments":"SBF, cannot locate floorplan in SingPass","1st Deposit":null,"2nd Deposit":null,"FINAL STATUS":"LAPSED","stage":"New Lead"},{"Date":"07 Jan 2026","Number":24,"Source":"Ad","Phone":97570544,"Type":"Resale","Name":"Teesha","Responsive?":"YES","GC created":null,"PM":"BOSS CHONG","1st meet":null,"2D":null,"Quotation":null,"2nd meet":null,"Revised 2D":null,"Revised Quotation":null,"Site visit":null,"Comments":"Pending partial quotation","1st Deposit":null,"2nd Deposit":null,"FINAL STATUS":"ACTIVE","stage":"Responsive"},{"Date":"12 Jan 2026","Number":25,"Source":"Ad","Phone":97479320,"Type":"Resale","Name":"Ily","Responsive?":"NO","GC created":null,"PM":null,"1st meet":null,"2D":null,"Quotation":null,"2nd meet":null,"Revised 2D":null,"Revised Quotation":null,"Site visit":null,"Comments":null,"1st Deposit":null,"2nd Deposit":null,"FINAL STATUS":"LAPSED","stage":"New Lead"},{"Date":"15 Jan 2026","Number":26,"Source":"Ad","Phone":96563892,"Type":"BTO","Name":"Kenneth","Responsive?":"YES","GC created":"YES","PM":"XUEQI","1st meet":"YES","2D":"YES","Quotation":"YES","2nd meet":"YES","Revised 2D":"YES","Revised Quotation":"YES","Site visit":null,"Comments":null,"1st Deposit":null,"2nd Deposit":null,"FINAL STATUS":"ACTIVE","stage":"Revised Quotation"},{"Date":"15 Jan 2026","Number":27,"Source":"Ad","Phone":96326559,"Type":"BTO","Name":"Joy","Responsive?":"NO","GC created":"YES","PM":"QUEENIE","1st meet":null,"2D":null,"Quotation":null,"2nd meet":null,"Revised 2D":null,"Revised Quotation":null,"Site visit":null,"Comments":null,"1st Deposit":null,"2nd Deposit":null,"FINAL STATUS":"LAPSED","stage":"GC Created"},{"Date":"16 Jan 2026","Number":28,"Source":"Ad","Phone":91594495,"Type":"BTO","Name":"Stefie Chia","Responsive?":"NO","GC created":null,"PM":null,"1st meet":null,"2D":null,"Quotation":null,"2nd meet":null,"Revised 2D":null,"Revised Quotation":null,"Site visit":null,"Comments":"Customer key collection Q4 2026","1st Deposit":null,"2nd Deposit":null,"FINAL STATUS":"LONG KEY COLLECTION","stage":"New Lead"},{"Date":"18 Jan 2026","Number":29,"Source":"Ad","Phone":98470470,"Type":"BTO","Name":"Krissy","Responsive?":"NO","GC created":null,"PM":null,"1st meet":null,"2D":null,"Quotation":null,"2nd meet":null,"Revised 2D":null,"Revised Quotation":null,"Site visit":null,"Comments":"Customer key collection Q4 2026","1st Deposit":null,"2nd Deposit":null,"FINAL STATUS":"LONG KEY COLLECTION","stage":"New Lead"},{"Date":"11 Jan 2026","Number":30,"Source":"Ad","Phone":87831491,"Type":"Resale","Name":"Esmie","Responsive?":"NO","GC created":null,"PM":null,"1st meet":null,"2D":null,"Quotation":null,"2nd meet":null,"Revised 2D":null,"Revised Quotation":null,"Site visit":null,"Comments":null,"1st Deposit":null,"2nd Deposit":null,"FINAL STATUS":"LAPSED","stage":"New Lead"},{"Date":"15 Jan 2026","Number":31,"Source":"Ad","Phone":98566883,"Type":"BTO","Name":"Eric","Responsive?":"NO","GC created":null,"PM":null,"1st meet":null,"2D":null,"Quotation":null,"2nd meet":null,"Revised 2D":null,"Revised Quotation":null,"Site visit":null,"Comments":null,"1st Deposit":null,"2nd Deposit":null,"FINAL STATUS":"LAPSED","stage":"New Lead"},{"Date":"08 Jan 2026","Number":32,"Source":"Ad","Phone":91849022,"Type":"BTO","Name":"Shawal","Responsive?":"YES","GC created":"YES","PM":"QUEENIE","1st meet":"YES","2D":"YES","Quotation":"YES","2nd meet":null,"Revised 2D":null,"Revised Quotation":null,"Site visit":null,"Comments":"Moved to competitor","1st Deposit":null,"2nd Deposit":null,"FINAL STATUS":"LAPSED","stage":"Quotation"},{"Date":"21 Jan 2026","Number":33,"Source":"Ad","Phone":91099209,"Type":"BTO","Name":"William","Responsive?":"NO","GC created":null,"PM":null,"1st meet":null,"2D":null,"Quotation":null,"2nd meet":null,"Revised 2D":null,"Revised Quotation":null,"Site visit":null,"Comments":null,"1st Deposit":null,"2nd Deposit":null,"FINAL STATUS":"LAPSED","stage":"New Lead"},{"Date":"22 Jan 2026","Number":34,"Source":"Ad","Phone":96487166,"Type":"BTO","Name":"Construction","Responsive?":"NO","GC created":null,"PM":null,"1st meet":null,"2D":null,"Quotation":null,"2nd meet":null,"Revised 2D":null,"Revised Quotation":null,"Site visit":null,"Comments":null,"1st Deposit":null,"2nd Deposit":null,"FINAL STATUS":"LAPSED","stage":"New Lead"},{"Date":"20 Jan 2026","Number":35,"Source":"Ad","Phone":81614001,"Type":"BTO","Name":"Aaron","Responsive?":"YES","GC created":"YES","PM":"QUEENIE","1st meet":"YES","2D":"YES","Quotation":"YES","2nd meet":null,"Revised 2D":null,"Revised Quotation":null,"Site visit":null,"Comments":null,"1st Deposit":null,"2nd Deposit":null,"FINAL STATUS":"ACTIVE","stage":"Quotation"},{"Date":"20 Jan 2026","Number":36,"Source":"Ad","Phone":98310669,"Type":"BTO","Name":"Dominic","Responsive?":"YES","GC created":"YES","PM":"QUEENIE","1st meet":"YES","2D":"YES","Quotation":"YES","2nd meet":"YES","Revised 2D":null,"Revised Quotation":null,"Site visit":null,"Comments":null,"1st Deposit":null,"2nd Deposit":null,"FINAL STATUS":"SIGNED","stage":"2nd Meeting"},{"Date":"20 Jan 2026","Number":37,"Source":"Ad","Phone":91878995,"Type":"BTO","Name":"Yana","Responsive?":"YES","GC created":"YES","PM":"PENGFEI","1st meet":"YES","2D":"YES","Quotation":"YES","2nd meet":null,"Revised 2D":null,"Revised Quotation":null,"Site visit":null,"Comments":null,"1st Deposit":null,"2nd Deposit":null,"FINAL STATUS":"ACTIVE","stage":"Quotation"},{"Date":"22 Jan 2026","Number":38,"Source":"Ad","Phone":84982194,"Type":"Resale","Name":"LeeKee","Responsive?":"YES","GC created":"YES","PM":"SHAN","1st meet":null,"2D":null,"Quotation":null,"2nd meet":null,"Revised 2D":null,"Revised Quotation":null,"Site visit":null,"Comments":null,"1st Deposit":null,"2nd Deposit":null,"FINAL STATUS":"ACTIVE","stage":"GC Created"},{"Date":"25 Jan 2026","Number":39,"Source":"Ad","Phone":87009331,"Type":"BTO","Name":"Doreen","Responsive?":"NO","GC created":null,"PM":null,"1st meet":null,"2D":null,"Quotation":null,"2nd meet":null,"Revised 2D":null,"Revised Quotation":null,"Site visit":null,"Comments":null,"1st Deposit":null,"2nd Deposit":null,"FINAL STATUS":"LAPSED","stage":"New Lead"},{"Date":"23 Jan 2026","Number":40,"Source":"Ad","Phone":83332661,"Type":null,"Name":"Alson","Responsive?":"YES","GC created":null,"PM":null,"1st meet":null,"2D":null,"Quotation":null,"2nd meet":null,"Revised 2D":null,"Revised Quotation":null,"Site visit":null,"Comments":"looking for carpenter provider, passed him Chong's number","1st Deposit":null,"2nd Deposit":null,"FINAL STATUS":"LAPSED","stage":"Responsive"},{"Date":"03 Jan 2026","Number":41,"Source":"Ad","Phone":87781660,"Type":"BTO","Name":"Chin Yee","Responsive?":"YES","GC created":"YES","PM":"XUEQI","1st meet":"YES","2D":"YES","Quotation":"YES","2nd meet":"YES","Revised 2D":"YES","Revised Quotation":"YES","Site visit":null,"Comments":null,"1st Deposit":null,"2nd Deposit":null,"FINAL STATUS":"ACTIVE","stage":"Revised Quotation"},{"Date":"23 Jan 2026","Number":42,"Source":"Ad","Phone":83681815,"Type":"BTO","Name":"Dareios","Responsive?":"NO","GC created":"YES","PM":"XUEQI","1st meet":"YES","2D":"YES","Quotation":"YES","2nd meet":null,"Revised 2D":null,"Revised Quotation":null,"Site visit":null,"Comments":null,"1st Deposit":null,"2nd Deposit":null,"FINAL STATUS":"LAPSED","stage":"Quotation"},{"Date":"24 Jan 2026","Number":43,"Source":"Ad","Phone":90309093,"Type":"BTO","Name":"Sky","Responsive?":"YES","GC created":"YES","PM":"QUEENIE","1st meet":"YES","2D":"YES","Quotation":"YES","2nd meet":null,"Revised 2D":null,"Revised Quotation":null,"Site visit":null,"Comments":"Moved to competitor","1st Deposit":null,"2nd Deposit":null,"FINAL STATUS":"LAPSED","stage":"Quotation"},{"Date":"26 Jan 2026","Number":44,"Source":"Ad","Phone":91715758,"Type":"BTO","Name":"Timothea","Responsive?":"YES","GC created":"YES","PM":"QUEENIE","1st meet":"YES","2D":"YES","Quotation":"YES","2nd meet":null,"Revised 2D":null,"Revised Quotation":null,"Site visit":null,"Comments":"Moved to competitor","1st Deposit":null,"2nd Deposit":null,"FINAL STATUS":"LAPSED","stage":"Quotation"},{"Date":"26 Jan 1900","Number":45,"Source":"Ad","Phone":83288915,"Type":"BTO","Name":"Lysha","Responsive?":"YES","GC created":"YES","PM":"QUEENIE","1st meet":"YES","2D":"YES","Quotation":"YES","2nd meet":"SCHEDULED","Revised 2D":null,"Revised Quotation":null,"Site visit":null,"Comments":null,"1st Deposit":null,"2nd Deposit":null,"FINAL STATUS":"ACTIVE","stage":"Quotation"},{"Date":"25 Jan 2026","Number":46,"Source":"Ad","Phone":92976611,"Type":"BTO","Name":"FangLing","Responsive?":"YES","GC created":"NO","PM":null,"1st meet":null,"2D":null,"Quotation":null,"2nd meet":null,"Revised 2D":null,"Revised Quotation":null,"Site visit":null,"Comments":"Does not want to join GC. Balia","1st Deposit":null,"2nd Deposit":null,"FINAL STATUS":"LAPSED","stage":"Responsive"},{"Date":"27 Jan 2026","Number":47,"Source":"Ad","Phone":91013901,"Type":"BTO","Name":"Jia Le","Responsive?":"YES","GC created":"YES","PM":"QUEENIE","1st meet":"SCHEDULED","2D":null,"Quotation":null,"2nd meet":null,"Revised 2D":null,"Revised Quotation":null,"Site visit":null,"Comments":"Pending floor plan","1st Deposit":null,"2nd Deposit":null,"FINAL STATUS":"ACTIVE","stage":"GC Created"},{"Date":"27 Jan 2026","Number":48,"Source":"Ad","Phone":81124522,"Type":"BTO","Name":"Aibo","Responsive?":"YES","GC created":"YES","PM":"QUEENIE","1st meet":"YES","2D":"YES","Quotation":"YES","2nd meet":null,"Revised 2D":null,"Revised Quotation":null,"Site visit":null,"Comments":"Pending floor plan","1st Deposit":null,"2nd Deposit":null,"FINAL STATUS":"ACTIVE","stage":"Quotation"},{"Date":"28 Jan 2026","Number":49,"Source":"Ad","Phone":96343371,"Type":"BTO","Name":"Qing Hao","Responsive?":"NO","GC created":null,"PM":null,"1st meet":null,"2D":null,"Quotation":null,"2nd meet":null,"Revised 2D":null,"Revised Quotation":null,"Site visit":null,"Comments":"Does not want to join GC. Long key collection","1st Deposit":null,"2nd Deposit":null,"FINAL STATUS":"LONG KEY COLLECTION","stage":"New Lead"},{"Date":"28 Jan 2026","Number":50,"Source":"Ad","Phone":87532512,"Type":"Resale","Name":"Hadi","Responsive?":null,"GC created":null,"PM":null,"1st meet":null,"2D":null,"Quotation":null,"2nd meet":null,"Revised 2D":null,"Revised Quotation":null,"Site visit":null,"Comments":null,"1st Deposit":null,"2nd Deposit":null,"FINAL STATUS":"LAPSED","stage":"New Lead"},{"Date":"28 Jan 2026","Number":51,"Source":"Ad","Phone":93380868,"Type":"BTO","Name":"Anita","Responsive?":"YES","GC created":"YES","PM":"XUEQI","1st meet":"YES","2D":"PENDING","Quotation":"PENDING","2nd meet":null,"Revised 2D":null,"Revised Quotation":null,"Site visit":null,"Comments":null,"1st Deposit":null,"2nd Deposit":null,"FINAL STATUS":"ACTIVE","stage":"1st Meeting"},{"Date":"27 Jan 2026","Number":52,"Source":"Ad","Phone":84245578,"Type":"Resale","Name":"Chandhi","Responsive?":"NO","GC created":null,"PM":null,"1st meet":null,"2D":null,"Quotation":null,"2nd meet":null,"Revised 2D":null,"Revised Quotation":null,"Site visit":null,"Comments":null,"1st Deposit":null,"2nd Deposit":null,"FINAL STATUS":"LAPSED","stage":"New Lead"},{"Date":"28 Jan 2026","Number":53,"Source":"Ad","Phone":97689238,"Type":"BTO","Name":"Chern Yung","Responsive?":"YES","GC created":"YES","PM":"XUEQI","1st meet":"YES","2D":"YES","Quotation":"YES","2nd meet":null,"Revised 2D":null,"Revised Quotation":null,"Site visit":null,"Comments":null,"1st Deposit":null,"2nd Deposit":null,"FINAL STATUS":"ACTIVE","stage":"Quotation"},{"Date":"29 Jan 2026","Number":54,"Source":"Ad","Phone":84345251,"Type":"Resale","Name":"XY Stella","Responsive?":"YES","GC created":null,"PM":null,"1st meet":null,"2D":null,"Quotation":null,"2nd meet":null,"Revised 2D":null,"Revised Quotation":null,"Site visit":null,"Comments":"Wants modifications on existing carpentry","1st Deposit":null,"2nd Deposit":null,"FINAL STATUS":"LAPSED","stage":"Responsive"},{"Date":"29 Jan 2026","Number":55,"Source":"Ad","Phone":96188672,"Type":"BTO","Name":"MeiYi","Responsive?":"NO","GC created":"YES","PM":"XUEQI","1st meet":"YES","2D":"YES","Quotation":null,"2nd meet":null,"Revised 2D":null,"Revised Quotation":null,"Site visit":null,"Comments":null,"1st Deposit":null,"2nd Deposit":null,"FINAL STATUS":"ACTIVE","stage":"2D"},{"Date":"29 Jan 2026","Number":56,"Source":"Ad","Phone":97237771,"Type":"BTO","Name":"Sharena","Responsive?":"YES","GC created":null,"PM":null,"1st meet":null,"2D":null,"Quotation":null,"2nd meet":null,"Revised 2D":null,"Revised Quotation":null,"Site visit":null,"Comments":"Key collection Q2 2027","1st Deposit":null,"2nd Deposit":null,"FINAL STATUS":"LONG KEY COLLECTION","stage":"Responsive"},{"Date":"29 Jan 2026","Number":57,"Source":"Ad","Phone":98796426,"Type":"BTO","Name":"Kelvin","Responsive?":"NO","GC created":"YES","PM":"XUEQI","1st meet":null,"2D":null,"Quotation":null,"2nd meet":null,"Revised 2D":null,"Revised Quotation":null,"Site visit":null,"Comments":null,"1st Deposit":null,"2nd Deposit":null,"FINAL STATUS":"LAPSED","stage":"GC Created"},{"Date":"29 Jan 2026","Number":58,"Source":"Ad","Phone":88428099,"Type":"BTO","Name":"Naz","Responsive?":null,"GC created":null,"PM":null,"1st meet":null,"2D":null,"Quotation":null,"2nd meet":null,"Revised 2D":null,"Revised Quotation":null,"Site visit":null,"Comments":"Key Collection Q4 2026","1st Deposit":null,"2nd Deposit":null,"FINAL STATUS":"LONG KEY COLLECTION","stage":"New Lead"},{"Date":"30 Jan 2026","Number":59,"Source":"Ad","Phone":98527959,"Type":"BTO","Name":"Charmyne","Responsive?":null,"GC created":null,"PM":null,"1st meet":null,"2D":null,"Quotation":null,"2nd meet":null,"Revised 2D":null,"Revised Quotation":null,"Site visit":null,"Comments":"Key Collection Q3 2027","1st Deposit":null,"2nd Deposit":null,"FINAL STATUS":"LONG KEY COLLECTION","stage":"New Lead"},{"Date":"30 Jan 2026","Number":60,"Source":"Ad","Phone":91525865,"Type":"Resale","Name":"Javier","Responsive?":null,"GC created":null,"PM":null,"1st meet":null,"2D":null,"Quotation":null,"2nd meet":null,"Revised 2D":null,"Revised Quotation":null,"Site visit":null,"Comments":"Less than < 5k","1st Deposit":null,"2nd Deposit":null,"FINAL STATUS":"LAPSED","stage":"New Lead"},{"Date":"31 Jan 2026","Number":61,"Source":"Ad","Phone":96202266,"Type":"BTO","Name":"Rani","Responsive?":"NO","GC created":null,"PM":null,"1st meet":null,"2D":null,"Quotation":null,"2nd meet":null,"Revised 2D":null,"Revised Quotation":null,"Site visit":null,"Comments":null,"1st Deposit":null,"2nd Deposit":null,"FINAL STATUS":"LAPSED","stage":"New Lead"},{"Date":"01 Feb 2026","Number":62,"Source":"Ad","Phone":88698191,"Type":"BTO","Name":"Derek","Responsive?":"YES","GC created":"YES","PM":"QUEENIE","1st meet":"YES","2D":"YES","Quotation":"YES","2nd meet":null,"Revised 2D":null,"Revised Quotation":null,"Site visit":null,"Comments":null,"1st Deposit":null,"2nd Deposit":null,"FINAL STATUS":"ACTIVE","stage":"Quotation"},{"Date":"01 Feb 2026","Number":63,"Source":"Ad","Phone":97563961,"Type":"BTO","Name":"Stacey","Responsive?":"YES","GC created":"YES","PM":"XUEQI","1st meet":"YES","2D":"PENDING","Quotation":"PENDING","2nd meet":null,"Revised 2D":null,"Revised Quotation":null,"Site visit":null,"Comments":null,"1st Deposit":null,"2nd Deposit":null,"FINAL STATUS":"ACTIVE","stage":"1st Meeting"},{"Date":"01 Feb 2026","Number":64,"Source":"Ad","Phone":90902090,"Type":"BTO","Name":"Joreen","Responsive?":"NO","GC created":null,"PM":null,"1st meet":null,"2D":null,"Quotation":null,"2nd meet":null,"Revised 2D":null,"Revised Quotation":null,"Site visit":null,"Comments":null,"1st Deposit":null,"2nd Deposit":null,"FINAL STATUS":"LAPSED","stage":"New Lead"},{"Date":"01 Feb 2026","Number":65,"Source":"Ad","Phone":98569227,"Type":"BTO","Name":"Zuri (DMZ)","Responsive?":"NO","GC created":"WAITING FOR CUSTOMER ACCEPTANCE","PM":"PENGFEI","1st meet":null,"2D":null,"Quotation":null,"2nd meet":null,"Revised 2D":null,"Revised Quotation":null,"Site visit":null,"Comments":"No longer wants quote","1st Deposit":null,"2nd Deposit":null,"FINAL STATUS":"LAPSED","stage":"New Lead"},{"Date":"31 Jan 2026","Number":66,"Source":"Ad","Phone":81680355,"Type":"EC","Name":"Zhao Hong","Responsive?":"NO","GC created":"YES","PM":"SHAN","1st meet":null,"2D":null,"Quotation":null,"2nd meet":null,"Revised 2D":null,"Revised Quotation":null,"Site visit":null,"Comments":null,"1st Deposit":null,"2nd Deposit":null,"FINAL STATUS":"ACTIVE","stage":"GC Created"},{"Date":"03 Feb 2026","Number":67,"Source":"Ad","Phone":91372718,"Type":"Resale","Name":"Yong","Responsive?":"YES","GC created":"YES","PM":"SHAN","1st meet":"SCHEDULED","2D":null,"Quotation":null,"2nd meet":null,"Revised 2D":null,"Revised Quotation":null,"Site visit":null,"Comments":null,"1st Deposit":null,"2nd Deposit":null,"FINAL STATUS":"ACTIVE","stage":"GC Created"},{"Date":"04 Feb 2026","Number":68,"Source":"Ad","Phone":97538730,"Type":"Resale","Name":"Shannon","Responsive?":"YES","GC created":null,"PM":null,"1st meet":null,"2D":null,"Quotation":null,"2nd meet":null,"Revised 2D":null,"Revised Quotation":null,"Site visit":null,"Comments":"Less than < 5k","1st Deposit":null,"2nd Deposit":null,"FINAL STATUS":"LAPSED","stage":"Responsive"},{"Date":"07 Feb 2026","Number":69,"Source":"Ad","Phone":81894282,"Type":"BTO","Name":"Cheryl","Responsive?":"NO","GC created":null,"PM":null,"1st meet":null,"2D":null,"Quotation":null,"2nd meet":null,"Revised 2D":null,"Revised Quotation":null,"Site visit":null,"Comments":null,"1st Deposit":null,"2nd Deposit":null,"FINAL STATUS":"LAPSED","stage":"New Lead"},{"Date":"07 Feb 2026","Number":70,"Source":"Ad","Phone":91812048,"Type":"BTO","Name":"Amanda","Responsive?":"YES","GC created":null,"PM":null,"1st meet":null,"2D":null,"Quotation":null,"2nd meet":null,"Revised 2D":null,"Revised Quotation":null,"Site visit":null,"Comments":"Key Collection Q4 2026","1st Deposit":null,"2nd Deposit":null,"FINAL STATUS":"LONG KEY COLLECTION","stage":"Responsive"},{"Date":"08 Feb 2026","Number":71,"Source":"Ad","Phone":81012346,"Type":"BTO","Name":"Farah","Responsive?":"YES","GC created":"YES","PM":"XUEQI","1st meet":"SCHEDULED","2D":null,"Quotation":null,"2nd meet":null,"Revised 2D":null,"Revised Quotation":null,"Site visit":null,"Comments":null,"1st Deposit":null,"2nd Deposit":null,"FINAL STATUS":"ACTIVE","stage":"GC Created"},{"Date":"08 Feb 2026","Number":72,"Source":"Ad","Phone":90038355,"Type":"BTO","Name":"Eileen","Responsive?":"NO","GC created":"YES","PM":"XUEQI","1st meet":null,"2D":null,"Quotation":null,"2nd meet":null,"Revised 2D":null,"Revised Quotation":null,"Site visit":null,"Comments":null,"1st Deposit":null,"2nd Deposit":null,"FINAL STATUS":"ACTIVE","stage":"GC Created"},{"Date":"07 Feb 2026","Number":73,"Source":"Ad","Phone":97848194,"Type":"EC","Name":"Lorelle","Responsive?":"NO","GC created":null,"PM":null,"1st meet":null,"2D":null,"Quotation":null,"2nd meet":null,"Revised 2D":null,"Revised Quotation":null,"Site visit":null,"Comments":null,"1st Deposit":null,"2nd Deposit":null,"FINAL STATUS":"LAPSED","stage":"New Lead"},{"Date":"06 Feb 2026","Number":74,"Source":"Ad","Phone":92221652,"Type":"BTO","Name":"Emilia","Responsive?":"NO","GC created":null,"PM":null,"1st meet":null,"2D":null,"Quotation":null,"2nd meet":null,"Revised 2D":null,"Revised Quotation":null,"Site visit":null,"Comments":null,"1st Deposit":null,"2nd Deposit":null,"FINAL STATUS":"LAPSED","stage":"New Lead"},{"Date":"08 Feb 2026","Number":75,"Source":"Ad","Phone":91596389,"Type":null,"Name":"Claudia","Responsive?":"YES","GC created":null,"PM":null,"1st meet":null,"2D":null,"Quotation":null,"2nd meet":null,"Revised 2D":null,"Revised Quotation":null,"Site visit":null,"Comments":"Only asked about coveless light. < 5k","1st Deposit":null,"2nd Deposit":null,"FINAL STATUS":"LAPSED","stage":"Responsive"},{"Date":"08 Feb 2026","Number":76,"Source":"Ad","Phone":81897412,"Type":"BTO","Name":"Benz (Petta)","Responsive?":"YES","GC created":null,"PM":null,"1st meet":null,"2D":null,"Quotation":null,"2nd meet":null,"Revised 2D":null,"Revised Quotation":null,"Site visit":null,"Comments":"Key Collection Q3 2027","1st Deposit":null,"2nd Deposit":null,"FINAL STATUS":"LONG KEY COLLECTION","stage":"Responsive"},{"Date":"09 Feb 2026","Number":77,"Source":"Ad","Phone":90500906,"Type":"BTO","Name":"MHKNNZ (Hasyir)","Responsive?":"YES","GC created":null,"PM":null,"1st meet":null,"2D":null,"Quotation":null,"2nd meet":null,"Revised 2D":null,"Revised Quotation":null,"Site visit":null,"Comments":"Key Collection Q2 2027","1st Deposit":null,"2nd Deposit":null,"FINAL STATUS":"LONG KEY COLLECTION","stage":"Responsive"},{"Date":"07 Feb 2026","Number":78,"Source":"Ad","Phone":90606578,"Type":"BTO","Name":"PK (Ho)","Responsive?":"NO","GC created":null,"PM":null,"1st meet":null,"2D":null,"Quotation":null,"2nd meet":null,"Revised 2D":null,"Revised Quotation":null,"Site visit":null,"Comments":"\"I'll revert if I'm keen\"","1st Deposit":null,"2nd Deposit":null,"FINAL STATUS":"LAPSED","stage":"New Lead"},{"Date":"05 Feb 2026","Number":79,"Source":"Ad","Phone":92343322,"Type":"BTO","Name":"Solihin (Sol)","Responsive?":"YES","GC created":null,"PM":null,"1st meet":null,"2D":null,"Quotation":null,"2nd meet":null,"Revised 2D":null,"Revised Quotation":null,"Site visit":null,"Comments":"Key Collection Q1 2027","1st Deposit":null,"2nd Deposit":null,"FINAL STATUS":"LONG KEY COLLECTION","stage":"Responsive"},{"Date":"09 Feb 2026","Number":80,"Source":"Ad","Phone":97225780,"Type":"BTO","Name":"Mamat","Responsive?":"YES","GC created":"YES","PM":"XUEQI","1st meet":"SCHEDULED","2D":null,"Quotation":null,"2nd meet":null,"Revised 2D":null,"Revised Quotation":null,"Site visit":null,"Comments":null,"1st Deposit":null,"2nd Deposit":null,"FINAL STATUS":"ACTIVE","stage":"GC Created"},{"Date":"09 Feb 2026","Number":81,"Source":"Ad","Phone":82890375,"Type":null,"Name":"Peng Phin","Responsive?":"YES","GC created":null,"PM":null,"1st meet":null,"2D":null,"Quotation":null,"2nd meet":null,"Revised 2D":null,"Revised Quotation":null,"Site visit":null,"Comments":"Only asked about coveless light. < 5k","1st Deposit":null,"2nd Deposit":null,"FINAL STATUS":"LAPSED","stage":"Responsive"},{"Date":"09 Feb 2026","Number":82,"Source":"Ad","Phone":90683398,"Type":"BTO","Name":"Zayd","Responsive?":"YES","GC created":null,"PM":null,"1st meet":null,"2D":null,"Quotation":null,"2nd meet":null,"Revised 2D":null,"Revised Quotation":null,"Site visit":null,"Comments":"Key Collection Q2 2027","1st Deposit":null,"2nd Deposit":null,"FINAL STATUS":"LONG KEY COLLECTION","stage":"Responsive"},{"Date":"10 Feb 2026","Number":83,"Source":"Ad","Phone":83809889,"Type":"Bungalow","Name":"Ms Vicky","Responsive?":"YES","GC created":null,"PM":null,"1st meet":null,"2D":null,"Quotation":null,"2nd meet":null,"Revised 2D":null,"Revised Quotation":null,"Site visit":null,"Comments":"Pending drawn out floorplan","1st Deposit":null,"2nd Deposit":null,"FINAL STATUS":"ACTIVE","stage":"Responsive"},{"Date":"05 Feb 2026","Number":84,"Source":"Ad","Phone":81769626,"Type":"BTO","Name":"Kelly Ying Fen","Responsive?":"NO","GC created":null,"PM":null,"1st meet":null,"2D":null,"Quotation":null,"2nd meet":null,"Revised 2D":null,"Revised Quotation":null,"Site visit":null,"Comments":null,"1st Deposit":null,"2nd Deposit":null,"FINAL STATUS":"LAPSED","stage":"New Lead"},{"Date":"07 Feb 2026","Number":85,"Source":"Ad","Phone":81894282,"Type":"BTO","Name":"Cheryl","Responsive?":"NO","GC created":null,"PM":null,"1st meet":null,"2D":null,"Quotation":null,"2nd meet":null,"Revised 2D":null,"Revised Quotation":null,"Site visit":null,"Comments":null,"1st Deposit":null,"2nd Deposit":null,"FINAL STATUS":"LAPSED","stage":"New Lead"},{"Date":"02 Feb 2026","Number":86,"Source":"Ad","Phone":86862324,"Type":"Condo","Name":"XiuEr","Responsive?":"NO","GC created":null,"PM":null,"1st meet":null,"2D":null,"Quotation":null,"2nd meet":null,"Revised 2D":null,"Revised Quotation":null,"Site visit":null,"Comments":null,"1st Deposit":null,"2nd Deposit":null,"FINAL STATUS":"LAPSED","stage":"New Lead"},{"Date":"06 Feb 2026","Number":87,"Source":"Ad","Phone":90214856,"Type":"BTO","Name":"JFLim (Jenn Feng)","Responsive?":"YES","GC created":"YES","PM":"XUEQI","1st meet":"SCHEDULED","2D":null,"Quotation":null,"2nd meet":null,"Revised 2D":null,"Revised Quotation":null,"Site visit":null,"Comments":null,"1st Deposit":null,"2nd Deposit":null,"FINAL STATUS":"ACTIVE","stage":"GC Created"},{"Date":"09 Feb 2026","Number":88,"Source":"Ad","Phone":90288474,"Type":"Condo","Name":"Nisha","Responsive?":"YES","GC created":"YES","PM":"SHAN","1st meet":"YES","2D":"PENDING","Quotation":"PENDING","2nd meet":null,"Revised 2D":null,"Revised Quotation":null,"Site visit":null,"Comments":null,"1st Deposit":null,"2nd Deposit":null,"FINAL STATUS":"ACTIVE","stage":"1st Meeting"},{"Date":"07 Feb 2026","Number":89,"Source":"Ad","Phone":98746560,"Type":"BTO","Name":"Raj Krish","Responsive?":"YES","GC created":"YES","PM":"XUEQI","1st meet":"YES","2D":"PENDING","Quotation":"PENDING","2nd meet":null,"Revised 2D":null,"Revised Quotation":null,"Site visit":null,"Comments":null,"1st Deposit":null,"2nd Deposit":null,"FINAL STATUS":"ACTIVE","stage":"1st Meeting"},{"Date":"09 Feb 2026","Number":90,"Source":"Ad","Phone":80534066,"Type":"BTO","Name":"Renuga Sarawana","Responsive?":"YES","GC created":"NO","PM":"SHAN","1st meet":null,"2D":"PENDING","Quotation":"PENDING","2nd meet":null,"Revised 2D":null,"Revised Quotation":null,"Site visit":null,"Comments":null,"1st Deposit":null,"2nd Deposit":null,"FINAL STATUS":"ACTIVE","stage":"Responsive"},{"Date":"10 Feb 2026","Number":91,"Source":"Ad","Phone":81335699,"Type":"Resale","Name":"Jimmy Ng","Responsive?":"YES","GC created":null,"PM":null,"1st meet":null,"2D":null,"Quotation":null,"2nd meet":null,"Revised 2D":null,"Revised Quotation":null,"Site visit":null,"Comments":null,"1st Deposit":null,"2nd Deposit":null,"FINAL STATUS":"ACTIVE","stage":"Responsive"},{"Date":"10 Feb 2026","Number":92,"Source":"Ad","Phone":85002588,"Type":"Resale","Name":"Ray","Responsive?":"YES","GC created":"YES","PM":"SHAN","1st meet":"SCHEDULED","2D":null,"Quotation":null,"2nd meet":null,"Revised 2D":null,"Revised Quotation":null,"Site visit":null,"Comments":null,"1st Deposit":null,"2nd Deposit":null,"FINAL STATUS":"ACTIVE","stage":"GC Created"},{"Date":"08 Feb 2026","Number":93,"Source":"Ad","Phone":81610851,"Type":null,"Name":"Mrs Law","Responsive?":"NO","GC created":null,"PM":null,"1st meet":null,"2D":null,"Quotation":null,"2nd meet":null,"Revised 2D":null,"Revised Quotation":null,"Site visit":null,"Comments":null,"1st Deposit":null,"2nd Deposit":null,"FINAL STATUS":"LAPSED","stage":"New Lead"},{"Date":"11 Feb 2026","Number":94,"Source":"Ad","Phone":97453128,"Type":null,"Name":"Cathrine","Responsive?":"YES","GC created":null,"PM":null,"1st meet":null,"2D":null,"Quotation":null,"2nd meet":null,"Revised 2D":null,"Revised Quotation":null,"Site visit":null,"Comments":null,"1st Deposit":null,"2nd Deposit":null,"FINAL STATUS":"ACTIVE","stage":"Responsive"}];

const PIPELINE_STAGES = ['Responsive','GC Created','1st Meeting','2D','Quotation','2nd Meeting','Revised 2D','Revised Quotation','Site Visit','1st Deposit','2nd Deposit'];
const PIPELINE_STEPS  = ['Responsive?','GC created','1st meet','2D','Quotation','2nd meet','Revised 2D','Revised Quotation','Site visit','1st Deposit','2nd Deposit'];
const STAGE_ORDER = {'New Lead':0,'Responsive':1,'GC Created':2,'1st Meeting':3,'2D':4,'Quotation':5,'2nd Meeting':6,'Revised 2D':7,'Revised Quotation':8,'Site Visit':9,'1st Deposit':10,'2nd Deposit':11};

let editMode = false;
let currentPipelineFilter = 'ALL';

function getProgress(stage) { return Math.round(((STAGE_ORDER[stage]||0)/11)*100); }
function esc(s) { if(!s) return ''; return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

function cellVal(v) {
  if(v===null||v===undefined||v==='') return '<span style="color:#CCC">—</span>';
  const u = String(v).toUpperCase();
  if(u==='YES') return `<span class="cell-yes">✓ YES</span>`;
  if(u==='NO') return `<span class="cell-no">✗ NO</span>`;
  if(u==='PENDING') return `<span class="cell-pending">Pending</span>`;
  if(u==='SCHEDULED') return `<span class="cell-scheduled">Scheduled</span>`;
  return esc(v);
}

function parseKeyCollectionQuarter(comments) {
  if(!comments) return null;
  const m = comments.match(/Q([1-4])\s+(\d{4})/i);
  if(!m) return null;
  return { q: parseInt(m[1]), year: parseInt(m[2]) };
}

function isReachOutNow(kc) {
  if(!kc) return false;
  const now = new Date();
  const nowQ = Math.floor(now.getMonth() / 3) + 1;
  const nowYear = now.getFullYear();
  let targetQ = kc.q - 1;
  let targetYear = kc.year;
  if(targetQ === 0) { targetQ = 4; targetYear -= 1; }
  return nowQ === targetQ && nowYear === targetYear;
}

let pipelineFiltered = [...CHYLER_DATA];

function setPipelineFilter(status, el) {
  currentPipelineFilter = status;
  document.querySelectorAll('.status-filter-pill').forEach(p => p.classList.remove('selected'));
  el.classList.add('selected');
  filterPipeline();
}

function applyPipelineSectionVisibility() {
  const f = currentPipelineFilter;
  const sections = {
    'section-reachout': f === 'ALL' || f === 'REACHOUT',
    'section-active':   f === 'ALL' || f === 'ACTIVE',
    'section-signed':   f === 'ALL' || f === 'SIGNED',
    'section-lapsed':   f === 'ALL' || f === 'LAPSED',
    'section-keyco':    f === 'ALL' || f === 'KEYCO',
  };
  Object.entries(sections).forEach(([id, show]) => {
    const el = document.getElementById(id);
    if(el) el.style.display = show ? '' : 'none';
  });
}

function initPipeline() {
  const pmSel = document.getElementById('pipeline-pm-filter');
  const prevPm = pmSel.value;
  while(pmSel.options.length > 1) pmSel.remove(1);
  const pms = [...new Set(CHYLER_DATA.map(r=>r.PM).filter(Boolean))].sort();
  pms.forEach(pm => {
    const o=document.createElement('option'); o.value=pm; o.textContent=pm;
    pmSel.appendChild(o);
  });
  pmSel.value = prevPm;
  const typeSel = document.getElementById('pipeline-type-filter');
  const prevType = typeSel.value;
  while(typeSel.options.length > 1) typeSel.remove(1);
  const types = [...new Set(CHYLER_DATA.map(r=>r.Type).filter(Boolean))].sort();
  types.forEach(t => {
    const o=document.createElement('option'); o.value=t; o.textContent=t;
    typeSel.appendChild(o);
  });
  typeSel.value = prevType;
  filterPipeline();
}

function filterPipeline() {
  const q = document.getElementById('pipeline-search').value.toLowerCase();
  const pm = document.getElementById('pipeline-pm-filter').value;
  const type = document.getElementById('pipeline-type-filter').value;
  const filtered = CHYLER_DATA.filter(r => {
    const matchQ = !q || [r.Name, r.Phone+'', r.PM, r.Comments, r.Type].some(v=>v&&String(v).toLowerCase().includes(q));
    const matchStatus = (currentPipelineFilter === 'ALL' || currentPipelineFilter === 'REACHOUT') ||
                      (String(r['FINAL STATUS']||'').toUpperCase() === currentPipelineFilter.toUpperCase());
    return matchQ && matchStatus && (!pm||r.PM===pm) && (!type||r.Type===type);
  });
  renderPipeline(filtered);
}

function renderPipeline(data) {
  const active=data.filter(r=>String(r['FINAL STATUS']||'').toUpperCase()==='ACTIVE');
  const signed=data.filter(r=>String(r['FINAL STATUS']||'').toUpperCase()==='SIGNED');
  const lapsed=data.filter(r=>String(r['FINAL STATUS']||'').toUpperCase()==='LAPSED');
  const keyco =data.filter(r=>String(r['FINAL STATUS']||'').toUpperCase()==='LONG KEY COLLECTION');

  const reachout = keyco.filter(r => {
    const kc = parseKeyCollectionQuarter(r.Comments);
    return isReachOutNow(kc);
  });

  document.getElementById('pill-count-all').textContent    = CHYLER_DATA.length;
  document.getElementById('pill-count-active').textContent = CHYLER_DATA.filter(r=>String(r['FINAL STATUS']||'').toUpperCase()==='ACTIVE').length;
  document.getElementById('pill-count-signed').textContent = CHYLER_DATA.filter(r=>String(r['FINAL STATUS']||'').toUpperCase()==='SIGNED').length;
  document.getElementById('pill-count-lapsed').textContent = CHYLER_DATA.filter(r=>String(r['FINAL STATUS']||'').toUpperCase()==='LAPSED').length;
  document.getElementById('pill-count-keyco').textContent  = CHYLER_DATA.filter(r=>String(r['FINAL STATUS']||'').toUpperCase()==='LONG KEY COLLECTION').length;

  document.getElementById('cnt-active').textContent = active.length;
  document.getElementById('cnt-keyco').textContent  = keyco.length;
  document.getElementById('cnt-signed-pipeline').textContent = signed.length;
  document.getElementById('cnt-lapsed').textContent = lapsed.length;
  document.getElementById('cnt-reachout').textContent = reachout.length;

  const kanban = document.getElementById('kanban-active');
  const stageGroups = {}; PIPELINE_STAGES.forEach(s=>stageGroups[s]=[]); stageGroups['New Lead']=[];
  active.forEach(r=>{ const s=r.stage||'New Lead'; if(!stageGroups[s]) stageGroups[s]=[]; stageGroups[s].push(r); });
  kanban.innerHTML = Object.entries(stageGroups).filter(([,a])=>a.length>0).map(([stage,leads])=>`
    <div class="stage-col">
      <div class="stage-col-header"><span class="stage-num">${leads.length}</span>${stage}</div>
      ${leads.map(r=>activeCard(r)).join('')}
    </div>`).join('');

  document.getElementById('cards-reachout').innerHTML = reachout.map(r=>reachoutCard(r)).join('');
  document.getElementById('cards-keyco').innerHTML = keyco.map(r=>keycoCard(r)).join('');
  document.getElementById('cards-signed-pipeline').innerHTML = signed.map(r=>miniSignedCard(r)).join('');
  document.getElementById('cards-lapsed').innerHTML = lapsed.map(r=>lapsedCard(r)).join('');

  applyPipelineSectionVisibility();
}

function goToProgression(name) {
  document.querySelectorAll('.main-nav-tab').forEach(t=>t.classList.remove('active'));
  document.querySelectorAll('.main-nav-tab')[0].classList.add('active');
  document.getElementById('sub-nav-chyler').style.display='flex';
  document.getElementById('sub-nav-woodates').style.display='none';
  document.getElementById('sub-nav-signed').style.display='none';
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.querySelectorAll('#sub-nav-chyler .sub-tab').forEach(t=>t.classList.remove('active'));
  document.getElementById('page-progression').classList.add('active');
  document.querySelectorAll('#sub-nav-chyler .sub-tab').forEach(t=>{ if(t.textContent.trim()==='Progression') t.classList.add('active'); });
  setTimeout(() => {
    const rows = document.querySelectorAll('#prog-tbody tr');
    for(const row of rows) {
      const nameCell = row.querySelector('td:nth-child(6)');
      if(nameCell && nameCell.textContent.trim() === name) {
        row.style.background = '#FFF8EE';
        row.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setTimeout(() => { row.style.background = ''; }, 2500);
        break;
      }
    }
  }, 80);
}

function activeCard(r) {
  const steps = PIPELINE_STEPS.map((key, i) => {
    const v = r[key];
    let bg;
    if(!v || v==='NO' || v==='NA')            bg = 'var(--border)';
    else if(v==='PENDING'||v==='PLANNED')      bg = 'var(--keyco)';
    else                                       bg = 'var(--signed)';
    return `<span title="${PIPELINE_STAGES[i]||key}" style="display:inline-block;width:7px;height:7px;border-radius:50%;background:${bg};margin:0 1px;flex-shrink:0"></span>`;
  }).join('');

  return `<div class="card active-card" data-action="goToProgression" data-name="${esc(r.Name)}" style="cursor:pointer">
    <div class="card-name">${esc(r.Name)}</div>
    <div class="card-meta">
      ${r.Type?`<span class="tag type-tag">${esc(r.Type)}</span>`:''}
      ${r.PM?`<span class="tag pm-tag">${esc(r.PM)}</span>`:''}
      <span class="tag stage-tag">${esc(r.stage)}</span>
    </div>
    <div style="display:flex;gap:0;align-items:center;margin:6px 0 4px;flex-wrap:wrap">${steps}</div>
    <div class="card-phone">${r.Phone}</div>
    ${r.Comments?`<div class="card-comment">${esc(r.Comments)}</div>`:''}
    <div class="card-date">${r.Date}</div>
  </div>`;
}
function reachoutCard(r) {
  const kc = parseKeyCollectionQuarter(r.Comments);
  const kcStr = kc ? `Q${kc.q} ${kc.year}` : '';
  return `<div class="card reachout-card" data-action="goToProgression" data-name="${esc(r.Name)}" style="cursor:pointer">
    <div class="reachout-badge">🔔 Reach Out Now</div>
    <div class="card-name">${esc(r.Name)}</div>
    <div class="card-meta">${r.Type?`<span class="tag type-tag">${esc(r.Type)}</span>`:''}</div>
    <div class="card-phone">${r.Phone}</div>
    ${kcStr?`<div class="card-date" style="color:#4A55A2;font-weight:600">Key Collection: ${kcStr}</div>`:''}
    ${r.Comments?`<div class="card-comment">${esc(r.Comments)}</div>`:''}
    <div class="card-date">${r.Date}</div>
  </div>`;
}
function keycoCard(r) {
  const kc = parseKeyCollectionQuarter(r.Comments);
  const kcStr = kc ? `Q${kc.q} ${kc.year}` : '';
  return `<div class="card keyco-card" data-action="goToProgression" data-name="${esc(r.Name)}" style="cursor:pointer">
    <div class="card-name">${esc(r.Name)}</div>
    <div class="card-meta">${r.Type?`<span class="tag type-tag">${esc(r.Type)}</span>`:''}</div>
    <div class="card-phone">${r.Phone}</div>
    ${kcStr?`<div class="card-date" style="font-weight:600;color:var(--keyco)">Key Collection: ${kcStr}</div>`:''}
    ${r.Comments?`<div class="card-comment">${esc(r.Comments)}</div>`:''}
    <div class="card-date">${r.Date}</div>
  </div>`;
}
function miniSignedCard(r) {
  return `<div class="card signed-card" data-action="goToProgression" data-name="${esc(r.Name)}" style="cursor:pointer">
    <div class="card-name">${esc(r.Name)}</div>
    <div class="card-meta">
      ${r.Type?`<span class="tag type-tag">${esc(r.Type)}</span>`:''}
      ${r.PM?`<span class="tag pm-tag">${esc(r.PM)}</span>`:''}
    </div>
    <div class="card-phone">${r.Phone}</div>
    <div class="card-date">${r.Date}</div>
  </div>`;
}
function lapsedCard(r) {
  return `<div class="card lapsed-card" data-action="goToProgression" data-name="${esc(r.Name)}" style="cursor:pointer">
    <div class="card-name">${esc(r.Name)}</div>
    <div class="card-meta">
      ${r.Type?`<span class="tag type-tag">${esc(r.Type)}</span>`:''}
      <span class="tag stage-tag">${esc(r.stage)}</span>
    </div>
    <div class="card-phone">${r.Phone}</div>
    ${r.Comments?`<div class="card-comment">${esc(r.Comments)}</div>`:''}
    <div class="card-date">${r.Date}</div>
  </div>`;
}

// ── PROGRESSION ──
let progFiltered = [...CHYLER_DATA];

function initProgression() {
  const pmSel = document.getElementById('prog-pm-filter');
  const prevPm = pmSel.value;
  while(pmSel.options.length > 1) pmSel.remove(1);
  const pms = [...new Set(CHYLER_DATA.map(r=>r.PM).filter(Boolean))].sort();
  pms.forEach(pm => {
    const o=document.createElement('option'); o.value=pm; o.textContent=pm;
    pmSel.appendChild(o);
  });
  pmSel.value = prevPm;
  filterProgression();
}

function filterProgression() {
  const q = document.getElementById('prog-search').value.toLowerCase();
  const st = document.getElementById('prog-status-filter').value;
  const pm = document.getElementById('prog-pm-filter').value;
  progFiltered = CHYLER_DATA.filter(r => {
    const matchQ = !q || [r.Name, String(r.Phone||''), r.PM, r.Comments, r.Type, r['FINAL STATUS']].some(v=>v&&String(v).toLowerCase().includes(q));
    const matchSt = !st || String(r['FINAL STATUS'] || '').toUpperCase() === String(st).toUpperCase();
    return matchQ && matchSt && (!pm||r.PM===pm);
  });
  renderProgression(progFiltered);
}

function chylerDropdown(field, value, rowId) {
  const opts = ['YES','NO','PENDING','PLANNED','NA'];
  const sel = (v) => v === value ? 'selected' : '';
  return `<select class="wdt-cell-select"
    onchange="chylerCellChange(this,'${field}',${rowId})"
    style="border:1px solid var(--border);border-radius:5px;padding:4px 6px;
      font-family:'DM Sans',sans-serif;font-size:0.78rem;background:var(--white);
      color:var(--dark);cursor:pointer;min-width:80px">
    <option value="" ${sel('')}>—</option>
    ${opts.map(o=>`<option value="${o}" ${sel(o)}>${o}</option>`).join('')}
  </select>`;
}

function chylerCellChange(el, field, rowId) {
  const val = el.value || null;
  const row = CHYLER_DATA.find(r => r.id === rowId);
  if (row) row[field] = val;
  supabaseUpdateCell('chyler_leads', rowId, field, val, CHYLER_COL_MAP);
}

function chylerTextChange(el, rowId, field) {
  const val = el.textContent.trim();
  const row = CHYLER_DATA.find(r => r.id === rowId);
  if (row) row[field] = val;
  supabaseUpdateCell('chyler_leads', rowId, field, val, CHYLER_COL_MAP);
}

const CHYLER_STEP_FIELDS = ['Responsive?','GC created','1st meet','2D','Quotation','2nd meet','Revised 2D','Revised Quotation','Site visit','1st Deposit','2nd Deposit'];

function renderProgression(data) {
  const blur = editMode ? `onblur="chylerTextChange(this, +this.closest('tr').dataset.id, this.dataset.field)"` : '';

  function stepCell(r, field) {
    const v = r[field];
    if (editMode) return chylerDropdown(field, v, r.id);
    return cellVal(v);
  }

  document.getElementById('prog-tbody').innerHTML = data.map(r => {
    const rawSt = String(r['FINAL STATUS'] || '');
    const st = rawSt.toUpperCase();
    const stClass = st === 'LONG KEY COLLECTION' ? 'LONG' : st;
    let stLabel = rawSt || '—';
    if (st === 'LONG KEY COLLECTION') stLabel = 'Key Collection';
    else if (st === 'ACTIVE') stLabel = 'Active';
    else if (st === 'SIGNED') stLabel = 'Signed';
    else if (st === 'LAPSED') stLabel = 'Lapsed';

    return `<tr data-id="${r.id||''}">
      <td style="color:var(--muted);font-size:0.78rem">${esc(r.Number)}</td>
      <td ${editMode?`contenteditable="true" data-field="Date" ${blur}`:''} style="color:var(--muted);font-size:0.78rem;white-space:nowrap">${esc(r.Date)}</td>
      <td ${editMode?`contenteditable="true" data-field="Source" ${blur}`:''} style="font-size:0.78rem">${esc(r.Source)}</td>
      <td ${editMode?`contenteditable="true" data-field="Phone" ${blur}`:''} style="color:var(--muted);font-size:0.78rem">${r.Phone}</td>
      <td>${r.Type?`<span class="tag type-tag">${esc(r.Type)}</span>`:'—'}</td>
      <td ${editMode?`contenteditable="true" data-field="Name" ${blur}`:''} style="font-weight:600">${esc(r.Name)}</td>
      <td>${st==='ACTIVE' ? `<span class="tag stage-tag">${esc(r.stage||'—')}</span>` : '<span style="color:#CCC">—</span>'}</td>
      <td ${editMode?`contenteditable="true" data-field="Comments" ${blur}`:''} style="font-size:0.75rem;color:var(--muted);max-width:200px;white-space:normal">${esc(r.Comments)||'<span style="color:#CCC">—</span>'}</td>
      <td>${stepCell(r,'Responsive?')}</td>
      <td>${stepCell(r,'GC created')}</td>
      <td ${editMode?`contenteditable="true" data-field="PM" ${blur}`:''}>${r.PM?`<span class="tag pm-tag">${esc(r.PM)}</span>`:'<span style="color:#CCC">—</span>'}</td>
      <td>${stepCell(r,'1st meet')}</td>
      <td>${stepCell(r,'2D')}</td>
      <td>${stepCell(r,'Quotation')}</td>
      <td>${stepCell(r,'2nd meet')}</td>
      <td>${stepCell(r,'Revised 2D')}</td>
      <td>${stepCell(r,'Revised Quotation')}</td>
      <td>${stepCell(r,'Site visit')}</td>
      <td>${stepCell(r,'1st Deposit')}</td>
      <td>${stepCell(r,'2nd Deposit')}</td>
      <td><span class="status-badge ${stClass}">${stLabel}</span></td>
    </tr>`;
  }).join('');
}

function toggleEditMode() {
  editMode = !editMode;
  const btn = document.getElementById('edit-toggle-btn');
  const banner = document.getElementById('edit-banner');
  const wrap = document.getElementById('prog-table-wrap');
  if(editMode) {
    btn.classList.add('active');
    btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg> Editing On`;
    banner.classList.add('visible');
    wrap.classList.add('edit-mode');
  } else {
    btn.classList.remove('active');
    btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg> Edit`;
    banner.classList.remove('visible');
    wrap.classList.remove('edit-mode');
    const cells = document.querySelectorAll('#prog-table-wrap td[contenteditable="true"][data-field]');
    if(cells.length) {
      showSyncStatus('Saving…', 'saving');
      const saves = [];
      cells.forEach(td => {
        const rowId = +td.closest('tr')?.dataset.id;
        const field = td.dataset.field;
        const value = td.textContent.trim();
        if(rowId && field) {
          const row = CHYLER_DATA.find(r => r.id === rowId);
          if (row) row[field] = value;
          saves.push(supabaseUpdateCell('chyler_leads', rowId, field, value, CHYLER_COL_MAP));
        }
      });
      Promise.all(saves).then(() => showSyncStatus('All changes saved ✓', 'success'));
    }
  }
  renderProgression(progFiltered);
}

function downloadExcel() {
  const data = progFiltered;
  const cols = ['Number','Date','Source','Phone','Type','Name','stage','Responsive?','GC created','PM','1st meet','2D','Quotation','2nd meet','Revised 2D','Revised Quotation','Site visit','Comments','1st Deposit','2nd Deposit','FINAL STATUS'];
  const headers = ['A · #','B · Date','C · Source','D · Phone','E · Type','F · Name','Current Status','G · Responsive?','H · GC Created','I · PM','J · 1st Meet','K · 2D','L · Quotation','M · 2nd Meet','N · Revised 2D','O · Revised Quot.','P · Site Visit','Q · Comments','R · 1st Deposit','S · 2nd Deposit','T · Final Status'];

  let csv = '\uFEFF' + headers.join(',') + '\n';
  data.forEach(r => {
    const row = cols.map(c => {
      let v = r[c];
      if(v===null||v===undefined) v='';
      v = String(v).replace(/"/g,'""');
      if(v.includes(',') || v.includes('\n') || v.includes('"')) v = `"${v}"`;
      return v;
    });
    csv += row.join(',') + '\n';
  });

  const blob = new Blob([csv], {type: 'text/csv;charset=utf-8;'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'Chyler_Leads_Progression.csv';
  a.click();
  URL.revokeObjectURL(url);
}

function downloadWdtExcel() {
  const data = wdtProgFiltered;
  const cols = ['Number','Date','Phone','Type','Name','Status','stage','Comments','PM','Responsive?','GC created','1st meet','2D','Quotation','2nd meet','Revised 2D','Revised Quotation','Site visit','1st Deposit','2nd Deposit','Status'];
  const headers = ['#','Date','Phone','Type','Name','Status','Current Stage','Comments','PM','Responsive?','GC Created','1st Meet','2D','1st Quote','2nd Meet','Revised 2D','Revised Quote','Site Visit','1st Deposit','2nd Deposit','Final Status'];

  let csv = '\uFEFF' + headers.join(',') + '\n';
  data.forEach(r => {
    const row = cols.map(c => {
      let v = r[c];
      if(v===null||v===undefined) v='';
      v = String(v).replace(/"/g,'""');
      if(v.includes(',') || v.includes('\n') || v.includes('"')) v = `"${v}"`;
      return v;
    });
    csv += row.join(',') + '\n';
  });

  const blob = new Blob([csv], {type: 'text/csv;charset=utf-8;'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'Woodates_Leads_Progression.csv';
  a.click();
  URL.revokeObjectURL(url);
}

function downloadSignedExcel() {
  const cols = ['Year','Name','Deposit 1','Deposit 2'];
  const headers = ['Year','Client Name','Deposit 1','Deposit 2'];

  let csv = '\uFEFF' + headers.join(',') + '\n';
  SIGNED_DATA.forEach(r => {
    const row = cols.map(c => {
      let v = r[c];
      if(v===null||v===undefined) v='';
      v = String(v).replace(/"/g,'""');
      if(v.includes(',') || v.includes('\n') || v.includes('"')) v = `"${v}"`;
      return v;
    });
    csv += row.join(',') + '\n';
  });

  const blob = new Blob([csv], {type: 'text/csv;charset=utf-8;'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'Woodates_Signed_Clients.csv';
  a.click();
  URL.revokeObjectURL(url);
}

// ── MASTER LIST ──
const MASTER_DATA = [
  {name:'Rose',phone:'91910069',type:'Current'},
  {name:'Mark',phone:'85991413',type:'BTO'},
  {name:'YQ',phone:'96886932',type:'Condo'},
  {name:'SiMin',phone:'90119256',type:'BTO'},
  {name:'Kasim',phone:'81185205',type:'BTO'},
  {name:'Hana',phone:'92370923',type:'Resale'},
  {name:'WaWa',phone:'87920605',type:'BTO'},
  {name:'Yun Wen',phone:'88625848',type:'BTO'},
  {name:'Aletheia',phone:'96874495',type:'BTO'},
  {name:'Lucas',phone:'87211980',type:'BTO'},
  {name:'Jacky',phone:'87884799',type:'BTO'},
  {name:'MingWei',phone:'93890756',type:'BTO'},
  {name:'Arliana',phone:'91019940',type:'BTO'},
  {name:'Ameera',phone:'87675695',type:'BTO'},
  {name:'Alan Lau',phone:'90886770',type:'BTO'},
  {name:'Mel',phone:'81630703',type:'Resale'},
  {name:'Joanne',phone:'97231378',type:'BTO'},
  {name:'Fun',phone:'81803560',type:'BTO'},
  {name:'Adrian',phone:'97938763',type:'BTO'},
  {name:'Jasmine',phone:'86535024',type:'BTO'},
  {name:'Teesha',phone:'97570544',type:'Resale'},
  {name:'Ily',phone:'97479320',type:'Resale'},
  {name:'Kenneth',phone:'96563892',type:'BTO'},
  {name:'Joy',phone:'96326559',type:'BTO'},
  {name:'Stefie Chia',phone:'91594495',type:'BTO'},
  {name:'Krissy',phone:'98470470',type:'BTO'},
  {name:'Esmie',phone:'87831491',type:'Resale'},
  {name:'Eric',phone:'98566883',type:'BTO'},
  {name:'Shawal',phone:'91849022',type:'BTO'},
  {name:'William',phone:'91099029',type:'BTO'},
  {name:'Construction',phone:'96487166',type:'BTO'},
  {name:'Aaron',phone:'81614001',type:'BTO'},
  {name:'Dominic',phone:'98310669',type:'BTO'},
  {name:'Yana',phone:'91878995',type:'BTO'},
  {name:'LeeKee',phone:'84982194',type:'Resale'},
  {name:'Doreen',phone:'87009331',type:'BTO'},
  {name:'Alson',phone:'83332661',type:''},
  {name:'Chin Yee',phone:'87781660',type:'BTO'},
  {name:'Dareios',phone:'83681815',type:'BTO'},
  {name:'Sky',phone:'90309093',type:'BTO'},
  {name:'Timothea',phone:'91715758',type:'BTO'},
  {name:'Lysha',phone:'83288915',type:'BTO'},
  {name:'FangLing',phone:'92976611',type:'BTO'},
  {name:'Jia Le',phone:'91013901',type:'BTO'},
  {name:'Aibo',phone:'81124522',type:'BTO'},
  {name:'Qing Hao',phone:'96343371',type:'BTO'},
  {name:'Hadi',phone:'87532512',type:'Resale'},
  {name:'Anita',phone:'93380868',type:'BTO'},
  {name:'Chandhi',phone:'84245578',type:'Resale'},
  {name:'Chern Yung',phone:'97689238',type:'BTO'},
  {name:'XY Stella',phone:'84345251',type:'Resale'},
  {name:'MeiYi',phone:'96188672',type:'BTO'},
  {name:'Sharena',phone:'97237771',type:'BTO'},
  {name:'Kelvin',phone:'98796426',type:'BTO'},
  {name:'Naz',phone:'88428099',type:'BTO'},
  {name:'Charmyne',phone:'98527959',type:'BTO'},
  {name:'Javier',phone:'91525865',type:'Resale'},
  {name:'Rani',phone:'96202266',type:'BTO'},
  {name:'Derek',phone:'88698191',type:'BTO'},
  {name:'Stacey',phone:'97563961',type:'BTO'},
  {name:'Joreen',phone:'90902090',type:'BTO'},
  {name:'Zuri (DMZ)',phone:'98569227',type:'BTO'},
  {name:'Zhao Hong',phone:'81680355',type:'EC'},
  {name:'Yong',phone:'91372718',type:'Resale'},
  {name:'Shannon',phone:'97538730',type:'Resale'},
  {name:'Cheryl',phone:'81894282',type:'BTO'},
  {name:'Amanda',phone:'91812048',type:'BTO'},
  {name:'Farah',phone:'81012346',type:'BTO'},
  {name:'Eileen',phone:'90038355',type:'BTO'},
  {name:'Lorelle',phone:'97848194',type:'EC'},
  {name:'Emilia',phone:'92221652',type:'BTO'},
  {name:'Claudia',phone:'91596389',type:''},
  {name:'Benz (Petta)',phone:'81897412',type:'BTO'},
  {name:'MHKNNZ (Hasyir)',phone:'90500906',type:'BTO'},
  {name:'PK (Ho)',phone:'90606578',type:'BTO'},
  {name:'Solihin (Sol)',phone:'92343322',type:'BTO'},
  {name:'Mamat',phone:'97225780',type:'BTO'},
  {name:'Peng Phin',phone:'82890375',type:''},
  {name:'Zayd',phone:'90683398',type:'BTO'},
  {name:'Ms Vicky',phone:'83809889',type:'Bungalow'},
  {name:'Kelly Ying Fen',phone:'81769626',type:'BTO'},
  {name:'Cheryl',phone:'81894282',type:'BTO'},
  {name:'XiuEr',phone:'86862324',type:'Condo'},
  {name:'JFLim (Jenn Feng)',phone:'90214856',type:'BTO'},
  {name:'Nisha',phone:'90288474',type:'Condo'},
  {name:'Raj Krish',phone:'98746560',type:'BTO'},
  {name:'Renuga Sarawana',phone:'80534066',type:'BTO'},
  {name:'Jimmy Ng',phone:'81335699',type:'Resale'},
  {name:'Ray',phone:'85002588',type:'Resale'},
  {name:'Mrs Law',phone:'81610851',type:''},
  {name:'Cathrine',phone:'97453128',type:''},
];

let masterFiltered = [...MASTER_DATA];

function initMaster() {
  const types = [...new Set(MASTER_DATA.map(r=>r.type).filter(Boolean))].sort();
  types.forEach(t => {
    const o=document.createElement('option'); o.value=t; o.textContent=t;
    document.getElementById('master-type-filter').appendChild(o);
  });
  renderMaster(MASTER_DATA);
}

function filterMaster() {
  const q = document.getElementById('master-search').value.toLowerCase();
  const type = document.getElementById('master-type-filter').value;
  masterFiltered = MASTER_DATA.filter(r => {
    const matchQ = !q || [r.name, r.phone, r.type].some(v=>v&&v.toLowerCase().includes(q));
    return matchQ && (!type||r.type===type);
  });
  renderMaster(masterFiltered);
}

function renderMaster(data) {
  document.getElementById('master-tbody').innerHTML = data.map((r,i) => `
    <tr>
      <td style="color:var(--muted);font-size:0.75rem">${i+1}</td>
      <td style="font-weight:600">${esc(r.name)}</td>
      <td style="color:var(--muted);font-size:0.82rem">${r.phone}</td>
      <td>${r.type?`<span class="tag type-tag">${esc(r.type)}</span>`:'<span style="color:#CCC">—</span>'}</td>
    </tr>`).join('');
}

// ── NAV ──
function switchMainNav(section, el) {
  document.querySelectorAll('.main-nav-tab').forEach(t=>t.classList.remove('active'));
  el.classList.add('active');

  document.getElementById('sub-nav-chyler').style.display = section==='chyler' ? 'flex' : 'none';
  document.getElementById('sub-nav-woodates').style.display = section==='woodates' ? 'flex' : 'none';
  document.getElementById('sub-nav-signed').style.display = section==='signed' ? 'flex' : 'none';

  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  if(section==='chyler') {
    const activeChylerTab = document.querySelector('#sub-nav-chyler .sub-tab.active');
    const tabName = activeChylerTab ? activeChylerTab.getAttribute('data-tab') || 'pipeline' : 'pipeline';
    document.getElementById('page-'+tabName).classList.add('active');
  } else if(section==='woodates') {
    document.getElementById('page-woodates').classList.add('active');
    const activeWdtTab = document.querySelector('#sub-nav-woodates .sub-tab.active');
    if(activeWdtTab) switchWdtView(activeWdtTab.getAttribute('data-view')||'pipeline', activeWdtTab);
  } else if(section==='signed') {
    document.getElementById('page-woodates-signed').classList.add('active');
  }
}

function switchSubTab(tab, el) {
  document.querySelectorAll('#sub-nav-chyler .sub-tab').forEach(t=>t.classList.remove('active'));
  el.classList.add('active');
  el.setAttribute('data-tab', tab);
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.getElementById('page-'+tab).classList.add('active');
}

function toggleSection(id, btn) {
  const el = document.getElementById(id);
  if(el.classList.contains('collapsed')) {
    el.style.maxHeight = el.scrollHeight+'px';
    el.classList.remove('collapsed');
    btn.textContent='Hide';
  } else {
    el.style.maxHeight = el.scrollHeight+'px';
    requestAnimationFrame(()=>{ el.classList.add('collapsed'); });
    btn.textContent='Show';
  }
}

// ── NEW ROW MODAL ──
function openNewRowModal() {
  document.getElementById('new-row-modal').classList.add('open');
  const now = new Date();
  const months=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  document.getElementById('new-date').value = `${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;
  document.getElementById('new-source').value = 'Ad';
  if(window._pmPickers && window._pmPickers['new']) window._pmPickers['new'].reset();
  document.getElementById('new-name').focus();
}
function closeNewRowModal() {
  document.getElementById('new-row-modal').classList.remove('open');
}
function saveNewRow() {
  const name = document.getElementById('new-name').value.trim();
  if(!name) { document.getElementById('new-name').focus(); document.getElementById('new-name').style.borderColor='var(--lapsed)'; return; }
  document.getElementById('new-name').style.borderColor='';
  const maxNum = Math.max(...CHYLER_DATA.map(r=>r.Number||0));
  const newRow = {
    Date: document.getElementById('new-date').value||'',
    Number: maxNum+1,
    Source: document.getElementById('new-source').value||'',
    Phone: document.getElementById('new-phone').value||'',
    Type: document.getElementById('new-type').value||null,
    Name: name,
    'Responsive?': null,'GC created': null,
    PM: (window._pmPickers && window._pmPickers['new']) ? window._pmPickers['new'].getValue() || null : null,
    '1st meet': null,'2D': null,'Quotation': null,
    '2nd meet': null,'Revised 2D': null,'Revised Quotation': null,
    'Site visit': null,
    Comments: document.getElementById('new-comments').value||null,
    '1st Deposit': null,'2nd Deposit': null,
    'FINAL STATUS': document.getElementById('new-status').value,
    stage: document.getElementById('new-stage').value,
  };
  CHYLER_DATA.push(newRow);
  MASTER_DATA.push({ name, phone: document.getElementById('new-phone').value||'', type: document.getElementById('new-type').value||'' });
  closeNewRowModal();

  filterProgression();
  filterPipeline();
  filterMaster();

  supabaseInsertChyler(newRow).then(id => { if(id) newRow.id = id; });
  setTimeout(()=>{
    const rows = document.querySelectorAll('#prog-tbody tr');
    const last = rows[rows.length-1];
    if(last){ last.style.background='#FFF8EE'; last.scrollIntoView({behavior:'smooth',block:'center'}); setTimeout(()=>{last.style.background='';},2000); }
  },80);
}
document.getElementById('new-row-modal').addEventListener('click', function(e){ if(e.target===this) closeNewRowModal(); });

// ══════════════════════════════════════
// WOODATES LEADS DATA & LOGIC
// ══════════════════════════════════════
const WDT_DATA = [
  {Date:'04 Jan 2026',Number:1,Phone:'82239275',Type:'BTO',Name:'Amanda','Responsive?':'YES','GC created':'YES',PM:'QUEENIE','1st meet':'YES','2D':'YES','Quotation':'YES','2nd meet':null,'Revised 2D':null,'Revised Quotation':null,'Site visit':null,Comments:null,'1st Deposit':null,'2nd Deposit':null,Status:null},
  {Date:'22 Jan 2026',Number:2,Phone:'94380776',Type:'Resale',Name:'Cindy','Responsive?':'YES','GC created':'YES',PM:'DANIEL','1st meet':'YES','2D':'YES','Quotation':'YES','2nd meet':null,'Revised 2D':null,'Revised Quotation':null,'Site visit':null,Comments:null,'1st Deposit':null,'2nd Deposit':null,Status:null},
  {Date:'03 Jan 2026',Number:3,Phone:'97711317',Type:'BTO',Name:'Alistaire','Responsive?':'YES','GC created':'YES',PM:'PENGFEI','1st meet':'YES','2D':'YES','Quotation':'YES','2nd meet':null,'Revised 2D':null,'Revised Quotation':null,'Site visit':null,Comments:null,'1st Deposit':null,'2nd Deposit':null,Status:null},
  {Date:'23 Jan 2026',Number:4,Phone:'97646935',Type:'EC',Name:'Quanyou','Responsive?':'YES','GC created':'YES',PM:'DANIEL','1st meet':'YES','2D':'PENDING','Quotation':'PENDING','2nd meet':null,'Revised 2D':null,'Revised Quotation':null,'Site visit':null,Comments:null,'1st Deposit':null,'2nd Deposit':null,Status:null},
  {Date:'18 Jan 2026',Number:5,Phone:'90110159',Type:'Condo',Name:'Erlie','Responsive?':'YES','GC created':'YES',PM:'QUEENIE','1st meet':'YES','2D':'PENDING','Quotation':'PENDING','2nd meet':null,'Revised 2D':null,'Revised Quotation':null,'Site visit':null,Comments:null,'1st Deposit':null,'2nd Deposit':null,Status:null},
  {Date:'31 Jan 2026',Number:6,Phone:'81866558',Type:'BTO',Name:'Sam','Responsive?':'YES','GC created':'YES',PM:'QUEENIE','1st meet':'YES','2D':'PENDING','Quotation':'PENDING','2nd meet':null,'Revised 2D':null,'Revised Quotation':null,'Site visit':null,Comments:null,'1st Deposit':null,'2nd Deposit':null,Status:null},
  {Date:'09 Feb 2026',Number:7,Phone:'81687415',Type:null,Name:'Deepak','Responsive?':'YES','GC created':null,PM:null,'1st meet':null,'2D':null,'Quotation':null,'2nd meet':null,'Revised 2D':null,'Revised Quotation':null,'Site visit':null,Comments:null,'1st Deposit':null,'2nd Deposit':null,Status:null},
  {Date:'06 Feb 2026',Number:8,Phone:'87481853',Type:null,Name:'Vanessa Lee','Responsive?':'YES','GC created':null,PM:'SHELA','1st meet':null,'2D':null,'Quotation':null,'2nd meet':null,'Revised 2D':null,'Revised Quotation':null,'Site visit':null,Comments:null,'1st Deposit':null,'2nd Deposit':null,Status:null},
];

const WDT_MASTER = [
  {Phone:'82239275',Name:'Amanda',Type:'BTO'},
  {Phone:'94380776',Name:'Cindy',Type:'Resale'},
  {Phone:'97711317',Name:'Alistaire',Type:'BTO'},
  {Phone:'97646935',Name:'Quanyou',Type:'EC'},
  {Phone:'90110159',Name:'Erlie',Type:'Condo'},
];

function getWdtStatus(r) {
  if(r.Status && r.Status !== '') return String(r.Status).toUpperCase();
  if(r['1st Deposit'] && r['1st Deposit'] !== '') return 'SIGNED';
  return 'ACTIVE';
}

const WDT_STEPS = [
  {key:'Responsive?',    label:'Responsive'},
  {key:'GC created',     label:'GC Created'},
  {key:'1st meet',       label:'1st Meet'},
  {key:'2D',             label:'2D'},
  {key:'Quotation',      label:'1st Quote'},
  {key:'2nd meet',       label:'2nd Meet'},
  {key:'Revised 2D',     label:'Revised 2D'},
  {key:'Revised Quotation', label:'Revised Quote'},
  {key:'Site visit',     label:'Site Visit'},
  {key:'1st Deposit',    label:'1st Deposit'},
  {key:'2nd Deposit',    label:'2nd Deposit'},
];

function getWdtStage(r) {
  for(let i = WDT_STEPS.length-1; i >= 0; i--) {
    const v = r[WDT_STEPS[i].key];
    if(v && v!=='NO' && v!=='NA') return WDT_STEPS[i].label + (v==='PENDING'||v==='PLANNED'?' (Pending)':'');
  }
  return 'New Lead';
}

let wdtCurrentFilter = 'ALL';
let wdtEditMode = false;
let wdtProgFiltered = [...WDT_DATA];
let wdtMasterFiltered = [...WDT_MASTER];
let wdtCurrentView = 'pipeline';

function switchWdtView(view, el) {
  wdtCurrentView = view;
  document.querySelectorAll('#sub-nav-woodates .sub-tab').forEach(t=>t.classList.remove('active'));
  if(el) { el.classList.add('active'); el.setAttribute('data-view', view); }
  document.getElementById('wdt-view-pipeline').style.display = view==='pipeline'?'block':'none';
  document.getElementById('wdt-view-progression').style.display = view==='progression'?'block':'none';
  document.getElementById('wdt-view-master').style.display = view==='master'?'block':'none';
}

function initWdtPipeline() {
  const pmSel = document.getElementById('wdt-pipeline-pm-filter');
  const prevPm = pmSel.value;
  while(pmSel.options.length > 1) pmSel.remove(1);
  const pms = [...new Set(WDT_DATA.map(r=>r.PM).filter(Boolean))].sort();
  pms.forEach(pm => {
    const o=document.createElement('option'); o.value=pm; o.textContent=pm;
    pmSel.appendChild(o);
  });
  pmSel.value = prevPm;
  const typeSel = document.getElementById('wdt-pipeline-type-filter');
  const prevType = typeSel.value;
  while(typeSel.options.length > 1) typeSel.remove(1);
  const types = [...new Set(WDT_DATA.map(r=>r.Type).filter(Boolean))].sort();
  types.forEach(t => {
    const o=document.createElement('option'); o.value=t; o.textContent=t;
    typeSel.appendChild(o);
  });
  typeSel.value = prevType;
  filterWdtPipeline();
}

function setWdtPipelineFilter(status, el) {
  wdtCurrentFilter = status;
  document.querySelectorAll('#wdt-view-pipeline .status-filter-pill').forEach(p=>p.classList.remove('selected'));
  el.classList.add('selected');
  filterWdtPipeline();
}

function filterWdtPipeline() {
  const q = (document.getElementById('wdt-pipeline-search').value||'').toLowerCase();
  const pm = document.getElementById('wdt-pipeline-pm-filter').value;
  const type = document.getElementById('wdt-pipeline-type-filter').value;
  let data = WDT_DATA.filter(r => {
    const status = getWdtStatus(r);
    if(wdtCurrentFilter!=='ALL' && String(status).toUpperCase()!==wdtCurrentFilter.toUpperCase()) return false;
    if(pm && r.PM!==pm) return false;
    if(type && r.Type!==type) return false;
    if(q && ![r.Name,r.Phone,r.PM,r.Type].some(v=>v&&String(v).toLowerCase().includes(q))) return false;
    return true;
  });
  renderWdtPipeline(data);
}

function renderWdtPipeline(data) {
  const active = data.filter(r=>getWdtStatus(r)==='ACTIVE');
  const signed = data.filter(r=>getWdtStatus(r)==='SIGNED');
  const lapsed = data.filter(r=>getWdtStatus(r)==='LAPSED');

  document.getElementById('wdt-pill-all').textContent = WDT_DATA.length;
  document.getElementById('wdt-pill-active').textContent = WDT_DATA.filter(r=>getWdtStatus(r)==='ACTIVE').length;
  document.getElementById('wdt-pill-signed').textContent = WDT_DATA.filter(r=>getWdtStatus(r)==='SIGNED').length;
  document.getElementById('wdt-pill-lapsed').textContent = WDT_DATA.filter(r=>getWdtStatus(r)==='LAPSED').length;

  document.getElementById('wdt-cnt-active').textContent = active.length;
  document.getElementById('wdt-cnt-signed').textContent = signed.length;
  document.getElementById('wdt-cnt-lapsed').textContent = lapsed.length;

  const stageLabels = ['New Lead', ...WDT_STEPS.map(s=>s.label)];
  const byStage = {};
  stageLabels.forEach(s=>byStage[s]=[]);
  active.forEach(r=>{
    const s = getWdtStage(r).replace(' (Pending)','');
    const bucket = byStage[s] || byStage['New Lead'];
    bucket.push(r);
  });
  document.getElementById('wdt-kanban-active').innerHTML = stageLabels.filter(s=>byStage[s]&&byStage[s].length).map(s=>`
    <div class="stage-col">
      <div class="stage-col-header"><span class="stage-num">${byStage[s].length}</span>${s}</div>
      ${byStage[s].map(r=>wdtCard(r,'active-card')).join('')}
    </div>`).join('');

  document.getElementById('wdt-cards-signed').innerHTML = signed.map(r=>wdtCard(r,'signed-card')).join('');
  document.getElementById('wdt-cards-lapsed').innerHTML = lapsed.map(r=>wdtCard(r,'lapsed-card')).join('');

  document.getElementById('wdt-section-active').style.display = active.length?'block':'none';
  document.getElementById('wdt-section-signed').style.display = signed.length?'block':'none';
  document.getElementById('wdt-section-lapsed').style.display = lapsed.length?'block':'none';
}

function goToWdtProgression(name) {
  document.querySelectorAll('.main-nav-tab').forEach(t=>t.classList.remove('active'));
  document.querySelectorAll('.main-nav-tab')[1].classList.add('active');
  document.getElementById('sub-nav-chyler').style.display='none';
  document.getElementById('sub-nav-woodates').style.display='flex';
  document.getElementById('sub-nav-signed').style.display='none';
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.getElementById('page-woodates').classList.add('active');
  const tabs = document.querySelectorAll('#sub-nav-woodates .sub-tab');
  tabs.forEach(t=>t.classList.remove('active'));
  tabs.forEach(t=>{ if(t.getAttribute('data-view')==='progression') t.classList.add('active'); });
  switchWdtView('progression', document.querySelector('#sub-nav-woodates .sub-tab[data-view="progression"]'));
  setTimeout(() => {
    const rows = document.querySelectorAll('#wdt-prog-tbody tr');
    for(const row of rows) {
      const nameCell = row.querySelector('td:nth-child(5)');
      if(nameCell && nameCell.textContent.trim() === name) {
        row.style.background = '#FFF8EE';
        row.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setTimeout(() => { row.style.background = ''; }, 2500);
        break;
      }
    }
  }, 80);
}

function wdtCard(r, cls) {
  const stage = getWdtStage(r);
  const cleanStage = stage.replace(' (Pending)','');
  const clickable = cls === 'active-card';

  const steps = WDT_STEPS.map((s) => {
    const v = r[s.key];
    let bg;
    if(!v || v==='NO' || v==='NA')              bg = 'var(--border)';
    else if(v==='PENDING'||v==='PLANNED')        bg = 'var(--keyco)';
    else                                         bg = 'var(--signed)';
    return `<span title="${s.label}" style="display:inline-block;width:7px;height:7px;border-radius:50%;background:${bg};margin:0 1px;flex-shrink:0"></span>`;
  }).join('');

  return `<div class="card ${cls}"${clickable ? ` data-action="goToWdtProgression" data-name="${esc(r.Name)}" style="cursor:pointer"` : ''}>
    <div class="card-name">${esc(r.Name)}</div>
    <div class="card-meta">
      ${r.Type?`<span class="tag type-tag">${esc(r.Type)}</span>`:''}
      ${r.PM?`<span class="tag pm-tag">${esc(r.PM)}</span>`:''}
      <span class="tag stage-tag">${esc(cleanStage)}</span>
    </div>
    <div style="display:flex;gap:0;align-items:center;margin:6px 0 4px;flex-wrap:wrap">${steps}</div>
    <div class="card-phone">${r.Phone||'—'}</div>
    ${r.Comments?`<div class="card-comment">${esc(r.Comments)}</div>`:''}
    <div class="card-date">${r.Date||''}</div>
  </div>`;
}

function initWdtProgression() {
  const pmSel = document.getElementById('wdt-prog-pm-filter');
  const prevPm = pmSel.value;
  while(pmSel.options.length > 1) pmSel.remove(1);
  const pms = [...new Set(WDT_DATA.map(r=>r.PM).filter(Boolean))].sort();
  pms.forEach(pm => {
    const o=document.createElement('option'); o.value=pm; o.textContent=pm;
    pmSel.appendChild(o);
  });
  pmSel.value = prevPm;
  filterWdtProgression();
}

function filterWdtProgression() {
  const q = (document.getElementById('wdt-prog-search').value||'').toLowerCase();
  const status = document.getElementById('wdt-prog-status-filter').value;
  const pm = document.getElementById('wdt-prog-pm-filter').value;
  wdtProgFiltered = WDT_DATA.filter(r => {
    const matchSt = !status || String(getWdtStatus(r)||'').toUpperCase() === String(status).toUpperCase();
    if(!matchSt) return false;
    if(pm && r.PM!==pm) return false;
    if(q && ![r.Name,String(r.Phone||''),r.PM,r.Type,r.Status,r.Comments].some(v=>v&&String(v).toLowerCase().includes(q))) return false;
    return true;
  });
  renderWdtProgression(wdtProgFiltered);
}

function wdtDropdown(field, value, rowId) {
  const opts = ['YES','NO','PENDING','PLANNED','NA'];
  const selected = (v) => v===value ? 'selected' : '';
  return `<select class="wdt-cell-select"
    onchange="wdtCellChange(this,'${field}',${rowId})"
    style="border:1px solid var(--border);border-radius:5px;padding:4px 6px;
      font-family:'DM Sans',sans-serif;font-size:0.78rem;background:var(--white);
      color:var(--dark);cursor:pointer;min-width:80px">
    <option value="" ${selected('')}>—</option>
    ${opts.map(o=>`<option value="${o}" ${selected(o)}>${o}</option>`).join('')}
  </select>`;
}

function wdtCellChange(el, field, rowId) {
  const val = el.value || null;
  const row = WDT_DATA.find(r=>r.id===rowId);
  if(row) row[field] = val;
  supabaseUpdateCell('woodates_leads', rowId, field, val, WDT_COL_MAP);
}

function wdtTextChange(el, rowId, field) {
  const val = el.textContent.trim();
  const row = WDT_DATA.find(r => r.id === rowId);
  if (row) row[field] = val;
  supabaseUpdateCell('woodates_leads', rowId, field, val, WDT_COL_MAP);
}

function renderWdtProgression(data) {
  const isEdit = wdtEditMode;
  const blur = isEdit ? `onblur="wdtTextChange(this, +this.closest('tr').dataset.id, this.dataset.field)"` : '';

  function stepCell(r, field) {
    const v = r[field];
    if(isEdit) return wdtDropdown(field, v, r.id);
    return cellVal(v);
  }

  document.getElementById('wdt-prog-tbody').innerHTML = data.map((r)=>{
    const status = getWdtStatus(r);
    const stage = getWdtStage(r);
    const cleanStage = stage.replace(' (Pending)','');
    const isPending = stage.includes('Pending');

    const stepDots = WDT_STEPS.map(s => {
      const v = r[s.key];
      if(!v||v==='NO'||v==='NA') return `<span title="${s.label}" style="display:inline-block;width:6px;height:6px;border-radius:50%;background:var(--border);margin:0 1px"></span>`;
      if(v==='PENDING'||v==='PLANNED') return `<span title="${s.label}" style="display:inline-block;width:6px;height:6px;border-radius:50%;background:var(--keyco);margin:0 1px"></span>`;
      return `<span title="${s.label}" style="display:inline-block;width:6px;height:6px;border-radius:50%;background:var(--signed);margin:0 1px"></span>`;
    }).join('');

    return `<tr data-id="${r.id||''}">
      <td style="color:var(--muted);font-size:0.75rem">${r.Number}</td>
      <td ${isEdit?`contenteditable="true" data-field="Date" ${blur}`:''} style="color:var(--muted);font-size:0.78rem;white-space:nowrap">${esc(r.Date)||''}</td>
      <td ${isEdit?`contenteditable="true" data-field="Phone" ${blur}`:''} style="color:var(--muted);font-size:0.78rem">${r.Phone||''}</td>
      <td>${r.Type?`<span class="tag type-tag">${esc(r.Type)}</span>`:'<span style="color:#CCC">—</span>'}</td>
      <td style="font-weight:600" ${isEdit?`contenteditable="true" data-field="Name" ${blur}`:''}>${esc(r.Name)}</td>
      <td><span class="status-badge ${status}">${status}</span></td>
      <td style="white-space:nowrap">
        <div style="display:flex;align-items:center;gap:6px">
          <span class="tag stage-tag" style="${isPending?'background:var(--keyco-bg);color:var(--keyco);border-color:var(--keyco-border)':''}">${esc(cleanStage)}</span>
        </div>
        <div style="display:flex;margin-top:5px;gap:1px">${stepDots}</div>
      </td>
      <td style="max-width:180px;white-space:normal;font-size:0.78rem;color:var(--dark-mid)" ${isEdit?`contenteditable="true" data-field="Comments" ${blur}`:''}>${esc(r.Comments)||'<span style="color:#CCC">—</span>'}</td>
      <td ${isEdit?`contenteditable="true" data-field="PM" ${blur}`:''}>${r.PM?`<span class="tag pm-tag">${esc(r.PM)}</span>`:'<span style="color:#CCC">—</span>'}</td>
      <td>${stepCell(r,'Responsive?')}</td>
      <td>${stepCell(r,'GC created')}</td>
      <td>${stepCell(r,'1st meet')}</td>
      <td>${stepCell(r,'2D')}</td>
      <td>${stepCell(r,'Quotation')}</td>
      <td>${stepCell(r,'2nd meet')}</td>
      <td>${stepCell(r,'Revised 2D')}</td>
      <td>${stepCell(r,'Revised Quotation')}</td>
      <td>${stepCell(r,'Site visit')}</td>
      <td>${stepCell(r,'1st Deposit')}</td>
      <td>${stepCell(r,'2nd Deposit')}</td>
      <td><span class="status-badge ${status}">${status === 'ACTIVE' ? 'Active' : status === 'SIGNED' ? 'Signed' : status === 'LAPSED' ? 'Lapsed' : status}</span></td>
    </tr>`;
  }).join('');
}

function toggleWdtEditMode() {
  wdtEditMode = !wdtEditMode;
  const btn = document.getElementById('wdt-edit-toggle-btn');
  const banner = document.getElementById('wdt-edit-banner');
  btn.classList.toggle('active', wdtEditMode);
  banner.classList.toggle('visible', wdtEditMode);
  if(wdtEditMode) {
    btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg> Editing On`;
  } else {
    btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg> Edit`;
    const cells = document.querySelectorAll('#wdt-prog-tbody td[contenteditable="true"][data-field]');
    if(cells.length) {
      showSyncStatus('Saving…', 'saving');
      const saves = [];
      cells.forEach(td => {
        const rowId = +td.closest('tr')?.dataset.id;
        const field = td.dataset.field;
        const value = td.textContent.trim();
        if(rowId && field) {
          const row = WDT_DATA.find(r => r.id === rowId);
          if(row) row[field] = value;
          saves.push(supabaseUpdateCell('woodates_leads', rowId, field, value, WDT_COL_MAP));
        }
      });
      Promise.all(saves).then(() => showSyncStatus('All changes saved ✓', 'success'));
    }
  }
  renderWdtProgression(wdtProgFiltered);
}

function initWdtMaster() {
  const types = [...new Set(WDT_MASTER.map(r=>r.Type).filter(Boolean))].sort();
  types.forEach(t=>{
    const o=document.createElement('option'); o.value=t; o.textContent=t;
    document.getElementById('wdt-master-type-filter').appendChild(o);
  });
  renderWdtMaster(WDT_MASTER);
}

function filterWdtMaster() {
  const q = (document.getElementById('wdt-master-search').value||'').toLowerCase();
  const type = document.getElementById('wdt-master-type-filter').value;
  wdtMasterFiltered = WDT_MASTER.filter(r=>{
    const matchQ = !q||[r.Name,r.Phone,r.Type].some(v=>v&&String(v).toLowerCase().includes(q));
    return matchQ&&(!type||r.Type===type);
  });
  renderWdtMaster(wdtMasterFiltered);
}

function renderWdtMaster(data) {
  document.getElementById('wdt-master-tbody').innerHTML = data.map((r,i)=>`
    <tr>
      <td style="color:var(--muted);font-size:0.75rem">${i+1}</td>
      <td style="font-weight:600">${esc(r.Name)}</td>
      <td style="color:var(--muted);font-size:0.82rem">${r.Phone}</td>
      <td>${r.Type?`<span class="tag type-tag">${esc(r.Type)}</span>`:'<span style="color:#CCC">—</span>'}</td>
    </tr>`).join('');
}

function openWdtModal() {
  document.getElementById('wdt-row-modal').classList.add('open');
  const now=new Date(); const months=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  document.getElementById('wdt-new-date').value=`${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;
  if(window._pmPickers && window._pmPickers['wdt']) window._pmPickers['wdt'].reset();
}
function closeWdtModal() { document.getElementById('wdt-row-modal').classList.remove('open'); }
function saveWdtRow() {
  const name = document.getElementById('wdt-new-name').value.trim();
  if(!name){document.getElementById('wdt-new-name').focus();return;}
  const maxNum = Math.max(...WDT_DATA.map(r=>r.Number||0));
  WDT_DATA.push({
    Date:document.getElementById('wdt-new-date').value,
    Number:maxNum+1,
    Phone:document.getElementById('wdt-new-phone').value,
    Type:document.getElementById('wdt-new-type').value||null,
    Name:name,
    'Responsive?':null,'GC created':null,
    PM:(window._pmPickers && window._pmPickers['wdt']) ? window._pmPickers['wdt'].getValue() || null : null,
    '1st meet':null,'2D':null,'Quotation':null,
    '2nd meet':null,'Revised 2D':null,'Revised Quotation':null,'Site visit':null,
    Comments:document.getElementById('wdt-new-comments').value||null,
    '1st Deposit':null,'2nd Deposit':null,
    Status:document.getElementById('wdt-new-status').value,
  });
  closeWdtModal();
  filterWdtPipeline();
  filterWdtProgression();
  supabaseInsertWdt(WDT_DATA[WDT_DATA.length-1]).then(id => { if(id) WDT_DATA[WDT_DATA.length-1].id = id; });
}
document.getElementById('wdt-row-modal').addEventListener('click',function(e){if(e.target===this)closeWdtModal();});

// ══════════════════════════════════════
// WOODATES SIGNED DATA & LOGIC
// ══════════════════════════════════════
let SIGNED_DATA = [
  {Year:2025,Name:'Normal','Deposit 1':'PAID','Deposit 2':'PAID'},
  {Year:2025,Name:'Christina','Deposit 1':'PAID','Deposit 2':'PAID'},
  {Year:2025,Name:'Desmond','Deposit 1':'PAID','Deposit 2':'PAID'},
  {Year:2025,Name:'Stella','Deposit 1':'PAID','Deposit 2':null},
  {Year:2025,Name:'Snow','Deposit 1':'PAID','Deposit 2':null},
  {Year:2025,Name:'Edwin','Deposit 1':'PAID','Deposit 2':null},
  {Year:2025,Name:'Gabby','Deposit 1':'PAID','Deposit 2':null},
  {Year:2025,Name:'Anthony','Deposit 1':'PAID','Deposit 2':null},
  {Year:2025,Name:'Shaun','Deposit 1':'PAID','Deposit 2':null},
  {Year:2025,Name:'Anna','Deposit 1':'PAID','Deposit 2':null},
  {Year:2026,Name:'Kasim','Deposit 1':'PAID','Deposit 2':null},
  {Year:2026,Name:'Dominic','Deposit 1':null,'Deposit 2':null},
  {Year:2026,Name:'Adrian','Deposit 1':null,'Deposit 2':null},
];

function depositBadge(v) {
  if(!v) return '<span style="color:#CCC">—</span>';
  return `<span class="status-badge SIGNED" style="border-radius:6px">✓ ${esc(v)}</span>`;
}

function renderSigned() {
  const years = [...new Set(SIGNED_DATA.map(r=>r.Year))].sort();
  const total = SIGNED_DATA.length;
  const both = SIGNED_DATA.filter(r=>r['Deposit 1']&&r['Deposit 2']).length;
  const one = SIGNED_DATA.filter(r=>r['Deposit 1']&&!r['Deposit 2']).length;
  const pending = SIGNED_DATA.filter(r=>!r['Deposit 1']).length;
  document.getElementById('signed-stat-row').innerHTML = `
    <div class="stat-pill s-total"><span class="count">${total}</span>Total</div>
    <div class="stat-pill s-signed"><span class="count">${both}</span>Both Deposits</div>
    <div class="stat-pill s-active"><span class="count">${one}</span>Deposit 1 Only</div>
    <div class="stat-pill s-lapsed"><span class="count">${pending}</span>Pending</div>
  `;

  let html = '';
  let idx = 1;
  years.forEach(year => {
    const group = SIGNED_DATA.filter(r=>r.Year===year);
    html += `<tr><td colspan="5" class="master-section-header signed-header">${year}</td></tr>`;
    group.forEach((r, gi) => {
      const rowId = r.id || (year * 1000 + gi);
      const nameCell = signedEditMode
        ? `<td contenteditable="true" style="font-weight:600;outline:none;cursor:text" onblur="signedNameChange(this,${rowId})">${esc(r.Name)}</td>`
        : `<td style="font-weight:600">${esc(r.Name)}</td>`;
      const dep1Cell = signedEditMode
        ? `<td>${signedDepositDropdown(rowId,'Deposit 1',r['Deposit 1'])}</td>`
        : `<td>${depositBadge(r['Deposit 1'])}</td>`;
      const dep2Cell = signedEditMode
        ? `<td>${signedDepositDropdown(rowId,'Deposit 2',r['Deposit 2'])}</td>`
        : `<td>${depositBadge(r['Deposit 2'])}</td>`;
      html += `<tr data-id="${r.id||''}">
        <td style="color:var(--muted);font-size:0.75rem">${idx++}</td>
        <td style="color:var(--muted);font-size:0.8rem">${r.Year}</td>
        ${nameCell}
        ${dep1Cell}
        ${dep2Cell}
      </tr>`;
    });
  });
  document.getElementById('signed-tbody').innerHTML = html;
}

let signedEditMode = false;

function toggleSignedEditMode() {
  signedEditMode = !signedEditMode;
  const btn = document.getElementById('signed-edit-toggle-btn');
  const banner = document.getElementById('signed-edit-banner');
  const wrap = document.querySelector('#signed-table').closest('.table-wrap');
  if(signedEditMode) {
    btn.classList.add('active');
    btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg> Editing On`;
    banner.classList.add('visible');
    if(wrap) wrap.classList.add('edit-mode');
  } else {
    btn.classList.remove('active');
    btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg> Edit`;
    banner.classList.remove('visible');
    if(wrap) wrap.classList.remove('edit-mode');
    const cells = document.querySelectorAll('#signed-tbody td[contenteditable="true"]');
    if(cells.length) {
      showSyncStatus('Saving…', 'saving');
      const saves = [];
      cells.forEach(td => {
        const rowId = +td.closest('tr')?.dataset.id;
        const value = td.textContent.trim();
        if(rowId && value) {
          const row = SIGNED_DATA.find((r,i)=> (r.id || i) === rowId);
          if (row) row.Name = value;
          saves.push(_db.from('chyler_signed').update({name: value}).eq('id', rowId));
        }
      });
      Promise.all(saves).then(() => showSyncStatus('All changes saved ✓', 'success'));
    }
  }
  renderSigned();
}

function signedDepositDropdown(rowId, field, value) {
  const sel = (v) => v === value ? 'selected' : '';
  return `<select style="border:1px solid var(--border);border-radius:5px;padding:4px 6px;font-family:'DM Sans',sans-serif;font-size:0.78rem;background:var(--white);color:var(--dark);cursor:pointer;min-width:70px"
    onchange="signedDepositChange(this,${rowId},'${field}')">
    <option value="" ${sel('')}>—</option>
    <option value="PAID" ${sel('PAID')}>PAID</option>
  </select>`;
}

function signedNameChange(el, rowId) {
  const val = el.textContent.trim();
  const row = SIGNED_DATA.find((r,i)=> (r.id || i) === rowId);
  if(row && val) {
    row.Name = val;
    if(row.id) {
      showSyncStatus('Saving…','saving');
      _db.from('chyler_signed').update({name: val}).eq('id', row.id)
        .then(({error}) => error ? showSyncStatus('Save failed ✗','error') : showSyncStatus('Saved ✓','success'));
    }
  }
}

function signedDepositChange(el, rowId, field) {
  const val = el.value || null;
  const row = SIGNED_DATA.find((r,i)=> (r.id || i) === rowId);
  if(row) row[field] = val;
  if(row && row.id) {
    const col = field === 'Deposit 1' ? 'deposit_1' : 'deposit_2';
    showSyncStatus('Saving…','saving');
    _db.from('chyler_signed').update({[col]: val||null}).eq('id', row.id)
      .then(({error}) => error ? showSyncStatus('Save failed ✗','error') : showSyncStatus('Saved ✓','success'));
  }
  renderSigned();
}

function openSignedModal() {
  document.getElementById('signed-new-year').value = new Date().getFullYear();
  document.getElementById('signed-new-name').value = '';
  document.getElementById('signed-new-dep1').value = '';
  document.getElementById('signed-new-dep2').value = '';
  document.getElementById('signed-add-modal').classList.add('open');
  setTimeout(()=>document.getElementById('signed-new-name').focus(),100);
}
function closeSignedModal() { document.getElementById('signed-add-modal').classList.remove('open'); }
function saveSignedRow() {
  const name = document.getElementById('signed-new-name').value.trim();
  if(!name){document.getElementById('signed-new-name').focus();return;}
  const newEntry = {
    Year:parseInt(document.getElementById('signed-new-year').value)||new Date().getFullYear(),
    Name:name,
    'Deposit 1':document.getElementById('signed-new-dep1').value||null,
    'Deposit 2':document.getElementById('signed-new-dep2').value||null,
  };
  SIGNED_DATA.push(newEntry);
  closeSignedModal();
  renderSigned();
  supabaseInsertSigned(newEntry).then(id => { if(id) newEntry.id = id; });
  setTimeout(()=>{
    const rows=document.querySelectorAll('#signed-tbody tr:not(.master-section-header)');
    const last=rows[rows.length-1];
    if(last){last.style.background='#EEF6F0';last.scrollIntoView({behavior:'smooth',block:'center'});setTimeout(()=>{last.style.background='';},2000);}
  },80);
}
document.getElementById('signed-add-modal').addEventListener('click',function(e){if(e.target===this)closeSignedModal();});

const SUPA_URL = 'https://ilytehukqrkwpupdpkgo.supabase.co';
const SUPA_KEY = 'sb_publishable_tNMpLdZaqm0e-El_LP4kKg_fhfj-ARF';
const _db = supabase.createClient(SUPA_URL, SUPA_KEY);

function showSyncStatus(msg, type='info') {
  let el = document.getElementById('sync-status');
  if(!el) {
    el = document.createElement('div');
    el.id = 'sync-status';
    el.style.cssText = `position:fixed;bottom:20px;right:20px;z-index:9999;
      padding:10px 18px;border-radius:8px;font-size:0.78rem;
      font-family:'DM Sans',sans-serif;font-weight:600;
      box-shadow:0 4px 20px rgba(0,0,0,0.12);
      transition:opacity 0.4s;display:flex;align-items:center;gap:8px;`;
    document.body.appendChild(el);
  }
  const styles = {
    info:    {bg:'#EBF3FB',color:'#3A6EA8',border:'#B8D4EE'},
    success: {bg:'var(--signed-bg)',color:'var(--signed)',border:'var(--signed-border)'},
    error:   {bg:'var(--lapsed-bg)',color:'var(--lapsed)',border:'var(--lapsed-border)'},
    saving:  {bg:'var(--active-bg)',color:'var(--active)',border:'var(--active-border)'},
  };
  const s = styles[type]||styles.info;
  el.style.background=s.bg; el.style.color=s.color; el.style.border=`1px solid ${s.border}`;
  const icons={info:'ℹ️',success:'✓',error:'✗',saving:'⏳'};
  el.innerHTML=`<span>${icons[type]||''}</span><span>${msg}</span>`;
  el.style.opacity='1';
  if(type!=='saving'){ clearTimeout(el._t); el._t=setTimeout(()=>{el.style.opacity='0';},3000); }
}

function chylerToDB(r) {
  return {
    date:r.Date, number:r.Number, source:r.Source, phone:String(r.Phone||''),
    type:r.Type, name:r.Name, responsive:r['Responsive?'], gc_created:r['GC created'],
    pm:r.PM, first_meet:r['1st meet'], two_d:r['2D'], quotation:r['Quotation'],
    second_meet:r['2nd meet'], revised_2d:r['Revised 2D'], revised_quot:r['Revised Quotation'],
    site_visit:r['Site visit'], comments:r.Comments,
    first_deposit:r['1st Deposit'], second_deposit:r['2nd Deposit'],
    final_status:r['FINAL STATUS'], stage:r.stage,
  };
}
function dbToChyler(r) {
  return {
    id:r.id, Date:r.date, Number:r.number, Source:r.source, Phone:r.phone,
    Type:r.type, Name:r.name, 'Responsive?':r.responsive, 'GC created':r.gc_created,
    PM:r.pm, '1st meet':r.first_meet, '2D':r.two_d, 'Quotation':r.quotation,
    '2nd meet':r.second_meet, 'Revised 2D':r.revised_2d, 'Revised Quotation':r.revised_quot,
    'Site visit':r.site_visit, Comments:r.comments,
    '1st Deposit':r.first_deposit, '2nd Deposit':r.second_deposit,
    'FINAL STATUS':r.final_status, stage:r.stage,
  };
}
function wdtToDB(r) {
  return {
    date:r.Date, number:r.Number, phone:String(r.Phone||''), type:r.Type, name:r.Name,
    responsive:r['Responsive?'], gc_created:r['GC created'], pm:r.PM,
    first_meet:r['1st meet'], two_d:r['2D'], quotation:r['Quotation'],
    second_meet:r['2nd meet'], revised_2d:r['Revised 2D'], revised_quot:r['Revised Quotation'],
    site_visit:r['Site visit'], comments:r.Comments,
    first_deposit:r['1st Deposit'], second_deposit:r['2nd Deposit'], status:r.Status,
  };
}
function dbToWdt(r) {
  return {
    id:r.id, Date:r.date, Number:r.number, Phone:r.phone, Type:r.type, Name:r.name,
    'Responsive?':r.responsive, 'GC created':r.gc_created, PM:r.pm,
    '1st meet':r.first_meet, '2D':r.two_d, 'Quotation':r.quotation,
    '2nd meet':r.second_meet, 'Revised 2D':r.revised_2d, 'Revised Quotation':r.revised_quot,
    'Site visit':r.site_visit, Comments:r.comments,
    '1st Deposit':r.first_deposit, '2nd Deposit':r.second_deposit, Status:r.status,
  };
}
function signedToDB(r) {
  return {year:r.Year, name:r.Name, deposit_1:r['Deposit 1'], deposit_2:r['Deposit 2']};
}
function dbToSigned(r) {
  return {id:r.id, Year:r.year, Name:r.name, 'Deposit 1':r.deposit_1, 'Deposit 2':r.deposit_2};
}

async function seedIfEmpty(table, hardcoded, toDBFn) {
  const {data, error} = await _db.from(table).select('id').limit(1);
  if(error) throw error;
  if(data && data.length > 0) return false;
  const rows = hardcoded.map(toDBFn);
  for(let i=0; i<rows.length; i+=50) {
    const {error:e} = await _db.from(table).insert(rows.slice(i,i+50));
    if(e) throw e;
  }
  return true;
}

async function loadFromSupabase() {
  showSyncStatus('Syncing with Supabase…', 'saving');
  try {
    await Promise.all([
      seedIfEmpty('chyler_leads',  CHYLER_DATA, chylerToDB),
      seedIfEmpty('woodates_leads', WDT_DATA,    wdtToDB),
      seedIfEmpty('chyler_signed',  SIGNED_DATA, signedToDB),
    ]);
    const [cl, wl, cs] = await Promise.all([
      _db.from('chyler_leads').select('*').order('number',{ascending:true}),
      _db.from('woodates_leads').select('*').order('number',{ascending:true}),
      _db.from('chyler_signed').select('*').order('id',{ascending:true}),
    ]);
    if(cl.error||wl.error||cs.error) throw cl.error||wl.error||cs.error;
    if(cl.data?.length) { CHYLER_DATA.length=0; cl.data.forEach(r=>CHYLER_DATA.push(dbToChyler(r))); }
    if(wl.data?.length) { WDT_DATA.length=0;    wl.data.forEach(r=>WDT_DATA.push(dbToWdt(r))); }
    if(cs.data?.length) { SIGNED_DATA.length=0;  cs.data.forEach(r=>SIGNED_DATA.push(dbToSigned(r))); }
    showSyncStatus('Synced ✓', 'success');
    return true;
  } catch(e) {
    showSyncStatus('Offline — using local data', 'error');
    return false;
  }
}

async function supabaseInsertChyler(row) {
  const {data, error} = await _db.from('chyler_leads').insert([chylerToDB(row)]).select().single();
  if(error) { showSyncStatus('Save failed ✗', 'error'); return null; }
  showSyncStatus('Lead saved ✓', 'success');
  return data.id;
}
async function supabaseInsertWdt(row) {
  const {data, error} = await _db.from('woodates_leads').insert([wdtToDB(row)]).select().single();
  if(error) { showSyncStatus('Save failed ✗', 'error'); return null; }
  showSyncStatus('Lead saved ✓', 'success');
  return data.id;
}
async function supabaseInsertSigned(row) {
  const {data, error} = await _db.from('chyler_signed').insert([signedToDB(row)]).select().single();
  if(error) { showSyncStatus('Save failed ✗', 'error'); return null; }
  showSyncStatus('Client saved ✓', 'success');
  return data.id;
}

const CHYLER_COL_MAP = {
  'Date':'date','Source':'source','Phone':'phone','Type':'type','Name':'name',
  'Responsive?':'responsive','GC created':'gc_created','PM':'pm',
  '1st meet':'first_meet','2D':'two_d','Quotation':'quotation',
  '2nd meet':'second_meet','Revised 2D':'revised_2d','Revised Quotation':'revised_quot',
  'Site visit':'site_visit','Comments':'comments',
  '1st Deposit':'first_deposit','2nd Deposit':'second_deposit',
  'FINAL STATUS':'final_status','stage':'stage',
};
const WDT_COL_MAP = {
  'Date':'date','Phone':'phone','Type':'type','Name':'name',
  'Responsive?':'responsive','GC created':'gc_created','PM':'pm',
  '1st meet':'first_meet','2D':'two_d','Quotation':'quotation',
  '2nd meet':'second_meet','Revised 2D':'revised_2d','Revised Quotation':'revised_quot',
  'Site visit':'site_visit','Comments':'comments',
  '1st Deposit':'first_deposit','2nd Deposit':'second_deposit','Status':'status',
};

async function supabaseUpdateCell(table, rowId, fieldName, value, colMap) {
  if(!rowId) return;
  const col = colMap[fieldName]; if(!col) return;
  showSyncStatus('Saving…', 'saving');
  const {error} = await _db.from(table).update({[col]: value||null}).eq('id', rowId);
  if(error) { showSyncStatus('Save failed ✗', 'error'); }
  else { showSyncStatus('Saved ✓', 'success'); }
}

(async function boot() {
  await loadFromSupabase();
  initPipeline();
  initProgression();
  initMaster();
  initWdtPipeline();
  initWdtProgression();
  initWdtMaster();
  renderSigned();
  initAllPmPickers();
})();

const ALL_PMS = ['QUEENIE','XUEQI','PENGFEI','SHAN','BOSS CHONG','DANIEL','SHELA'];

function initPmPicker(pickerId, displayId, listId, hiddenId) {
  const display = document.getElementById(displayId);
  const list = document.getElementById(listId);
  const hidden = document.getElementById(hiddenId);
  let selected = [];

  function renderDisplay() {
    if(selected.length === 0) {
      display.innerHTML = '<span class="pm-placeholder">— Select PM —</span>';
    } else {
      display.innerHTML = selected.map(pm =>
        `<span class="pm-tag-chip">${pm}<span class="chip-remove" data-pm="${pm}" data-pickerid="${pickerId}">✕</span></span>`
      ).join('');
    }
    hidden.value = selected.join(', ');
    list.querySelectorAll('.pm-option').forEach(opt => {
      const pm = opt.dataset.pm;
      const isSel = selected.includes(pm);
      const isDisabled = !isSel && selected.length >= 2;
      opt.classList.toggle('selected', isSel);
      opt.classList.toggle('disabled', isDisabled);
      opt.querySelector('.pm-check').textContent = isSel ? '✓' : '';
    });
  }

  list.innerHTML = ALL_PMS.map(pm =>
    `<div class="pm-option" data-pm="${pm}" data-pickerid="${pickerId}"><span class="pm-check"></span>${pm}</div>`
  ).join('');

  display.addEventListener('click', (e) => {
    if(e.target.classList.contains('chip-remove')) return;
    const isOpen = list.classList.contains('open');
    document.querySelectorAll('.pm-dropdown-list.open').forEach(l => l.classList.remove('open'));
    document.querySelectorAll('.pm-selected-display.open').forEach(d => d.classList.remove('open'));
    if(!isOpen) { display.classList.add('open'); list.classList.add('open'); }
    e.stopPropagation();
  });

  list.addEventListener('click', (e) => {
    const opt = e.target.closest('.pm-option');
    if(!opt || opt.classList.contains('disabled')) return;
    const pm = opt.dataset.pm;
    if(selected.includes(pm)) {
      selected = selected.filter(p => p !== pm);
    } else if(selected.length < 2) {
      selected.push(pm);
    }
    renderDisplay();
    e.stopPropagation();
  });

  renderDisplay();

  const api = {
    reset() { selected = []; renderDisplay(); },
    getValue() { return selected.join(', '); },
    setValue(val) {
      selected = val ? val.split(',').map(s=>s.trim()).filter(Boolean).slice(0,2) : [];
      renderDisplay();
    }
  };
  if(!window._pmPickers) window._pmPickers = {};
  window._pmPickers[pickerId] = api;
  return api;
}

function initAllPmPickers() {
  initPmPicker('new', 'new-pm-display', 'new-pm-list', 'new-pm-value');
  initPmPicker('wdt', 'wdt-new-pm-display', 'wdt-new-pm-list', 'wdt-new-pm-value');
}

document.addEventListener('click', function(e) {
    if(e.target.classList.contains('chip-remove')) {
      const pm = e.target.dataset.pm;
      const pickerId = e.target.dataset.pickerid;
      const picker = window._pmPickers && window._pmPickers[pickerId];
      if(picker) {
        const cur = picker.getValue().split(',').map(s=>s.trim()).filter(Boolean);
        picker.setValue(cur.filter(p=>p!==pm).join(','));
      }
      e.stopPropagation();
      return;
    }
    if(!e.target.closest('.pm-picker')) {
      document.querySelectorAll('.pm-dropdown-list.open').forEach(l => l.classList.remove('open'));
      document.querySelectorAll('.pm-selected-display.open').forEach(d => d.classList.remove('open'));
    }
    const btn = e.target.closest('[data-action]');
    if (!btn) return;
    const action = btn.dataset.action;
    const { nav, tab, view, filter, target, step, name } = btn.dataset;
    if (action === 'switchMainNav') switchMainNav(nav, btn);
    else if (action === 'switchSubTab') switchSubTab(tab, btn);
    else if (action === 'switchWdtView') switchWdtView(view, btn);
    else if (action === 'setPipelineFilter') setPipelineFilter(filter, btn);
    else if (action === 'setWdtPipelineFilter') setWdtPipelineFilter(filter, btn);
    else if (action === 'toggleSection') toggleSection(target, btn);
    else if (action === 'openNewRowModal') openNewRowModal();
    else if (action === 'toggleEditMode') toggleEditMode();
    else if (action === 'downloadExcel') downloadExcel();
    else if (action === 'openWdtModal') openWdtModal();
    else if (action === 'toggleWdtEditMode') toggleWdtEditMode();
    else if (action === 'downloadWdtExcel') downloadWdtExcel();
    else if (action === 'toggleSignedEditMode') toggleSignedEditMode();
    else if (action === 'downloadSignedExcel') downloadSignedExcel();
    else if (action === 'openSignedModal') openSignedModal();
    else if (action === 'closeWdtModal') closeWdtModal();
    else if (action === 'saveWdtRow') saveWdtRow();
    else if (action === 'closeSignedModal') closeSignedModal();
    else if (action === 'saveSignedRow') saveSignedRow();
    else if (action === 'closeNewRowModal') closeNewRowModal();
    else if (action === 'saveNewRow') saveNewRow();
    else if (action === 'goToProgression') goToProgression(name);
    else if (action === 'goToWdtProgression') goToWdtProgression(name);
});
