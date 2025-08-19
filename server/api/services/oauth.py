from urllib.parse import quote
from flask import request , jsonify , session , render_template_string
from config.session_store import store_access_token
from api.models.model_schema import GithubUserItem
from config.appconfig import db
import requests
from dotenv import load_dotenv
import os

load_dotenv()


GITHUB_CLIENT_ID = os.getenv("GITHUB_CLIENT_ID")
GITHUB_CLIENT_SECRET = os.getenv("GITHUB_CLIENT_SECRET_ID")
BACKEND_URL = os.getenv("BACKEND_URL")

def githubOauth():
    try:
        auth_url = "https://github.com/login/oauth/authorize"
        redirect_url= os.getenv("GITHUB_REDIRECT_URL")
        scope = 'user,read:user,user:email,user:follow,repo,repo:status,repo_deployment,repo:invite,delete_repo'
        github_oauth_url = f"{auth_url}?client_id={GITHUB_CLIENT_ID}&redirect_uri={redirect_url}&scope={scope}"
        
        return jsonify({"url":github_oauth_url})
    except Exception as e:
        return jsonify({"error": e})

def github_callback():
    try:
        code = request.args.get('code')
        if not code:
            return jsonify({"message": "Authorization failed"}), 400

        # exchange code for access token
        token_url = "https://github.com/login/oauth/access_token"
        token_res = requests.post(
            token_url,
            headers={"Accept": "application/json"},
            data={
                "client_id": GITHUB_CLIENT_ID,
                "client_secret": GITHUB_CLIENT_SECRET,
                "code": code
            }
        )
        token = token_res.json()
        access_token = token.get("access_token")

        # get user info from GitHub
        user = requests.get(
            'https://api.github.com/user',
            headers={"Authorization": f"Bearer {access_token}"}
        )
        user_data = user.json()

        github_id = user_data.get("id")
        github_avatar = user_data.get("avatar_url")
        username = user_data.get("login")
        email = user_data.get("email")

        if not github_id:
            return jsonify({"error": "No GitHub ID"}), 400

        store_access_token(token=access_token, user_id=github_id)

        # ✅ check if user already exists
        github_user = GithubUserItem.query.filter_by(githubid=github_id).first()
        if github_user:
            # update existing record
            github_user.githubAvater = github_avatar
            github_user.githubUsername = username
            github_user.githubUserEmail = email
        else:
            # insert new record
            github_user = GithubUserItem(
                githubid=github_id,
                githubAvater=github_avatar,
                githubUsername=username,
                githubUserEmail=email
            )
            db.session.add(github_user)

        db.session.commit()

        # save session (unified with local auth)
        session["user_id"] = github_id
        session["auth_provider"] = "github"
        session.modified = True

        html = f"""
        <script>
        if (window.opener) {{
            window.opener.postMessage(
                {{ type: 'OAUTH_SUCCESS', username: "{username}" }},
                "*"
            );
            window.close();
        }} else {{
            document.write("Login successful! Please close this window.");
        }}
        </script>
        """
        return render_template_string(html)

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

    
def githubUser():
    try:
        user_id = session.get("user_id")
    
        if not user_id:
            return jsonify({"message":"UnAuthorized User"}),401
        
        githubuser = GithubUserItem.query.filter_by(githubid=user_id).first()
        
        githubuserdata = {
            "id": githubuser.id,
            "githubId": githubuser.githubid,
            "avatar": githubuser.githubAvater,
            "username": githubuser.githubUsername,
            "email" : githubuser.githubUserEmail
            
        }
        
        return jsonify({"message":"Github User Authorized","data": githubuserdata}),200
    
    except Exception as e:
        return ({"message":e})
    
    
    