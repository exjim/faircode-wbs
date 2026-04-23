// ════════════════════════════════════════════
//  login.js — 로그인 페이지 Firebase 로직
//  npm firebase 패키지 사용
// ════════════════════════════════════════════
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from 'firebase/auth';
import { auth } from './firebase.js';

// ── 이미 로그인된 상태면 앱으로 이동 ──
onAuthStateChanged(auth, (user) => {
  if (user) {
    window.location.href = '/app.html';
  } else {
    // 카드 표시
    const box = document.getElementById('loginBox');
    if (box) {
      box.style.opacity       = '1';
      box.style.pointerEvents = 'auto';
    }
  }
});

// ── 로그인 처리 ──
async function doLogin() {
  const email = document.getElementById('emailInput').value.trim();
  const pw    = document.getElementById('pwInput').value;
  const btn   = document.getElementById('loginBtn');

  if (!email || !pw) { showError('이메일과 비밀번호를 입력해주세요.'); return; }

  btn.disabled    = true;
  btn.textContent = '로그인 중...';
  hideMsg();

  try {
    const { user } = await signInWithEmailAndPassword(auth, email, pw);
    sessionStorage.setItem('fc_uid',   user.uid);
    sessionStorage.setItem('fc_email', user.email);
    showSuccess('로그인 성공! 이동 중...');
    setTimeout(() => { window.location.href = '/app.html'; }, 600);
  } catch (err) {
    btn.disabled    = false;
    btn.textContent = '로그인';
    const MAP = {
      'auth/invalid-email':        '올바른 이메일 형식이 아닙니다.',
      'auth/user-not-found':       '등록되지 않은 계정입니다.',
      'auth/wrong-password':       '비밀번호가 올바르지 않습니다.',
      'auth/invalid-credential':   '이메일 또는 비밀번호가 올바르지 않습니다.',
      'auth/too-many-requests':    '시도 횟수 초과. 잠시 후 다시 시도해주세요.',
      'auth/network-request-failed':'네트워크 연결을 확인해주세요.',
      'auth/user-disabled':        '비활성화된 계정입니다.',
    };
    showError(MAP[err.code] || `오류: ${err.message}`);
  }
}

// ── 비밀번호 보기/숨기기 ──
function togglePw() {
  const inp  = document.getElementById('pwInput');
  const icon = document.getElementById('eyeIcon');
  if (inp.type === 'password') { inp.type = 'text';     icon.textContent = '🙈'; }
  else                         { inp.type = 'password'; icon.textContent = '👁';  }
}

// ── UI 헬퍼 ──
function showError(msg) {
  const el = document.getElementById('errorMsg');
  el.textContent = msg;
  el.style.display = 'block';
  el.className     = 'msg-box error';
}
function showSuccess(msg) {
  const el = document.getElementById('errorMsg');
  el.textContent = msg;
  el.style.display = 'block';
  el.className     = 'msg-box success';
}
function hideMsg() {
  document.getElementById('errorMsg').style.display = 'none';
}

// ── 로딩 오버레이 제거 ──
window.addEventListener('load', () => {
  setTimeout(() => {
    const ov = document.getElementById('loadingOverlay');
    if (ov) { ov.style.opacity = '0'; setTimeout(() => ov.remove(), 300); }
  }, 600);
});

// ── 전역 바인딩 (HTML onclick용) ──
window.doLogin    = doLogin;
window.togglePw   = togglePw;
window.handleKeydown = (e) => { if (e.key === 'Enter') doLogin(); };
