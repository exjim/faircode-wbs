// ════════════════════════════════════════════
//  auth-guard.js — 백그라운드 인증 체크
//  로딩 화면 없이 바로 앱 표시
//  미인증 시 3초 안에 로그인 페이지로 이동
// ════════════════════════════════════════════
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebase.js';

// 3초 안에 인증 확인 안 되면 로그인 페이지로
const authTimeout = setTimeout(() => {
  window.location.replace('/');
}, 3000);

onAuthStateChanged(auth, (user) => {
  clearTimeout(authTimeout);

  if (!user) {
    window.location.replace('/');
    return;
  }

  // 이메일 표시
  const emailEl = document.getElementById('sb-user-email');
  if (emailEl) emailEl.textContent = user.email;

  // 세션 저장
  sessionStorage.setItem('fc_uid',   user.uid);
  sessionStorage.setItem('fc_email', user.email);
});

// ── 로그아웃 ──
window.firebaseSignOut = async () => {
  if (!confirm('로그아웃 하시겠습니까?')) return;
  try {
    sessionStorage.clear();
    await signOut(auth);
    window.location.replace('/');
  } catch (e) {
    window.location.replace('/');
  }
};

window.handleFirebaseSignOut = () => {
  if (window.firebaseSignOut) window.firebaseSignOut();
  else { sessionStorage.clear(); window.location.replace('/'); }
};
