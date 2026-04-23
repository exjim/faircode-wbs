# 🔐 Faircode WBS — Firebase 무료 배포 가이드

## 📋 개요
- **완전 비공개** — ID(이메일) + PW만 알면 어디서든 접속 가능
- **Firebase 무료 플랜(Spark)** — 호스팅 + 인증 모두 무료
- **어디서든 접근** — Firebase Hosting URL로 전세계 어디서든 접속

---

## 🚀 배포 순서 (15분 완성)

### Step 1: Firebase 프로젝트 생성
1. [Firebase Console](https://console.firebase.google.com/) 접속
2. **"프로젝트 추가"** 클릭
3. 프로젝트 이름 입력 (예: `faircode-wbs`)
4. Google Analytics **비활성화** → 무료로 더 간단
5. 프로젝트 생성 완료

### Step 2: Firebase Authentication 설정
1. Firebase Console → **Authentication** → **시작하기**
2. **로그인 제공업체** 탭 → **이메일/비밀번호** 클릭
3. **사용 설정** 토글 ON → **저장**
4. **사용자** 탭 → **사용자 추가**
   - 이메일: `your@email.com` (본인 이메일)
   - 비밀번호: 안전한 비밀번호 설정 (8자 이상 권장)
5. **사용자 추가** 완료

### Step 3: Firebase 앱 설정값 복사
1. Firebase Console → **프로젝트 설정** (톱니바퀴 아이콘)
2. **일반** 탭 → **내 앱** 섹션 → **웹 앱 추가** (`</>` 아이콘)
3. 앱 닉네임: `faircode-wbs-web`
4. Firebase Hosting 설정: ✅ **체크 (선택사항)**
5. 앱 등록 후 **firebaseConfig** 코드 복사

```javascript
// 이런 형태로 복사됩니다:
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "faircode-wbs.firebaseapp.com",
  projectId: "faircode-wbs",
  storageBucket: "faircode-wbs.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdef123456"
};
```

### Step 4: 코드에 Firebase 설정 적용
`public/index.html` 과 `public/app.html` 두 파일에서 아래 부분을 교체:

```javascript
// 🔧 교체 전 (플레이스홀더)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  ...
};

// ✅ 교체 후 (실제 값)
const firebaseConfig = {
  apiKey: "AIzaSy실제키값",
  authDomain: "faircode-wbs.firebaseapp.com",
  ...
};
```

⚠️ **`src/firebase.js` 파일 하나만 교체하면 됩니다!** (npm 패키지 방식)
- `src/firebase.js` → firebaseConfig 교체 후 `npm run build`

### Step 5: npm 빌드 후 Firebase Hosting 배포
```bash
# 의존성 설치 (처음 1회)
npm install

# 🔑 src/firebase.js 에서 YOUR_API_KEY 등 교체 후:

# Firebase SDK 번들 빌드 (public/js/ 생성)
npm run build

# Firebase CLI 설치 (처음 1회)
npm install -g firebase-tools

# Firebase 로그인
firebase login

# .firebaserc 수정 — YOUR_FIREBASE_PROJECT_ID를 실제 프로젝트 ID로 교체
# 예: "default": "faircode-wbs"

# 배포!
firebase deploy --only hosting
```

### Step 6: 완료!
배포 완료 시 URL이 출력됩니다:
```
✔  Deploy complete!
Project Console: https://console.firebase.google.com/project/faircode-wbs/overview
Hosting URL: https://faircode-wbs.web.app
```

---

## 🔒 보안 설정

### Firebase Security Rules (자동 적용됨)
- 로그인하지 않은 사용자는 `/app.html` 접근 시 자동으로 로그인 페이지로 리다이렉트
- Firebase Auth 세션은 브라우저 탭 종료 시 자동 만료 (보안 강화)

### 추가 사용자 관리
- Firebase Console → Authentication → 사용자
- 사용자 추가/삭제/비밀번호 변경 모두 가능
- 특정 사용자 비활성화 가능

### 비밀번호 변경
- Firebase Console → Authentication → 사용자 → 해당 이메일 클릭 → 비밀번호 재설정

---

## 💡 Firebase 무료 플랜(Spark) 한도
| 기능 | 무료 한도 |
|------|-----------|
| Hosting 저장소 | 10GB |
| Hosting 전송량 | 360MB/일 |
| Authentication | 무제한 |
| 동시 접속 | 제한 없음 |

→ **개인/소규모 팀 사용에는 완전 무료로 충분!**

---

## 🛠️ 문제 해결

### "auth/invalid-credential" 오류
→ Firebase Console에서 이메일/비밀번호 로그인 제공업체가 활성화되어 있는지 확인

### "auth/configuration-not-found" 오류  
→ `firebaseConfig`의 `authDomain` 값이 올바른지 확인

### 로그인 후 앱이 안 보일 때
→ `public/app.html`의 `firebaseConfig`도 교체했는지 확인

---

## 📱 접속 방법
배포 후 어디서든:
1. `https://YOUR_PROJECT_ID.web.app` 접속
2. 이메일 + 비밀번호 입력
3. 로그인 → WBS 앱 자동 이동

**끝!** 🎉
