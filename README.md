# VitaTrack FE - Vanilla JS + CSS

## Cau truc du an

```
FE_VitaTrack/
├── index.html          <- Trang chu (tu dong redirect)
├── login.html          <- Dang nhap
├── register.html       <- Dang ky (3 buoc)
│
├── pages/
│   ├── dashboard.html  <- Trang chu nguoi dung
│   ├── profile.html    <- Ho so suc khoe
│   ├── meal-log.html   <- Nhat ky an uong
│   ├── activity.html   <- Hoat dong the chat
│   ├── assistant.html  <- Tro ly AI
│   ├── expert.html     <- Cong cu chuyen gia
│   └── admin.html      <- Quan tri he thong
│
├── assets/
│   ├── css/            <- Stylesheet
│   │   ├── base/       <- variables, reset, typography
│   │   ├── layout/     <- sidebar, header, grid
│   │   ├── components/ <- button, card, form, modal, chart
│   │   ├── pages/      <- CSS rieng cho tung trang
│   │   └── main.css    <- Import tat ca CSS
│   │
│   └── js/
│       ├── core/       <- api, auth, router, storage, config
│       ├── services/   <- userService, healthService, mealService,...
│       ├── modules/    <- Logic rieng cho tung tinh nang
│       ├── components/ <- sidebar, navbar, modal, toast, chart
│       └── main.js     <- Entry point (khoi tao chung)
│
└── utils/              <- dateUtils, calorieUtils, validator
```

## Cach su dung trong IntelliJ

### 1. Mo du an
- File > Open... -> chon thu muc FE_VitaTrack

### 2. Cai dat Live Server (khuyen nghi)
- Su dung plugin "Built-in Preview" hoac mo index.html truc tiep

### 3. Cau hinh API Backend
Mo file: `assets/js/core/config.js`
```js
API_BASE_URL: 'http://localhost:8080/api',  // <- doi URL BE 
```

### 4. Cac endpoint BE can implement

#### Auth
- POST /api/auth/login       <- { email, password }
- POST /api/auth/register    <- { fullName, email, password, weight, height, ... }

#### Users  
- GET  /api/users/me
- PUT  /api/users/me

#### Health
- GET  /api/health/metrics
- POST /api/health/metrics
- GET  /api/health/goals
- PUT  /api/health/goals

#### Meals
- GET  /api/meals/diary?date=2024-01-01
- POST /api/meals/diary
- DELETE /api/meals/diary/:id
- GET  /api/foods/search?q=com
- POST /api/foods/recognize  <- multipart/form-data

#### Activities
- GET  /api/activities/today
- POST /api/activities
- DELETE /api/activities/:id

#### AI
- POST /api/ai/chat          <- { message, conversationId }
- GET  /api/ai/suggestions

#### Admin
- GET  /api/admin/users
- PATCH /api/admin/users/:id/role
- POST /api/admin/foods
- ...

### 5. Response format mong doi

#### Login response:
```json
{
  "token": "JWT_TOKEN",
  "user": { "id": 1, "fullName": "...", "email": "...", "role": "user" },
  "role": "user"
}
```

#### API error format:
```json
{ "message": "Mo ta loi", "status": 400 }
```

## Luu y quan trong

1. **Module ES6**: Tat ca JS dung `import/export` - can chay qua server (khong mo file truc tiep)
2. **CORS**: BE can cau hinh cho phep origin cua FE
3. **JWT**: Token tu dong gan vao header `Authorization: Bearer <token>`
4. **Phan quyen**: 3 role: user / expert / admin
