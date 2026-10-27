[README.md](https://github.com/user-attachments/files/33994901/README.md)
# 🎾 테니스 라운지

테니스 정보를 공유하는 정적 웹사이트입니다. GitHub Pages로 무료 배포됩니다.

## 폴더 구조

```
index.html        메인 페이지
css/style.css     스타일
js/main.js        카테고리 필터, 검색, 상세 보기
data/posts.js     게시글 데이터 (여기에 글 추가)
```

## 글 추가하는 법

`data/posts.js`의 배열에 아래 형식으로 객체를 추가한 뒤 커밋하세요.

```js
{
  id: 6,                       // 겹치지 않는 번호
  title: "제목",
  category: "기술",            // 기술 | 장비 | 대회 | 코트 | 규칙
  author: "작성자",
  date: "2026-10-27",
  summary: "카드에 보일 요약",
  body: "상세 내용 (\n 으로 줄바꿈)"
}
```

## 배포

1. 저장소: https://github.com/chltndud/tennis
2. Settings → Pages → Source: `Deploy from a branch`, Branch: `main` / `/ (root)` 저장
3. 1~2분 뒤 https://chltndud.github.io/tennis/ 접속
