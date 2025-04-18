# PhotoVault – Fényképalbum alkalmazás OpenShift-en

Fényképalbum alkalmazás, amely publikus PaaS környezetben (OpenShift Developer Sandbox) lett üzembe helyezve. A backend Spring Boot, a frontend pedig React és Shadcn UI alapokra épül.

---

## Funkcionalitás

- Fényképek feltöltése névvel (max. 40 karakter) és feltöltési dátummal
- Fényképek listázása név vagy dátum szerint rendezve
- Fényképek teljes méretben történő megtekintése
- Fényképek törlése
- Felhasználói regisztráció, belépés, kilépés
- Feltöltés és törlés kizárólag bejelentkezett felhasználók számára
- Frontend és backend külön buildelve, webhookkal üzembe helyezve

---

## Technológiai stack

| Réteg       | Technológia                                |
|------------|---------------------------------------------|
| Frontend   | React + TypeScript + Tailwind + Shadcn UI   |
| Backend    | Spring Boot + JWT + Liquibase + PostgreSQL |
| Adatbázis  | PostgreSQL (OpenShift DB)                   |
| Tárhely    | BLOB (PostgreSQL `bytea` mezőként)          |
| Deploy     | OpenShift Developer Sandbox (PaaS)          |

---

## Lokális futtatás

### Backend

```bash
cd backend
mvn spring-boot:run
```

- Elérhető: `http://localhost:8080`
- PostgreSQL használata
- CORS engedélyezve

### Frontend

```bash
cd frontend
npm install
npm run dev
```

- Elérhető: `http://localhost:3000`
- `.env` tartalma:
  ```env
  REACT_APP_BACKEND_URL=http://localhost:8080
  ```

---

## OpenShift telepítés

- NodeJS 18 S2I és Java 17 S2I builderek használata
- Frontend: `serve -s build -l 8080`
- `REACT_APP_BACKEND_URL` környezeti változó beállítva
- GitHub webhook: push esetén automatikus build indul
- Backend: Liquibase migrációval PostgreSQL adatbázis használata
- Külön context dir használata frontend és backend számára
- Backendben globális CORS konfig
- `SPRING_SECURITY_CORS_ENABLED` környezeti változó támogatott

---

## Projekt struktúra

```
/
├── backend/           ← Spring Boot + Security + Liquibase
├── frontend/          ← React alkalmazás
├── README.md          ← Dokumentáció (ez a fájl)
```

---

## Feladat állapot (5. beadás – végleges változat)

---

## Linkek

- OpenShift URL: [https://photo-frontend-git-kovacsd-crt-dev.apps.rm3.7wse.p1.openshiftapps.com/](https://photo-frontend-git-kovacsd-crt-dev.apps.rm3.7wse.p1.openshiftapps.com/)