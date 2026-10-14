import hmac
import os
import secrets
from functools import wraps

from flask import Flask, abort, jsonify, redirect, render_template, request, session, url_for

app = Flask(__name__)
app.secret_key = os.environ.get("SECRET_KEY") or secrets.token_hex(32)
app.config.update(
    SESSION_COOKIE_HTTPONLY=True,
    SESSION_COOKIE_SAMESITE="Lax",
    SESSION_COOKIE_SECURE=os.environ.get("COOKIE_SECURE", "false").lower() == "true",
    PERMANENT_SESSION_LIFETIME=60 * 60 * 24 * 7,
)

ARCADE_PASSWORD = os.environ.get("ARCADE_PASSWORD", "")


def login_required(view):
    @wraps(view)
    def wrapped(*args, **kwargs):
        if not session.get("arcade_unlocked"):
            if request.path.startswith("/api/"):
                abort(401)
            return redirect(url_for("login"))
        return view(*args, **kwargs)
    return wrapped


@app.get("/")
def home():
    if session.get("arcade_unlocked"):
        return redirect(url_for("arcade"))
    return redirect(url_for("login"))


@app.route("/login", methods=["GET", "POST"])
def login():
    error = None
    if request.method == "POST":
        configured_password = os.environ.get("ARCADE_PASSWORD", "")
        if not configured_password:
            error = "The arcade isn't configured yet. Its owner needs to set ARCADE_PASSWORD and SECRET_KEY."
        else:
            supplied = request.form.get("password", "")
            if hmac.compare_digest(supplied, configured_password):
                session.clear()
                session["arcade_unlocked"] = True
                session.permanent = True
                return redirect(url_for("arcade"))
            error = "Nope! That's not the secret password. Try again 💗"
    elif not os.environ.get("ARCADE_PASSWORD"):
        error = "The arcade isn't configured yet. Its owner needs to set ARCADE_PASSWORD and SECRET_KEY."
    return render_template("login.html", error=error)


@app.post("/logout")
def logout():
    session.clear()
    return redirect(url_for("login"))


@app.get("/arcade")
@login_required
def arcade():
    return render_template("arcade.html")


@app.get("/api/session")
@login_required
def session_status():
    return jsonify({"unlocked": True})


if __name__ == "__main__":
    app.run(debug=os.environ.get("FLASK_DEBUG", "false").lower() == "true")
