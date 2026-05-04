import React from "react";
import { ArrowLeft, CheckCircle, Upload, Info } from "lucide-react";
import { Link } from "react-router-dom";

interface RegistrationFormProps {
  event: any;
  formState: any;
  setFormState: (state: any) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

export const RegistrationForm: React.FC<RegistrationFormProps> = ({ event, formState, setFormState, handleSubmit }) => {
  return (
    <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-slate-200/50 border border-slate-100">
      <div className="flex items-center gap-4 mb-10">
        <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shrink-0">
          <CheckCircle size={24} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-dark">Formulir Pendaftaran</h2>
          <p className="text-slate-500 text-sm">Lengkapi data Anda untuk mendapatkan e-ticket.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1">Nama Lengkap</label>
            <input
              type="text"
              required
              placeholder="Sesuai kartu identitas"
              className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-primary outline-none transition-all"
              value={formState.name}
              onChange={(e) => setFormState({ ...formState, name: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1">Nama Bisnis / Instansi</label>
            <input
              type="text"
              required
              placeholder="Nama UMKM atau Institusi"
              className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-primary outline-none transition-all"
              value={formState.business}
              onChange={(e) => setFormState({ ...formState, business: e.target.value })}
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1">Alamat Email</label>
            <input
              type="email"
              required
              placeholder="email@contoh.com"
              className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-primary outline-none transition-all"
              value={formState.email}
              onChange={(e) => setFormState({ ...formState, email: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1">Nomor WhatsApp</label>
            <input
              type="tel"
              required
              placeholder="Contoh: 08123456789"
              className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-primary outline-none transition-all"
              value={formState.phone}
              onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700 ml-1">Bukti Pembayaran / Syarat Lain (Jika Ada)</label>
          <div className="relative group cursor-pointer">
            <input
              type="file"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) setFormState({ ...formState, proof: file.name });
              }}
            />
            <div className="w-full px-6 py-10 rounded-3xl bg-slate-50 border-2 border-dashed border-slate-200 group-hover:border-primary group-hover:bg-primary/5 transition-all flex flex-col items-center justify-center gap-3">
              <Upload className="text-slate-400 group-hover:text-primary transition-colors" size={32} />
              <p className="text-sm font-medium text-slate-500">
                {formState.proof || "Klik atau seret file bukti pembayaran di sini"}
              </p>
              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Maksimal 2MB (JPG, PNG, PDF)</p>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-amber-50 border border-amber-100 flex gap-4">
          <Info className="text-amber-500 shrink-0" size={20} />
          <p className="text-xs text-amber-800 leading-relaxed font-medium">
            Pastikan data yang Anda masukkan sudah benar. E-Ticket akan dikirimkan melalui Email dan WhatsApp setelah admin melakukan verifikasi.
          </p>
        </div>

        <button
          type="submit"
          className="w-full bg-primary text-white py-5 rounded-2xl font-bold text-lg shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all hover:-translate-y-1"
        >
          Konfirmasi Pendaftaran
        </button>
      </form>
    </div>
  );
};

export const RegistrationSuccess: React.FC<{ event: any }> = ({ event }) => {
  return (
    <div className="pt-32 pb-20 container-custom max-w-2xl text-center">
      <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
        <CheckCircle size={48} />
      </div>
      <h1 className="text-4xl font-extrabold text-dark mb-4">Pendaftaran Berhasil!</h1>
      <p className="text-lg text-slate-500 mb-10">
        Terima kasih telah mendaftar di <strong>{event.title}</strong>. Tim kami akan segera melakukan verifikasi data Anda.
      </p>
      
      <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-xl mb-10 text-left">
        <h3 className="font-bold text-dark mb-6 border-b border-slate-50 pb-4">Langkah Selanjutnya:</h3>
        <ul className="space-y-4">
          {[
            "Cek email konfirmasi yang kami kirimkan.",
            "Admin akan menghubungi Anda via WhatsApp dalam 1x24 jam.",
            "Pastikan Anda masuk ke grup peserta jika sudah disediakan.",
            "Simpan nomor admin KHB untuk mendapatkan info terbaru."
          ].map((step, i) => (
            <li key={i} className="flex gap-4 items-start">
              <div className="w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                {i + 1}
              </div>
              <p className="text-sm text-slate-600 font-medium">{step}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link to="/events" className="bg-dark text-white px-8 py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all">
          Kembali ke Events
        </Link>
        <Link to="/" className="bg-slate-100 text-slate-600 px-8 py-4 rounded-2xl font-bold hover:bg-slate-200 transition-all">
          Ke Beranda
        </Link>
      </div>
    </div>
  );
};
