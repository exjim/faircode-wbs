// ════════════════════════════════════════════════
//  Firebase 설정 — npm 패키지 방식 (firebase@12.x)
//  이 파일에서만 firebaseConfig를 관리합니다.
// ════════════════════════════════════════════════
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey:            "AIzaSyDC3XwSjrS82aRzm5_p7EtyjucWi2czvpQ",
  authDomain:        "faircodewbs.firebaseapp.com",
  projectId:         "faircodewbs",
  storageBucket:     "faircodewbs.firebasestorage.app",
  messagingSenderId: "756573380744",
  appId:             "1:756573380744:web:86ad3388bff421d5ffff3d",
  measurementId:     "G-K9E12KC8EH"
};

const app  = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
