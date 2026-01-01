// User data mock - should be moved to separate file in production
export const MOCK_USERS = [
  { 
    username: 'budi_fisika',
    name: 'Budi Santoso',
    bio: 'Mahasiswa Fisika ITB | Eksperimenter | OSN Fisika 2022',
    avatar: 'B',
    level: 'Universitas',
    institution: 'Institut Teknologi Bandung',
    location: 'Bandung, Indonesia',
    joined: '2024-03-15',
    posts: 156,
    cendol: 234,
    bata: 12,
    projects: 5,
    contributions: 48,
    interests: ['Optik', 'Mekanika Kuantum', 'DIY Eksperimen'],
    badges: ['🌟 Early Member', '🥒 Cendol Master', '🔬 Experimenter', '🏆 OSN Medalist'],
    socials: { github: 'budifisika', twitter: 'budi_phy' },
    featured_projects: [
      { title: 'Interferometer Michelson DIY', stars: 24, status: 'completed', tags: ['Optik', 'DIY'] },
      { title: 'Simulasi Gerak Planet', stars: 18, status: 'open', tags: ['Python', 'Astro'] },
    ],
    timeline: [
      { year: '2022', event: '🏆 Medali Perak OSN Fisika Tingkat Nasional', type: 'achievement' },
      { year: '2023', event: '🎓 Masuk Fisika ITB', type: 'education' },
      { year: '2024', event: '🔬 Memulai proyek Interferometer DIY', type: 'project' },
      { year: '2024', event: '📝 Publikasi pertama di jurnal mahasiswa', type: 'publication' },
    ]
  },
  {
    username: 'siti_quantum',
    name: 'Siti Nurhaliza',
    bio: 'Physics PhD Student | Quantum Computing Enthusiast',
    avatar: 'S',
    level: 'S2/S3',
    institution: 'Universitas Indonesia',
    location: 'Depok, Indonesia',
    joined: '2023-08-20',
    posts: 312,
    cendol: 567,
    bata: 8,
    projects: 8,
    contributions: 124,
    interests: ['Quantum Computing', 'Fisika Teori', 'Machine Learning'],
    badges: ['🌟 Early Member', '💡 Top Contributor', '📚 Educator', '🎯 Mentor'],
    socials: { github: 'sitiquantum', linkedin: 'sitinurhaliza' },
    featured_projects: [
      { title: 'Quantum Circuit Simulator', stars: 45, status: 'open', tags: ['Qiskit', 'Python'] },
      { title: 'Catatan Fisika Kuantum', stars: 32, status: 'completed', tags: ['Edukasi', 'LaTeX'] },
    ],
    timeline: [
      { year: '2020', event: '🏆 Juara 1 ONMIPA Fisika', type: 'achievement' },
      { year: '2021', event: '🎓 Lulus S1 Fisika UI Cumlaude', type: 'education' },
      { year: '2022', event: '🔬 Research Intern di BRIN', type: 'work' },
      { year: '2023', event: '🎓 Memulai S2 Fisika UI', type: 'education' },
    ]
  },
  {
    username: 'ahmad_osn',
    name: 'Ahmad Rizki',
    bio: 'Siswa SMAN 1 Surabaya | Persiapan OSN Fisika 2026',
    avatar: 'A',
    level: 'SMA',
    institution: 'SMAN 1 Surabaya',
    location: 'Surabaya, Indonesia',
    joined: '2025-01-10',
    posts: 23,
    cendol: 45,
    bata: 2,
    projects: 1,
    contributions: 8,
    interests: ['Olimpiade Fisika', 'Mekanika', 'Elektronika'],
    badges: ['🌱 Newcomer', '📖 Fast Learner'],
    socials: {},
    featured_projects: [
      { title: 'Catatan Persiapan OSN', stars: 5, status: 'open', tags: ['OSN', 'Catatan'] },
    ],
    timeline: [
      { year: '2025', event: '🏆 Lolos OSN Fisika Tingkat Kota', type: 'achievement' },
      { year: '2025', event: '📚 Bergabung dengan KF13', type: 'community' },
    ]
  }
];
