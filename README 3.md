# SOCIAL STATE – Sosial Rifah Yarışı
2 nəfərlik real-time strategiya oyunu. **Vaxt limiti: 25 dəqiqə** (serverdə `ends_at`, hər iki oyunçuda eyni taymer). Vaxt bitəndə oyun avtomatik yekunlaşır.

## Quraşdırma
1. supabase.com-da layihə yaradın → Authentication → Providers → **Anonymous sign-ins** aktiv edin.
2. SQL Editor-da `supabase_schema.sql` faylını işə salın.
3. `supabase.js`-də `SUPABASE_URL` və **anon (public)** açarı yazın. Service role açarını heç vaxt yazmayın.
4. GitHub-a yükləyin → Settings → Pages → branch `main` / root.

## Necə işləyir
- Bütün yazmalar RLS-qorunan `security definer` funksiyalarla gedir; klient birbaşa cədvələ yaza bilmir.
- Rəqibin qərarı raund bitənə qədər RLS ilə gizlidir. Təkrar göndərmə `primary key` ilə bloklanır.
- Vəziyyət qərarlardan deterministik hesablanır → yenilənmə/yenidən qoşulma zamanı proqres itmir.
- Göstəricilər illüstrativdir, rəsmi statistika deyil.
