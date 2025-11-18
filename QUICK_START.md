# Quick Start - Vercel Deployment

## 현재 상태
✅ Git 저장소 초기화 완료
✅ 모든 파일 커밋 완료
✅ Vercel 배포 준비 완료

## 바로 배포하기

### 1. GitHub에 푸시 (필수)

```bash
cd /Users/hunjunsin/Desktop/Jun/MLOps/VertexAI/taro-web-nextjs

# GitHub에서 새 repository 생성 후:
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

### 2. Vercel에 배포

#### Option A: Vercel CLI (추천)
```bash
npm i -g vercel
vercel login
vercel
```

#### Option B: Vercel Dashboard
1. https://vercel.com/new 접속
2. GitHub 저장소 Import
3. Environment Variables 설정 (아래 참조)
4. Deploy 클릭

### 3. Environment Variables 설정 (중요!)

Vercel Dashboard에서 다음 3개 변수 설정:

**GCP_PROJECT_ID**
```
mlops-compute-lab
```

**GCP_LOCATION**
```
us-central1
```

**GOOGLE_APPLICATION_CREDENTIALS_JSON**
```bash
# 서비스 계정 키 파일 내용 복사:
cat /Users/hunjunsin/service-account-key.json
# 👆 이 JSON 전체를 복사해서 Vercel에 붙여넣기
```

### 4. 배포 완료 후 테스트
- Vercel이 제공하는 URL 접속 (예: https://your-app.vercel.app)
- 질문 입력 → 카드 뽑기 → 해석 받기 테스트

## 문제 발생 시
자세한 내용은 [DEPLOYMENT.md](./DEPLOYMENT.md) 참조

## 예상 비용
- Vercel Free Tier: 무료 (100GB/월)
- Vertex AI Gemini Flash-Lite: 약 $0.44/월 (10K 요청 기준)
