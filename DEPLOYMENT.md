# Vercel Deployment Guide

## Prerequisites
- Vercel account (https://vercel.com)
- GCP service account key file
- Git repository

## Step 1: Prepare Service Account Credentials

서비스 계정 키 JSON 파일의 내용을 복사합니다:
```bash
cat service-account-key.json | pbcopy
```

또는 파일 내용을 확인:
```bash
cat service-account-key.json
```

## Step 2: Push to Git Repository

```bash
cd /Users/hunjunsin/Desktop/Jun/MLOps/VertexAI/taro-web-nextjs

# Git 초기화 (아직 안 했다면)
git init

# .gitignore 확인 (service account key가 제외되었는지)
cat .gitignore

# 모든 파일 추가
git add .

# 커밋
git commit -m "Initial commit - Tarot reading app with Vertex AI"

# GitHub에 푸시 (원격 저장소 URL을 자신의 것으로 변경)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git branch -M main
git push -u origin main
```

## Step 3: Deploy to Vercel

### Option 1: Vercel CLI 사용

```bash
# Vercel CLI 설치
npm i -g vercel

# 로그인
vercel login

# 배포
vercel
```

### Option 2: Vercel Dashboard 사용

1. https://vercel.com/new 접속
2. GitHub 저장소 연결
3. 프로젝트 Import
4. Environment Variables 설정 (아래 참조)
5. Deploy 클릭

## Step 4: Environment Variables 설정

Vercel Dashboard → Project Settings → Environment Variables에 다음 변수들을 추가:

### Required Variables:

1. **GCP_PROJECT_ID**
   - Value: `mlops-compute-lab` (또는 자신의 GCP 프로젝트 ID)

2. **GCP_LOCATION**
   - Value: `us-central1`

3. **GOOGLE_APPLICATION_CREDENTIALS_JSON**
   - Value: 서비스 계정 키 JSON 파일의 **전체 내용**을 복사하여 붙여넣기
   - 예시:
   ```json
   {
     "type": "service_account",
     "project_id": "mlops-compute-lab",
     "private_key_id": "...",
     "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
     "client_email": "tarot-app-sa@mlops-compute-lab.iam.gserviceaccount.com",
     ...
   }
   ```

### Environment 선택:
- Production, Preview, Development 모두 체크

## Step 5: 배포 확인

1. Vercel이 자동으로 빌드 시작
2. 빌드 로그 확인
3. 배포 완료 후 URL 확인 (예: https://your-app.vercel.app)
4. 웹사이트 접속하여 테스트

## Step 6: 커스텀 도메인 설정 (선택사항)

Vercel Dashboard → Project Settings → Domains에서 커스텀 도메인 추가

## Troubleshooting

### 빌드 에러 발생 시:
1. Vercel 빌드 로그 확인
2. 환경 변수가 올바르게 설정되었는지 확인
3. `npm run build`를 로컬에서 실행하여 에러 확인

### Vertex AI 연결 에러:
1. `GOOGLE_APPLICATION_CREDENTIALS_JSON`이 올바른 JSON 형식인지 확인
2. GCP 서비스 계정에 "Vertex AI User" 권한이 있는지 확인
3. Vercel 함수 로그 확인

## 비용 정보

- **Vercel Free Tier**: 
  - 100GB 대역폭/월
  - 무제한 배포
  - Serverless Functions 포함

- **Vertex AI Gemini 2.0 Flash-Lite**:
  - 입력: $0.02 / 1M tokens
  - 출력: $0.08 / 1M tokens
  - 예상 비용: 10K 요청 시 약 $0.44/월

## 다음 단계

- Google Analytics 추가
- SEO 최적화
- OG 이미지 추가
- 성능 모니터링 설정
