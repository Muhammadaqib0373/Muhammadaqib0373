
function money(n, currency='AED'){ const num = Number(n || 0); return new Intl.NumberFormat('en-AE',{style:'currency',currency,maximumFractionDigits:2}).format(num); }
function num(n, digits=2){ return new Intl.NumberFormat('en-US',{maximumFractionDigits:digits}).format(Number(n || 0)); }
function byId(id){ return document.getElementById(id); }
function setResult(html){ byId('result').innerHTML = html; }
