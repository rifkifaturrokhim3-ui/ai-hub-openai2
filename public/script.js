// Mode gelap
const toggleTheme = document.getElementById('toggleTheme');
toggleTheme.addEventListener('click', () => document.body.classList.toggle('dark-mode'));

// Fungsi panggil API
async function callAI(prompt) {
  try {
    const res = await fetch("/api/ai", {
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({prompt})
    });
    const data = await res.json();
    return data.result || "Tidak ada respons dari AI";
  } catch (err) {
    console.error(err);
    return "Gagal memanggil AI.";
  }
}

// Chat AI
const chatBox = document.getElementById('chatBox');
const chatInput = document.getElementById('chatInput');
document.getElementById('sendBtn').addEventListener('click', async ()=>{
  const msg = chatInput.value.trim(); if(!msg) return;
  appendMessage('Anda', msg); chatInput.value='';
  const resAI = await callAI(msg); appendMessage('AI', resAI);
});
function appendMessage(sender,msg){ const div=document.createElement('div'); div.innerHTML=`<strong>${sender}:</strong> ${msg}`; chatBox.appendChild(div); chatBox.scrollTop=chatBox.scrollHeight; }

// Generate Konten
document.getElementById('generateBtn').addEventListener('click', async ()=>{
  const topic=document.getElementById('generateInput').value.trim(); if(!topic) return;
  document.getElementById('generateOutput').innerHTML="Sedang memproses...";
  const res=await callAI("Buat konten AI tentang: "+topic);
  document.getElementById('generateOutput').innerHTML=res;
});

// Analisis Teks
document.getElementById('analyzeBtn').addEventListener('click', async ()=>{
  const text=document.getElementById('analyzeInput').value.trim(); if(!text) return;
  document.getElementById('analyzeOutput').innerHTML="Sedang menganalisis...";
  const res=await callAI("Analisis teks berikut: "+text);
  document.getElementById('analyzeOutput').innerHTML=res;
});