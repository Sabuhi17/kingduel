const TOTAL=10, LIMIT_MIN=25;
const KEYS={b:'Büdcə',g:'ÜDM artımı',p:'Yoxsulluq',u:'İşsizlik',e:'Təhsil',h:'Səhiyyə',q:'Bərabərlik',s:'Məmnunluq',c:'Sosial birlik',d:'Rəqəmsal inkişaf',v:'Ekologiya',r:'Regional inkişaf'};
const LOWGOOD=['p','u'];
const STAGES={2:'Mərhələ 2: Sosial dövlətin qurulması',3:'Mərhələ 3: Qlobal çağırışlar',4:'Mərhələ 4: Böhran idarəetməsi',5:'Mərhələ 5: Azərbaycan İnkişaf Çağırışı'};
// sıra: b g p u e h q s c d v r (illüstrativ, saxta göstəricilər)
const P=a=>Object.fromEntries('bgpuehqscdvr'.split('').map((k,i)=>[k,a[i]]));
const COUNTRIES={
AZ:{n:'Azərbaycan',f:'🇦🇿',...P([90,55,45,40,50,45,50,50,60,45,45,35])},
DE:{n:'Almaniya',f:'🇩🇪',...P([110,50,25,25,75,75,60,55,55,70,60,55])},
SE:{n:'İsveç',f:'🇸🇪',...P([105,45,15,20,80,80,80,65,70,80,75,65])},
TR:{n:'Türkiyə',f:'🇹🇷',...P([85,65,40,35,55,55,45,45,50,55,45,45])},
JP:{n:'Yaponiya',f:'🇯🇵',...P([100,40,25,20,78,82,60,50,65,80,60,50])},
US:{n:'ABŞ',f:'🇺🇸',...P([120,60,30,30,65,55,40,45,40,85,50,60])},
IT:{n:'İtaliya',f:'🇮🇹',...P([80,35,30,35,60,70,55,45,55,55,55,45])},
BR:{n:'Braziliya',f:'🇧🇷',...P([75,60,45,40,45,50,35,40,45,50,55,40])}};
const SC=[
{st:2,t:'Sosial müdafiə və səhiyyə',x:'Prezident, ilk büdcə qərarınız nədir?',o:[
['Pensiya və müavinətləri artır','Yoxsulluq azalır, büdcə yüklənir','b-25 p-8 q+5 s+6'],
['Regionlarda xəstəxanalar tik','Səhiyyə əlçatanlığı və regionlar güclənir','b-30 h+10 r+8 s+3'],
['Xərclərə qənaət et','Büdcə möhkəmlənir, əhali narazı qalır','b+20 s-6 p+4 h-3']]},
{st:2,t:'Təhsil və məşğulluq',x:'İnsan kapitalına necə yatırım edirsiniz?',o:[
['Peşə təhsili və kadr hazırlığı','Uzunmüddətli məşğulluq artımı','b-20 e+8 u-5 g+3'],
['Sahibkarlığa dəstək fondu','İqtisadi artım, bərabərsizlik riski','b-20 g+7 u-4 d+3 q-2'],
['Əsas gəlir mənbəyinə güvən','Qısa müddət rahatlıq, uzun müddət risk','b+25 g+4 e-4 d-3 v-3']]},
{st:3,t:'Rəqəmsal bölünmə',x:'Kənd və şəhər arasında rəqəmsal uçurum böyüyür.',o:[
['Kənd məktəblərinə internet və cihaz','Bərabərlik və təhsil güclənir','b-20 d+8 e+4 r+5 q+3'],
['Özəl sektora güzəştlər','Sürətli inkişaf, qeyri-bərabər əlçatanlıq','b-8 d+7 q-4 g+3'],
['Bazar özü həll etsin','Qənaət, lakin uçurum dərinləşir','b+5 d-5 q-4 c-3']]},
{st:3,t:'Avtomatlaşdırma və texnoloji işsizlik',x:'Robotlar minlərlə iş yerini əvəz edir.',o:[
['Yenidən ixtisaslaşma proqramı','İşçilər yeni sahələrə keçir','b-22 u-6 e+5 d+4'],
['Avtomatlaşdırmanı məhdudlaşdır','İşsizlik azalır, rəqabət zəifləyir','g-6 u-2 d-6 s+2'],
['Tam liberallaşma','ÜDM artır, işsizlik və bərabərsizlik də','g+8 u+7 q-5 d+5']]},
{st:3,t:'Qocalan əhali və urbanizasiya',x:'Pensiya yükü artır, gənclər paytaxta axışır.',o:[
['Pensiya fondu islahatı','Büdcə sabitləşir, bəzi qruplar narazı','b+10 p-2 s-4 q-1'],
['Regionlarda peyk şəhərlər','Miqrasiya azalır, ekologiya yaxşılaşır','b-25 r+9 c+3 v+2'],
['Mərkəzə investisiya','Qısa müddət artım, regional geriləmə','g+6 r-8 v-4 c-3']]},
{st:3,t:'İqlim dəyişikliyi və ekoloji degradasiya',x:'Quraqlıq və çirklənmə artır.',o:[
['Yaşıl enerji keçidi','Ekologiya güclənir, ilkin xərc yüksək','b-28 v+10 g-2 d+3'],
['Karbon vergisi','Büdcə artır, əhali narazı','b+15 v+6 s-5 g-3'],
['Sənayeyə üstünlük','Artım var, ekologiya pisləşir','g+7 v-9 s-2 b+5']]},
{st:4,t:'BÖHRAN: Kütləvi işsizlik',x:'Zavodlar bağlanır. Təhsil və məşğulluq siyasətinizin nəticələri görünür.',o:[
['Təcili məşğulluq paketi','İşsizlik azalır, büdcə azalır','b-30 u-8 s+4'],
['İşsizlik müavinəti','Yoxsulluq artmır, işsizlik qalır','b-22 p-4 u-2 s+5 q+3'],
['Gözlə','Büdcə qorunur, etirazlar artır','u+3 s-8 c-5']]},
{st:4,t:'BÖHRAN: Regional etirazlar və gənc miqrasiyası',x:'Regionlar boşalır, etirazlar başlayır.',o:[
['Regional inkişaf proqramı','Regionlar canlanır','b-28 r+10 c+5 s+4'],
['Sərt nəzarət','Qısa sakitlik, etibar itkisi','b-5 s-8 c-8 r-2'],
['Mərkəzə köçü qəbul et','Şəhərlərdə təzyiq artır','r-6 u+2 s-4 g+3']]},
{st:5,t:'Azərbaycan: Qeyri-neft iqtisadiyyatı və regional infrastruktur',x:'Neftdən asılılığı azaltmaq, regionları birləşdirmək lazımdır.',o:[
['Texnoparklar və regional yollar','İnnovasiya və regional inkişaf','b-28 d+8 r+9 g+5'],
['Kənd təsərrüfatı klasterləri','Regionlarda məşğulluq','b-20 r+7 u-4 v+2 g+3'],
['Neft gəlirlərini artır','Qısa müddətli büdcə, dəyişiklik yoxdur','b+25 g+3 d-4 r-3']]},
{st:5,t:'Azərbaycan: İnsan kapitalı və sosial inklüziya',x:'Gənc məşğulluğu, təhsil keyfiyyəti, səhiyyə əlçatanlığı və əlilliyi olan şəxslərin inklüziyası.',o:[
['Gənclər üçün təhsil-məşğulluq paketi','İşsizlik və təhsil keyfiyyəti','b-25 u-6 e+8 d+3'],
['Sosial inklüziya və səhiyyə proqramı','Bərabərlik, səhiyyə və birlik','b-25 q+8 h+7 c+6 s+4'],
['Hərtərəfli, balanslaşdırılmış paket','Hər sahəyə az, lakin balanslı','b-35 u-3 e+4 h+4 q+4 c+3 r+3'],
['İnfrastruktura fokus','Yollar və rabitə yaxşılaşır','b-20 r+6 d+5 g+4 q-1']]}];
const fx=(s,str)=>str.split(' ').forEach(t=>{s[t[0]]+=+t.slice(1)});
const clamp=s=>{for(const k in KEYS)if(k!=='b')s[k]=Math.max(0,Math.min(100,Math.round(s[k])))};
// Böhranlar əvvəlki qərarlardan asılıdır
function crisis(s){if(s.e<45)s.u+=5;if(s.r<40){s.r-=3;s.c-=4;s.s-=4}if(s.q<40||s.p>50){s.p+=4;s.s-=5}if(s.h<40){s.h-=4;s.s-=3}}
function sim(cc,ch){const s={...COUNTRIES[cc]},cr=[];
 ch.forEach((c,i)=>{const sc=SC[i];if(sc.st===4)crisis(s);fx(s,sc.o[c][2]);
  s.b+=Math.round(s.g/10);if(s.b<0)s.s-=3;clamp(s);if(sc.st===4)cr.push((s.s+s.c)/2)});
 s.cr=cr.length?cr.reduce((a,b)=>a+b)/cr.length:50;return s}
function score(s){const m={soc:(100-s.p+s.q)/2,edu:s.e,hl:s.h,emp:100-s.u,eq:s.q,coh:s.c,env:s.v,dig:s.d,eco:(s.g+Math.max(0,Math.min(100,s.b/2)))/2,cri:s.cr};
 const w={soc:.14,edu:.12,hl:.12,emp:.12,eq:.10,coh:.10,env:.08,dig:.08,eco:.08,cri:.06};
 let t=0;for(const k in w)t+=m[k]*w[k];return{m,t}}
