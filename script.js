const openBtn = document.getElementById('open-btn');
const envelope = document.getElementById('envelope');
const envelopePage = document.getElementById('envelope-page');
const scratchPage = document.getElementById('scratch-page');

openBtn.addEventListener('click', () => {
    envelope.classList.add('open');
    
    // Increase this to 1500 if you want them to see the letter fully pop up first
    setTimeout(() => {
        envelopePage.classList.add('hidden');
        scratchPage.classList.remove('hidden');
        initScratch();
    }, 1500); 
});

function initScratch() {
    const canvas = document.getElementById('scratch-canvas');
    const ctx = canvas.getContext('2d');
    const wrapper = document.querySelector('.canvas-wrapper');
    
    // This makes the canvas size match the CSS wrapper exactly
    canvas.width = wrapper.offsetWidth;
    canvas.height = wrapper.offsetHeight;

    ctx.fillStyle = '#cfcfcf';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('SCRATCH HERE ✨', canvas.width / 2, canvas.height / 2);

    let isDrawing = false;

    function scratch(e) {
        if (!isDrawing) return;
        const rect = canvas.getBoundingClientRect();
        const clientX = e.clientX || (e.touches && e.touches[0].clientX);
        const clientY = e.clientY || (e.touches && e.touches[0].clientY);
        
        const x = clientX - rect.left;
        const y = clientY - rect.top;

        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.arc(x, y, 25, 0, Math.PI * 2);
        ctx.fill();
    }

    canvas.addEventListener('mousedown', () => isDrawing = true);
    canvas.addEventListener('touchstart', (e) => { isDrawing = true; e.preventDefault(); });
    window.addEventListener('mouseup', () => isDrawing = false);
    window.addEventListener('touchend', () => isDrawing = false);
    canvas.addEventListener('mousemove', scratch);
    canvas.addEventListener('touchmove', (e) => { scratch(e); e.preventDefault(); });
}