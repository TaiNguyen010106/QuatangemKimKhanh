// Danh sách câu nói ngọt ngào (Có thể thêm vài icon nhẹ nhàng vào)
const phrases = [
    "anh yêu em lắm ☁️",
    "em là cả thế giới của anh",
    "mỗi ngày bên em là một ngày bình yên",
    "em là ánh sáng trong cuộc đời anh ✧",
    "anh không thể sống thiếu em",
    "em là người con gái tuyệt vời nhất",
    "anh muốn ở bên em mãi mãi",
    "xin lỗi em vì những lúc làm em buồn..."
];

const heartIcon = "♥";

const stage = document.getElementById('glow-stage');
const mobileMarquee = document.getElementById('mobile-marquee');
const giftButton = document.getElementById('gift-button'); // Khai báo nút bấm

// ==========================================
// 1. CHỨC NĂNG DÀNH CHO ĐIỆN THOẠI (CHẠY NGANG)
// ==========================================
function setupMobileMarquee() {
    const rowCount = 7; 
    let htmlContent = '';
    
    for(let i = 0; i < rowCount; i++) {
        const shuffled = [...phrases, ...phrases, ...phrases].sort(() => 0.5 - Math.random());
        const rowText = shuffled.join(' &nbsp;&nbsp;&nbsp;✧&nbsp;&nbsp;&nbsp; '); // Đổi dải phân cách thành ngôi sao cho lãng mạn
        
        const direction = i % 2 === 0 ? 'scroll-left' : 'scroll-right';
        htmlContent += `<div class="marquee-row ${direction}">${rowText}</div>`;
    }
    mobileMarquee.innerHTML = htmlContent;
}
setupMobileMarquee();

// ==========================================
// 2. CHỨC NĂNG DÀNH CHO PC (BAY LÊN 3D ẢO DIỆU)
// ==========================================
function createGlowingElement() {
    if (window.innerWidth <= 768) return; 

    const el = document.createElement('div');
    el.classList.add('glowing-element');

    const isHeart = Math.random() < 0.15;
    if (isHeart) {
        el.innerText = heartIcon;
        el.classList.add('glowing-heart');
    } else {
        el.innerText = phrases[Math.floor(Math.random() * phrases.length)];
        el.classList.add('glowing-text');
    }

    // Kích thước (Thêm chút ngẫu nhiên để có hạt li ti, hạt to)
    const baseScale = Math.random() * 0.7 + 0.4; 
    el.style.transform = `scale(${baseScale})`;

    el.style.left = (Math.random() * 90 + 5) + 'vw'; 
    el.style.top = (Math.random() * 20 + 100) + 'vh'; 

    // LÀM CHẬM LẠI: Thời gian bay kéo dài từ 20 đến 30 giây (Rất lãng mạn)
    const duration = 20 + (Math.random() * 10); 
    el.style.animationDuration = duration + 's';

    el.style.animationDelay = (Math.random() * 2) + 's';

    // Độ mờ: Nhẹ nhàng, sương sương
    let opacity = baseScale * 0.5 + 0.1; 
    if (isHeart) opacity += 0.3; 
    el.style.opacity = Math.min(1, opacity);

    stage.appendChild(el);

    el.addEventListener('animationend', () => el.remove());
}

function createStartField() {
    if (window.innerWidth <= 768) return;

    for (let i = 0; i < 70; i++) { // Giảm bớt số lượng sao đi một xíu cho đỡ rối
        const dot = document.createElement('div');
        dot.classList.add('star-dot', 'glowing-element');
        dot.style.left = Math.random() * 100 + 'vw';
        dot.style.top = Math.random() * 100 + 'vh';
        dot.style.opacity = Math.random() * 0.3;
        dot.style.animationDuration = (Math.random() * 20 + 20) + 's';
        stage.appendChild(dot);
    }
}

createStartField();

// LÀM CHẬM LẠI: 500ms mới xuất hiện 1 dòng chữ (Thay vì 150ms như cũ)
setInterval(createGlowingElement, 500); 


// ==========================================
// 3. HIỆU ỨNG ẢNH NỀN CHUYỂN ĐỘNG (BACKGROUND)
// ==========================================
const movingBg = document.getElementById('moving-bg');

document.addEventListener('mousemove', (e) => {
    if (window.innerWidth <= 768) return; 
    const moveX = ((e.clientX / window.innerWidth) - 0.5) * 2; // Giảm biên độ nhúc nhích lại cho đỡ chóng mặt
    const moveY = ((e.clientY / window.innerHeight) - 0.5) * 2;
    movingBg.style.transform = `translate(${moveX}%, ${moveY}%)`;
});

let bgPositionX = 0;
function autoScrollBackground() {
    if (window.innerWidth <= 768) {
        bgPositionX -= 0.015; // Trôi siêu chậm trên điện thoại
        movingBg.style.backgroundPosition = `${bgPositionX}vw center`;
    }
    requestAnimationFrame(autoScrollBackground);
}
autoScrollBackground();

// ==========================================
// 4. SỰ KIỆN KHI BẤM NÚT QUÀ TẶNG
// ==========================================
    giftButton.addEventListener('click', function() {
        // Bạn có thể đổi chữ này thành link chuyển trang (window.location.href) 
        // hoặc mở một popup. Tạm thời mình để hộp thoại siêu dễ thương.
        alert("Bất ngờ chưaaa! Anh yêu em nhiều lắm á 💕");
        
        // Hiệu ứng nổ tim nhỏ khi bấm
        giftButton.innerText = "Đã nhận quà 💌";
        giftButton.style.background = "rgba(255, 255, 255, 0.3)";
    });

window.addEventListener('orientationchange', function() {
    location.reload();
});