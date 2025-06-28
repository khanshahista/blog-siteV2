// --- FCFS ---
function simulateFCFS() {
  const input = document.getElementById("fcfsInput").value;
  const burstTimes = input.split(",").map(Number).filter(n => !isNaN(n));
  let wt = 0, totalWT = 0, result = "Process\tBurst Time\tWaiting Time\n";

  burstTimes.forEach((bt, i) => {
    result += `P${i + 1}\t\t${bt}\t\t${wt}\n`;
    totalWT += wt;
    wt += bt;
  });

  result += `\nAverage Waiting Time: ${(totalWT / burstTimes.length).toFixed(2)}`;
  document.getElementById("fcfsOutput").innerText = result;
}

// --- SJF ---
function simulateSJF() {
  const input = document.getElementById("sjfInput").value;
  const burstTimes = input.split(",").map(Number).filter(n => !isNaN(n)).sort((a, b) => a - b);
  let wt = 0, totalWT = 0, result = "Process\tBurst Time\tWaiting Time\n";

  burstTimes.forEach((bt, i) => {
    result += `P${i + 1}\t\t${bt}\t\t${wt}\n`;
    totalWT += wt;
    wt += bt;
  });

  result += `\nAverage Waiting Time: ${(totalWT / burstTimes.length).toFixed(2)}`;
  document.getElementById("sjfOutput").innerText = result;
}

// --- FIFO ---
function simulateFIFO() {
  const ref = document.getElementById("fifoInput").value.split(",").map(Number);
  const frames = parseInt(document.getElementById("fifoFrames").value);
  let queue = [], output = "", hits = 0, misses = 0;

  ref.forEach(p => {
    if (queue.includes(p)) hits++;
    else {
      misses++;
      if (queue.length >= frames) queue.shift();
      queue.push(p);
    }
    output += `Page: ${p} | Frames: [${queue.join(", ")}] | ${queue.includes(p) ? "Hit" : "Miss"}\n`;
  });

  output += `\nTotal Hits: ${hits}, Misses: ${misses}`;
  document.getElementById("fifoOutput").innerText = output;
}

// --- LRU ---
function simulateLRU() {
  const ref = document.getElementById("lruInput").value.split(",").map(Number);
  const frames = parseInt(document.getElementById("lruFrames").value);
  let mem = [], recent = [], output = "", hits = 0, misses = 0;

  ref.forEach(p => {
    if (mem.includes(p)) {
      hits++;
      recent.splice(recent.indexOf(p), 1);
      recent.push(p);
    } else {
      misses++;
      if (mem.length < frames) {
        mem.push(p);
        recent.push(p);
      } else {
        const lru = recent.shift();
        mem.splice(mem.indexOf(lru), 1);
        mem.push(p);
        recent.push(p);
      }
    }
    output += `Page: ${p} | Frames: [${mem.join(", ")}] | ${mem.includes(p) ? "Hit" : "Miss"}\n`;
  });

  output += `\nTotal Hits: ${hits}, Misses: ${misses}`;
  document.getElementById("lruOutput").innerText = output;
}

// --- SSTF ---
function simulateSSTF() {
  const input = document.getElementById("sstfInput").value.split(",").map(Number);
  let head = parseInt(document.getElementById("sstfHead").value);
  let queue = [...input], output = `Start at head: ${head}\n`, total = 0;

  while (queue.length) {
    let closest = queue.reduce((a, b) => Math.abs(a - head) < Math.abs(b - head) ? a : b);
    total += Math.abs(head - closest);
    output += `Move to ${closest} (Distance: ${Math.abs(head - closest)})\n`;
    head = closest;
    queue.splice(queue.indexOf(closest), 1);
  }

  output += `\nTotal Seek Time: ${total}`;
  document.getElementById("sstfOutput").innerText = output;
}

// --- SCAN ---
function simulateSCAN() {
  let q = document.getElementById("scanInput").value.split(",").map(Number).sort((a, b) => a - b);
  let head = parseInt(document.getElementById("scanHead").value);
  let dir = document.getElementById("scanDir").value;
  let output = `Start at head: ${head}\n`, total = 0;

  let left = q.filter(n => n < head).reverse();
  let right = q.filter(n => n >= head);
  let seq = dir === "left" ? [...left, 0, ...right] : [...right, 199, ...left];

  seq.forEach(sector => {
    total += Math.abs(head - sector);
    output += `Move to ${sector} (Distance: ${Math.abs(head - sector)})\n`;
    head = sector;
  });

  output += `\nTotal Seek Time: ${total}`;
  document.getElementById("scanOutput").innerText = output;
}

