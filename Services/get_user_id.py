import jwt
import os
from flask import jsonify
def get_user_id_from_token(req):
    SECRET_KEY = os.getenv("SECRET_KEY")
    print("\n\n\n\n\n\nSECRET_KEY", SECRET_KEY, "\n\n\n\n\n\n")
    auth_header = req.headers.get("Authorization")
    print("\n\n\n\n\n\n\nAUTH HEADER:", req.headers.get("Authorization"), "\n\n\n\n\n\n\n")

    if not auth_header:
        raise Exception("No token provided")
    
    token = auth_header.split(" ")[1]
    decoded = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
    return decoded["user_id"]