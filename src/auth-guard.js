// ════════════════════════════════════════════
//  auth-guard.js — 앱 페이지 인증 가드
//  npm firebase 패키지 사용
// ════════════════════════════════════════════
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebase.js';

// 5초 안에 인증 응답 없으면 로그인 페이지로 이동 (무한 대기 방지)
const authTimeout = setTimeout(() => {
  console.warn('Firebase 인증 응답 없음 → 로그인 페이지로 이동');
  window.location.replace('/');
}, 5000);

onAuthStateChanged(auth, (user) => {
  clearTimeout(authTimeout); // 타임아웃 해제

  if (!user) {
    // 미인증 → 로그인 페이지로 강제 이동
    window.location.replace('/');
    return;
  }

  // 인증 성공 → 앱 표시
  const guard   = document.getElementById('authGuard');
  const content = document.getElementById('appContent');
  if (guard)   guard.style.display   = 'none';
  if (content) content.style.display = 'flex';

  // 이메일 표시
  const emailEl = document.getElementById('sb-user-email');
  if (emailEl) emailEl.textContent = user.email;

  // 세션 저장
  sessionStorage.setItem('fc_uid',   user.uid);
  sessionStorage.setItem('fc_email', user.email);
});

// ── Firebase 로그아웃 (전역 바인딩) ──
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
