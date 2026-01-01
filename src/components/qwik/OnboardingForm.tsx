import { component$, useSignal, useStore, $ } from '@builder.io/qwik';
import { turso, initDB } from '../../lib/turso';

interface OnboardingData {
  name: string;
  email: string;
  phone: string;
  year: string;
  major: string;
  university: string;
  motivation: string;
  interests: string[];
}

export default component$(() => {
  const formData = useStore<OnboardingData>({
    name: '',
    email: '',
    phone: '',
    year: '',
    major: '',
    university: '',
    motivation: '',
    interests: []
  });
  
  const isSubmitting = useSignal(false);
  const isSuccess = useSignal(false);
  const errorMsg = useSignal('');
  const currentStep = useSignal(1);

  const interests = [
    'Mekanika', 'Termodinamika', 'Elektromagnetisme', 'Fisika Modern',
    'Astrofisika', 'Fisika Kuantum', 'Eksperimen', 'Teori'
  ];

  const toggleInterest = $((interest: string) => {
    const index = formData.interests.indexOf(interest);
    if (index > -1) {
      formData.interests.splice(index, 1);
    } else {
      formData.interests.push(interest);
    }
  });

  const nextStep = $(() => {
    if (currentStep.value < 3) currentStep.value++;
  });

  const prevStep = $(() => {
    if (currentStep.value > 1) currentStep.value--;
  });

  const submitForm = $(async () => {
    isSubmitting.value = true;
    errorMsg.value = '';
    try {
      await initDB();
      await turso.execute({
        sql: `INSERT INTO members (name, email, phone, year, major, university, motivation, interests) 
              VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        args: [
          formData.name,
          formData.email,
          formData.phone,
          formData.year,
          formData.major,
          formData.university,
          formData.motivation,
          formData.interests.join(', ')
        ]
      });
      localStorage.setItem('kf13-member', JSON.stringify({ name: formData.name, email: formData.email }));
      isSuccess.value = true;
    } catch (error: any) {
      errorMsg.value = error.message?.includes('UNIQUE') 
        ? 'Email sudah terdaftar!' 
        : 'Gagal mendaftar. Silakan coba lagi.';
    }
    isSubmitting.value = false;
  });

  if (isSuccess.value) {
    return (
      <div class="bg-white p-8 rounded-lg shadow-lg text-center">
        <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span class="text-2xl">✅</span>
        </div>
        <h2 class="text-2xl font-bold text-green-600 mb-4">Selamat!</h2>
        <p class="text-gray-600 mb-6">Pendaftaran kamu berhasil! Selamat datang di keluarga KF13.</p>
        <a href="/member" class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 inline-block">
          Masuk ke Portal Member
        </a>
      </div>
    );
  }

  return (
    <div class="bg-white p-8 rounded-lg shadow-lg">
      <div class="mb-6">
        <div class="flex justify-between items-center mb-2">
          <span class="text-sm text-gray-500">Langkah {currentStep.value} dari 3</span>
          <span class="text-sm text-gray-500">{Math.round((currentStep.value / 3) * 100)}%</span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-2">
          <div 
            class="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={`width: ${(currentStep.value / 3) * 100}%`}
          ></div>
        </div>
      </div>

      {errorMsg.value && (
        <div class="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">{errorMsg.value}</div>
      )}

      <form preventdefault:submit onSubmit$={submitForm}>
        {currentStep.value === 1 && (
          <div class="space-y-4">
            <h2 class="text-2xl font-bold mb-4">Informasi Dasar</h2>
            <input
              type="text"
              placeholder="Nama Lengkap"
              value={formData.name}
              onInput$={(e) => formData.name = (e.target as HTMLInputElement).value}
              class="w-full p-3 border rounded-lg"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onInput$={(e) => formData.email = (e.target as HTMLInputElement).value}
              class="w-full p-3 border rounded-lg"
              required
            />
            <input
              type="tel"
              placeholder="Nomor WhatsApp"
              value={formData.phone}
              onInput$={(e) => formData.phone = (e.target as HTMLInputElement).value}
              class="w-full p-3 border rounded-lg"
              required
            />
            <button
              type="button"
              onClick$={nextStep}
              class="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
            >
              Lanjut
            </button>
          </div>
        )}

        {currentStep.value === 2 && (
          <div class="space-y-4">
            <h2 class="text-2xl font-bold mb-4">Informasi Akademik</h2>
            <select
              value={formData.year}
              onChange$={(e) => formData.year = (e.target as HTMLSelectElement).value}
              class="w-full p-3 border rounded-lg"
              required
            >
              <option value="">Pilih Tahun</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
            </select>
            <input
              type="text"
              placeholder="Jurusan"
              value={formData.major}
              onInput$={(e) => formData.major = (e.target as HTMLInputElement).value}
              class="w-full p-3 border rounded-lg"
              required
            />
            <input
              type="text"
              placeholder="Universitas/Sekolah"
              value={formData.university}
              onInput$={(e) => formData.university = (e.target as HTMLInputElement).value}
              class="w-full p-3 border rounded-lg"
              required
            />
            <div class="flex space-x-4">
              <button
                type="button"
                onClick$={prevStep}
                class="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-400"
              >
                Kembali
              </button>
              <button
                type="button"
                onClick$={nextStep}
                class="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
              >
                Lanjut
              </button>
            </div>
          </div>
        )}

        {currentStep.value === 3 && (
          <div class="space-y-4">
            <h2 class="text-2xl font-bold mb-4">Minat & Motivasi</h2>
            <div>
              <label class="block text-sm font-medium mb-2">Bidang Fisika yang Diminati:</label>
              <div class="grid grid-cols-2 gap-2">
                {interests.map((interest) => (
                  <button
                    key={interest}
                    type="button"
                    onClick$={() => toggleInterest(interest)}
                    class={`p-2 text-sm rounded border ${
                      formData.interests.includes(interest)
                        ? 'bg-blue-100 border-blue-500 text-blue-700'
                        : 'bg-gray-50 border-gray-300 text-gray-700'
                    }`}
                  >
                    {interest}
                  </button>
                ))}
              </div>
            </div>
            <textarea
              placeholder="Ceritakan motivasi kamu bergabung dengan KF13..."
              value={formData.motivation}
              onInput$={(e) => formData.motivation = (e.target as HTMLTextAreaElement).value}
              class="w-full p-3 border rounded-lg h-24 resize-none"
              required
            />
            <div class="flex space-x-4">
              <button
                type="button"
                onClick$={prevStep}
                class="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-400"
              >
                Kembali
              </button>
              <button
                type="submit"
                disabled={isSubmitting.value}
                class="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 disabled:opacity-50"
              >
                {isSubmitting.value ? 'Mendaftar...' : 'Gabung KF13!'}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
});
