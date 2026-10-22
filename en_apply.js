// İngilizce seçiliyse içerik verisini çevirilerle değiştir (sayfa çizilmeden önce çalışır).
(function(){
if(window.LANG!=="en")return;
const setFrames=(frames,en)=>frames.forEach((f,i)=>{const e=en[i];if(!e)return;const cap=typeof e==="string"?e:e.cap;if(cap)f.cap=cap;
  if(typeof e==="object"){if(f.say){if(e.say)f.say=[f.say[0],e.say];else delete f.say}if(f.sfx){if(e.sfx)f.sfx=e.sfx;else delete f.sfx}}});
PUZ.concat(PAR).forEach(p=>{const e=EN_PUZ[p.t]||EN_PAR[p.t];if(e)Object.assign(p,e)});
TOP5.forEach((p,i)=>{const e=EN_TOP5[i];if(!e)return;p.t=e.t;p.gen=e.gen;p.why=e.why;p.sol=e.sol;p.story=e.story;setFrames(p.frames,e.caps)});
LOGIC.forEach(p=>{const e=EN_LOGIC[p.t];if(!e)return;setFrames(p.frames,e.caps);Object.assign(p,{t:e.t,q:e.q,o:e.o,a:e.a,s:e.s,w:e.w,h:e.h})});
CASES.forEach(c=>{const e=EN_CASES[c.t];if(!e)return;setFrames(c.frames,e.frames);
  c.suspects.forEach((s,i)=>{if(e.suspects[i]){s.n=e.suspects[i].n;s.says=e.suspects[i].says}});
  c.clues=c.clues.map((cl,i)=>e.clues[i]?[cl[0],e.clues[i][0],e.clues[i][1]]:cl);
  Object.assign(c,{t:e.t,exp:e.exp,twist:e.twist})});
for(const k in EN_INTROS)Object.assign(INTROS[k],EN_INTROS[k]);
QLESSONS.forEach((l,i)=>{const e=EN_Q[i];if(e)Object.assign(l,e);if(EN_FUN[i]){l.fun=EN_FUN[i][0];l.analog=EN_FUN[i][1]}});
})();
