from flask_restful import reqparse, abort, Resource, fields, marshal_with

from models import SPFH
from db import session


parser = reqparse.RequestParser()

parser.add_argument('name', type=str)

stock_fields = {
    'id': fields.Integer,
    'name': fields.String,
    'bb_id': fields.String,
    'yf_id': fields.String,

    'market_cap': fields.Float,
    'total_asset': fields.Float,
    'debt': fields.Float,
    'gross_profit': fields.Float,
    'beta': fields.Float,

    'revenue_3y_bk': fields.Float,
    'revenue_1y_bk': fields.Float,
    'revenue_1y_fd': fields.Float,

    'current_pe': fields.Float,
    'est_peg': fields.Float,
    'dividend': fields.Float,
    'ave_vol': fields.Float,

    'gp_to_ta': fields.Float,
    'ave_sales_growth': fields.Float,
    'debt_to_mcap': fields.Float
}

class AddSPFH(Resource):
    @marshal_with(stock_fields)
    def post(self):
        args = parser.parse_args()
        name = args['name']

        if name is None:
            abort(400, message="Couldn't create the name")
        if session.query(SPFH).filter_by(name = name).first() is not None:
            abort(404, message="Stock {} already exist".format(name))

        spfh = SPFH(name = name)
        spfh.set_id(name)
        spfh.set_bb_metrics()
        spfh.set_yf_metrics()
        spfh.calc_derived_metrics()

        session.add(spfh)
        session.commit()

        reged_stock = session.query(SPFH).filter(SPFH.name == name).first()
        if not reged_stock:
            abort(404, message="SPFH stock {} doesn't exist".format(name))
        return reged_stock

    @marshal_with(stock_fields)
    def get(self):
        args = parser.parse_args()
        name = args['name']

        if name is None:
            abort(400, message="Couldn't find the name")

        spfh = session.query(SPFH).filter_by(name = name).first()

        if spfh is None:
            abort(404, message="stock {} does not exist".format(name))
            
        return spfh
