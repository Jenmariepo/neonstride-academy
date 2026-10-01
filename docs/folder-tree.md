# Árbol final de la entrega

Se omiten dependencias, .git y build generado.

```text
neonstride/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── constants.js
│   │   │   ├── database.js
│   │   │   └── environment.js
│   │   ├── controllers/
│   │   │   ├── game-controller.js
│   │   │   └── player-controller.js
│   │   ├── middlewares/
│   │   │   ├── errors.js
│   │   │   └── security.js
│   │   ├── models/
│   │   │   ├── schema.sql
│   │   │   └── validation.js
│   │   ├── repositories/
│   │   │   ├── game-repository.js
│   │   │   └── player-repository.js
│   │   ├── routes/
│   │   │   └── api-routes.js
│   │   ├── services/
│   │   │   ├── game-service.js
│   │   │   ├── player-service.js
│   │   │   └── statistics-service.js
│   │   ├── utils/
│   │   │   ├── api-error.js
│   │   │   ├── response.js
│   │   │   └── tokens.js
│   │   └── app.js
│   ├── package.json
│   └── server.js
├── docs/
│   ├── screenshots/
│   │   └── README.md
│   ├── code-audit.json
│   ├── delivery-guide.md
│   ├── deployment.md
│   ├── final-audit.md
│   ├── folder-tree.md
│   ├── initial-analysis.md
│   ├── presentation-script.md
│   ├── team-work.md
│   ├── technical-document.md
│   ├── technical-document.pdf
│   └── test-results.txt
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   │   ├── fonts/
│   │   │   │   └── .gitkeep
│   │   │   ├── images/
│   │   │   │   └── .gitkeep
│   │   │   └── sounds/
│   │   │       └── .gitkeep
│   │   ├── css/
│   │   │   ├── base.css
│   │   │   ├── components.css
│   │   │   ├── game.css
│   │   │   ├── layout.css
│   │   │   └── responsive.css
│   │   └── js/
│   │       ├── core/
│   │       │   ├── game-engine.js
│   │       │   ├── game-loop.js
│   │       │   └── timer.js
│   │       ├── data/
│   │       │   ├── questions.js
│   │       │   └── symbols.js
│   │       ├── entities/
│   │       │   ├── player.js
│   │       │   └── prism.js
│   │       ├── input/
│   │       │   └── input-manager.js
│   │       ├── modules/
│   │       │   ├── achievements.js
│   │       │   ├── board.js
│   │       │   ├── difficulty.js
│   │       │   ├── quiz.js
│   │       │   ├── scoring.js
│   │       │   └── settings.js
│   │       ├── services/
│   │       │   ├── api-client.js
│   │       │   ├── game-service.js
│   │       │   ├── leaderboard-service.js
│   │       │   ├── player-service.js
│   │       │   └── storage.js
│   │       ├── states/
│   │       │   ├── achievements-state.js
│   │       │   ├── game-state.js
│   │       │   ├── help-state.js
│   │       │   ├── menu-state.js
│   │       │   ├── pause-state.js
│   │       │   ├── records-state.js
│   │       │   ├── result-state.js
│   │       │   ├── selection-state.js
│   │       │   └── settings-state.js
│   │       ├── ui/
│   │       │   ├── actions.js
│   │       │   ├── application.js
│   │       │   ├── board-view.js
│   │       │   ├── dialogs.js
│   │       │   ├── dom.js
│   │       │   ├── effects.js
│   │       │   ├── navigation-controller.js
│   │       │   ├── persistence-controller.js
│   │       │   ├── profile-view.js
│   │       │   ├── quiz-view.js
│   │       │   └── screens.js
│   │       ├── utils/
│   │       │   ├── constants.js
│   │       │   ├── random.js
│   │       │   └── validators.js
│   │       └── main.js
│   └── index.html
├── scripts/
│   ├── audit-code.js
│   └── build-frontend.js
├── tests/
│   ├── api.test.js
│   ├── browser-check.js
│   ├── difficulty.test.js
│   ├── engine.test.js
│   └── ui.test.js
├── .env.example
├── .gitignore
├── .prettierignore
├── .prettierrc.json
├── CHECKLIST.md
├── README.md
├── eslint.config.js
├── netlify.toml
├── package-lock.json
├── package.json
├── render.yaml
└── vercel.json
```
