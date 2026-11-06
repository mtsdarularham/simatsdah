const CONFIG = {
    API_URL: "https://script.google.com/macros/s/AKfycbwtZM8BUeo9hiFXkwhjGEycOsPXeY_RSlPqcZEk-64Fcs5kQZlv5ANxq1twFMIYIic4/exec",
    SHEET_NAME: "siswa",
    APP_NAME: "Sistem Informasi Madrasah",
    SCHOOL_NAME: "MTs Darul Arham"
};

// ============================================================
// DEFINISI MODUL: kolom, label, dan pengaturan tiap sheet
// ============================================================
const MODULES = {
    siswa: {
        title: "Data Siswa",
        sheet: "siswa",
        icon: "fa-users",
        searchKeys: ["Nama", "NISN", "ID"],
        columns: [
            { key: "ID", label: "ID", type: "text", required: true, readonly: true },
            { key: "NIK", label: "NIK", type: "text" },
            { key: "NIS", label: "NIS", type: "text" },
            { key: "NISN", label: "NISN", type: "text" },
            { key: "Nama", label: "Nama Lengkap", type: "text", required: true },
            { key: "Tempat Lahir", label: "Tempat Lahir", type: "text" },
            { key: "Tanggal Lahir", label: "Tanggal Lahir", type: "date" },
            { key: "Jenis Kelamin", label: "Jenis Kelamin", type: "select", options: [{v:"L",l:"Laki-laki (L)"},{v:"P",l:"Perempuan (P)"}] },
            { key: "Sekolah Asal", label: "Sekolah Asal", type: "text" },
            { key: "Nama Ayah", label: "Nama Ayah", type: "text" },
            { key: "Nama Ibu", label: "Nama Ibu", type: "text" },
            { key: "Tahun Masuk", label: "Tahun Masuk", type: "text" },
            { key: "Tahun Keluar", label: "Tahun Keluar", type: "text" },
            { key: "Status", label: "Status", type: "select", options: [{v:"Aktif",l:"Aktif"},{v:"Lulus",l:"Lulus"},{v:"Keluar",l:"Keluar"}] },
            { key: "Tingkat", label: "Tingkat", type: "text" },
            { key: "Foto Awal", label: "Foto Awal", type: "text" },
            { key: "Foto Lulus", label: "Foto Lulus", type: "text" },
            { key: "Foto KK", label: "Foto KK", type: "text" },
            { key: "Ijazah", label: "Ijazah", type: "text" },
            { key: "Melanjutkan", label: "Melanjutkan", type: "text" },
            { key: "Keterangan", label: "Keterangan", type: "textarea" }
        ],
        tableColumns: ["ID", "Nama", "NISN", "Jenis Kelamin", "Status"],
        sortFn: function(a, b) {
            const statusOrder = { 'Aktif': 0, 'Lulus': 1 };
            const sa = statusOrder[a.Status] !== undefined ? statusOrder[a.Status] : 2;
            const sb = statusOrder[b.Status] !== undefined ? statusOrder[b.Status] : 2;
            if (sa !== sb) return sa - sb;
            const ta = parseInt(a.Tingkat) || 0, tb = parseInt(b.Tingkat) || 0;
            if (tb !== ta) return tb - ta;
            const ia = String(a.ID || ''), ib = String(b.ID || '');
            if (ia !== ib) return ia.localeCompare(ib, undefined, {numeric:true});
            return String(a.Nama || '').toLowerCase().localeCompare(String(b.Nama || '').toLowerCase());
        }
    },

    user: {
        title: "Data User",
        sheet: "user",
        icon: "fa-user-shield",
        searchKeys: ["Nama", "Username", "Id"],
        columns: [
            { key: "Id", label: "ID", type: "text", required: true, readonly: true },
            { key: "Nama", label: "Nama", type: "text", required: true },
            { key: "Username", label: "Username", type: "text", required: true },
            { key: "Password", label: "Password", type: "password", required: true },
            { key: "Akses", label: "Akses", type: "select", options: [
                {v:"0", l:"0 - Admin"},
                {v:"1", l:"1 - Kepala Madrasah"},
                {v:"2", l:"2 - Wali Kelas"},
                {v:"3", l:"3 - Guru"}
            ]},
            { key: "User", label: "User", type: "select", options: [{v:"0",l:"0"},{v:"1",l:"1"}] }
        ],
        tableColumns: ["Id", "Nama", "Username", "Akses"],
        sortFn: function(a, b) {
            const ia = String(a.Id || ''), ib = String(b.Id || '');
            return ia.localeCompare(ib, undefined, {numeric:true});
        }
    },

    guru: {
        title: "Data Guru",
        sheet: "guru",
        icon: "fa-chalkboard-teacher",
        searchKeys: ["Nama", "Kode", "Id"],
        columns: [
            { key: "Id", label: "ID", type: "text", required: true, readonly: true },
            { key: "Kode", label: "Kode", type: "text", required: true },
            { key: "Nama", label: "Nama Guru", type: "text", required: true }
        ],
        tableColumns: ["Id", "Kode", "Nama"],
        sortFn: function(a, b) {
            const ia = String(a.Id || ''), ib = String(b.Id || '');
            return ia.localeCompare(ib, undefined, {numeric:true});
        }
    },

    kelas: {
        title: "Data Kelas",
        sheet: "kelas",
        icon: "fa-door-open",
        searchKeys: ["Kelas", "Wali", "Kode"],
        columns: [
            { key: "Id", label: "ID", type: "text", required: true, readonly: true },
            { key: "Kode", label: "Kode", type: "text", required: true },
            { key: "Kelas", label: "Kelas", type: "text", required: true },
            { key: "Wali", label: "Wali Kelas", type: "select-referensi", 
              referensi: { sheet: "guru", valueKey: "Nama", labelKey: "Nama" } }
        ],
        tableColumns: ["Id", "Kode", "Kelas", "Wali"],
        sortFn: function(a, b) {
            const ia = String(a.Id || ''), ib = String(b.Id || '');
            return ia.localeCompare(ib, undefined, {numeric:true});
        }
    },

    mapel: {
        title: "Data Mata Pelajaran",
        sheet: "mapel",
        icon: "fa-book",
        searchKeys: ["Mapel", "Singkatan", "Kode"],
        columns: [
            { key: "Id", label: "ID", type: "text", required: true, readonly: true },
            { key: "Kode", label: "Kode", type: "text", required: true },
            { key: "Mapel", label: "Mata Pelajaran", type: "text", required: true },
            { key: "Singkatan", label: "Singkatan", type: "text", required: true },
            { key: "Urutan", label: "Urutan", type: "text" }
        ],
        tableColumns: ["Id", "Kode", "Mapel", "Singkatan", "Urutan"],
        sortFn: function(a, b) {
            const ua = parseInt(a.Urutan) || 0, ub = parseInt(b.Urutan) || 0;
            if (ua !== ub) return ua - ub;
            const ia = String(a.Id || ''), ib = String(b.Id || '');
            return ia.localeCompare(ib, undefined, {numeric:true});
        }
    },

    semester: {
        title: "Data Semester",
        sheet: "semester",
        icon: "fa-calendar-alt",
        searchKeys: ["Tapel", "Semester", "Kepala"],
        columns: [
            { key: "Id", label: "ID", type: "text", required: true, readonly: true },
            { key: "Tapel", label: "Tahun Pelajaran", type: "text", required: true },
            { key: "Semester", label: "Semester", type: "select", options: [
                {v:"1", l:"1 (Ganjil)"}, {v:"2", l:"2 (Genap)"}
            ]},
            { key: "Mid", label: "Mid", type: "select", options: [{v:"0",l:"0"},{v:"1",l:"1"}] },
            { key: "Kepala", label: "Kepala Madrasah", type: "text" },
            { key: "Titimangsa", label: "Titimangsa", type: "text" },
            { key: "Aktif", label: "Aktif", type: "select", options: [{v:"0",l:"Tidak Aktif"},{v:"1",l:"Aktif"}] }
        ],
        tableColumns: ["Id", "Tapel", "Semester", "Kepala", "Aktif"],
        sortFn: function(a, b) {
            const aa = parseInt(a.Aktif) || 0, ab = parseInt(b.Aktif) || 0;
            if (ab !== aa) return ab - aa;
            const ia = String(a.Id || ''), ib = String(b.Id || '');
            return ia.localeCompare(ib, undefined, {numeric:true});
        }
    }
};
