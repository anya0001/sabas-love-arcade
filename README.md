# Saba's Love Arcade 💗

A tiny password-protected pixel-art claw machine game made as a personal gift.

## Features

- Server-side password check with Flask sessions
- Cute pastel pixel-inspired interface
- Move the claw left and right with on-screen buttons or keyboard arrows
- Grab prizes and reveal personalized messages
- Rarity tiers: common, rare, epic, legendary
- Easy prize editing in `static/prizes.js`

## Run locally (Windows PowerShell)

```powershell
py -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
$env:SECRET_KEY = python -c "import secrets; print(secrets.token_hex(32))"
$env:ARCADE_PASSWORD = "choose-a-local-password"
.\.venv\Scripts\python.exe app.py
```

Open http://127.0.0.1:5000.

Set both `SECRET_KEY` and `ARCADE_PASSWORD` in the environment before starting the server. Do not commit real secrets or put them in source files. The app intentionally shows a configuration warning if no password is set.

## Deploy to Render

Create a **Web Service** from this repository. Use:

- **Build command:** `pip install -r requirements.txt`
- **Start command:** `gunicorn app:app`

In Render's Environment settings, add:

- `SECRET_KEY`: a long, random secret value
- `ARCADE_PASSWORD`: the password to share with Saba
- `COOKIE_SECURE`: `true`

Keep the repository private if you prefer. Repository privacy is separate from app login protection.

## Add or edit prizes

Open `static/prizes.js`. Add an object to `window.ARCADE_PRIZES` with a unique `id`, `name`, `emoji`, `rarity`, `weight`, and `message`. Use rarity values `common`, `rare`, `epic`, or `legendary`. Edit `window.ARCADE_RARITY_WEIGHTS` in the same file to change the overall rarity odds.

## Security notes

- Password verification happens on the server, not in client-side JavaScript.
- Never commit real passwords, API keys, or a production `SECRET_KEY`.
- Use HTTPS in production. Set `COOKIE_SECURE=true` only when the deployed site uses HTTPS.
- Use a strong password and rotate it if you accidentally share it.
