from flask_restful import reqparse, abort, Resource, fields, marshal_with
from flask import g, jsonify

from models import User

from db import session

from resources import auth

parser = reqparse.RequestParser()

# Can INPUT
parser.add_argument('first_name', type=str)
parser.add_argument('last_name', type=str)
parser.add_argument('email_address', type=str)
parser.add_argument('birthday', type=str)
parser.add_argument('invested_before', type=str)

parser.add_argument('risk_level', type=str)
parser.add_argument('be_ratio', type=float)
parser.add_argument('retirement_amount', type=int)

parser.add_argument('years_till_retire', type=int)
parser.add_argument('expected_growth', type=float)
parser.add_argument('initial_deposit', type=float)
parser.add_argument('monthly_deposit', type=float)

# Will RETURN
user_fields = {
    'id': fields.Integer,
    'username': fields.String,
    # 'password_hash': fields.String,

    'first_name': fields.String,
    'last_name': fields.String,
    'email_address': fields.String,
    'birthday': fields.String,
    'invested_before': fields.String,

    'risk_level': fields.String,
    'be_ratio': fields.Float,
    'retirement_amount': fields.Integer,

    'years_till_retire': fields.Integer,
    'expected_growth': fields.Float,
    'initial_deposit': fields.Float,
    'monthly_deposit': fields.Float,
}

class UpdateUser(Resource):
    @marshal_with(user_fields)
    @auth.login_required
    def get(self):
        print("Getting User...")
        user = g.user

        return user

    @auth.login_required
    def post(self):
        print("Updating User...")
        user = g.user

        args = dict(parser.parse_args())

        non_null_args = {}
        for key, value in args.items():
            if value:
                non_null_args[key] = args[key]

        print(non_null_args)

        session.query(User)\
            .filter(User.id == user.id)\
            .update(dict(args))

        session.commit()
        return jsonify({ "status": "success"})
