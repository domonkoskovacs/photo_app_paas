# PhotoVault – Fényképalbum alkalmazás OpenShift-en

Fényképalbum alkalmazás, amely publikus PaaS környezetben (OpenShift Developer Sandbox) lett üzembe helyezve. A backend Spring Boot, a frontend pedig React és Shadcn UI alapokra épül.

---

## Funkcionalitás

- Fényképek feltöltése névvel (max. 40 karakter) és feltöltési dátummal
- Fényképek listázása név vagy dátum szerint rendezve
- Fényképek teljes méretben történő megtekintése
- Fényképek törlése
- Frontend és backend külön buildelve, webhookkal üzembe helyezve

---

## Technológiai stack

| Réteg       | Technológia                                |
|------------|---------------------------------------------|
| Frontend   | React + TypeScript + Tailwind + Shadcn UI   |
| Backend    | Spring Boot                      |
| Adatbázis  | H2 (in-memory, 4. feladathoz)                |
| Tárhely     | BLOB adattípusként az adatbázisban            |
| Deploy     | OpenShift Developer Sandbox (PaaS)          |

---

## Lokális futtatás

### Backend

```bash
cd backend
mvn spring-boot:run
```

- Elérhető: `http://localhost:8080`
- H2 memória alapú adatbázis
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
- `REACT_APP_BACKEND_URL` környezeti változó beállítva megfelelő url-re
- GitHub webhook: push esetén automatikus build
- Külön context dir használata frontend és backend számára
- Backendben globális CORS konfig
- `SPRING_SECURITY_CORS_ENABLED` környezeti változó beállítva megfelelő url-re

---

## Projekt struktúra

```
/
├── backend/           ← Spring Boot API
├── frontend/          ← React alkalmazás
├── README.md          ← Dokumentáció (ez a fájl)
```

---

## Feladat állapot (4. beadás)

- [x] Fénykép feltöltés
- [x] Lista név/dátum szerint
- [x] Teljes méretű megtekintés
- [x] Törlés
- [ ] Regisztráció/belépés (következő feladatban)

---

## Linkek

- OpenShift URL: [https://photo-frontend-git-kovacsd-crt-dev.apps.rm3.7wse.p1.openshiftapps.com/](https://photo-frontend-git-kovacsd-crt-dev.apps.rm3.7wse.p1.openshiftapps.com/)

