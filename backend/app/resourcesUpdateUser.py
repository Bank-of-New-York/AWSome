from flask_restful import reqparse, abort, Resource, fields, marshal_with
from flask import g, jsonify

from models import User

from db import session

from resources import auth

parser = reqparse.RequestParser()

parser.add_argument('risk_level', type=int)
parser.add_argument('retirement_amount', type=int)
parser.add_argument('years_till_retire', type=int)
parser.add_argument('expected_growth', type=int)
parser.add_argument('monthly_deposit', type=int)

class UpdateUser(Resource):
    @auth.login_required
    def post(self):
        print("Updating User...")
        user = g.user

        args = parser.parse_args()
        print(dict(args))

        session.query(User)\
            .filter(User.id == user.id)\
            .update(dict(args))

        session.commit()
        return jsonify({ "status": "success"})