// --- C-SCAN ---
function simulateCSCAN() {
  let q = document.getElementById("cscanInput").value.split(",").map(Number).sort((a, b) => a - b);
  let head = parseInt(document.getElementById("cscanHead").value);
  let output = `Start at head: ${head}\n`, total = 0;

  let right = q.filter(n => n >= head);
  let left = q.filter(n => n < head);
  let seq = [...right, 199, 0, ...left];

  seq.forEach(sector => {
    total += Math.abs(head - sector);
    output += `Move to ${sector} (Distance: ${Math.abs(head - sector)})\n`;
    head = sector;
  });

  output += `\nTotal Seek Time: ${total}`;
  document.getElementById("cscanOutput").innerText = output;
}

// --- LOOK ---
function simulateLOOK() {
  let q = document.getElementById("lookInput").value.split(",").map(Number).sort((a, b) => a - b);
  let head = parseInt(document.getElementById("lookHead").value);
  let dir = document.getElementById("lookDir").value;
  let output = `Start at head: ${head}\n`, total = 0;

  let left = q.filter(n => n < head).reverse();
  let right = q.filter(n => n >= head);
  let seq = dir === "left" ? [...left, ...right] : [...right, ...left];

  seq.forEach(sector => {
    total += Math.abs(head - sector);
    output += `Move to ${sector} (Distance: ${Math.abs(head - sector)})\n`;
    head = sector;
  });

  output += `\nTotal Seek Time: ${total}`;
  document.getElementById("lookOutput").innerText = output;
}

// --- C-LOOK ---
function simulateCLOOK() {
  let q = document.getElementById("clookInput").value.split(",").map(Number).sort((a, b) => a - b);
  let head = parseInt(document.getElementById("clookHead").value);
  let output = `Start at head: ${head}\n`, total = 0;

  let right = q.filter(n => n >= head);
  let left = q.filter(n => n < head);
  let seq = [...right, ...left];

  seq.forEach(sector => {
    total += Math.abs(head - sector);
    output += `Move to ${sector} (Distance: ${Math.abs(head - sector)})\n`;
    head = sector;
  });

  output += `\nTotal Seek Time: ${total}`;
  document.getElementById("clookOutput").innerText = output;
}

// === Comment Section ===
function addComment() {
  const input = document.getElementById("commentInput");
  if (!input || input.value.trim() === "") return;
  const comments = JSON.parse(localStorage.getItem("comments") || "[]");
  comments.push(input.value.trim());
  localStorage.setItem("comments", JSON.stringify(comments));
  input.value = "";
  loadComments();
}

function loadComments() {
  const container = document.getElementById("commentsList");
  if (!container) return;
  const comments = JSON.parse(localStorage.getItem("comments") || "[]");
  container.innerHTML = comments
    .map((c, i) => `<div class="comment">User ${i + 1}: ${c}</div>`)
    .join('');
}

// === Scroll Reveal ===
function revealOnScroll() {
  document.querySelectorAll('.reveal').forEach(el => {
    const winHeight = window.innerHeight;
    const offset = 150;
    const top = el.getBoundingClientRect().top;
    if (top < winHeight - offset) el.classList.add('active');
  });
}

window.addEventListener('scroll', revealOnScroll);

// === Init ===
document.addEventListener('DOMContentLoaded', () => {
  loadComments();
  revealOnScroll();
});

// === Algorithm Search ===
function filterAlgorithms() {
  const query = document.getElementById('algoSearchInput')?.value.toLowerCase();
  const cards = document.querySelectorAll('.algo-card');
  if (!query || !cards.length) return;

  cards.forEach(card => {
    const title = card.querySelector('h3')?.innerText.toLowerCase() || '';
    card.style.display = title.includes(query) ? '' : 'none';
  });
}

document.getElementById('algoSearchInput')?.addEventListener('input', filterAlgorithms);
