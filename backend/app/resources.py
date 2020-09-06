from flask_restful import reqparse, abort, Resource, fields, marshal_with
from flask import g, jsonify

from sqlalchemy import create_engine
from Config import DB_URI

from models import User, SPFH
from models import Base

from YahooFinance import get_stock_hist_list
from GeneralNews import get_news

from db import session

from flask_httpauth import HTTPBasicAuth

auth = HTTPBasicAuth()
parser = reqparse.RequestParser()


class Home(Resource):
    def get(self):
        return 'Dockerized', 200

user_fields = {
    'id': fields.Integer,
    'username': fields.String,
    'password_hash': fields.String 
}
parser.add_argument('username', type=str)
parser.add_argument('password', type=str)

class Register(Resource):
    @marshal_with(user_fields)
    def post(self):
        args = parser.parse_args()
        
        username = args['username']
        password = args['password']

        if username is None or password is None:
            abort(400, message="Couldn't create the user, missing params")
        if session.query(User).filter_by(username = username).first() is not None:
            abort(404, message="User {} already exist".format(username))

        user = User(username = username)
        user.hash_password(password)
        session.add(user)
        session.commit()

        reged_user = session.query(User).filter(User.username == username).first()
        if not reged_user:
            abort(404, message="User {} doesn't exist".format(username))
        return reged_user


token_field = {
    'title': fields.String
}

class Token(Resource):
    @auth.login_required
    def get(self):
        token = g.user.generate_auth_token()
        return jsonify({
            "token": '{}'.format(token.decode('ascii')) # Token
        })

class HomeAuth(Resource):
    @auth.login_required
    def get(self):
        token = g.user.generate_auth_token()
        return 'Hi {} your pass hash is: {}!'.format(g.user.username, g.user.password_hash)

@auth.verify_password
def verify_password(username_or_token, password):
    # first try to authenticate by token
    user = User.verify_auth_token(username_or_token)
    if not user:
        
        # try to authenticate with username/password
        user = session.query(User).filter_by(username=username_or_token).first()
        if not user or not user.verify_password(password):
            return False
            
    print(f"Verified password for user {user.id}")
    g.user = user
    return True


stock_price_fields = {
    'stock_prices': fields.List(fields.Nested({"x": fields.String, "y": fields.String}))
}
parser.add_argument('stock_symb', type=str)
parser.add_argument('start_date', type=str)
parser.add_argument('end_date', type=str)

class StockTrend(Resource):
    @marshal_with(stock_price_fields)
    def post(self):
        print("Getting stock trends...")
        args = parser.parse_args()
        stock_symb, end_date, start_date = args['stock_symb'], args['end_date'], args['start_date']
        stock_history_values = get_stock_hist_list(stock_symb, end_date, start_date)
        if stock_history_values == []:
            abort(404, message="Check that stock symbol is correct or that dates are valid")

        return { "stock_prices": stock_history_values }


parser.add_argument('stock_symb', type=str)

class GeneralNews(Resource):
    def post(self):
        print("Getting general news...")
        args = parser.parse_args()
        stock_symb = args["stock_symb"]

        try:
            return jsonify(get_news(stock_symb)) # JSON
        except Exception as e:
            return jsonify({ "error": e })


class Database(Resource):
    # @auth.login_required
    def delete(self):

        for t in Base.metadata.sorted_tables:
            print(t.name)

        engine = create_engine(DB_URI)
        # Base.metadata.drop_all(bind=engine)
        # Base.metadata.create_all(bind=engine)

        DROP_TABLES = [User.__table__]
        for table in DROP_TABLES:
            table.drop(engine)
            table.create(engine)
        
        print("Resetted schemas..")

        return jsonify({ "status": "success" })



# class Spot(Resource):
#     @marshal_with(sportspot_fields)
#     def get(self, spot_id):
#         spot = session.query(SportSpot).filter(SportSpot.id == spot_id).first()
#         if not spot:
#             abort(404, message="Spot {} doesn't exist".format(spot_id))
#         return spot

#     @auth.login_required
#     def delete(self, spot_id):
#         spot = session.query(SportSpot).filter(SportSpot.id == spot_id).first()
#         if not spot:
#             abort(404, message="Spot {} doesn't exist".format(spot_id))
#         session.delete(spot)
#         session.commit()
#         return {}, 204


#     @auth.login_required
#     @marshal_with(sportspot_fields)
#     def put(self, spot_id):
#         parsed_args = parser.parse_args()
#         spot = session.query(SportSpot).filter(SportSpot.id == spot_id).first()
#         spot.title = parsed_args['title']
#         spot.address = parsed_args['address']
#         session.add(spot)
#         session.commit()
#         return spot, 201


# class SpotList(Resource):
#     @marshal_with(sportspot_fields)
#     def get(self):
#         spots = session.query(SportSpot).all()
#         return spots

#     @auth.login_required
#     @marshal_with(sportspot_fields)
#     def post(self):
#         args = parser.parse_args()

#         print(args['title'])
#         s = SportSpot()
#         s.title = args['title']
#         s.address = args['address']
#         s.author_id = session.query(User).filter(User.username == g.user.username).first().id

#         session.add(s)
#         session.commit()

#         return session.query(SportSpot).order_by(SportSpot.id.desc()).first(), 201