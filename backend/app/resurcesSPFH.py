from flask_restful import reqparse, abort, Resource, fields, marshal_with

from models import SPFH
from db import session


parser = reqparse.RequestParser()


class UpdateSPFH(Resource):
    # @marshal_with(user_fields)
    def post(self):
        args = parser.parse_args()
        
        name = args['name']

        if name is None:
            abort(400, message="Couldn't create the name")
        if session.query(SPFH).filter_by(name = name).first() is not None:
            abort(404, message="Stock {} already exist".format(name))

        stock = SPFH(name = name)
        stock.set_bb_id(name)
        stock.get_market_cap(stock.bb_id)


        user = SPFH(username = username)
        user.hash_password(password)
        session.add(user)
        session.commit()

        reged_user = session.query(User).filter(User.username == username).first()
        if not reged_user:
            abort(404, message="User {} doesn't exist".format(username))
        return reged_user